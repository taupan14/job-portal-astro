import barba from '@barba/core'
import Splide from '@splidejs/splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

import '@splidejs/splide/dist/css/splide.min.css'

let splideConfig = {
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: false,
    pagination: false,
    waitForTransition: false,
}

// Slide Related Services
const initSlideRelatedService = async () => {
    
    // document.querySelectorAll('[data-slide-services]').forEach((slideEl) => {
    //     const slide = new Splide(slideEl, {
    //         // type: 'loop',
    //         perPage: 3,
    //         perMove: 1,
    //         direction: 'rtl',
    //         gap: 0,
    //         speed: 800,
    //         easing: 'cubic-bezier(0.625,0.05,0,1)',
    //         flickPower: 100,
    //         rewind: true,
    //         ...splideConfig,
    //         updateOnMove: true,
    //         breakpoints: {
    //             768: {
    //                 perPage: 1,
    //                 gap: 16
    //             },
    //         },
    //     })

    //     const updateActiveSlide = () => {
    //         slideEl.querySelectorAll('.splide__slide').forEach((slide) => {
    //             slide.classList.remove('is-active-slide');
    //         });
    //         const activeSlide = slideEl.querySelector('.splide__slide.is-active');
    //         if (activeSlide) {
    //             activeSlide.classList.add('is-active-slide');
    //         }
    //     }

    //     const prevButton = slideEl.querySelector('.btn-splide-prev');
    //     const nextButton = slideEl.querySelector('.btn-splide-next');

    //     const updateArrowStates = () => {
    //         const isFirstSlide = slide.index === 0;
    //         const isLastSlide = slide.index === slide.length - 1;

    //         if (prevButton) {
    //             prevButton.classList.toggle('is-disabled', isFirstSlide);
    //         }
    //         if (nextButton) {
    //             nextButton.classList.toggle('is-disabled', isLastSlide);
    //         }
    //     };

    //     if (prevButton) {
    //         prevButton.addEventListener('click', () => {
    //             slide.go('<');
    //         })
    //     }
    //     if (nextButton) {
    //         nextButton.addEventListener('click', () => {
    //             slide.go('>');
    //         })
    //     }

    //     slide.on('ready', () => updateActiveSlide())
    //     slide.on('active', () => updateActiveSlide())
    //     slide.on('moved', () => updateArrowStates())
    //     slide.on('mounted', () => {
    //         updateActiveSlide()
    //         updateArrowStates()
    //     })

    //     slide.mount()
    //     init.push(slide)
    // })

    const init = []

    document.querySelectorAll('[data-slide-related-services]').forEach((slideEl) => {
        const slide = new Splide(slideEl, {
            // type: 'loop',
            autoWidth: true,
            perMove: 1,
            gap: 16*1.5,
            speed: 800,
            easing: 'cubic-bezier(0.625,0.05,0,1)',
            rewind: true,
            flickPower: 100,
            ...splideConfig,
            breakpoints: {
                768: {
                    perPage: 1,
                    gap: 16
                },
            },
        })

        const prevButton = slideEl.querySelector('.btn-splide-prev')
        const nextButton = slideEl.querySelector('.btn-splide-next')

        let animated = false

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('<');
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('>');
                }
            });
        }

        slide.on('moved', () => { animated = false })

        slide.mount()
        init.push(slide)
    })
    
    return init
}

// Slide Related Services
const initSlideRelatedProduct = async () => {
    const init = []

    document.querySelectorAll('[data-slide-related-products]').forEach((slideEl) => {
        const slide = new Splide(slideEl, {
            // type: 'loop',
            autoWidth: true,
            perMove: 1,
            gap: 16*1.5,
            speed: 800,
            easing: 'cubic-bezier(0.625,0.05,0,1)',
            rewind: true,
            flickPower: 100,
            ...splideConfig,
            breakpoints: {
                768: {
                    perPage: 1,
                    gap: 16
                },
            },
        })

        const prevButton = slideEl.querySelector('.btn-splide-prev')
        const nextButton = slideEl.querySelector('.btn-splide-next')

        let animated = false

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('<');
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('>');
                }
            });
        }

        slide.on('moved', () => { animated = false })

        slide.mount()
        init.push(slide)
    })
    
    return init
}

