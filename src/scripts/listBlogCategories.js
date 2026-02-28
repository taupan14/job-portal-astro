import barba from '@barba/core'

const fetchCategories = async () => {
    try {
        const response = await fetch('./assets/json/list-blog-categories.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const containers = document.querySelectorAll('[data-blog-categories]')
        
        containers.forEach(container => {
            const limit = container.getAttribute('data-blog-categories') || ''
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, '')) : data.length

            data.slice(0, itemsToDisplay).forEach((item, index) => {
                const items = `
                    <li class="${index === 0 ? 'is-active' : ''}">
                        <a href="page-blog.html" class="inline-flex items-baseline gap-1 [.is-active_&]:!text-primary-500 group">
                            <div class="h4 link link-reverse text-dark-600 [--min-size:var(--text-3xl)] [--link-underline:var(--color-primary-600)] group-hover:text-dark-950 [.is-active_&]:text-primary-600 [.is-active_&]:[--link-from:100%]">${item.blog_category}</div>
                            <div class="text-sm font-semibold text-dark-950">${item.blog_total}</div>
                        </a>
                    </li>
                `
                container.insertAdjacentHTML('beforeend', items)
            })
        })
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}

barba.hooks.beforeEnter(async () => {
    await fetchCategories()
})