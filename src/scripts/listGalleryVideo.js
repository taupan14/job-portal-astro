import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('./assets/json/list-gallery-video.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const containers = document.querySelectorAll('[data-gallery-video]')
        
        containers.forEach(container => {
            const limit = container.getAttribute('data-gallery-video') || ''
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, '')) : data.length

            data.slice(0, itemsToDisplay).forEach((item, index) => {
                const initImgThumbnail = (imageThumbnail) => {
                    if (!imageThumbnail?.gallery_poster) {
                        return `
                            <div></div>
                        `
                    }
                    return `
                        <picture>
                            <source type="image/webp" srcset="${item.gallery_poster} 400w, ${item.gallery_poster} 800w, ${item.gallery_poster} 1200w, ${item.gallery_poster} 1600w" sizes="100vw">
                            <img src="${item.gallery_poster}" srcset="${item.gallery_poster} 400w, ${item.gallery_poster} 800w, ${item.gallery_poster} 1200w, ${item.gallery_poster} 1600w" sizes="100vw" decoding="async" alt="${item.gallery_title}" class="size-full object-cover">
                        </picture>
                    `
                }

                const items = `
                    <div class="col-span-full | lg:col-span-1">
                        <div class="relative aspect-video rounded-lg overflow-clip bg-dark-200 cursor-pointer group" data-gallery-item data-poster="${item.gallery_poster}" data-src="${item.gallery_url}">
                            ${initImgThumbnail(item)}
                            <div class="absolute inset-0 grid place-content-center bg-black/50 opacity-0 | lg:group-hover:opacity-100">
                                <svg class="icon icon-fill size-7 text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 5.78987C5.25 4.42081 6.7512 3.58195 7.91717 4.29947L18.0091 10.5099C19.1196 11.1933 19.1196 12.8074 18.0091 13.4907L7.91717 19.7011C6.7512 20.4187 5.25 19.5798 5.25 18.2107V5.78987Z" fill="#141B34"/>
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