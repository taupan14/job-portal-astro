import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('./assets/json/list-clients.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const containers = document.querySelectorAll('[data-clients]')
        
        containers.forEach(container => {
            const limit = container.getAttribute('data-clients') || ''
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, '')) : data.length

            data.slice(0, itemsToDisplay).forEach((item, index) => {
                const items = `
                    <div class="relative shrink-0">
                        <div class="relative isolate aspect-4/3 px-[15%] grayscale | lg:px-[20%] | 2xl:px-[25%]">
                            <img src="${item.client_logo}" alt="${item.client_name}" class="size-full object-contain">
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