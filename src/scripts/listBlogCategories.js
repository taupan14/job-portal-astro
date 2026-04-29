import barba from "@barba/core";
import { reloadBlogs } from "./listBlog.js";

const API_URL = import.meta.env.PUBLIC_API_URL;

// ─── Fetch ────────────────────────────────────────────────────────────────────
const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/api/blogs/categories`);
    if (!response.ok) throw new Error("Gagal mengambil data kategori");
    return response.json();
  } catch (error) {
    console.error("listBlogCategories fetchCategories:", error);
    return [];
  }
};

// ─── Init ─────────────────────────────────────────────────────────────────────
const initComponents = async () => {
  const containers = document.querySelectorAll("[data-blog-categories]");
  if (!containers.length) return;

  const data = await fetchCategories();

  containers.forEach((container) => {
    const limit = container.getAttribute("data-blog-categories") || "";
    const itemsToDisplay = limit
      ? Math.min(data.length, parseInt(limit, 10))
      : data.length;

    container.innerHTML = "";

    data.slice(0, itemsToDisplay).forEach((item, index) => {
      const li = document.createElement("li");
      if (index === 0) li.classList.add("is-active");

      li.innerHTML = `
        <a href="/blog" class="inline-flex items-baseline gap-1 [.is-active_&]:!text-primary-500 group" data-category-id="${item.id}">
          <div class="h4 link link-reverse text-dark-600 [--min-size:var(--text-3xl)] [--link-underline:var(--color-primary-600)] group-hover:text-dark-950 [.is-active_&]:text-primary-600 [.is-active_&]:[--link-from:100%]">${item.name}</div>
          <div class="text-sm font-semibold text-dark-950">${item._count?.blogs ?? 0}</div>
        </a>
      `;

      // Click handler per item
      li.querySelector("a").addEventListener("click", async (e) => {
        e.preventDefault();

        // Update is-active
        container
          .querySelectorAll("li")
          .forEach((el) => el.classList.remove("is-active"));
        li.classList.add("is-active");

        // Trigger reload blog dengan category filter
        await reloadBlogs(item.id);
      });

      container.appendChild(li);
    });
  });
};

barba.hooks.beforeEnter(async () => {
  await initComponents();
});