// Slide Related Blog
const initSlideRelatedBlog = async () => {
    const init = []

    document.querySelectorAll('[data-slide-blog]').forEach((slideEl) => {
        const slide = new Splide(slideEl, {
            // type: 'loop',
            autoWidth: true,
            perMove: 1,
            gap: 16*1.5,
            speed: 800,
            easing: 'cubic-bezier(0.625,0.05,0,1)',
            rewind: true,
            drag: 'free',
            flickPower: 100,
            ...splideConfig,
            breakpoints: {
                768: {
                    perPage: 1,
                    gap: 16
                },
            },
        })

        const prevButton = slideEl.querySelector('.btn-splide-prev')
        const nextButton = slideEl.querySelector('.btn-splide-next')

        let animated = false

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('<');
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('>');
                }
            });
        }

        slide.on('moved', () => { animated = false })

        slide.mount()
        init.push(slide)
    })
    
    return init
}

// Slide Jobs
const initSlideJobs = async () => {
    const init = []
    
    document.querySelectorAll('[data-slide-jobs]').forEach((slideEl) => {
        const slide = new Splide(slideEl, {
            // type: 'loop',
            autoWidth: true,
            perMove: 1,
            gap: 16*1.5,
            speed: 800,
            easing: 'cubic-bezier(0.625,0.05,0,1)',
            flickPower: 100,
            drag: 'free',
            ...splideConfig,
            updateOnMove: true,
            breakpoints: {
                1024: {
                    perPage: 1,
                    gap: 16
                },
            },
        })

        const prevButton = slideEl.querySelector('.btn-splide-prev')
        const nextButton = slideEl.querySelector('.btn-splide-next')

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                slide.go('<');
            })
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                slide.go('>');
            })
        }

        slide.mount()
        init.push(slide)
    })
    
    return init
}

// Slide Employe
const initSlideEmploye = async () => {
    const init = []
    
    document.querySelectorAll('[data-slide-employes]').forEach((slideEl) => {
        const slide = new Splide(slideEl, {
            autoWidth: true,
            perMove: 1,
            gap: 16*1.5,
            type: 'loop',
            autoScroll: {
                pauseOnFocus: false,
                pauseOnHover: false
            },
            drag: false,
            ...splideConfig,
            breakpoints: {
                1024: {
                    gap: 16
                },
            },
        })

        slide.mount({AutoScroll})
        init.push(slide)
    })
    
    return init
}

// Slide Testimony
const initSlideTestimony = async () => {
    const init = []
    
    document.querySelectorAll('#section-testimonials').forEach((testimony) => {
        const testimonyAvatar = testimony.querySelector('[data-slide-testimony-avatar]')
        const testimonyContent = testimony.querySelector('[data-slide-testimony-content]')
        
        const slideAvatar = new Splide(testimonyAvatar, {
            autoWidth: true,
            gap: 0,
            isNavigation: true,
            cover: true,
            drag: false,
            ...splideConfig
        })
        const slideContent = new Splide(testimonyContent, {
            autoWidth: true,
            perMove: 1,
            gap: 16*1.5,
            type: 'loop',
            focus: 'center',
            updateOnMove: true,
            speed: 800,
            easing: 'cubic-bezier(0.625,0.05,0,1)',
            autoplay: true,
            interval: 3000,
            drag: false,
            snap: true,
            ...splideConfig,
            breakpoints: {
                1024: {
                    gap: 16,
                    drag: true
                },
            },
        })

        const updateActiveSlide = () => {
            testimonyAvatar.querySelectorAll('.splide__slide').forEach((slide) => {
                slide.classList.remove('is-active-slide');
            });
            const activeSlide = testimonyAvatar.querySelector('.splide__slide.is-active');
            if (activeSlide) {
                activeSlide.classList.add('is-active-slide');
            }
        }

        slideAvatar.on('ready active mount mounted', () => updateActiveSlide())

        slideAvatar.mount()
        slideContent.mount()
        slideContent.sync(slideAvatar)
        
        init.push(slideAvatar, slideContent)
    })
    
    return init
}

