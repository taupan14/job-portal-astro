import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('./assets/json/list-employes.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const slideContainers = document.querySelectorAll('[data-slide-employes]')
        const containers = document.querySelectorAll('[data-slide-employes] .splide__list')
        
        containers.forEach((container, index) => {
            const limit = slideContainers[index].getAttribute('data-slide-employes') || '' 
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, 10)) : data.length

            data.slice(0, itemsToDisplay).forEach(item => {
                const items = `
                    <div class="splide__slide">
                        <div class="flex flex-col rounded-lg bg-dark-50 p-4 gap-6 aspect-4/3 | lg:p-6 lg:aspect-4/3">
                            <div class="flex flex-col gap-1">
                                <div class="h6 text-dark-400">Jumlah Karyawan</div>
                                <h5 class="text-xl text-balance tracking-normal">${item.job_title}</h5>
                            </div>
                            <div class="mt-auto flex justify-end">
                                <div class="h3 leading-none font-bold text-primary-600">${item.job_total}</div>
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