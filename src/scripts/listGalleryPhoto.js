import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('./assets/json/list-gallery-photo.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const containers = document.querySelectorAll('[data-gallery-photo]')
        
        containers.forEach(container => {
            const limit = container.getAttribute('data-gallery-photo') || ''
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, '')) : data.length

            data.slice(0, itemsToDisplay).forEach((item, index) => {
                const initImgThumbnail = (imageThumbnail) => {
                    if (!imageThumbnail?.gallery_img) {
                        return `
                            <div></div>
                        `
                    }
                    return `
                        <picture>
                            <source type="image/webp" srcset="${item.gallery_img} 400w, ${item.gallery_img} 800w, ${item.gallery_img} 1200w, ${item.gallery_img} 1600w" sizes="100vw">
                            <img src="${item.gallery_img}" srcset="${item.gallery_img} 400w, ${item.gallery_img} 800w, ${item.gallery_img} 1200w, ${item.gallery_img} 1600w" sizes="100vw" decoding="async" alt="${item.gallery_title}" class="size-full object-cover">
                        </picture>
                    `
                }

                const items = `
                    <div class="col-span-full | lg:col-span-1">
                        <div class="relative aspect-square rounded-lg overflow-clip bg-dark-200 cursor-pointer group" data-gallery-item data-src="${item.gallery_img}">
                            ${initImgThumbnail(item)}
                            <div class="absolute inset-0 grid place-content-center bg-black/50 opacity-0 | lg:group-hover:opacity-100">
                                <svg class="icon icon-stroke size-7 text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 17.5L22 22" stroke="#141B34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="#141B34" stroke-width="2" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
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