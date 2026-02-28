import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('./assets/json/list-teams.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const slideContainers = document.querySelectorAll('[data-slide-teams]')
        const containers = document.querySelectorAll('[data-slide-teams] .splide__list')
        
        containers.forEach((container, index) => {
            const limit = slideContainers[index].getAttribute('data-slide-teams') || '' 
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, 10)) : data.length

            data.slice(0, itemsToDisplay).forEach(item => {
                const initImgThumbnail = (imageThumbnail) => {
                    if (!imageThumbnail?.team_photo) {
                        return `
                            <div></div>
                        `
                    }
                    return `
                        <picture>
                            <source type="image/webp" srcset="${item.team_photo} 400w, ${item.team_photo} 800w, ${item.team_photo} 1200w, ${item.team_photo} 1600w" sizes="100vw">
                            <img src="${item.team_photo}" srcset="${item.team_photo} 400w, ${item.team_photo} 800w, ${item.team_photo} 1200w, ${item.team_photo} 1600w" sizes="100vw" decoding="async" alt="${item.team_name}" class="size-full object-cover">
                        </picture>
                    `
                }

                const items = `
                    <div class="splide__slide">
                        <div class="relative aspect-4/5 rounded-lg overflow-clip">
                            <div class="absolute inset-0 flex flex-col items-start justify-between">
                                <div class="w-full flex justify-end px-4">
                                    <div class="badge rounded-t-none badge-primary"><span>${item.team_division}</span></div>
                                </div> 
                                <div class="relative isolate flex flex-col pt-3 pr-6 bg-white rounded-tr-lg">
                                    <div class="font-semibold text-dark-950">${item.team_name}</div>
                                    <div class="text-sm font-medium">${item.team_skill}</div>
                                    <div class="absolute bottom-full left-0 size-2 rounded-bl-lg shadow-[-0.5rem_0.5rem_0_0.5rem_var(--color-body)] -z-1"></div>
                                    <div class="absolute left-full bottom-0 size-2 rounded-bl-lg shadow-[-0.5rem_0.5rem_0_0.5rem_var(--color-body)] -z-1"></div>
                                </div>
                            </div>
                            ${initImgThumbnail(item)}
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