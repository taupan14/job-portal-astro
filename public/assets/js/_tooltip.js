import barba from '@barba/core'
import gsap from 'gsap'

const initTooltip = async () => {
    const dataTooltips = document.querySelectorAll('[data-tooltip]')
    if (dataTooltips.length > 0) {
        dataTooltips.forEach((tooltipEl, index) => {
            if (!document.getElementById(`tooltip-${index}`)) {
                const tooltipDiv = document.createElement('div')                
                tooltipDiv.id = `tooltip-${index}`
                tooltipDiv.className = `tooltip fixed top-0 left-0 z-50 inline-flex items-center justify-between gap-2 py-1.5 px-3 rounded-lg bg-dark-950 text-white pointer-events-none select-none | not-lg:hidden`

                const tooltipSpan = document.createElement('span')
                tooltipSpan.className = `text-xs font-bold uppercase tracking-wide`

                tooltipDiv.appendChild(tooltipSpan)

                const tooltipText = () => {
                    tooltipSpan.textContent = tooltipEl.getAttribute('data-tooltip')
                } 

                tooltipText()

                document.body.appendChild(tooltipDiv)

                const toolTipDirection = tooltipEl.getAttribute('data-tooltip-placement', '')

                console.log(toolTipDirection);
                

                gsap.set(tooltipDiv, {
                    yPercent: -50,
                    xPercent: toolTipDirection === 'right' ? 10 : -110,
                    clipPath: 'inset(0% 0% 100% 0)',
                    display: 'none'
                })

                let xTo = gsap.quickTo(tooltipDiv, 'x', {duration: 0.5, ease: 'power3.out'}),
                    yTo = gsap.quickTo(tooltipDiv, 'y', {duration: 0.5, ease: 'power3.out'})

                tooltipEl.addEventListener('mouseenter', () => {
                    tooltipText()
                    
                    tooltipDiv.style.display = ''

                    gsap.fromTo(tooltipDiv, {
                        clipPath: 'inset(100% 0% 0% 0%)',
                    }, {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        delay: 0.15,
                        duration: 0.3,
                        ease: 'power3.out',
                    })
                })

                tooltipEl.addEventListener('mouseleave', () => {
                    gsap.fromTo(tooltipDiv, {
                        clipPath: 'inset(0% 0% 0% 0%)',
                    }, {
                        clipPath: 'inset(0% 0% 100% 0%)',
                        delay: 0,
                        duration: 0.3,
                        ease: 'power3.out',
                        onComplete: () => tooltipDiv.style.display = 'none'
                    })
                })

                document.addEventListener('mousemove', (e) => {
                    xTo(e.clientX)
                    yTo(e.clientY)
                })

                tooltipEl.addEventListener('click', () => {
                    tooltipSpan.textContent = tooltipEl.getAttribute('data-tooltip')

                    setTimeout(() => {
                        tooltipText()
                    }, 250);
                })
            }
        })
    }
}

const cleanupTooltips = () => {
    const tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach(tooltip => tooltip.remove())
}

barba.hooks.once(async () => {
    await initTooltip()
})

barba.hooks.beforeEnter(async () => {
    cleanupTooltips()
})

barba.hooks.afterEnter(async () => {
    await initTooltip()
})