import barba from '@barba/core'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase) 

CustomEase.create('custom', '0.625,0.05,0,1')

const initTab = async () => {
    document.querySelectorAll('[data-slider]').forEach((sliderEl) => {
        const sliderNav = sliderEl.querySelectorAll('[data-slider-nav]')
        const sliderDiv = document.createElement('div')
    
        sliderDiv.className = 'slider-bg absolute bottom-0 left-0 h-px bg-[var(--bg-slider,var(--color-primary-600))] rounded-full -z-1 pointer-events-none'
        sliderEl.appendChild(sliderDiv)
    
        const sliderBg = sliderEl.querySelector('.slider-bg')
    
        sliderNav.forEach((nav) => {
            nav.addEventListener('click', () => {
                if (nav.classList.contains('is-active')) {
                    return
                }
    
                sliderNav.forEach(el => el.classList.remove('is-active'))
                nav.classList.add('is-active')
    
                const {offsetLeft, offsetWidth} = nav
                gsap.to(sliderBg, {
                    x: offsetLeft,
                    width: offsetWidth,
                    duration: 0.5,
                    ease: 'custom'
                })
            })
        })
    
        
        const activeEl = sliderEl.querySelector('[data-slider-nav].is-active')
        if (activeEl) {
            const {offsetLeft, offsetWidth} = activeEl
            sliderBg.style.width = `${offsetWidth}px`
            sliderBg.style.transform = `translateX(${offsetLeft}px)`
        }
    })
    
    document.querySelectorAll('[data-tabs]').forEach((tabs) => {
        const tabScroll = tabs.querySelector('[data-tab-scroll]')
        const navTab = tabs.querySelectorAll('[data-tab-target]')
        const contentTab = tabs.querySelectorAll('[data-tab-content]')

        navTab.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tabTarget

                navTab.forEach(t => t.classList.remove('is-active'))
                contentTab.forEach(content => {
                    content.classList.remove('is-active')
                    content.setAttribute('aria-hidden', 'true')
                })

                tab.classList.add('is-active')
                contentTab.forEach(content => {
                    if (content.id === target) {
                        content.classList.add('is-active')
                        content.setAttribute('aria-hidden', 'false')
                    }
                })

                if (tabScroll) {
                    const activeTab = tabs.querySelector('[data-tab-target].is-active')
                    if (activeTab) {
                        const containerWidth = tabScroll.clientWidth
                        const tabWidth = activeTab.clientWidth
                        const tabOffsetLeft = activeTab.offsetLeft

                        const scrollLeft = tabOffsetLeft - (containerWidth / 2) + (tabWidth / 2)
                        tabScroll.scrollTo({
                            left: scrollLeft,
                            behavior: 'smooth'
                        })
                    }
                }
            })
        })
    })    
}

barba.hooks.once(async () => {
    await initTab()
})
barba.hooks.enter(async () => {
    await initTab()
})