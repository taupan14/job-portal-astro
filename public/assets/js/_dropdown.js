import barba from '@barba/core'
import gsap from 'gsap'

import CustomEase from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase) 

CustomEase.create('custom', '0.625,0.05,0,1')

const initDropdown = () => {
    document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
        const dropdownToggle = dropdown.querySelector('[data-dropdown-toggle]')
        const dropdownContent = dropdown.querySelector('[data-dropdown-content]')
        const dropdownState = dropdown.getAttribute('data-dropdown')

        gsap.set(dropdownContent, {
            clipPath: 'inset(0% 0% 100% round 0.5rem)'
        })

        dropdownContent.parentNode.style.pointerEvents = 'none'

        const openDropdown = () => {
            dropdown.classList.add('is-open')
            dropdownContent.parentNode.style.pointerEvents = 'auto'
            gsap.fromTo(dropdownContent, { clipPath: 'inset(0% 0% 100% round 0.5rem)' }, {
                clipPath: 'inset(0% 0% 0% round 0.5rem)',
                duration: 0.5,
                ease: 'custom'
            })
        }

        const closeDropdown = () => {
            dropdown.classList.remove('is-open')
            gsap.fromTo(dropdownContent, { clipPath: 'inset(0% 0% 0% round 0.5rem)' }, {
                clipPath: 'inset(100% 0% 0% round 0.5rem)',
                duration: 0.5,
                ease: 'custom',
                onComplete: () => dropdownContent.parentNode.style.pointerEvents = 'none'
            })
        }

        if (dropdownState === 'toggle') {
            dropdownToggle.addEventListener('click', (event) => {
                event.stopPropagation()
                dropdown.classList.contains('is-open') ? closeDropdown() : openDropdown()
            })
        }

        if (dropdownState === 'hover') {
            dropdown.addEventListener('mouseenter', openDropdown)
            dropdown.addEventListener('mouseleave', closeDropdown)
        }

        document.addEventListener('click', (event) => {
            if (dropdown.classList.contains('is-open') && !dropdown.contains(event.target)) {
                closeDropdown()
            }
        })
    })
}

barba.hooks.beforeEnter(() => {
    setTimeout(() => {
        initDropdown()
    }, 500);   
})