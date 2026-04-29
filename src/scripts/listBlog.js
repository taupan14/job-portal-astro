import barba from "@barba/core";

const LIMIT = 9;
const API_URL = import.meta.env.PUBLIC_API_URL;
const API_ASSET_URL = API_URL + "/pubs/uploads/blog/";

// ─── State (per page-enter) ───────────────────────────────────────────────────
let currentPage = 1;
let totalPages = 1;
let isLoading = false;
let activeCategory = null;
let observer = null;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const formatted = new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // "28 April 2026" → "28 April, 2026"
  const parts = formatted.split(" ");
  return `${parts[0]} ${parts[1]}, ${parts[2]}`;
};

const initImgThumbnail = (thumbnail, title) => {
  if (!thumbnail) return `<div></div>`;

  thumbnail = API_ASSET_URL + thumbnail;
  return `
    <picture>
      <source
        type="image/webp"
        srcset="${thumbnail} 400w, ${thumbnail} 800w, ${thumbnail} 1200w, ${thumbnail} 1600w"
        sizes="100vw"
      />
      <img
        src="${thumbnail}"
        srcset="${thumbnail} 400w, ${thumbnail} 800w, ${thumbnail} 1200w, ${thumbnail} 1600w"
        sizes="100vw"
        decoding="async"
        alt="${title}"
        class="size-full object-cover"
      />
    </picture>
  `;
};

const renderBlogCard = (item) => {
  const published = item.published_at || item.created_at;

  // console.log("blogs slug:", item.slug);
  return `
    <div class="col-span-full | lg:col-span-1">
      <a href="/blog/${item.slug}" class="flex flex-col" data-hover-group>
        <div class="relative isolate aspect-4/3 rounded-lg overflow-clip shrink-0">
          ${initImgThumbnail(item.thumbnail, item.title)}
          <div class="absolute inset-0 flex justify-end p-4 | lg:p-6">
            <div class="btn btn-icon btn-primary" data-hover-effect>
              <svg class="icon icon-stroke icon-up-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 6.5L6 18" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 6H18V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="p-4 !pb-0 flex flex-col gap-3 | lg:p-6">
          <div class="flex items-center gap-4">
            <div class="grow inline-flex items-center gap-3" data-subtitle="">
              <div class="size-1.5 rounded-full bg-primary-600 shrink-0"></div>
              <div class="text-sm leading-none font-medium truncate">${item.category?.name ?? ""}</div>
            </div>
            <div class="text-sm leading-none font-medium shrink-0">${formatDate(published)}</div>
          </div>
          <h5 class="text-xl text-balance tracking-normal line-clamp-2">${item.title}</h5>
        </div>
      </a>
    </div>
  `;
};

// ─── Pagination UI ────────────────────────────────────────────────────────────
const initPaginationUI = () => {
  const pagination = document.querySelector("[data-pagination]");
  if (!pagination) return;

  pagination.innerHTML = `
    <div data-scroll-sentinel class="h-4 w-full"></div>
    <div data-loading-indicator class="flex justify-center py-8 hidden">
      <div class="flex items-center gap-3 text-dark-500">
        <svg class="animate-spin size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 3 5.373 3 12h1z"></path>
        </svg>
        <span class="text-sm font-medium">Memuat berita...</span>
      </div>
    </div>
  `;
};

// ─── Fetch ────────────────────────────────────────────────────────────────────
const fetchBlogs = async (page, categoryId) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(LIMIT),
    status: "published",
  });
  if (categoryId) params.set("category_id", String(categoryId));

  const res = await fetch(`${API_URL}/api/blogs?${params}`);
  if (!res.ok) throw new Error("Gagal mengambil data blog");
  return res.json();
};

// ─── Load more ────────────────────────────────────────────────────────────────
const loadMore = async () => {
  if (isLoading || currentPage > totalPages) return;

  const container = document.querySelector("[data-blog]");
  const loadingIndicator = document.querySelector("[data-loading-indicator]");
  const endIndicator = document.querySelector("[data-end-indicator]");
  if (!container) return;

  isLoading = true;
  loadingIndicator?.classList.remove("hidden");

  try {
    const { data: blogs, meta } = await fetchBlogs(currentPage, activeCategory);
    totalPages = meta.totalPages;

    blogs.forEach((item) => {
      container.insertAdjacentHTML("beforeend", renderBlogCard(item));
    });

    currentPage++;

    if (currentPage > totalPages) {
      endIndicator?.classList.remove("hidden");
      observer?.disconnect();
    }
  } catch (error) {
    console.error("listBlog loadMore:", error);
  } finally {
    isLoading = false;
    loadingIndicator?.classList.add("hidden");
  }
};

// ─── Observer ─────────────────────────────────────────────────────────────────
const setupObserver = () => {
  observer?.disconnect();

  const sentinel = document.querySelector("[data-scroll-sentinel]");
  if (!sentinel) return;

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) loadMore();
    },
    { rootMargin: "200px" },
  );

  observer.observe(sentinel);
};

// ─── Public: reload dari page 1 (dipanggil oleh listBlogCategories) ───────────
export const reloadBlogs = async (categoryId = null) => {
  const container = document.querySelector("[data-blog]");
  const endIndicator = document.querySelector("[data-end-indicator]");
  if (!container) return;

  activeCategory = categoryId;
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  observer?.disconnect();

  endIndicator?.classList.add("hidden");
  container.innerHTML = "";

  setupObserver();
  await loadMore();
};

// ─── Init ─────────────────────────────────────────────────────────────────────
const initComponents = async () => {
  const containers = document.querySelectorAll("[data-blog]");
  if (!containers.length) return;

  // Reset state setiap masuk halaman (barba re-enter)
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  activeCategory = null;
  observer = null;

  initPaginationUI();
  setupObserver();
  await loadMore();
};

barba.hooks.beforeEnter(async () => {
  await initComponents();
});
