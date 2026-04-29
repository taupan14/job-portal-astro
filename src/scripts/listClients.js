import barba from "@barba/core";

const iniComponents = async () => {
  try {
    const API_URL = import.meta.env.PUBLIC_API_URL + "/pubs/";

    const el = document.querySelector("[data-clients]");
    let data = [];
    if (el) {
      data = JSON.parse(el.dataset.contents || "[]");
    }
    const containers = document.querySelectorAll("[data-clients]");

    containers.forEach((container) => {
      const limit = container.getAttribute("data-clients") || "";
      const itemsToDisplay = limit
        ? Math.min(data.length, parseInt(limit, ""))
        : data.length;

      data.slice(0, itemsToDisplay).forEach((item) => {
        item.logo = API_URL + item.logo;
        const items = `
                    <a href="${item.url}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="relative shrink-0 block group">
                      <div class="relative isolate aspect-4/3 px-[15%] | lg:px-[20%] | 2xl:px-[25%]">
                        <img
                          src="${item.logo}"
                          alt="${item.name}"
                          class="size-full object-contain
                                grayscale
                                transition-all duration-500 ease-in-out
                                group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                        />
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
