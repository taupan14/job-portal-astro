import barba from "@barba/core";

const iniComponents = async () => {
  try {
    // const response = await fetch("/assets/json/list-services.json");
    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    // const data = await response.json();
    // const containers = document.querySelectorAll("[data-services]");
    const API_URL = import.meta.env.PUBLIC_API_URL + "/pubs/";

    const el = document.querySelector("[data-services]");
    let data = [];
    if (el) {
      data = JSON.parse(el.dataset.contents || "[]");
    }

    const containers = document.querySelectorAll("[data-services]");

    containers.forEach((container) => {
      const limit = container.getAttribute("data-services") || "";
      const itemsToDisplay = limit
        ? Math.min(data.length, parseInt(limit, ""))
        : data.length;

      data.slice(0, itemsToDisplay).forEach((item) => {
        const initImgThumbnail = (imageThumbnail) => {
          if (!imageThumbnail?.image) {
            return `
                            <div></div>
                        `;
          }
          item.image = API_URL + item.image;
          return `
                        <picture>
                            <source type="image/webp" srcset="${item.image} 400w, ${item.image} 800w, ${item.image} 1200w, ${item.image} 1600w" sizes="100vw">
                            <img src="${item.image}" srcset="${item.image} 400w, ${item.image} 800w, ${item.image} 1200w, ${item.image} 1600w" sizes="100vw" decoding="async" alt="${item.title}" class="size-full object-cover">
                        </picture>
                    `;
        };

        const items = `
                    <a href="/service/${item.slug}" class="flex flex-col aspect-4/3 rounded-lg overflow-clip bg-primary-950/40 | lg:aspect-video" data-hover-group>
                        <div class="relative grow">
                            <div class="relative size-full [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]">
                                ${initImgThumbnail(item)}
                            </div>
                            <div class="absolute inset-0 flex justify-end p-6">
                                <div class="btn btn-icon btn-primary" data-hover-effect>
                                    <svg class="icon icon-stroke icon-up-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 6.5L6 18" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 6H18V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="shrink-0 flex flex-col gap-2 p-6 !pt-0">
                            <div class="text-sm text-dark-400">Service</div>
                            <h5 class="text-balance tracking-normal line-clamp-2 text-white">${item.title}</h5>
                        </div>
                    </a>
                `;
        container.insertAdjacentHTML("beforeend", items);
      });
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

barba.hooks.beforeEnter(async () => {
  await iniComponents();
});