// Slide Product
const initSlideProducts = async () => {
    const init = []
    
    document.querySelectorAll('[data-slide-products]').forEach((slideEl) => {
        const slide = new Splide(slideEl, {
            perPage: 1,
            gap: 16*1.5,
            updateOnMove: true,
            drag: false,
            rewind: true,
            speed: 800,
            easing: 'cubic-bezier(0.625,0.05,0,1)',
            ...splideConfig
        })

        const prevButton = slideEl.querySelector('.btn-splide-prev')
        const nextButton = slideEl.querySelector('.btn-splide-next')

        let animated = false

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('<')
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('>')
                }
            });
        }

        slide.on('moved', () => { animated = false })

        const updateActiveSlide = () => {
            slideEl.querySelectorAll('.splide__slide').forEach((slide) => {
                slide.classList.remove('is-active-slide');
            })
            const activeSlide = slideEl.querySelector('.splide__slide.is-active');
            if (activeSlide) {
                activeSlide.classList.add('is-active-slide');
            }
        }

        slide.on('ready active mount mounted', () => updateActiveSlide())

        slide.mount()

        const slideFraction = slideEl.querySelector('.splide__pagination_fraction')
        const updateSlideFraction = () => {
            slideFraction.innerHTML = `
                <div class="label">${String(slide.index + 1).padStart(2, '0')}</div>
                <div class="line"></div>
                <div class="label">${String(slide.length).padStart(2, '0')}</div>
            `
        }
        updateSlideFraction()
        slide.on('move', updateSlideFraction)
        
        init.push(slide)
    })
    
    return init
}

// Slide Team
const initSlideTeam = async () => {
    const init = []
    
    document.querySelectorAll('[data-slide-teams]').forEach((slideEl) => {
        const slide = new Splide(slideEl, {
            type: 'loop',
            autoWidth: true,
            perPage: 1,
            gap: 16*1.5,
            autoScroll: {
                pauseOnFocus: false,
                pauseOnHover: false
            },
            drag: 'free',
            ...splideConfig,
            breakpoints: {
                1024: {
                    gap: 16
                },
            },
        })

        slide.mount({AutoScroll})
        init.push(slide)
    })
    
    return init
}

// Slide Album
const initSlideAlbum = async () => {
    const init = []

    document.querySelectorAll('[data-slide-album]').forEach((slideEl) => {
        const slide = new Splide(slideEl, {
            // type: 'loop',
            autoWidth: true,
            perMove: 1,
            gap: 16*1.5,
            speed: 800,
            easing: 'cubic-bezier(0.625,0.05,0,1)',
            rewind: true,
            drag: 'free',
            flickPower: 100,
            ...splideConfig,
            breakpoints: {
                1024: {
                    gap: 16
                },
            },
        })

        const prevButton = slideEl.querySelector('.btn-splide-prev')
        const nextButton = slideEl.querySelector('.btn-splide-next')

        let animated = false

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('<');
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (!animated) {
                    animated = true
                    slide.go('>');
                }
            });
        }

        slide.on('moved', () => { animated = false })

        slide.mount()
        init.push(slide)
    })
    
    return init
}

barba.hooks.beforeEnter(async () => {
    await Promise.all([
        initSlideRelatedService(),
        initSlideRelatedProduct(),
        initSlideRelatedBlog(),
        initSlideJobs(),
        initSlideEmploye(),
        initSlideTestimony(),
        initSlideProducts(),
        initSlideTeam(),
        initSlideAlbum(),
    ])
})