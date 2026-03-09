import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('/assets/json/list-products.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const slideContainers = document.querySelectorAll('[data-slide-products]')
        const containers = document.querySelectorAll('[data-slide-products] .splide__list')
        
        containers.forEach((container, index) => {
            const limit = slideContainers[index].getAttribute('data-slide-products') || '' 
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, 10)) : data.length

            data.slice(0, itemsToDisplay).forEach(item => {
                const initImgThumbnail = (imageThumbnail) => {
                    if (!imageThumbnail?.img) {
                        return `
                            <div></div>
                        `
                    }
                    return `
                        <picture>
                            <source type="image/webp" srcset="${item.img} 400w, ${item.img} 800w, ${item.img} 1200w, ${item.img} 1600w" sizes="100vw">
                            <img src="${item.img}" srcset="${item.img} 400w, ${item.img} 800w, ${item.img} 1200w, ${item.img} 1600w" sizes="100vw" decoding="async" alt="${item.title}" class="size-full object-cover">
                        </picture>
                    `
                }

                const items = `
                    <div class="splide__slide">
                        <a href="page-product-detail.html" class="relative flex flex-col aspect-square rounded-lg overflow-clip scale-85 transition-all duration-800 ease-custom [.is-active-slide_&]:scale-100 | lg:aspect-video" data-hover-group>
                            <div class="relative size-full">
                                ${initImgThumbnail(item)}
                            </div>
                            <div class="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-dark-950/40 to-dark-950/80 p-6 | 2xl:p-8">
                                <div class="btn btn-icon btn-primary self-end" data-hover-effect>
                                    <svg class="icon icon-stroke icon-up-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 6.5L6 18" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 6H18V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="grid gap-6 opacity-0 transition-opacity duration-800 ease-custom [.is-active-slide_&]:opacity-100 | lg:grid-cols-5 lg:items-end">
                                    <div class="col-span-full | lg:col-span-3">
                                        <div class="flex flex-col gap-2">
                                            <div class="text-sm text-white">Produk</div>
                                            <h5 class="text-balance tracking-normal line-clamp-2 text-white">${item.title}</h5>
                                        </div>
                                    </div>
                                    <div class="col-span-full | lg:col-span-2 lg:text-end">
                                        <p class="text-balance font-medium text-white">${item.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `
                container.insertAdjacentHTML('beforeend', items)
            })
        })
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}

barba.hooks.beforeEnter(async () => {
    await iniComponents()
})