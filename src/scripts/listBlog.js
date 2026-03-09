import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('/assets/json/list-blog.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const containers = document.querySelectorAll('[data-blog]')
        
        containers.forEach(container => {
            const limit = container.getAttribute('data-blog') || ''
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, '')) : data.length

            data.slice(0, itemsToDisplay).forEach((item, index) => {
                const initImgThumbnail = (imageThumbnail) => {
                    if (!imageThumbnail?.blog_img) {
                        return `
                            <div></div>
                        `
                    }
                    return `
                        <picture>
                            <source type="image/webp" srcset="${item.blog_img} 400w, ${item.blog_img} 800w, ${item.blog_img} 1200w, ${item.blog_img} 1600w" sizes="100vw">
                            <img src="${item.blog_img}" srcset="${item.blog_img} 400w, ${item.blog_img} 800w, ${item.blog_img} 1200w, ${item.blog_img} 1600w" sizes="100vw" decoding="async" alt="${item.title}" class="size-full object-cover">
                        </picture>
                    `
                }

                const items = `
                    <div class="col-span-full | lg:col-span-1">
                        <a href="page-blog-detail.html" class="flex flex-col" data-hover-group>
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
                                        <div class="text-sm leading-none font-medium truncate">${item.blog_category}</div>
                                    </div>
                                    <div class="text-sm leading-none font-medium shrink-0">${item.blog_date}</div>
                                </div>
                                <h5 class="text-xl text-balance tracking-normal line-clamp-2">${item.blog_title}</h5>
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