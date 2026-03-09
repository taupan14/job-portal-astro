import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('/assets/json/list-services.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const slideContainers = document.querySelectorAll('[data-slide-related-services]')
        const containers = document.querySelectorAll('[data-slide-related-services] .splide__list')
        
        containers.forEach((container, index) => {
            const limit = slideContainers[index].getAttribute('data-slide-related-services') || '' 
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
                        <a href="page-service-detail.html" class="relative flex flex-col rounded-lg overflow-clip">
                            <div class="relative aspect-4/3 rounded-lg overflow-clip shrink-0">
                                ${initImgThumbnail(item)}
                            </div>
                            <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-dark-950/20 to-dark-950/80">
                                <div class="p-4 flex flex-col gap-1 | lg:p-6">
                                    <div class="text-sm text-white/70">Service</div>
                                    <h5 class="text-xl text-balance tracking-normal line-clamp-2 text-white">${item.title}</h5>
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