import barba from "@barba/core";

const iniComponents = async () => {
  try {
    const API_URL = import.meta.env.PUBLIC_API_URL + "/pubs/uploads/blog/";

    const el = document.querySelector("[data-blog-home]");
    let data = [];
    if (el) {
      data = JSON.parse(el.dataset.contents || "[]");
    }
    // console.log("[DATA..]", data);
    const containers = document.querySelectorAll("[data-blog-home]");

    containers.forEach((container) => {
      const limit = container.getAttribute("data-blog-home") || "";
      // console.log("[LIMIT..]", limit);
      const itemsToDisplay = limit
        ? Math.min(data.length, parseInt(limit, ""))
        : data.length;

      data.slice(0, itemsToDisplay).forEach((item) => {
        const initImgThumbnail = (imageThumbnail) => {
          if (!imageThumbnail?.blog.thumbnail) {
            return `
                            <div></div>
                        `;
          }
          item.blog.thumbnail = API_URL + item.blog.thumbnail;
          // console.log("[THUMBNAIL..]", item.blog.thumbnail);
          return `
                        <picture>
                            <source type="image/webp" srcset="${item.blog.thumbnail} 400w, ${item.blog.thumbnail} 800w, ${item.blog.thumbnail} 1200w, ${item.blog.thumbnail} 1600w" sizes="100vw">
                            <img src="${item.blog.thumbnail}" srcset="${item.blog.thumbnail} 400w, ${item.blog.thumbnail} 800w, ${item.blog.thumbnail} 1200w, ${item.blog.thumbnail} 1600w" sizes="100vw" decoding="async" alt="${item.blog.title}" class="size-full object-cover">
                        </picture>
                    `;
        };

        const items = `
                    <div class="col-span-full | lg:col-span-1">
                        <a href="/blog/${item.blog.slug}" target="_blank" rel="noopener noreferrer" class="flex flex-col" data-hover-group>
                            <div class="relative isolate aspect-4/3 rounded-lg overflow-clip shrink-0">
                                ${initImgThumbnail(item)}
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
                                        <div class="text-sm leading-none font-medium truncate pb-0.5">${item.blog.category.name}</div>
                                    </div>
                                    <div class="text-sm leading-none font-medium shrink-0">${formatDate(item.blog.published_at)}</div>
                                </div>
                                <h5 class="text-xl text-balance tracking-normal line-clamp-2">${item.blog.title}</h5>
                            </div>
                        </a>
                    </div>
                `;
        container.insertAdjacentHTML("beforeend", items);
      });
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffH = diffMs / (1000 * 60 * 60);
  const diffD = diffMs / (1000 * 60 * 60 * 24);

  if (diffH < 24)
    return diffH <= 0 ? "Baru saja" : `${Math.floor(diffH)} Jam yang lalu`;
  if (diffD < 7) return `${Math.floor(diffD)} Hari yang lalu`;

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

barba.hooks.beforeEnter(async () => {
  await iniComponents();
});
