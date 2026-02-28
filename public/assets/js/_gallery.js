import barba from '@barba/core'
import lightGallery from 'lightgallery'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

import 'lightgallery/css/lightgallery-bundle.css'


// Custom SVG icons
const closeIcon = `<svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const downloadIcon = `<svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 21C9.20998 16.2487 13.9412 9.9475 21 14.6734" stroke="#141B34" stroke-width="1.5"/>
    <path d="M14 3.00231C13.5299 3 12.0307 3 11.5 3C7.02166 3 4.78249 3 3.39124 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39124 20.6088C4.78249 22 7.02166 22 11.5 22C15.9783 22 18.2175 22 19.6088 20.6088C20.9472 19.2703 20.998 17.147 20.9999 13" stroke="#141B34" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M17 7.5C17.4915 8.0057 18.7998 10 19.5 10M22 7.5C21.5085 8.0057 20.2002 10 19.5 10M19.5 10V2" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const zoomInIcon = `<svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 17.5L22 22" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M7.5 11L14.5 11M11 7.5V14.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const zoomOutIcon = `<svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 17.5L22 22" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M7.5 11H14.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const zoomActualIcon = `<svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00001 3.09779C8.00001 3.09779 4.03375 2.74194 3.38784 3.38785C2.74192 4.03375 3.09784 8 3.09784 8" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.00001 20.9022C8.00001 20.9022 4.03375 21.2581 3.38784 20.6122C2.74192 19.9662 3.09784 16 3.09784 16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 3.09779C16 3.09779 19.9663 2.74194 20.6122 3.38785C21.2581 4.03375 20.9022 8 20.9022 8" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 20.9022C16 20.9022 19.9663 21.2581 20.6122 20.6122C21.2581 19.9662 20.9022 16 20.9022 16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.0108 9.99847L20.0625 3.94678" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.99696 14.0024L3.63966 20.3807" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.99733 10.0024L3.84571 3.85889" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.9795 14.0024L20.5279 20.4983" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const prevIcon = `<svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M4.2,12h16.3"/>
    <path fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10.6,19.1L3.5,12 l7.1-7.1"/>
</svg>`
const nextIcon = `<svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M19.8,12H3.5"/>
    <path fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M13.4,4.9l7.1,7.1 l-7.1,7.1"/>
</svg>`
     

let galleryInstances = []
let galleryInitialized = false
let iconsInserted = false

const initGallery = () => {
    document.querySelectorAll('[data-gallery]').forEach((galleryEl) => {
        const instance = lightGallery(galleryEl, {
            plugins: [lgVideo, lgZoom],
            selector: '[data-gallery-item]',
            zoomFromOrigin: false,
            download: false,
            getCaptionFromTitleOrAlt: false,
            // infiniteZoom: true,
            // showZoomInOutIcons: true,
            actualSize: false,
            actualSizeIcons: {zoomIn: 'lg-zoom-actual',zoomOut: 'lg-zoom-actual'},
            mobileSettings: {
                showCloseIcon: true,
                controls: true
            }
        })
        galleryInstances.push(instance) // Store the instance
    })
}

const initGalleries = () => {
    if (!galleryInitialized) {
        initGallery()
        galleryInitialized = true
    }

    if (!iconsInserted) {
        const lgCloseIcon = document.querySelectorAll('.lg-close')
        const lgZoomInIcon = document.querySelectorAll('.lg-zoom-in')
        const lgZoomOutIcon = document.querySelectorAll('.lg-zoom-out')
        const lgZoomActualIcon = document.querySelectorAll('.lg-zoom-actual')
        const lgDownloadIcon = document.querySelectorAll('.lg-download')
        const lgPrevIcon = document.querySelectorAll('.lg-prev')
        const lgNextIcon = document.querySelectorAll('.lg-next')

        lgCloseIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', closeIcon)
        })
        lgZoomInIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', zoomInIcon)
        })
        lgZoomOutIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', zoomOutIcon)
        })
        lgZoomActualIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', zoomActualIcon)
        })
        lgDownloadIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', downloadIcon)
        })
        lgPrevIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', prevIcon)
        })
        lgNextIcon.forEach((icon) => {
            icon.insertAdjacentHTML('beforeend', nextIcon)
        })

        iconsInserted = true
    }
}

const destroyGalleries = () => {
    if (galleryInitialized) {
        galleryInstances.forEach((instance) => {
            instance.destroy()
        })
        galleryInstances = []
    }

    galleryInitialized = false
    iconsInserted = false
}

barba.hooks.once(() => {
    initGalleries()
})

barba.hooks.beforeEnter(() => {
    initGalleries()
})

barba.hooks.afterLeave(() => {
    destroyGalleries()
})