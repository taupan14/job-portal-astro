import barba from "@barba/core";

const iniComponents = async () => {
  try {
    const API_URL = import.meta.env.PUBLIC_API_URL + "/pubs/uploads/blog/";

    const el = document.querySelector("[data-slide-blog]");
    let data = [];
    if (el) {
      data = JSON.parse(el.dataset.related || "[]");
    }
    const slideContainers = document.querySelectorAll("[data-slide-blog]");
    const containers = document.querySelectorAll(
      "[data-slide-blog] .splide__list",
    );

    containers.forEach((container, index) => {
      const limit =
        slideContainers[index].getAttribute("data-slide-blog") || "";
      const itemsToDisplay = limit
        ? Math.min(data.length, parseInt(limit, 10))
        : data.length;

      data.slice(0, itemsToDisplay).forEach((item) => {
        const initImgThumbnail = (imageThumbnail) => {
          if (!imageThumbnail?.thumbnail) {
            return `<div></div>`;
          }

          item.thumbnail = API_URL + item.thumbnail;
          return `
                        <picture>
                            <source type="image/webp" srcset="${item.thumbnail} 400w, ${item.thumbnail} 800w, ${item.thumbnail} 1200w, ${item.thumbnail} 1600w" sizes="100vw">
                            <img src="${item.thumbnail}" srcset="${item.thumbnail} 400w, ${item.thumbnail} 800w, ${item.thumbnail} 1200w, ${item.thumbnail} 1600w" sizes="100vw" decoding="async" alt="${item.title}" class="size-full object-cover">
                        </picture>
                    `;
        };

        const items = `
                    <div class="splide__slide">
                        <a href="/blog/${item.slug}" class="flex flex-col" data-hover-group>
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
                            <div class="p-4 !pb-0 flex flex-col gap-4 | lg:p-6">
                                <div class="inline-flex items-center gap-3" data-subtitle="">
                                    <div class="size-1.5 rounded-full bg-primary-600 shrink-0"></div>
                                    <div class="text-sm leading-none font-medium truncate">${item.category.name}</div>
                                </div>
                                <h5 class="text-xl text-balance tracking-normal line-clamp-2">${item.title}</h5>
                                <div class="text-sm leading-none font-medium truncate">${formatDate(item.published_at)}</div>
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

barba.hooks.beforeEnter(async () => {
  await iniComponents();
});
