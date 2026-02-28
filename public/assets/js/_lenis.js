import Lenis from "lenis"
import barba from '@barba/core'

let lenis;

const init = async () => {
    if (lenis) {
        lenis.destroy();
    }

    const config = {
        lerp: 0.1,
        duration: 1,
        wheelMultiplier: 1,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: true,
        autoRaf: true,
        autoResize: true
    }

    lenis = new Lenis(config)

    document.querySelectorAll('[data-lenis]').forEach((dataLenis) => {
        const lenisScroll = dataLenis.querySelector('[data-lenis-scroll]')
        const lenisContent = dataLenis.querySelector('[data-lenis-content]')

        console.log(lenisScroll);
        
        new Lenis({
            wrapper: lenisScroll,
            content: lenisContent,
            ...config
        });
    })
    
    document.querySelectorAll('.accordion-item').forEach((accordionItem) => {
        const header = accordionItem.querySelector('[data-target]')
        const headerHeight = 92

        header.addEventListener('click', () => {
            const isScrollTop = accordionItem.hasAttribute('data-scroll-top')
            const isOpen = accordionItem.classList.contains('is-open')

            console.log(headerHeight);

            if(isScrollTop && !isOpen) {
                setTimeout(() => {
                    const rect = accordionItem.getBoundingClientRect()
                    const elementTop = rect.top + window.scrollY
                    lenis.scrollTo(elementTop - headerHeight)
                }, 500)
            }
        })
    })

    // Scroll Anchor
    const scrollToElements = document.querySelectorAll('[data-scroll-to]')
    const sectionHeader = document.querySelector('#section-header')
    const padding = sectionHeader ? sectionHeader.clientHeight : 0

    scrollToElements.forEach((scrollToEl) => {
        const scrollToId = scrollToEl.getAttribute('data-scroll-to')
        const targetElement = document.getElementById(scrollToId)

        if (targetElement) {
            scrollToEl.addEventListener('click', (event) => {
                event.preventDefault()
                const rect = targetElement.getBoundingClientRect()
                const scrollY = window.scrollY || window.pageYOffset
                const targetPosition = rect.top + scrollY
                const adjustedPosition = targetPosition - padding
                setTimeout(() => {
                    lenis.scrollTo(adjustedPosition)
                }, 100);
            })
        }
    })

    const updateActiveClass = () => {
        let activeElementFound = false;
    
        scrollToElements.forEach((scrollToEl) => {
            const scrollToId = scrollToEl.getAttribute('data-scroll-to');
            const targetElement = document.getElementById(scrollToId);
    
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (!activeElementFound && rect.top >= 0 && rect.top <= windowHeight / 2) {
                    document.querySelectorAll(`[data-scroll-to="${scrollToId}"]`).forEach((el) => {
                        
                        el.parentElement.classList.add('is-active');
                        el.querySelectorAll('span').forEach((span) => {
                            span.classList.add('text-[var(--text-hover)]');
                        });
                    });
                    activeElementFound = true;
                } else {
                    scrollToEl.parentElement.classList.remove('is-active');
                    activeElementFound = false;
                }
            }
        });
    };
    

    window.addEventListener('scroll', updateActiveClass)
    updateActiveClass()
}

barba.hooks.once(async () => {
    await init()
})

barba.hooks.beforeEnter(async () => {
    if (lenis) {
        lenis.destroy()
    }
})

barba.hooks.enter(async () => {
    await init()   
})