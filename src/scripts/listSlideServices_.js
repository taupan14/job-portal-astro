import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('./assets/json/list-services.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const slideContainers = document.querySelectorAll('[data-slide-services]')
        const containers = document.querySelectorAll('[data-slide-services] .splide__list')
        
        containers.forEach((container, index) => {
            const limit = slideContainers[index].getAttribute('data-slide-services') || '' 
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, 10)) : data.length

            data.slice(0, itemsToDisplay).forEach(item => {
                const items = `
                    <div class="splide__slide">
                        <div class="relative isolate aspect-video flex flex-col justify-between p-4 bg-white overflow-clip | lg:p-6">
                            <div class="flex justify-end | lg:justify-start">
                                ${item.icon} 
                            </div>
                            <div class="flex flex-col gap-1 | lg:items-end">
                                <div class="h6 font-bold uppercase tracking-wide text-dark-400">Service</div>
                                <h2 class="text-xl tracking-normal text-balance truncate transition-colors duration-800 ease-custom [.is-active-slide_&]:text-white">${item.title}</h2>
                            </div>
                            <div class="absolute inset-0 bg-dark-950 -z-1 scale-y-0 origin-bottom transition-transform duration-800 ease-custom [.is-active-slide_&]:scale-y-100"></div>
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