import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('./assets/json/list-faq.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const containers = document.querySelectorAll('[data-faq]')
        
        containers.forEach(container => {
            const limit = container.getAttribute('data-faq') || ''
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, '')) : data.length

            data.slice(0, itemsToDisplay).forEach((item, index) => {
                const faqNumber = (index + 1).toString().padStart(2, '0'); // Ensure two-digit format (01, 02, etc.)
                const isFirstItem = index === 0; // Check if it's the first item
                const items = `
                    <div class="accordion-item py-6 first:pt-0 last:pb-0 ${isFirstItem ? 'is-open' : ''} | lg:py-8">
                        <a href="javascript:;" class="flex items-start gap-6" data-target="faq-${index}">
                            <div class="min-w-5 h6 uppercase tracking-wider my-1">${faqNumber}</div>
                            <h5 class="text-xl text-balance tracking-normal [.is-open_&]:text-primary-600">${item.faq_question}</h5>
                        </a>
                        <div id="faq-${index}" class="accordion-content overflow-clip" aria-expanded="${isFirstItem}">
                            <article class="pl-11 post-entry no-grid py-4 font-medium text-balance [&>p]:!text-[size:inherit] [&>p]:!leading-[inherit]">
                                <p>${item.faq_answer}</p>
                            </article>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', items);
            });
        })
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}

barba.hooks.beforeEnter(async () => {
    await iniComponents()
})