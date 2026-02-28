import barba from '@barba/core'

export const initPagination = async () => {
    const paginationBtn = document.createElement('div')
    paginationBtn.className = 'flex justify-center mt-16'

    paginationBtn.innerHTML = `
        <div class="flex items-center gap-1 bg-dark-100 rounded-lg ring-4 ring-dark-100">
            <a href="#!" class="btn btn-sm btn-icon bg-transparent [--bg-hover:transparent] transition-colors duration-500 ease-custom hover:bg-white [&[disabled]]:hidden" data-hover-effect disabled>
                <svg class="icon icon-stroke icon-left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M4.2,12h16.3"/>
                    <path fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10.6,19.1L3.5,12 l7.1-7.1"/>
                </svg>
            </a>
            <div class="flex items-center gap-1">
                <a href="#!" class="btn btn-sm btn-icon bg-transparent transition-colors duration-500 ease-custom hover:bg-white [&.is-active]:bg-primary-500 [&.is-active]:text-white is-active">
                    <span class="text-[13px] leading-none">1</span>
                </a>
                <a href="#!" class="btn btn-sm btn-icon bg-transparent transition-colors duration-500 ease-custom hover:bg-white [&.is-active]:bg-primary-500 [&.is-active]:text-white">
                    <span class="text-[13px] leading-none">2</span>
                </a>
                <a href="#!" class="btn btn-sm btn-icon bg-transparent transition-colors duration-500 ease-custom hover:bg-white [&.is-active]:bg-primary-500 [&.is-active]:text-white">
                    <span class="text-[13px] leading-none">3</span>
                </a>
                <div class="btn btn-sm btn-icon bg-transparent">
                    <span class="text-[13px] leading-none">...</span>
                </div>
                <a href="#!" class="btn btn-sm btn-icon bg-transparent transition-colors duration-500 ease-custom hover:bg-white [&.is-active]:bg-primary-500 [&.is-active]:text-white">
                    <span class="text-[13px] leading-none">20</span>
                </a>
            </div>
            <a href="#!" class="btn btn-sm btn-icon bg-transparent [--bg-hover:transparent] transition-colors duration-500 ease-custom hover:bg-white [&[disabled]]:hidden" data-hover-effect>
                <svg class="icon icon-stroke icon-right" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M19.8,12H3.5"/>
                    <path fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M13.4,4.9l7.1,7.1 l-7.1,7.1"/>
                </svg>
            </a>
        </div>
    `

    document.querySelectorAll('[data-pagination]').forEach((paginationEl) => {
        paginationEl.appendChild(paginationBtn)
        
        const parent = paginationEl.parentNode
        while (paginationEl.firstChild) {
            parent.insertBefore(paginationEl.firstChild, paginationEl)
        }
        
        paginationEl.remove()
    })
}

barba.hooks.once(() => {
    initPagination()
})

barba.hooks.beforeEnter(() => {
    initPagination()
})
