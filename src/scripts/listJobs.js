import barba from '@barba/core'

const iniComponents = async () => {
    try {
        const response = await fetch('/assets/json/list-jobs.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const containers = document.querySelectorAll('[data-jobs]')
        
        containers.forEach(container => {
            const limit = container.getAttribute('data-jobs') || ''
            const itemsToDisplay = limit ? Math.min(data.length, parseInt(limit, '')) : data.length

            data.slice(0, itemsToDisplay).forEach((item, index) => {
                const initImgLogo = (imageLogo) => {
                    if (!imageLogo?.logo) {
                        return `
                            <svg class="icon icon-fill size-5 text-dark-950" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6125 11.6035L15.4631 10.9587L16.0378 9.04305L18.1872 9.68787C18.2044 9.69303 18.2215 9.69817 18.2386 9.7033C18.8812 9.89603 19.4436 10.0647 19.8902 10.2574C20.3727 10.4655 20.8164 10.74 21.1573 11.1981C21.4982 11.6563 21.6336 12.1602 21.6943 12.6822C21.7505 13.1652 21.7505 13.7524 21.7504 14.4233L21.7504 22.0009H19.7504V14.477C19.7504 13.7366 19.7489 13.267 19.7077 12.9133C19.6696 12.5855 19.6073 12.4653 19.5527 12.392C19.4982 12.3187 19.4009 12.2245 19.098 12.0938C18.771 11.9527 18.3216 11.8163 17.6125 11.6035Z" fill="#141B34"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3292 3.46341C13.9961 3.65696 14.5602 3.82069 15.0046 4.01016C15.4784 4.21221 15.888 4.47174 16.199 4.89716C16.5082 5.3201 16.6358 5.7919 16.6946 6.31017C16.7502 6.80094 16.7502 7.40489 16.7502 8.12649V8.12652V22.0002C16.7502 22.4144 16.4144 22.7502 16.0002 22.7502H3.00019C2.58597 22.7502 2.25018 22.4144 2.25018 22.0002L2.25018 6.65904V6.65902V6.659C2.25016 5.45328 2.25014 4.46853 2.35635 3.71083C2.46632 2.92626 2.70926 2.22577 3.32744 1.7391C3.95235 1.24713 4.68464 1.19025 5.45696 1.29365C6.19444 1.39238 7.11291 1.65901 8.22733 1.98252L8.22737 1.98253L13.3292 3.4634L13.3292 3.46341ZM7.25019 8.00008C7.25019 7.58587 7.58597 7.25008 8.00019 7.25008L11.0002 7.25008C11.4144 7.25008 11.7502 7.58587 11.7502 8.00008C11.7502 8.4143 11.4144 8.75008 11.0002 8.75008L8.00019 8.75008C7.58597 8.75008 7.25019 8.4143 7.25019 8.00008ZM7.25019 12.0001C7.25019 11.5859 7.58597 11.2501 8.00019 11.2501L11.0002 11.2501C11.4144 11.2501 11.7502 11.5859 11.7502 12.0001C11.7502 12.4143 11.4144 12.7501 11.0002 12.7501L8.00019 12.7501C7.58597 12.7501 7.25019 12.4143 7.25019 12.0001ZM9.00019 15.2501L8.95544 15.2501C8.52263 15.25 8.1258 15.25 7.80298 15.2934C7.4475 15.3412 7.07178 15.4536 6.76276 15.7627C6.45373 16.0717 6.34128 16.4474 6.29349 16.8029C6.25009 17.1257 6.25014 17.5225 6.25019 17.9553V17.9553L6.25019 22.0001H7.75019L7.75019 18.0001C7.75019 17.5075 7.75178 17.2135 7.78012 17.0028C7.79141 16.9187 7.8187 16.857 7.8315 16.828C7.83341 16.8237 7.83499 16.8201 7.83616 16.8172C7.85794 16.8083 7.9063 16.793 8.00286 16.78C8.21358 16.7517 8.50759 16.7501 9.00019 16.7501H10.0002C10.4928 16.7501 10.7868 16.7517 10.9975 16.78C11.0815 16.7913 11.1433 16.8186 11.1723 16.8314C11.1766 16.8333 11.1802 16.8349 11.183 16.8361C11.192 16.8578 11.2073 16.9062 11.2203 17.0028C11.2486 17.2135 11.2502 17.5075 11.2502 18.0001V22.0001H12.7502L12.7502 17.9553V17.9553C12.7502 17.5225 12.7503 17.1257 12.7069 16.8029C12.6591 16.4474 12.5467 16.0717 12.2376 15.7627C11.9286 15.4536 11.5529 15.3412 11.1974 15.2934C10.8746 15.25 10.4778 15.25 10.0449 15.2501L10.0002 15.2501H9.00019Z" fill="#141B34"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.00018 21.7501C1.00018 21.1978 1.4479 20.7501 2.00018 20.7501L22.0002 20.7501C22.5525 20.7501 23.0002 21.1978 23.0002 21.7501C23.0002 22.3024 22.5525 22.7501 22.0002 22.7501L2.00018 22.7501C1.4479 22.7501 1.00018 22.3024 1.00018 21.7501Z" fill="#141B34"/>
                            </svg>
                        `;
                    }
                    return `
                        <picture>
                            <source type="image/webp" srcset="${item.logo} 200w, ${item.logo} 400w" sizes="100vw">
                            <img data-src="${item.logo}" srcset="${item.logo} 200w, ${item.logo} 400w" sizes="100vw" loading="lazy" decoding="async" alt="${item.job_company}" class="size-full object-contain">
                        </picture>
                    `
                }

                const items = `
                    <div class="relative isolate flex flex-col bg-dark-50 ring-inset ring-1 ring-dark-200 rounded-lg overflow-clip | lg:h-full" data-hover-group>
                        <div class="relative flex flex-col items-start gap-4 px-4 | lg:px-6">
                            <div class="w-full flex items-start justify-end">
                                <div class="badge rounded-t-none ${item.job_type === 'Full Time' ? 'badge-primary' : item.job_type === 'Freelance' ? 'badge-dark' : 'badge-default'}"><span>${item.job_type}</span></div>
                            </div>
                            <div class="w-full flex flex-col items-start gap-1">
                                <div class="w-full text-sm font-medium truncate text-primary-600">${item.job_category}</div>
                                <h5 class="text-balance tracking-normal line-clamp-2">${item.job_title}</h5>
                            </div>
                        </div>
                        <div class="px-4 py-6 | lg:px-6">
                            <p class="text-sm font-medium line-clamp-3">${item.job_about}</p>
                        </div>
                        <div class="flex flex-col mt-auto">
                            <div class="flex flex-col divide-y divide-dark-200 p-4 | lg:p-6">
                                <div class="flex items-baseline justify-between gap-4 pt-6 pb-3 first:pt-0 last:pb-0">
                                    <div class="h6 text-dark-400 shrink-0">Sallary</div>
                                    <div class="text-sm font-semibold text-dark-950 basis-2/3 text-end">${item.job_sallary}</div>
                                </div>
                                <div class="flex items-baseline justify-between gap-4 pt-6 pb-3 first:pt-0 last:pb-0">
                                    <div class="h6 text-dark-400 shrink-0">Lokasi</div>
                                    <div class="text-sm font-semibold text-dark-950 basis-2/3 text-end">${item.job_location}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-4 p-4 bg-dark-100 rounded-lg | lg:p-6">
                                <div class="grow flex items-center gap-4">
                                    <div class="avatar">
                                        ${initImgLogo(item)}                                   
                                    </div>
                                    <div class="grow flex flex-col gap-1">
                                        <div class="text-sm font-semibold text-dark-950 truncate">${item.job_company}</div>
                                        <div class="h6 truncate">${item.job_location}</div>
                                    </div>
                                </div>
                                <button type="btn" class="btn btn-icon btn-like transition-colors duration-800 ease-custom [&.is-liked]:bg-primary-600 z-10" data-tooltip="Like">
                                    <div class="flex flex-col size-4.5 overflow-clip [.is-liked_&>*]:-translate-y-full">
                                        <svg class="icon icon-stroke transition-transform duration-800 ease-custom" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                        <svg class="icon icon-fill text-white transition-transform duration-800 ease-custom" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.1449 3.35515C7.12587 1.52662 9.8001 2.25537 11.4156 3.46861C11.6814 3.6682 11.8638 3.8048 11.9996 3.89704C12.1354 3.8048 12.3178 3.6682 12.5836 3.46861C14.1991 2.25537 16.8734 1.52662 19.8543 3.35515C21.9156 4.61952 23.0754 7.2606 22.6684 10.2951C22.2595 13.3443 20.2859 16.7929 16.1063 19.8865C14.6549 20.9614 13.5897 21.7503 11.9996 21.7503C10.4095 21.7503 9.34433 20.9614 7.89294 19.8865C3.71334 16.7929 1.73976 13.3443 1.33081 10.2951C0.923824 7.2606 2.08365 4.61952 4.1449 3.35515Z" fill="#141B34"/>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <a href="page-jobs-detail.html" class="block absolute inset-0"></a>
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