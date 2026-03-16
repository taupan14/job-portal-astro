import barba from "@barba/core";
import { initLogoutModal, handleLogout } from "../lib/logout";
import { initLoginModal } from "@scripts/form/_login.js";

export const initSectionHeader = async () => {
  const sectionHeader = document.createElement("header");

  sectionHeader.id = "section-header";
  sectionHeader.className =
    "fixed isolate inset-x-0 top-0 overflow-x-clip border-t-4 border-primary-600 z-50";

  sectionHeader.innerHTML = `
        <div class="max-container">
            <nav id="nav-header" class="relative isolate flex gap-[clamp(1rem,3vw,calc(var(--spacing)*12))] items-center py-3 transition-all duration-800 ease-custom z-10 | lg:grid lg:grid-cols-8 lg:py-6 lg:gap-0 lg:[.is-sticky_&]:py-3">
                <button type="button" aria-label="MobileMenu" id="burger-menu" class="relative flex py-3 | lg:hidden">
                    <div class="flex w-6 h-3.5 flex-col items-start justify-center space-y-1 transition-all duration-500 ease-custom [.is-active-menu_&]:-space-y-0.5">
                        <div class="w-full bg-dark-950 [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&,.is-active-menu_&)]:bg-white rounded-full h-0.5 transition-all duration-500 ease-custom rotate-0 origin-center [.is-active-menu_&]:rotate-45"></div>
                        <div class="w-full bg-dark-950 [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&,.is-active-menu_&)]:bg-white rounded-full h-0.5 transition-all duration-500 ease-custom opacity-100 [.is-active-menu_&]:opacity-0"></div>
                        <div class="w-full bg-dark-950 [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&,.is-active-menu_&)]:bg-white rounded-full h-0.5 transition-all duration-500 ease-custom rotate-0 origin-center [.is-active-menu_&]:-rotate-45"></div>
                    </div>
                </button>
                <div class="col-span-full | not-lg:absolute not-lg:inset-0 not-lg:size-min not-lg:m-auto | lg:col-span-2">
                    <a href="/" data-barba-navigate="/" class="flex items-center flex-nowrap gap-3 w-min">
                        <div class="size-9 shrink-0 | lg:size-11">
                            <img src="/assets/images/logo/logo-icon.png" alt="RUN8" class="size-full object-contain">
                        </div>
                        <div class="flex flex-col leading-none uppercase font-extrabold whitespace-nowrap text-dark-950 transition-colors duration-800 ease-custom | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&,.is-active-menu_&)]:text-white | not-lg:text-sm">
                            <div>Radar Utama</div>
                            <div>Nusantara</div>
                        </div>
                    </a>
                </div>
                
                <div class="col-span-full | not-lg:hidden | lg:col-span-4">
                    <ul class="flex items-center justify-between">
                        <li data-barba-active>
                            <a href="page-about.html" class="flex text-sm font-bold uppercase tracking-wide link link-reverse [--link-underline:var(--color-primary-600)] [.is-active_&]:[--link-from:100%] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover) | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:text-white [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--link-underline:white] [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--text-hover:white]" data-hover-effect>
                                Tentang Kami
                            </a>
                        </li>
                        <li data-menu data-barba-active data-hover-group>
                            <a href="javascript:;" class="flex text-sm font-bold uppercase tracking-wide link link-reverse [--link-underline:var(--color-primary-600)] [.is-active_&]:[--link-from:100%] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover) | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:text-white [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--link-underline:white] [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--text-hover:white]" data-hover-effect>
                                Service
                            </a>
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-dvw pointer-events-none drop-shadow-[0_0_3rem_rgba(0,0,0,0.3)] -z-1">
                                <div class="relative pt-(--space-header) bg-white pointer-events-auto" data-submenu>
                                    <div class="pt-8 pb-16">
                                        <div class="max-container">
                                            <div class="grid gap-8 | lg:grid-cols-8 lg:gap-0">
                                                <div class="col-span-full | lg:col-span-2">
                                                    <div class="flex flex-col gap-4 pr-16">
                                                        <div class="h5 text-dark-950">Service Kami</div>
                                                        <p class="text-sm font-medium text-dark-400">Kami menawarkan solusi inovatif untuk efisiensi bisnis dan pekerjaan. Dengan teknologi, kami memudahkan proses, menghemat waktu, dan meningkatkan produktivitas.</p>
                                                    </div>
                                                </div>
                                                <div class="col-span-full | lg:col-span-4">
                                                    <ul class="grid gap-8 grid-cols-2 | lg:gap-x-16">
                                                        <li data-nav-submenu>
                                                            <a href="page-service-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g opacity="0.4">
                                                                        <path d="M21.5645 8.78101C21.3266 8.51907 21.0305 8.43478 20.8006 8.40239C20.605 8.37482 20.3718 8.37492 20.1562 8.37501L11.1251 8.37502C10.7109 8.37502 10.3751 8.71081 10.3751 9.12502V11.775C10.3751 12.0578 10.3751 12.1993 10.4629 12.2871C10.5508 12.375 10.6922 12.375 10.9751 12.375H21.1296C21.3935 12.375 21.5255 12.375 21.6118 12.295C21.6981 12.2149 21.708 12.0833 21.7279 11.8201L21.8485 10.2222C21.8652 10.002 21.8829 9.76789 21.8711 9.57003C21.8575 9.34129 21.8003 9.04057 21.5645 8.78101Z" fill="#141B34"/>
                                                                        <path d="M21.5242 14.5201C21.547 14.2181 21.5583 14.067 21.4693 13.971C21.3803 13.875 21.2288 13.875 20.9259 13.875H10.9751C10.6922 13.875 10.5508 13.875 10.4629 13.9629C10.3751 14.0507 10.3751 14.1922 10.3751 14.475V14.4887C10.3751 15.369 10.3732 15.9464 10.3099 16.374C10.2511 16.7721 10.1531 16.9299 10.0348 17.0375C9.93404 17.1291 9.77767 17.2147 9.46862 17.276C9.14791 17.3396 8.71988 17.3665 8.11444 17.3751C7.90759 17.378 7.71114 17.4663 7.57155 17.6189C7.43197 17.7716 7.36164 17.9752 7.3772 18.1815C7.3912 18.3669 7.39802 18.5664 7.40578 18.793C7.40842 18.8703 7.41118 18.9507 7.41436 19.0349C7.42638 19.3526 7.44427 19.7061 7.48945 20.0581C7.5766 20.7371 7.78088 21.5573 8.39582 22.1378C8.83609 22.5535 9.36707 22.7243 9.95199 22.8019C10.503 22.8751 11.1912 22.8751 12.0102 22.875H16.6149C17.4339 22.8751 18.1221 22.8751 18.6731 22.8019C19.258 22.7243 19.789 22.5535 20.2293 22.1378C20.6677 21.7239 20.8728 21.2024 20.9923 20.6202C21.1055 20.0685 21.1581 19.3715 21.2211 18.537L21.5242 14.5201Z" fill="#141B34"/>
                                                                        </g>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.12507 14.129L2.12507 14.5579C2.125 15.3555 2.12493 16.0612 2.20905 16.63C2.30141 17.2545 2.51258 17.8546 3.03818 18.3324C3.55017 18.7979 4.16997 18.9729 4.8092 19.0511C5.41486 19.1251 6.17333 19.1251 7.06391 19.125H7.18623C8.07681 19.1251 8.83528 19.1251 9.44093 19.0511C10.0802 18.9729 10.7 18.7979 11.212 18.3324C11.7376 17.8546 11.9487 17.2545 12.0411 16.63C12.1252 16.0612 12.1251 15.3556 12.1251 14.5579L12.1251 8.99575C12.1253 8.81719 12.1255 8.58831 12.096 8.38906C12.0586 8.13591 11.9572 7.79634 11.6513 7.51822C11.359 7.25247 11.0258 7.17726 10.795 7.14905C10.5966 7.1248 10.3645 7.12491 10.1629 7.12501L9.05989 7.12502C7.70111 7.125 6.58972 7.12498 5.71193 7.23226C4.80039 7.34368 3.98951 7.58531 3.33108 8.18389C2.65903 8.79484 2.37463 9.56867 2.24566 10.4407C2.12498 11.2568 2.12502 12.2829 2.12507 13.5045L2.12507 14.121L2.12506 14.125L2.12507 14.129ZM9.52507 13.125C9.80791 13.125 9.94933 13.125 10.0372 13.0371C10.1251 12.9493 10.1251 12.8078 10.1251 12.525V9.72503C10.1251 9.44218 10.1251 9.30076 10.0372 9.21289C9.94933 9.12503 9.80791 9.12503 9.52507 9.12503H9.12507C7.6851 9.12503 6.69667 9.12679 5.95457 9.21749C5.23224 9.30578 4.89666 9.46355 4.67642 9.66377C4.46979 9.85161 4.31485 10.12 4.22414 10.7333C4.15609 11.1935 4.13475 11.7652 4.12808 12.5239C4.1256 12.8062 4.12436 12.9474 4.21238 13.0362C4.30041 13.125 4.44237 13.125 4.72629 13.125H9.52507ZM10.112 15.7292C10.1225 15.4489 10.1278 15.3088 10.0393 15.2169C9.95076 15.125 9.80692 15.125 9.51925 15.125H4.73089C4.44321 15.125 4.29938 15.125 4.21088 15.2169C4.12238 15.3088 4.12764 15.4489 4.13817 15.7292C4.14713 15.968 4.16221 16.1662 4.18753 16.3374C4.24162 16.7032 4.32335 16.7978 4.38353 16.8526C4.45732 16.9196 4.60182 17.0108 5.05185 17.0658C5.52163 17.1233 6.1565 17.125 7.12507 17.125C8.09364 17.125 8.72851 17.1233 9.19829 17.0658C9.64831 17.0108 9.79281 16.9196 9.86661 16.8526C9.92679 16.7978 10.0085 16.7032 10.0626 16.3374C10.0879 16.1662 10.103 15.968 10.112 15.7292Z" fill="#141B34"/>
                                                                        <path d="M14.0998 1.125C12.467 1.125 11.047 1.96882 10.0209 3.21824C8.99644 4.46571 8.32191 6.15821 8.13043 8.02285C8.07401 8.57224 8.47365 9.06335 9.02305 9.11977C9.57244 9.17619 10.0636 8.77655 10.12 8.22715C10.2768 6.6995 10.8237 5.392 11.5665 4.48754C12.3077 3.58503 13.2007 3.125 14.0998 3.125C15.083 3.125 16.0655 3.67834 16.8409 4.75844C17.5024 5.67975 17.9709 6.93832 18.0935 8.37501L20.0993 8.37501C19.9725 6.54667 19.3857 4.87371 18.4656 3.59206C17.4222 2.13866 15.892 1.125 14.0998 1.125Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Cleaning Service</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Perusahaan kami telah dipercaya untuk pengadaan Jasa Alihdaya Cleaning</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-service-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M8.25 6.25013C8.25 5.94617 8.25 5.79419 8.32601 5.67259C8.40202 5.55098 8.53863 5.48439 8.81186 5.35122L15.1701 2.25213C16.8246 1.44574 17.6518 1.04254 18.5741 1.35681C19.4964 1.67109 19.8129 2.34544 20.4461 3.69416C22.1846 7.39773 22.1846 11.6023 20.4461 15.3058C19.8129 16.6546 19.4964 17.3289 18.5741 17.6432C17.6518 17.9575 16.8246 17.5543 15.1701 16.7479L8.81186 13.6488C8.53863 13.5156 8.40202 13.449 8.32601 13.3274C8.25 13.2058 8.25 13.0538 8.25 12.7499L8.25 6.25013Z" fill="#141B34"/>
                                                                        <path d="M6.75 6.57769C6.75 6.50442 6.75 6.46778 6.7485 6.44846C6.73013 6.21185 6.62495 6.08005 6.3983 6.00966C6.3798 6.00391 6.32369 5.99115 6.21148 5.96562C5.81616 5.87571 5.61835 5.83071 5.45916 5.81226C3.48222 5.58303 2.25 7.17177 2.25 8.99869V10.0013C2.25 11.8282 3.48222 13.417 5.45916 13.1877C5.61835 13.1693 5.81606 13.1243 6.21136 13.0344C6.32367 13.0089 6.37983 12.9961 6.39837 12.9903C6.62494 12.9199 6.73009 12.7882 6.74849 12.5516C6.75 12.5323 6.75 12.4956 6.75 12.4222L6.75 6.57769Z" fill="#141B34"/>
                                                                        <path opacity="0.4" d="M9.91624 15.9033C10.3623 16.6113 10.9223 17.1232 11.6033 17.5693C12.8574 18.3907 13.2525 20.2631 11.9346 21.3493L10.4433 22.5784C10.1704 22.8033 9.77737 22.807 9.50025 22.5872C7.76024 21.2072 6.87686 20.0933 6.50219 18.5783C6.32275 17.8528 6.26814 17.0682 6.25385 16.1787C6.24665 15.7305 6.25085 15.1153 6.25593 14.5413C6.25715 14.4029 6.35339 14.2836 6.48834 14.2529C6.81637 14.1783 7.11787 14.2135 7.41494 14.3583L9.48067 15.3651C9.56867 15.408 9.61268 15.4295 9.64628 15.4614C9.67989 15.4934 9.70534 15.5396 9.75623 15.6319C9.80817 15.7261 9.86154 15.8165 9.91624 15.9033Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Sales</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Kami memiliki solusi untuk pemasaran produk anda dengan menggunakan Jasa Alihdaya Sales</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-service-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 8C1 7.44772 1.44772 7 2 7H8C8.55228 7 9 7.44772 9 8C9 8.55228 8.55228 9 8 9H2C1.44772 9 1 8.55228 1 8ZM1 11C1 10.4477 1.44772 10 2 10H6C6.55228 10 7 10.4477 7 11C7 11.5523 6.55228 12 6 12H2C1.44772 12 1 11.5523 1 11Z" fill="#141B34"/>
                                                                        <path opacity="0.4" d="M10.4482 3.25003C11.4314 3.24965 12.103 3.24938 12.6706 3.43372C13.5142 3.70769 14.2234 4.26737 14.6863 5.00109L16.134 5.00109H16.134C16.8222 5.00106 17.4116 5.00104 17.9006 5.05039C18.4232 5.10314 18.912 5.21811 19.3785 5.49659C19.845 5.77507 20.178 6.15069 20.4723 6.58564C20.7476 6.99257 21.027 7.51122 21.3532 8.11683L22.6535 10.5304C22.7327 10.6774 22.7714 10.8354 22.7733 10.9916L22.7734 11.0049V13.0599C22.7735 14.1934 22.7735 15.1197 22.6751 15.851C22.5723 16.6154 22.3497 17.2782 21.8204 17.8072C21.6205 18.007 21.401 18.1634 21.1634 18.2863C21.0702 18.3345 21.0236 18.3586 20.9789 18.3602C20.8998 18.3632 20.8239 18.317 20.7902 18.2455C20.7712 18.205 20.7712 18.1398 20.7712 18.0093C20.7712 15.9369 19.0903 14.257 17.0168 14.257C14.9434 14.257 13.2625 15.9369 13.2625 18.0093C13.2625 18.0955 13.2654 18.181 13.2711 18.2658V18.2658C13.2873 18.5048 13.2953 18.6242 13.2357 18.6878C13.176 18.7513 13.0656 18.7508 12.8449 18.7498H12.8449L11.1734 18.7421C10.9552 18.7411 10.8461 18.7406 10.7871 18.6773C10.728 18.614 10.7358 18.4959 10.7514 18.2596C10.7569 18.1769 10.7596 18.0934 10.7596 18.0093C10.7596 15.9369 9.07875 14.257 7.00529 14.257C4.93184 14.257 3.25097 15.9369 3.25097 18.0093C3.25097 18.1398 3.25097 18.205 3.23189 18.2455C3.19819 18.3171 3.12233 18.3632 3.04328 18.3603C2.99852 18.3586 2.95192 18.3345 2.85873 18.2863C2.6211 18.1635 2.40157 18.007 2.20164 17.8072C1.49997 17.1059 1.33294 16.1633 1.27715 15.0447C1.27656 15.0329 1.27625 15.0211 1.27622 15.0092L1.27354 13.9403C1.27295 13.7047 1.27266 13.5869 1.33693 13.5273C1.4012 13.4677 1.53518 13.4781 1.80315 13.4989C1.86795 13.5039 1.93344 13.5065 1.99953 13.5065H6.00414C7.38645 13.5065 8.50702 12.3865 8.50702 11.005C8.50702 10.7612 8.50702 10.6393 8.53496 10.5792C8.55271 10.541 8.5573 10.5341 8.58574 10.503C8.63051 10.4541 8.74348 10.407 8.96941 10.3128C9.87373 9.93572 10.5093 9.04359 10.5093 8.00309C10.5093 6.62152 9.38875 5.50154 8.00645 5.50154H1.99953C1.78739 5.50154 1.68132 5.50154 1.62782 5.46126C1.58985 5.43267 1.5652 5.39531 1.55386 5.34917C1.53787 5.28416 1.57122 5.20635 1.63791 5.05071C1.77065 4.74095 1.95294 4.45804 2.20504 4.20545C2.73465 3.67479 3.39891 3.45171 4.1652 3.34864C4.89835 3.25003 5.82721 3.25005 6.96399 3.25007L10.4482 3.25003Z" fill="#141B34"/>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5617 10.2521C19.8609 10.2521 20.0105 10.2521 20.0688 10.1546C20.1271 10.0571 20.0561 9.92541 19.9143 9.66208L19.6141 9.10491C19.2592 8.44621 19.027 8.01767 18.815 7.70432C18.6157 7.40969 18.4796 7.28781 18.3532 7.21236C18.2268 7.13691 18.0549 7.07491 17.7008 7.03918C17.3243 7.00118 16.8367 7 16.0881 7H15.6709C15.4759 7 15.3784 7 15.3196 7.05952C15.2608 7.11904 15.262 7.21816 15.2646 7.41639C15.2671 7.61523 15.2668 7.81413 15.2664 8.01298L15.2662 8.20081C15.2662 9.0042 15.2755 9.22791 15.3275 9.38782C15.4512 9.7686 15.7499 10.0671 16.1309 10.1909C16.2909 10.2428 16.5148 10.2521 17.3186 10.2521H19.5617Z" fill="#141B34"/>
                                                                        <circle cx="17" cy="18" r="2.5" fill="#141B34"/>
                                                                        <circle cx="7" cy="18" r="2.5" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Kurir</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Perusahaan kami telah dipercaya banyak perusahaan dalam pengadaan SDM Kurir</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-service-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" d="M14.451 5.88138C14.9426 5.91189 15.368 5.97567 15.7706 6.12583C16.9527 6.56676 17.8852 7.49923 18.3261 8.68139C18.4763 9.08398 18.5401 9.50938 18.5706 10.001C18.6004 10.4813 18.6004 11.0722 18.6004 11.8133L18.6004 15.1516C18.6004 18.7966 15.6455 21.7516 12.0004 21.7516C8.35531 21.7516 5.40039 18.7966 5.40039 15.1516V11.8133C5.40039 11.0722 5.40038 10.4813 5.4302 10.001C5.46072 9.50938 5.5245 9.08398 5.67466 8.68139C6.11558 7.49923 7.04806 6.56676 8.23022 6.12583C8.63281 5.97567 9.05821 5.91189 9.54981 5.88138C10.0302 5.85156 10.621 5.85156 11.3621 5.85156H11.3621H12.6386C13.3797 5.85156 13.9706 5.85156 14.451 5.88138Z" fill="#141B34"/>
                                                                        <path d="M12.75 21.708C12.504 21.7358 12.2539 21.7501 12.0004 21.7501C11.7467 21.7501 11.4963 21.7358 11.25 21.7079V16.5C11.25 16.0858 11.5858 15.75 12 15.75C12.4142 15.75 12.75 16.0858 12.75 16.5V21.708Z" fill="#141B34"/>
                                                                        <path d="M10.3487 5.85394C10.4128 5.38731 10.5398 4.97826 10.7277 4.66985C10.9717 4.26948 11.3312 4 12 4C12.6688 4 13.0283 4.26948 13.2723 4.66985C13.4602 4.97826 13.5872 5.38731 13.6513 5.85393C13.9482 5.85769 14.2131 5.86515 14.451 5.87991C14.9074 5.90825 15.3068 5.96526 15.6839 6.09348C15.6303 5.26442 15.4354 4.37631 14.9802 3.62921C14.3916 2.66323 13.4011 2 12 2C10.5989 2 9.60836 2.66323 9.01979 3.62921C8.56454 4.37639 8.36963 5.26461 8.31611 6.09375C8.69339 5.96534 9.09302 5.90827 9.54981 5.87991C9.78746 5.86516 10.0522 5.85771 10.3487 5.85394Z" fill="#141B34"/>
                                                                        <path d="M6.39602 7.43049C6.31731 7.41058 6.23489 7.4 6.15 7.4C4.96259 7.4 4 6.43741 4 5.25V5C4 4.44772 3.55228 4 3 4C2.44772 4 2 4.44772 2 5V5.25C2 7.32091 3.51688 9.03753 5.50017 9.34942C5.53917 9.11541 5.59466 8.89443 5.67466 8.67993C5.84578 8.22113 6.09095 7.79993 6.39602 7.43049Z" fill="#141B34"/>
                                                                        <path d="M5.40039 11.9H3C2.44772 11.9 2 12.3477 2 12.9C2 13.4523 2.44772 13.9 3 13.9H5.40039V11.9Z" fill="#141B34"/>
                                                                        <path d="M5.54317 16.522C3.51205 16.9995 2 18.8232 2 21C2 21.5523 2.44772 22 3 22C3.55229 22 4 21.5523 4 21C4 19.677 4.98818 18.5848 6.26672 18.4212C5.93333 17.838 5.68633 17.1992 5.54317 16.522Z" fill="#141B34"/>
                                                                        <path d="M17.734 18.4213C19.0122 18.5852 20 19.6772 20 21C20 21.5523 20.4477 22 21 22C21.5523 22 22 21.5523 22 21C22 18.8234 20.4883 16.9999 18.4576 16.5222C18.3144 17.1993 18.0674 17.8382 17.734 18.4213Z" fill="#141B34"/>
                                                                        <path d="M18.6004 13.9H21C21.5523 13.9 22 13.4523 22 12.9C22 12.3477 21.5523 11.9 21 11.9H18.6004L18.6004 13.9Z" fill="#141B34"/>
                                                                        <path d="M18.5006 9.3493C20.4835 9.0371 22 7.32065 22 5.25V5C22 4.44772 21.5523 4 21 4C20.4477 4 20 4.44772 20 5V5.25C20 6.43741 19.0374 7.4 17.85 7.4C17.7653 7.4 17.6831 7.41052 17.6046 7.43032C17.9098 7.79981 18.155 8.22106 18.3261 8.67993C18.4061 8.89439 18.4616 9.11533 18.5006 9.3493Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Pest Control</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Perusahaan kami memiliki jasa alihdaya Pest Control yang ahli dibidangnya untuk mengusir hama</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-service-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" d="M17.4659 1.75C18.1014 1.74998 18.6428 1.74995 19.0862 1.80238C19.5603 1.85843 19.9974 1.9811 20.3931 2.27649C20.7867 2.57024 21.0328 2.95546 21.2305 3.39554C21.4172 3.811 21.5873 4.33952 21.789 4.96638L22.4853 7.12954L22.5002 7.17604C22.6763 7.72227 22.8175 8.16018 22.7141 8.82232C22.6713 9.09674 22.6166 9.32192 22.5239 9.53046C22.4367 9.72661 22.328 9.87688 22.2446 9.99204L22.2323 10.0092C21.2481 11.3718 19.4436 12.25 17.7543 12.25C16.6746 12.25 15.6772 11.8933 14.8766 11.2923C14.0759 11.8937 13.0789 12.25 11.9989 12.25C10.9195 12.25 9.92238 11.8935 9.12194 11.2928C8.32127 11.8939 7.32456 12.25 6.24489 12.25C4.55562 12.25 2.75108 11.3718 1.76692 10.0092L1.75455 9.99206C1.67123 9.8769 1.56251 9.72662 1.4753 9.53046C1.38259 9.32192 1.32789 9.09674 1.28506 8.82231C1.18173 8.16018 1.32288 7.72227 1.49895 7.17603L1.51393 7.12954L2.19765 5.0053L2.21018 4.9664L2.21018 4.96639C2.41192 4.33952 2.58202 3.811 2.76865 3.39554C2.96634 2.95546 3.2125 2.57024 3.60604 2.27649C4.00177 1.9811 4.43892 1.85843 4.91299 1.80238C5.35639 1.74995 5.89776 1.74998 6.53326 1.75H6.53329H17.4659H17.4659Z" fill="#141B34"/>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 17.5C6 16.9477 6.44772 16.5 7 16.5H11C11.5523 16.5 12 16.9477 12 17.5C12 18.0523 11.5523 18.5 11 18.5H7C6.44772 18.5 6 18.0523 6 17.5Z" fill="#141B34"/>
                                                                        <path d="M2 10.3056L2 15.3209C1.99997 16.675 1.99994 17.7917 2.11876 18.6754C2.2435 19.6032 2.51547 20.4227 3.17158 21.0788C3.82769 21.7349 4.64711 22.0068 5.57494 22.1316C6.4587 22.2504 7.57531 22.2504 8.92943 22.2503H15.0706C16.4247 22.2504 17.5413 22.2504 18.4251 22.1316C19.3529 22.0068 20.1723 21.7349 20.8284 21.0788C21.4845 20.4227 21.7565 19.6032 21.8813 18.6754C22.0001 17.7916 22 16.675 22 15.3209V10.3047C21.4718 10.923 20.7707 11.4231 20 11.7613V15.2503C20 16.6928 19.9979 17.6741 19.8991 18.4089C19.8042 19.115 19.6368 19.442 19.4142 19.6645C19.1916 19.8871 18.8646 20.0545 18.1586 20.1494C17.4238 20.2482 16.4425 20.2503 15 20.2503H9C7.55752 20.2503 6.57626 20.2482 5.84144 20.1494C5.13538 20.0545 4.80836 19.8871 4.58579 19.6645C4.36322 19.442 4.19585 19.115 4.10092 18.4089C4.00213 17.6741 4 16.6928 4 15.2503V11.7617C3.22942 11.4236 2.52831 10.9238 2 10.3056Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Crew Store</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Kami telah bekerjasama oleh beberapa Perusahaan Food & Beverage untuk jasa alih daya</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-service-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M18.4327 6.25H20.4663C21.4249 6.25 21.9043 6.25 22.2021 6.54289C22.4999 6.83579 22.4999 7.30719 22.4999 8.25V12.25C22.4999 13.1928 22.4999 13.6642 22.2021 13.9571C21.9043 14.25 21.4249 14.25 20.4663 14.25H19.8694C19.855 13.906 19.715 13.5662 19.4495 13.3036L13.3488 7.26785H12.332L11.0771 8.50942C10.3444 9.23432 9.17795 9.29823 8.36881 8.65782L8.13058 8.46927C7.71863 8.14322 7.51265 7.98019 7.50044 7.75745C7.48823 7.5347 7.67518 7.35084 8.04908 6.9831L9.0412 6.00736C9.92284 5.14027 10.3637 4.70672 10.9242 4.47836C11.4848 4.25 12.2884 4.25 13.5353 4.25C14.4521 4.25 14.9105 4.25 15.3428 4.37872C15.775 4.50745 16.1565 4.75753 16.9193 5.2577L18.4327 6.25Z" fill="#141B34"/>
                                                                        <path opacity="0.4" d="M3.49988 7.25H6.36355C6.27981 7.43273 6.24043 7.63497 6.2518 7.84C6.2714 8.19373 6.44019 8.52253 6.71619 8.74465L7.81837 9.63164C9.11305 10.6736 10.981 10.5688 12.1522 9.39068L12.8841 8.65437L18.4999 14.3036C18.761 14.5662 18.8986 14.906 18.9129 15.25C18.9287 15.6337 18.7911 16.0225 18.4999 16.3155C17.9476 16.871 17.0522 16.871 16.4999 16.3155L15.9999 15.8125C16.5522 16.3681 16.5522 17.2688 15.9999 17.8244C15.4476 18.38 14.5522 18.38 13.9999 17.8244L12.9999 16.8184C13.5522 17.374 13.5522 18.2748 12.9999 18.8303C12.4476 19.3859 11.5522 19.3859 10.9999 18.8303L9.49988 17.3214C10.0522 17.877 10.0522 18.7778 9.49988 19.3333C8.94759 19.8889 8.05216 19.8889 7.49988 19.3333L4.08806 15.8504C3.81366 15.5703 3.67646 15.4303 3.50651 15.353C3.33656 15.2758 3.11081 15.2628 2.65931 15.2368C2.24419 15.2129 1.98145 15.1458 1.79277 14.9571C1.49988 14.6642 1.49988 14.1928 1.49988 13.25V9.25C1.49988 8.30719 1.49988 7.83579 1.79277 7.54289C2.08566 7.25 2.55707 7.25 3.49988 7.25Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Alih Daya</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Kami memiliki berbagai jasa alihdaya SDM untuk meningkatkan bisnis pada Perusahaan anda</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-service-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" d="M10.9149 1.49784C11.2832 1.35888 11.6455 1.25 12.0001 1.25C12.3548 1.25 12.717 1.35888 13.0854 1.49784C13.4582 1.63848 13.9239 1.8452 14.5047 2.103C15.3583 2.48193 16.4849 2.91682 17.6934 3.26033L17.6934 3.26035C18.5753 3.51102 19.2882 3.71368 19.8283 3.9231C20.3711 4.13358 20.8632 4.39466 21.1945 4.83324C21.5153 5.258 21.6387 5.75424 21.6954 6.28941C21.7502 6.80597 21.7501 7.45411 21.7501 8.23883V11.1833C21.7501 14.2392 20.3707 16.6624 18.7034 18.4686C17.0414 20.2691 15.0613 21.4939 13.7562 22.1827L13.6932 22.216C13.1374 22.5098 12.6831 22.75 12.0001 22.75C11.3172 22.75 10.8629 22.5098 10.307 22.216L10.244 22.1827C8.93895 21.4939 6.95889 20.2691 5.29681 18.4686C3.62958 16.6624 2.25012 14.2392 2.25012 11.1833V8.23885V8.23883C2.25011 7.4541 2.25009 6.80596 2.30481 6.28941C2.3615 5.75424 2.48493 5.258 2.80578 4.83324C3.13706 4.39466 3.62917 4.13358 4.17196 3.9231C4.71204 3.71367 5.425 3.51101 6.30687 3.26034L6.30688 3.26034C7.51532 2.91682 8.64194 2.48194 9.49556 2.10302C10.0763 1.84521 10.542 1.63848 10.9149 1.49784Z" fill="#141B34"/>
                                                                        <path d="M14.4982 8.5C14.4982 9.88067 13.3789 11 11.9982 11C10.6175 11 9.49817 9.88067 9.49817 8.5C9.49817 7.11928 10.6175 6 11.9982 6C13.3789 6 14.4982 7.11928 14.4982 8.5Z" fill="#141B34"/>
                                                                        <path d="M9.21109 13.0012C10.9198 11.9996 13.0808 11.9996 14.7895 13.0012C15.0991 13.1723 15.8058 13.5644 16.1797 13.9246C16.4125 14.1489 16.6905 14.4958 16.7421 14.9605C16.799 15.4733 16.5619 15.9155 16.1966 16.2581C15.6371 16.7828 14.9154 17.25 13.9599 17.25H10.0407C9.0852 17.25 8.36358 16.7828 7.80401 16.2581C7.43872 15.9155 7.20161 15.4733 7.25855 14.9605C7.31014 14.4958 7.58811 14.1489 7.82097 13.9246C8.19483 13.5644 8.90157 13.1723 9.21109 13.0012Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Security</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Kami telah dipercaya oleh berbagai Perusahaan untuk jasa alihdaya SDM pada posisi Security</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-service-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" d="M6.97475 12.2517C7.38896 12.2517 7.75 12.5875 7.75 13.0017C7.75 15.2228 8.8526 16.7851 10.0017 17.8193C10.5769 18.3369 11.566 18.9311 12 19.177C12.4339 18.9311 13.4231 18.3369 13.9983 17.8193C15.1474 16.7851 16.25 15.2228 16.25 13.0017C16.25 12.8017 16.3299 12.61 16.4719 12.4691C16.614 12.3283 16.8322 12.2503 17.0322 12.252C17.4847 12.2559 17.8625 12.2591 18.1726 12.2834C18.4955 12.3087 18.8001 12.3599 19.0942 12.4874C19.742 12.7684 20.2568 13.2877 20.5322 13.9378C20.6573 14.233 20.7059 14.538 20.7284 14.8612C20.75 15.1714 20.75 15.5492 20.75 16.0017V16.0018V22.0017C20.75 22.416 20.4142 22.7517 20 22.7517H4C3.58579 22.7517 3.25 22.416 3.25 22.0017V15.9765V15.9765C3.24999 15.532 3.24999 15.161 3.27077 14.8564C3.29241 14.5393 3.33905 14.2397 3.45933 13.9494C3.73844 13.2755 4.27379 12.7402 4.94762 12.4611C5.23801 12.3408 5.53754 12.2941 5.85464 12.2725C6.15925 12.2517 6.53028 12.2517 6.97474 12.2517H6.97475Z" fill="#141B34"/>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3943 11.862C14.6154 11.9987 14.75 12.2401 14.75 12.5V14.5C14.75 14.7599 14.6154 15.0013 14.3943 15.138C14.1732 15.2746 13.8971 15.2871 13.6646 15.1708L12 14.3385L10.3355 15.171C10.103 15.2873 9.82686 15.2749 9.60573 15.1382C9.3846 15.0016 9.25 14.7602 9.25 14.5002V12.5002C9.25 12.2403 9.38458 11.9989 9.60567 11.8622C9.82677 11.7256 10.1029 11.7131 10.3354 11.8294L12 12.6615L13.6646 11.8292C13.8971 11.7129 14.1732 11.7254 14.3943 11.862Z" fill="#141B34"/>
                                                                        <path d="M7.75 5.50012C7.75 3.15291 9.65279 1.25012 12 1.25012C14.3472 1.25012 16.25 3.15291 16.25 5.50012V6.50012C16.25 8.84733 14.3472 10.7501 12 10.7501C9.65279 10.7501 7.75 8.84733 7.75 6.50012V5.50012Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Receptionist</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Kami telah dipercaya oleh berbagai Perusahaan untuk jasa alihdaya SDM pada posisi Receptionist</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    <ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li data-menu data-barba-active data-hover-group>
                            <a href="javascript:;" class="flex text-sm font-bold uppercase tracking-wide link link-reverse [--link-underline:var(--color-primary-600)] [.is-active_&]:[--link-from:100%] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover) | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:text-white [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--link-underline:white] [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--text-hover:white]" data-hover-effect>
                                Produk
                            </a>
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-dvw pointer-events-none drop-shadow-[0_0_3rem_rgba(0,0,0,0.3)] -z-1">
                                <div class="relative pt-(--space-header) bg-white pointer-events-auto" data-submenu>
                                    <div class="pt-8 pb-16">
                                        <div class="max-container">
                                            <div class="grid gap-8 | lg:grid-cols-8 lg:gap-0">
                                                <div class="col-span-full | lg:col-span-2">
                                                    <div class="flex flex-col gap-4 pr-16">
                                                        <div class="h5 text-dark-950">Produk Kami</div>
                                                        <p class="text-sm font-medium text-dark-400">Dapatkan dukungan lengkap untuk karir Anda, dari pencarian lowongan hingga tips interview.</p>
                                                    </div>
                                                </div>
                                                <div class="col-span-full | lg:col-span-4">
                                                    <ul class="grid gap-8 grid-cols-2 | lg:gap-x-16">
                                                        <li data-nav-submenu>
                                                            <a href="page-product-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" d="M13.75 3.99721C13.7515 3.58299 14.0886 3.24846 14.5028 3.25001C15.817 3.2549 16.8911 3.27921 17.7587 3.42347C18.6447 3.5708 19.3871 3.85371 19.9907 4.42553C20.6728 5.07174 20.9734 5.89294 21.1144 6.8867C21.25 7.84235 21.25 9.0586 21.25 10.5723V15.4253C21.25 16.939 21.25 18.1553 21.1144 19.111C20.9734 20.1047 20.6728 20.9259 19.9907 21.5721C19.3143 22.2129 18.4643 22.4903 17.4352 22.6214C16.4347 22.7489 15.158 22.7488 13.5532 22.7488H13.5532H10.4468H10.4468C8.84201 22.7488 7.56529 22.7489 6.56479 22.6214C5.53566 22.4903 4.68571 22.2129 4.00932 21.5721C3.32721 20.9259 3.02661 20.1047 2.88558 19.111C2.74996 18.1553 2.74998 16.9391 2.75 15.4254V15.4253V10.5723V10.5723C2.74998 9.05858 2.74996 7.84234 2.88558 6.8867C3.02661 5.89294 3.32721 5.07174 4.00932 4.42553C4.61291 3.85371 5.35533 3.5708 6.24135 3.42347C7.10891 3.27921 8.18295 3.2549 9.49721 3.25001C9.91142 3.24846 10.2485 3.58299 10.25 3.99721L9.5028 5.79816H14.4972L13.75 3.99721Z" fill="#141B34"/>
                                                                        <path d="M9.2962 12C9.2962 10.5003 10.485 9.25 11.9934 9.25C13.5018 9.25 14.6906 10.5003 14.6906 12C14.6906 13.4997 13.5018 14.75 11.9934 14.75C10.485 14.75 9.2962 13.4997 9.2962 12Z" fill="#141B34"/>
                                                                        <path d="M16.25 18.2767C16.25 19.0904 15.5904 19.75 14.7767 19.75H9.21809C8.40729 19.75 7.75 19.0927 7.75 18.2819C7.75 17.9208 7.88358 17.5388 8.1819 17.2556C10.2441 15.2978 13.7319 15.1957 15.835 17.2652C16.1225 17.5482 16.25 17.9232 16.25 18.2767Z" fill="#141B34"/>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9239 1.25003C11.9489 1.25005 11.9743 1.25007 12 1.25007C12.0257 1.25007 12.0511 1.25005 12.0761 1.25003C12.4715 1.24977 12.7887 1.24956 13.0768 1.31587C13.74 1.4685 14.3245 1.88211 14.6506 2.48172C14.7931 2.74368 14.8631 3.04806 14.9413 3.38803C14.947 3.41273 14.9528 3.43761 14.9586 3.46268L15.0419 3.8228C15.0445 3.83442 15.0472 3.846 15.0499 3.85754C15.1281 4.19545 15.1997 4.50508 15.2311 4.76487C15.2648 5.04381 15.2671 5.36611 15.121 5.68814C14.9718 6.01722 14.7234 6.2861 14.4203 6.4702C14.1352 6.64339 13.8261 6.70054 13.5374 6.72584C13.2606 6.7501 12.9198 6.75008 12.5294 6.75007H11.4706C11.0802 6.75008 10.7394 6.7501 10.4626 6.72584C10.1739 6.70054 9.86483 6.64339 9.57968 6.4702C9.27656 6.2861 9.02825 6.01722 8.87896 5.68814C8.73288 5.36611 8.73518 5.04381 8.76888 4.76487C8.80027 4.50508 8.87192 4.19545 8.95011 3.85754C8.95279 3.846 8.95547 3.83442 8.95815 3.8228L9.04145 3.46268C9.04725 3.43761 9.05297 3.41273 9.05866 3.38803C9.13686 3.04806 9.20689 2.74368 9.34938 2.48172C9.67555 1.88211 10.2601 1.4685 10.9232 1.31587C11.2113 1.24956 11.5285 1.24977 11.9239 1.25003ZM12 2.75007C11.4903 2.75007 11.3591 2.75477 11.2597 2.77765C10.9775 2.84259 10.7702 3.00893 10.667 3.19849C10.6356 3.25626 10.6091 3.34127 10.5029 3.80072L10.4196 4.16084C10.3307 4.54509 10.2786 4.77488 10.2581 4.9448C10.2486 5.02332 10.2495 5.06396 10.2509 5.08035C10.2695 5.11517 10.3034 5.15474 10.3583 5.18814L10.3597 5.18886C10.3607 5.18936 10.3626 5.19025 10.3655 5.19146C10.3714 5.19386 10.3822 5.19781 10.4 5.20246C10.4374 5.21226 10.4972 5.22312 10.5936 5.23157C10.7969 5.24939 11.071 5.25007 11.5019 5.25007H12.4981C12.929 5.25007 13.2031 5.24939 13.4064 5.23157C13.5028 5.22312 13.5626 5.21226 13.6 5.20246C13.6178 5.19781 13.6286 5.19386 13.6345 5.19146C13.6374 5.19025 13.6393 5.18936 13.6403 5.18886L13.6414 5.18831C13.6964 5.15491 13.7305 5.11517 13.7491 5.08035C13.7505 5.06396 13.7514 5.02332 13.742 4.9448C13.7214 4.77488 13.6693 4.54509 13.5804 4.16084L13.4971 3.80072C13.3909 3.34127 13.3644 3.25626 13.333 3.19849C13.2298 3.00893 13.0225 2.84259 12.7403 2.77765C12.6409 2.75477 12.5097 2.75007 12 2.75007ZM13.748 5.08927C13.748 5.08924 13.7481 5.0885 13.7484 5.08715L13.748 5.08927ZM10.252 5.08927C10.2519 5.0893 10.2518 5.08863 10.2516 5.08715L10.252 5.08927Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Software HRIS</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Software HRIS Sistem yang Efisien dan Responsif untukbMengelola SDM.</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-product-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1.5 11.9255V12.0745C1.49998 14.2504 1.49996 15.9852 1.68282 17.3453C1.87164 18.7497 2.27175 19.9035 3.18414 20.8159C4.09653 21.7283 5.25033 22.1284 6.65471 22.3172C6.83878 22.3419 7 22.1968 7 22.0111V11C7 10.5286 7 10.2929 6.85355 10.1464C6.70711 10 6.47141 10 6 10H2.49623C2.02855 10 1.79471 10 1.64832 10.1461C1.50193 10.2922 1.50148 10.525 1.50058 10.9905C1.49999 11.2927 1.5 11.6043 1.5 11.9255ZM22.4994 10.9905C22.4985 10.525 22.4981 10.2922 22.3517 10.1461C22.2053 10 21.9715 10 21.5038 10L10 10C9.5286 10 9.29289 10 9.14645 10.1464C9 10.2929 9 10.5286 9 11V21.503C9 21.9644 9 22.1951 9.14472 22.3412C9.28944 22.4874 9.51775 22.4896 9.97436 22.4941C10.5812 22.5 11.2309 22.5 11.9255 22.5H12.0745C14.2504 22.5 15.9852 22.5 17.3453 22.3172C18.7497 22.1284 19.9035 21.7283 20.8159 20.8159C21.7283 19.9035 22.1284 18.7497 22.3172 17.3453C22.5 15.9851 22.5 14.2504 22.5 12.0744V11.9256C22.5 11.6043 22.5 11.2927 22.4994 10.9905Z" fill="#141B34"/>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.64615 6.94642C1.59242 7.42656 1.56556 7.66663 1.71463 7.83332C1.8637 8 2.11513 8 2.61797 8H21.3804C21.8832 8 22.1346 8 22.2837 7.83332C22.4328 7.66663 22.4059 7.42656 22.3522 6.94642C22.3411 6.84733 22.3292 6.7501 22.3163 6.65471C22.1275 5.25033 21.7274 4.09653 20.815 3.18414C19.9026 2.27175 18.7488 1.87164 17.3444 1.68282C15.9843 1.49996 14.2496 1.49998 12.0736 1.5L11.9247 1.5C9.74875 1.49998 8.01401 1.49996 6.65387 1.68282C5.24949 1.87164 4.09569 2.27175 3.1833 3.18414C2.27091 4.09653 1.8708 5.25033 1.68198 6.65471C1.66916 6.7501 1.65724 6.84733 1.64615 6.94642Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Software ERP</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Software ERP dapat Mengintegrasikan Berbagai Proses Bisnis.</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-product-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00009 17.7499C8.55238 17.7499 9.00009 18.1976 9.00009 18.7499V20.7499C9.00009 21.3022 8.55238 21.7499 8.00009 21.7499C7.44781 21.7499 7.00009 21.3022 7.00009 20.7499V18.7499C7.00009 18.1976 7.44781 17.7499 8.00009 17.7499ZM16.0001 17.7499C16.5524 17.7499 17.0001 18.1976 17.0001 18.7499V20.7499C17.0001 21.3022 16.5524 21.7499 16.0001 21.7499C15.4478 21.7499 15.0001 21.3022 15.0001 20.7499V18.7499C15.0001 18.1976 15.4478 17.7499 16.0001 17.7499Z" fill="#141B34"/>
                                                                        <path opacity="0.4" d="M12.4329 8.99988C13.1352 8.99984 13.7485 8.9998 14.2512 9.0599C14.7937 9.12478 15.3168 9.26968 15.785 9.63527C16.2532 10.0009 16.5207 10.4732 16.7152 10.9838C16.8954 11.4568 17.0441 12.0518 17.2144 12.7332L17.2144 12.7332L17.4705 13.7573C17.6044 14.2931 17.2787 14.8361 16.7429 14.97C16.2071 15.104 15.6641 14.7782 15.5302 14.2424L15.2877 13.2723C15.0999 12.5211 14.9788 12.0438 14.8462 11.6958C14.7233 11.373 14.6285 11.2697 14.5542 11.2117C14.4799 11.1537 14.3567 11.0868 14.0137 11.0458C13.644 11.0015 13.1515 10.9999 12.3772 10.9999H11.6234C10.8491 10.9999 10.3567 11.0015 9.98696 11.0458C9.64394 11.0868 9.52076 11.1537 9.44647 11.2117C9.37218 11.2697 9.2774 11.373 9.15441 11.6958C9.02185 12.0438 8.9008 12.5211 8.71301 13.2723L8.47047 14.2424C8.33652 14.7782 7.79359 15.104 7.25779 14.97C6.722 14.8361 6.39624 14.2931 6.53019 13.7573L6.77272 12.7872L6.78622 12.7332C6.95652 12.0518 7.10524 11.4568 7.28545 10.9838C7.47998 10.4732 7.74741 10.0009 8.21564 9.63527C8.68388 9.26968 9.20694 9.12478 9.74949 9.0599C10.2521 8.9998 10.8655 8.99984 11.5678 8.99988H12.4329Z" fill="#141B34"/>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25009 14.9999C5.25009 14.0334 6.03359 13.2499 7.00009 13.2499L17.0001 13.2499C17.9666 13.2499 18.7501 14.0334 18.7501 14.9999V17.9999C18.7501 18.9664 17.9666 19.7499 17.0001 19.7499H7.00009C6.03359 19.7499 5.25009 18.9664 5.25009 17.9999L5.25009 14.9999ZM8.50009 15.4999C9.05238 15.4999 9.50009 15.9446 9.50009 16.4933V16.5065C9.50009 17.0551 9.05238 17.4999 8.50009 17.4999C7.94781 17.4999 7.50009 17.0551 7.50009 16.5065V16.4933C7.50009 15.9446 7.94781 15.4999 8.50009 15.4999ZM16.5001 16.4933C16.5001 15.9446 16.0524 15.4999 15.5001 15.4999C14.9478 15.4999 14.5001 15.9446 14.5001 16.4933V16.5065C14.5001 17.0551 14.9478 17.4999 15.5001 17.4999C16.0524 17.4999 16.5001 17.0551 16.5001 16.5065V16.4933Z" fill="#141B34"/>
                                                                        <path opacity="0.4" d="M12 4.2C11.8574 4.2 11.7027 4.24451 10.9138 4.56204L5.05021 6.92225C4.43512 7.16983 4.04769 7.32726 3.76658 7.4781C3.50716 7.61731 3.42258 7.70841 3.37475 7.7795C3.32651 7.8512 3.27317 7.96587 3.24081 8.26238C3.20589 8.58239 3.20455 9.00417 3.20455 9.67038V20.775C3.20455 21.3135 2.76701 21.75 2.22728 21.75C1.68754 21.75 1.25 21.3135 1.25 20.775L1.25 9.62194V9.62188C1.24997 9.01841 1.24994 8.48941 1.29775 8.05131C1.3494 7.57803 1.46409 7.12049 1.7519 6.69271C2.04012 6.26433 2.4211 5.98593 2.84075 5.76074C3.22821 5.55283 3.71727 5.35601 4.27349 5.13216L4.27352 5.13215L10.3046 2.7044C10.8992 2.46401 11.4286 2.25 12 2.25C12.5714 2.25 13.1008 2.46401 13.6954 2.7044L19.7265 5.13215C20.2827 5.35601 20.7718 5.55283 21.1593 5.76074C21.5789 5.98593 21.9599 6.26433 22.2481 6.69271C22.5359 7.12049 22.6506 7.57803 22.7022 8.05131C22.7501 8.48943 22.75 9.01845 22.75 9.62194V20.775C22.75 21.3135 22.3125 21.75 21.7727 21.75C21.233 21.75 20.7955 21.3135 20.7955 20.775V9.67038C20.7955 9.00417 20.7941 8.58239 20.7592 8.26238C20.7268 7.96587 20.6735 7.8512 20.6253 7.7795C20.5774 7.70841 20.4928 7.6173 20.2334 7.4781C19.9523 7.32726 19.5649 7.16983 18.9498 6.92225L13.0862 4.56204C12.2973 4.24451 12.1426 4.2 12 4.2Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Software Parkir</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Software Parkir yang Memudahkan Proses Bisnis Parkir.</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-product-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g opacity="0.4">
                                                                        <path d="M8.74999 17.1839C8.74999 17.3865 8.74999 17.4878 8.79768 17.5619C8.84538 17.6361 8.9445 17.6812 9.14273 17.7716C9.364 17.8724 9.64478 18.0104 10.0237 18.1988L10.3226 18.3474C10.7359 18.5529 10.9425 18.6556 11.0425 18.5738C11.1425 18.492 11.0793 18.2564 10.9529 17.7853C10.6351 16.6005 10.6535 15.2597 11.2758 13.8051C11.8511 12.4599 12.8427 11.3934 14.0418 10.6925C14.1452 10.632 14.1969 10.6018 14.2235 10.5555C14.25 10.5093 14.25 10.4518 14.25 10.3368V4.07993C14.25 3.89908 14.25 3.80865 14.205 3.73605C14.16 3.66346 14.0791 3.6232 13.9171 3.54268L11.1426 2.16308C10.4736 1.83043 9.92552 1.55792 9.4523 1.37534C9.16026 1.26266 9.01424 1.20632 8.88542 1.29083L8.8752 1.29784C8.74999 1.3876 8.74999 1.55659 8.74999 1.89457L8.74999 17.1839Z" fill="#141B34"/>
                                                                        <path d="M22.75 11.0976C22.75 11.5505 22.75 11.7769 22.6333 11.8303C22.5165 11.8838 22.3358 11.7278 21.9742 11.4159C20.7405 10.3515 19.1388 9.75014 17.5014 9.75014C17.0827 9.75014 16.6662 9.78948 16.2576 9.86585C16.0155 9.9111 15.8944 9.93373 15.8222 9.87375C15.75 9.81377 15.75 9.69591 15.75 9.4602L15.75 4.33978C15.75 4.24525 15.8268 4.16871 15.9213 4.16871L18.0529 4.1687C18.9506 4.16867 19.7008 4.16865 20.2966 4.25053C20.9275 4.33721 21.4955 4.52811 21.9503 4.99292C22.4028 5.45544 22.5866 6.02934 22.6704 6.66621C22.75 7.27195 22.75 8.03581 22.75 8.95577V11.0976Z" fill="#141B34"/>
                                                                        <path d="M7.24999 1.95751C7.24999 1.62997 7.24999 1.46621 7.13414 1.37613C7.12079 1.36575 7.1028 1.35424 7.08778 1.34647C6.95743 1.27907 6.81997 1.34255 6.54508 1.46952C6.08424 1.68235 5.5543 1.98978 4.90722 2.36516L3.61868 3.11264C3.15061 3.38415 2.75245 3.61511 2.44082 3.84014C2.10847 4.08013 1.82704 4.34564 1.61996 4.70912C1.41339 5.07173 1.32726 5.45037 1.28745 5.86066C1.24996 6.24704 1.24997 6.71337 1.24999 7.26451V15.5036C1.24997 16.2327 1.24996 16.8356 1.29638 17.3071C1.34325 17.7832 1.44674 18.2615 1.75832 18.648C2.09801 19.0695 2.57687 19.356 3.11023 19.4512C3.60333 19.5392 4.07069 19.3912 4.50149 19.1967C4.9274 19.0044 5.49917 18.6727 6.11821 18.3136C6.40132 18.1494 6.65458 18.0025 6.8909 17.8804C7.07194 17.7868 7.16246 17.74 7.20622 17.6682C7.24999 17.5963 7.24999 17.5017 7.24999 17.3126L7.24999 1.95751Z" fill="#141B34"/>
                                                                        </g>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5005 11.25C15.4459 11.25 13.4801 12.4635 12.654 14.3949C11.881 16.202 12.3099 17.7499 13.1612 19.0367C13.8457 20.0712 14.8445 20.9943 15.708 21.7923L15.708 21.7924C15.8705 21.9425 16.0281 22.0882 16.178 22.2294L16.1797 22.2309C16.5378 22.5663 17.0118 22.75 17.5005 22.75C17.9893 22.75 18.4633 22.5663 18.8214 22.2309C18.9636 22.0978 19.1125 21.9606 19.2658 21.8195L19.2659 21.8194L19.2659 21.8194L19.2659 21.8194C20.1381 21.0163 21.1499 20.0846 21.8415 19.037C22.6917 17.749 23.1191 16.1998 22.3471 14.3949C21.521 12.4635 19.5552 11.25 17.5005 11.25ZM17.4911 14.5C16.3914 14.5 15.5 15.3954 15.5 16.5C15.5 17.6046 16.3914 18.5 17.4911 18.5H17.5089C18.6086 18.5 19.5 17.6046 19.5 16.5C19.5 15.3954 18.6086 14.5 17.5089 14.5H17.4911Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Online Travel Agen</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Online Travel Agent Memudahkan Pengalaman Anda untuk Travelingr.</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-product-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" d="M12.4724 14.99C11.9357 14.2489 11.0867 13.7418 10.0656 13.7418H8.8884C8.72611 13.7418 8.56107 13.7011 8.40513 13.6164L7.40609 13.0741C6.67311 11.8904 6.25 10.4946 6.25 9C6.25 4.71979 9.7198 1.25 14 1.25C18.2802 1.25 21.75 4.71979 21.75 9C21.75 10.9009 21.0656 12.6421 19.9298 13.9903C19.1282 13.3248 18.0482 13.0641 16.9868 13.4339L12.4724 14.99Z" fill="#141B34"/>
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 3.25C14.4142 3.25 14.75 3.58579 14.75 4V4.33451C15.5387 4.51515 16.2347 4.98027 16.5646 5.68028C16.7412 6.05497 16.5806 6.50186 16.2059 6.67844C15.8312 6.85502 15.3843 6.69441 15.2078 6.31972C15.0905 6.07097 14.6684 5.75 14 5.75C13.5943 5.75 13.2559 5.87427 13.0358 6.03934C12.8159 6.20423 12.75 6.37478 12.75 6.5C12.75 6.62522 12.8159 6.79577 13.0358 6.96066C13.2559 7.12573 13.5943 7.25 14 7.25C14.6989 7.25 15.3604 7.46151 15.8642 7.83934C16.3682 8.21734 16.75 8.79679 16.75 9.5C16.75 10.2032 16.3682 10.7827 15.8642 11.1607C15.5457 11.3995 15.1642 11.5719 14.75 11.6664V12C14.75 12.4142 14.4142 12.75 14 12.75C13.5858 12.75 13.25 12.4142 13.25 12V11.6655C12.4613 11.4848 11.7653 11.0197 11.4354 10.3197C11.2588 9.94503 11.4194 9.49814 11.7941 9.32156C12.1688 9.14498 12.6157 9.30559 12.7922 9.68028C12.9095 9.92903 13.3316 10.25 14 10.25C14.4057 10.25 14.7441 10.1257 14.9642 9.96066C15.1841 9.79576 15.25 9.62522 15.25 9.5C15.25 9.37478 15.1841 9.20424 14.9642 9.03934C14.7441 8.87427 14.4057 8.75 14 8.75C13.3011 8.75 12.6396 8.53849 12.1358 8.16066C11.6318 7.78266 11.25 7.20321 11.25 6.5C11.25 5.79679 11.6318 5.21734 12.1358 4.83934C12.4543 4.60048 12.8358 4.42809 13.25 4.33359V4C13.25 3.58579 13.5858 3.25 14 3.25Z" fill="#141B34"/>
                                                                        <path d="M12.8249 16.1907L17.3963 14.615C18.1964 14.3353 19.0654 14.6648 19.5723 15.4523C19.8935 15.9513 19.7579 16.6621 19.3003 16.9583L10.815 22.4511C10.3419 22.7573 9.78523 22.8315 9.26637 22.6587L2.93218 20.55C2.52365 20.414 2.24805 20.0318 2.24805 19.6012V14.25C2.24805 13.6977 2.69576 13.25 3.24805 13.25H4.6696C4.95941 13.25 5.24489 13.3233 5.50335 13.4636L7.80879 14.715C8.14441 14.8972 8.51401 14.9918 8.8884 14.9918H10.0656C11.0079 14.9918 11.7662 15.7777 11.839 16.7584V16.8919L9.10967 17.7385C8.66466 17.8766 8.18821 17.8317 7.76802 17.6083L5.43804 16.1286C5.20493 15.9805 4.89595 16.0495 4.74791 16.2826C4.59987 16.5157 4.66883 16.8247 4.90193 16.9727L7.24724 18.4622C7.25688 18.4683 7.26672 18.4741 7.27675 18.4795C7.93444 18.8365 8.69524 18.9141 9.40594 18.6936L12.2747 17.8038C12.6656 17.6826 12.9084 17.3089 12.9084 16.9134C12.9084 16.6871 12.8855 16.4663 12.8419 16.2534C12.8375 16.2319 12.8318 16.211 12.8249 16.1907Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Software Cash Collect</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Software Cash Collect Mempermudah Proses Penarikan Uang Tunai.</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li data-nav-submenu>
                                                            <a href="page-product-detail.html" class="flex items-center gap-4 group" data-barba-active-child>
                                                                <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                                                                    <svg class="icon icon-fill text-primary-600 size-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g opacity="0.4">
                                                                        <path d="M14.3207 10.9875C14.1266 11.2612 14.0295 11.3981 14.0663 11.5336C14.1031 11.6691 14.2324 11.731 14.4911 11.8548C15.0294 12.1125 15.6365 12.2574 16.2788 12.2574C18.4944 12.2574 20.2906 10.5331 20.2906 8.40604C20.2906 6.279 18.4944 4.55469 16.2788 4.55469C16.0372 4.55469 15.8006 4.57519 15.5707 4.61449C15.2861 4.66315 15.1438 4.68748 15.0687 4.80762C14.9935 4.92776 15.0467 5.08555 15.153 5.40113C15.363 6.02415 15.4765 6.68886 15.4765 7.37901C15.4765 8.71691 15.0501 9.9592 14.3207 10.9875Z" fill="#141B34"/>
                                                                        <path d="M19.1504 20.4737C20.5968 20.4737 21.7218 19.8806 22.6572 19.1402C23.2116 18.7014 23.5749 18.1363 23.4871 17.4696C23.4084 16.8709 22.9869 16.4252 22.6232 16.1295C22.0273 15.6449 21.158 15.2381 20.6103 14.9817C20.4893 14.9251 20.384 14.8758 20.3008 14.8346C19.2335 14.3066 18.0593 13.9803 16.8598 13.8558C16.0863 13.7754 15.6995 13.7353 15.6111 13.957C15.5227 14.1788 15.8671 14.4164 16.5559 14.8915C16.8175 15.072 17.0706 15.2653 17.2927 15.4666C17.7927 15.9196 18.5257 16.7349 18.6639 17.9054C18.728 18.4479 18.6538 18.9476 18.487 19.3991C18.2884 19.9368 18.189 20.2057 18.2749 20.333C18.2804 20.3412 18.2838 20.3457 18.2899 20.3535C18.3863 20.4737 18.641 20.4737 19.1504 20.4737Z" fill="#141B34"/>
                                                                        </g>
                                                                        <path d="M14.0401 15.2192L14.0402 15.2193C14.6311 15.5276 15.5579 16.0112 16.192 16.5857C16.5868 16.9434 16.9951 17.4428 17.0701 18.0777C17.1512 18.7648 16.8217 19.3852 16.2295 19.9074C15.2357 20.784 14.0272 21.4996 12.4598 21.4996H5.12247C3.55506 21.4996 2.34661 20.784 1.35274 19.9074C0.760633 19.3852 0.431036 18.7648 0.512166 18.0777C0.587143 17.4428 0.995532 16.9434 1.39032 16.5857C2.02438 16.0112 2.95118 15.5276 3.54205 15.2193C3.67361 15.1507 3.78851 15.0907 3.87983 15.0404C6.88769 13.3824 10.6946 13.3824 13.7025 15.0404C13.7937 15.0907 13.9086 15.1506 14.0401 15.2192Z" fill="#141B34"/>
                                                                        <path d="M3.70898 7.37838C3.70898 4.68412 5.98406 2.5 8.79051 2.5C11.597 2.5 13.872 4.68412 13.872 7.37838C13.872 10.0726 11.597 12.2568 8.79051 12.2568C5.98406 12.2568 3.70898 10.0726 3.70898 7.37838Z" fill="#141B34"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="w-full flex flex-col items-start gap-1.5">
                                                                    <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">Software Recruitment</h5>
                                                                    <div class="w-full text-sm font-medium text-dark-400 truncate">Software Recruitment Mempermudah Proses Pencarian Karyawan.</div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    <ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li data-barba-active>
                            <a href="page-team.html" class="flex text-sm font-bold uppercase tracking-wide link link-reverse [--link-underline:var(--color-primary-600)] [.is-active_&]:[--link-from:100%] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover) | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:text-white [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--link-underline:white] [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--text-hover:white]" data-hover-effect>
                                Tim Kami
                            </a>
                        </li>
                        <li data-barba-active>
                            <a href="page-project.html" class="flex text-sm font-bold uppercase tracking-wide link link-reverse [--link-underline:var(--color-primary-600)] [.is-active_&]:[--link-from:100%] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover) | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:text-white [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--link-underline:white] [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--text-hover:white]" data-hover-effect>
                                Project
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-span-full | not-lg:ml-auto | lg:col-span-2">
                    <div class="flex items-center justify-end">
                        <div class="flex items-center gap-2" id="auth-header">
                            
                        </div>
                    </div>
                </div>
                
            </nav>

            <nav id="mobile-menu" class="fixed isolate top-0 inset-x-0 h-dvh flex flex-col pt-(--space-header) bg-primary-600">
                <div class="h-full flex flex-col shrink-0 px-4 overflow-auto" data-lenis-prevent>
                    <div class="grow flex flex-col items-center justify-center text-center gap-8 py-8 shrink-0">
                        <div class="text-sm font-bold uppercase tracking-wide">Menu</div>
                        <ul class="accordion flex flex-col items-center text-center gap-1" data-parent>
                            <li class="w-full" data-barba-active>
                                <a href="./"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Beranda</span></a>
                            </li>
                            <li class="w-full" data-barba-active>
                                <a href="page-about.html"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Tentang Kami</span></a>
                            </li>
                            <li class="w-full accordion-item overflow-clip" data-barba-active>
                                <a href="javascript:;" data-target="menu-services"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Service</span></a>
                                <div id="menu-services" class="accordion-content overflow-clip" aria-expanded="false">
                                    <ul class="flex justify-center flex-wrap gap-2 py-6">
                                        <li data-nav-submenu>
                                            <a href="page-service-detail.html" class="btn btn-sm" data-barba-active-child>Cleaning Service</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-service-detail.html" class="btn btn-sm" data-barba-active-child>Sales</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-service-detail.html" class="btn btn-sm" data-barba-active-child>Kurir</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-service-detail.html" class="btn btn-sm" data-barba-active-child>Pest Control</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-service-detail.html" class="btn btn-sm" data-barba-active-child>Crew Store</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-service-detail.html" class="btn btn-sm" data-barba-active-child>Alih Daya</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-service-detail.html" class="btn btn-sm" data-barba-active-child>Security</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-service-detail.html" class="btn btn-sm" data-barba-active-child>Receptionist</a>
                                        </li>
                                    </ul>
                                    <!--<ul class="py-6 flex flex-col divide-y divide-dark-300">
                                        <li class="py-3 first:pt-0 last:pb-0" data-nav-submenu>
                                            <a href="page-service-detail.html" class="text-sm leading-none font-bold uppercase tracking-wide text-dark-950" data-barba-active-child>Cleaning Service</a>
                                        </li>
                                        <li class="py-3 first:pt-0 last:pb-0" data-nav-submenu>
                                            <a href="page-service-detail.html" class="text-sm leading-none font-bold uppercase tracking-wide text-dark-950" data-barba-active-child>Sales</a>
                                        </li>
                                        <li class="py-3 first:pt-0 last:pb-0" data-nav-submenu>
                                            <a href="page-service-detail.html" class="text-sm leading-none font-bold uppercase tracking-wide text-dark-950" data-barba-active-child>Kurir</a>
                                        </li>
                                        <li class="py-3 first:pt-0 last:pb-0" data-nav-submenu>
                                            <a href="page-service-detail.html" class="text-sm leading-none font-bold uppercase tracking-wide text-dark-950" data-barba-active-child>Pest Control</a>
                                        </li>
                                        <li class="py-3 first:pt-0 last:pb-0" data-nav-submenu>
                                            <a href="page-service-detail.html" class="text-sm leading-none font-bold uppercase tracking-wide text-dark-950" data-barba-active-child>Crew Store</a>
                                        </li>
                                        <li class="py-3 first:pt-0 last:pb-0" data-nav-submenu>
                                            <a href="page-service-detail.html" class="text-sm leading-none font-bold uppercase tracking-wide text-dark-950" data-barba-active-child>Alih Daya</a>
                                        </li>
                                        <li class="py-3 first:pt-0 last:pb-0" data-nav-submenu>
                                            <a href="page-service-detail.html" class="text-sm leading-none font-bold uppercase tracking-wide text-dark-950" data-barba-active-child>Security</a>
                                        </li>
                                        <li class="py-3 first:pt-0 last:pb-0" data-nav-submenu>
                                            <a href="page-service-detail.html" class="text-sm leading-none font-bold uppercase tracking-wide text-dark-950" data-barba-active-child>Receptionist</a>
                                        </li>
                                    </ul>-->
                                </div>
                            </li>
                            <li class="w-full accordion-item overflow-clip" data-barba-active>
                                <a href="javascript:;" data-target="menu-product"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Produk</span></a>
                                <div id="menu-product" class="accordion-content overflow-clip" aria-expanded="false">
                                    <ul class="flex justify-center flex-wrap gap-2 py-6">
                                        <li data-nav-submenu>
                                            <a href="page-product-detail.html" class="btn btn-sm" data-barba-active-child>Software HRIS</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-product-detail.html" class="btn btn-sm" data-barba-active-child>Software ERP</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-product-detail.html" class="btn btn-sm" data-barba-active-child>Software Parkir</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-product-detail.html" class="btn btn-sm" data-barba-active-child>Online Travel Agen</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-product-detail.html" class="btn btn-sm" data-barba-active-child>Cash Collect</a>
                                        </li>
                                        <li data-nav-submenu>
                                            <a href="page-product-detail.html" class="btn btn-sm" data-barba-active-child>Recruitment</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="w-full" data-barba-active>
                                <a href="page-team.html"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Tim Kami</span></a>
                            </li>
                            <li class="w-full" data-barba-active>
                                <a href="page-project.html"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Project</span></a>
                            </li>
                            <li class="w-full" data-barba-active>
                                <a href="page-contact.html"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Kontak Kami</span></a>
                            </li>
                        </ul>
                    </div>
                    <div class="py-4 text-center shrink-0">
                        <div class="text-sm font-bold uppercase tracking-wide">© 2025 Radar Utama Nusantara</div>
                    </div>
                </div>
                <div id="mobile-menu-bg" class="absolute inset-0 bg-white border-t-4 border-primary-600 -z-1"></div>
            </nav>
        </div>

        <div class="absolute inset-0 bg-white -z-1 opacity-0 transition-opacity duration-800 ease-custom [.is-sticky_&]:opacity-100"></div>
    `;

  const app = document.querySelector("#app");
  if (app) {
    app.prepend(sectionHeader);
  }
};

const checkLoginPage = async () => {
  const authHeader = document.querySelector("#auth-header");
  if (!authHeader) return;

  // ── Baca token & user ────────────────────────────────────────────────────
  const token = localStorage.getItem("auth_token");
  let user = null;

  if (token) {
    // Decode JWT payload (base64) tanpa library — selalu up-to-date tanpa perlu
    // update localStorage manual saat data berubah (misal avatar diupdate)
    document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    try {
      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(
        payloadBase64.replace(/-/g, "+").replace(/_/g, "/"),
      );
      user = JSON.parse(payloadJson);
    } catch {
      // JWT tidak bisa di-decode → coba fallback localStorage
      const rawUser = localStorage.getItem("auth_user");
      try {
        user = rawUser ? JSON.parse(rawUser) : null;
      } catch {
        user = null;
      }
    }
  }

  // ── Jika ada sesi aktif → tampilan header login ──────────────────────────
  if (token && user) {
    const displayName = user.name ?? "Pengguna";
    const displayEmail = user.email ?? "";
    const initial = displayName.charAt(0).toUpperCase();

    // Render foto jika ada, fallback ke initial
    // Baca base URL dari window (di-set di tiap halaman Astro) atau meta tag, fallback ke ""
    const BASE_URL =
      window.__ENV_PUBLIC_API_URL__ ??
      document.querySelector('meta[name="api-url"]')?.content ??
      "";
    // const avatarSrc = user.avatar
    //   ? `${BASE_URL}/pubs/uploads/avatar/${user.avatar}`
    //   : null;
    const avatarSrc = getAvatarSrc(user, BASE_URL);
    const avatarHTML = avatarSrc
      ? `<img src="${avatarSrc}" alt="${displayName}" class="w-full h-full object-cover "
             onerror="this.parentElement.innerHTML='${initial}';this.parentElement.style.cssText='display:flex;align-items:center;justify-content:center;background:#E8F4E8;color:#2D7D46;font-weight:700;font-size:1rem;'"/>`
      : initial;
    const avatarStyle = avatarSrc
      ? "overflow:hidden;padding:0;"
      : "display:flex;align-items:center;justify-content:center;background:#E8F4E8;color:#2D7D46;font-weight:700;font-size:1rem;";

    authHeader.innerHTML = `
      <div class="relative | not-lg:hidden">
        <div class="opacity-0 transition-all duration-800 ease-custom [.is-dark_&]:opacity-100 [.is-sticky_&,.is-hover-menu_&]:opacity-0">
          <a href="page-contact.html" class="btn btn-white btn-circle-primary | not-lg:hidden" data-hover-effect>
            Kontak Kami
            <svg class="icon icon-stroke circle-icon circle-right icon-up-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 6.5L6 18" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 6H18V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <div class="absolute inset-0 w-min transition-all duration-800 ease-custom [.is-dark_&]:opacity-0 [.is-dark_&]:invisible [.is-sticky_&,.is-hover-menu_&]:opacity-100 [.is-sticky_&,.is-hover-menu_&]:visible">
          <a href="page-contact.html" class="btn btn-primary btn-circle-white | not-lg:hidden" data-hover-effect>
            Kontak Kami
            <svg class="icon icon-stroke circle-icon circle-right icon-up-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 6.5L6 18" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 6H18V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="lg:relative" data-dropdown="toggle">
        <button type="button" class="avatar" data-dropdown-toggle
          style="${avatarStyle}">
          ${avatarHTML}
        </button>
        <div class="absolute top-full right-0 drop-shadow-[0_0.75rem_2rem_rgba(0,0,0,0.1)] py-1 | not-lg:w-dvw not-lg:px-4 not-lg:right-1/2 not-lg:translate-x-1/2 | lg:py-2">
          <div class="flex flex-col bg-white rounded-lg ring-inset ring-1 ring-dark-300 | lg:min-w-68" data-dropdown-content>
            <div class="flex flex-col p-4 !pb-0 shrink-0 | lg:p-6">
              <div class="font-semibold text-dark-950 truncate">${displayName}</div>
              <div class="h6 truncate">${displayEmail}</div>
            </div>
            <div class="p-4 shrink-0 | lg:p-6">
              <ul class="flex flex-col gap-4">
                <li data-barba-active>
                  <a href="/profile" class="flex items-center gap-4" data-hover-group>
                    <svg class="icon icon-fill size-5 text-dark-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8751 11.875C18.4274 11.875 18.8751 12.3227 18.8751 12.875V13.2736C19.6155 13.4438 20.2848 13.7991 20.8263 14.289L21.3343 13.9624C21.7989 13.6637 22.4176 13.7982 22.7163 14.2628C23.0149 14.7274 22.8804 15.3461 22.4159 15.6447L21.9517 15.9432C22.1176 16.39 22.2084 16.8723 22.2084 17.375C22.2084 17.8778 22.1176 18.3602 21.9516 18.807L22.4155 19.1053C22.88 19.4039 23.0145 20.0226 22.7158 20.4872C22.4172 20.9518 21.7985 21.0863 21.3339 20.7876L20.8262 20.4612C20.2847 20.951 19.6154 21.3062 18.8751 21.4764V21.875C18.8751 22.4273 18.4274 22.875 17.8751 22.875C17.3228 22.875 16.8751 22.4273 16.8751 21.875V21.4764C16.1348 21.3062 15.4655 20.951 14.9241 20.4612L14.4163 20.7876C13.9517 21.0863 13.333 20.9518 13.0344 20.4872C12.7357 20.0226 12.8702 19.4039 13.3348 19.1053L13.7986 18.807C13.6326 18.3602 13.5418 17.8778 13.5418 17.375C13.5418 16.8723 13.6326 16.39 13.7985 15.9432L13.3343 15.6447C12.8698 15.3461 12.7353 14.7274 13.0339 14.2628C13.3326 13.7982 13.9513 13.6637 14.4159 13.9624L14.9239 14.289C15.4654 13.7991 16.1347 13.4438 16.8751 13.2736V12.875C16.8751 12.3227 17.3228 11.875 17.8751 11.875ZM17.8751 15.1607C17.0502 15.1607 16.3365 15.5648 15.9233 16.1613C15.6807 16.5116 15.5418 16.9276 15.5418 17.375C15.5418 17.8225 15.6807 18.2385 15.9234 18.5888C16.3366 19.1852 17.0503 19.5893 17.8751 19.5893C18.6999 19.5893 19.4136 19.1852 19.8268 18.5888C20.0695 18.2385 20.2084 17.8225 20.2084 17.375C20.2084 16.9276 20.0695 16.5116 19.8269 16.1613C19.4137 15.5648 18.7 15.1607 17.8751 15.1607Z" fill="#141B34"/>
                        <g opacity="0.4">
                        <path d="M10.875 1.125C7.97552 1.125 5.62502 3.4755 5.62502 6.375C5.62502 9.27449 7.97552 11.625 10.875 11.625C13.7745 11.625 16.125 9.27449 16.125 6.375C16.125 3.4755 13.7745 1.125 10.875 1.125Z" fill="#141B34"/>
                        <path d="M9.26996 13.2375C10.0534 13.127 10.8465 13.0979 11.6351 13.1502C11.7785 13.1597 11.8497 13.3307 11.7719 13.4516C11.1823 14.3687 11.2679 15.526 11.9018 16.34C12.0023 16.4691 12.0526 16.5336 12.0687 16.5884C12.0848 16.6432 12.0781 16.7164 12.0648 16.8627C12.0494 17.0316 12.0415 17.2025 12.0415 17.375C12.0415 17.5477 12.0494 17.7187 12.0648 17.8877C12.0781 18.034 12.0848 18.1071 12.0688 18.1619C12.0527 18.2167 12.0024 18.2813 11.902 18.4103C11.2683 19.2243 11.1829 20.3814 11.7723 21.2984C11.8252 21.3805 11.882 21.4602 11.9424 21.537C12.4535 22.1873 12.7091 22.5124 12.6818 22.5687C12.6544 22.625 12.2974 22.625 11.5834 22.625H6.46557C4.64726 22.625 3.24148 21.7306 2.07003 20.6146C1.39101 19.9677 1.05255 19.2396 1.13736 18.4638C1.2171 17.7342 1.65575 17.1387 2.11742 16.6868C2.85559 15.9643 3.9332 15.3563 4.64602 14.9542C4.80862 14.8625 4.95229 14.7814 5.06857 14.7122C6.37341 13.9352 7.80548 13.4441 9.26996 13.2375Z" fill="#141B34"/>
                        </g>
                    </svg>
                    <div class="font-semibold [--text-hover:var(--color-primary-600)] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover)" data-hover-effect>My Profile</div>
                  </a>
                </li>
                <li data-barba-active>
                  <a href="/profile/document" class="flex items-center gap-4" data-hover-group>
                    <svg class="icon icon-fill size-5 text-dark-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M13.1374 22.5827C12.662 22.7514 12.1575 22.7507 11.5875 22.75C10.0618 22.75 8.65416 22.7499 7.67541 22.635C6.66272 22.5162 5.79501 22.2632 5.05999 21.6674C4.79018 21.4488 4.54441 21.2017 4.32687 20.9305C3.73424 20.1917 3.48254 19.3195 3.36431 18.3015C3.25003 17.3177 3.25004 16.0812 3.25006 14.5475V14.5475V9.97393V9.97392C3.25004 8.19195 3.25002 6.75558 3.40111 5.62592C3.55798 4.45306 3.89358 3.46554 4.67383 2.68123C5.45408 1.89692 6.43649 1.55958 7.60328 1.40189C8.72711 1.25001 10.2982 1.25003 12.071 1.25006C13.8438 1.25003 15.2727 1.25001 16.3966 1.40189C17.5634 1.55958 18.5458 1.89692 19.326 2.68123C20.1063 3.46554 20.4419 4.45306 20.5987 5.62592C20.7498 6.7556 20.7498 8.19195 20.7498 9.97396L20.7499 13.4482C20.7509 14.1116 20.7518 14.7003 20.5278 15.2441C20.3037 15.7879 19.8889 16.2035 19.4216 16.6719L14.6387 21.4795C14.2363 21.8852 13.88 22.2442 13.4252 22.4629C13.3314 22.508 13.2354 22.548 13.1374 22.5827Z" fill="#141B34"/>
                        <path d="M13.1375 22.5828C13.2354 22.548 13.3315 22.508 13.4252 22.463C13.8801 22.2443 14.2363 21.8852 14.6388 21.4796L14.6388 21.4796L19.4216 16.6719L19.4216 16.6719C19.889 16.2036 20.3038 15.7879 20.5278 15.2442C20.6266 15.0044 20.6817 14.756 20.7123 14.4962H18.7315C17.3639 14.4962 16.7153 14.497 15.8484 14.6135C14.9483 14.7346 14.1904 14.9935 13.5885 15.5954C12.9866 16.1973 12.7277 16.9552 12.6066 17.8553C12.4903 18.7205 12.4903 19.3765 12.4904 20.7384V22.7214C12.7137 22.6984 12.9284 22.657 13.1375 22.5828Z" fill="#141B34"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7501 7.00006C16.7501 7.41427 16.4143 7.75006 16.0001 7.75006L8.00006 7.75006C7.58585 7.75006 7.25006 7.41428 7.25006 7.00006C7.25006 6.58585 7.58585 6.25006 8.00006 6.25006L16.0001 6.25006C16.4143 6.25006 16.7501 6.58585 16.7501 7.00006Z" fill="#141B34"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7501 11.0001C12.7501 11.4143 12.4143 11.7501 12.0001 11.7501L8.00006 11.7501C7.58585 11.7501 7.25006 11.4143 7.25006 11.0001C7.25006 10.5858 7.58585 10.2501 8.00006 10.2501L12.0001 10.2501C12.4143 10.2501 12.7501 10.5858 12.7501 11.0001Z" fill="#141B34"/>
                    </svg>
                    <div class="font-semibold [--text-hover:var(--color-primary-600)] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover)" data-hover-effect>Dokumen</div>
                  </a>
                </li>
                <li data-barba-active>
                  <a href="/profile/status" class="flex items-center gap-4" data-hover-group>
                    <svg class="icon icon-fill size-5 text-dark-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4038 14.0251C15.098 13.2945 16.0976 12.75 17.25 12.75C18.4024 12.75 19.402 13.2945 20.0962 14.0251C20.7838 14.7486 21.25 15.7359 21.25 16.75V19.75C21.25 20.3023 20.8023 20.75 20.25 20.75C19.6977 20.75 19.25 20.3023 19.25 19.75L19.25 16.75C19.25 16.3346 19.0447 15.8219 18.6464 15.4028C18.2549 14.9908 17.7544 14.75 17.25 14.75C16.7456 14.75 16.2451 14.9908 15.8536 15.4028C15.4553 15.8219 15.25 16.3346 15.25 16.75V20.25C15.25 20.5261 15.4739 20.75 15.75 20.75C16.0261 20.75 16.25 20.5261 16.25 20.25V16.75C16.25 16.1977 16.6977 15.75 17.25 15.75C17.8023 15.75 18.25 16.1977 18.25 16.75V20.25C18.25 21.6307 17.1307 22.75 15.75 22.75C14.3693 22.75 13.25 21.6307 13.25 20.25L13.25 16.75C13.25 15.7359 13.7162 14.7486 14.4038 14.0251Z" fill="#141B34"/>
                        <g opacity="0.4">
                        <path d="M16.989 1.40314C15.8497 1.24997 14.3941 1.24998 12.5564 1.25H11.4436C9.60588 1.24998 8.15026 1.24997 7.01105 1.40313C5.83864 1.56076 4.8897 1.89287 4.14133 2.64123C3.39297 3.38958 3.06085 4.33852 2.90321 5.51094C2.75004 6.65014 2.75004 8.10576 2.75004 9.94351L2.75 14.5489C2.74998 16.1511 2.74996 17.4205 2.86865 18.4247C2.9905 19.4557 3.24632 20.3044 3.82812 21.0133C4.02552 21.2539 4.24609 21.4744 4.48664 21.6718C5.19558 22.2536 6.04427 22.5095 7.07523 22.6313C8.07942 22.75 9.34874 22.75 10.9509 22.75H12.5563C12.6912 22.75 12.8241 22.75 12.9548 22.7499C12.3611 22.0865 12 21.2104 12 20.25V16.75C12 15.3611 12.6299 14.0773 13.4976 13.1641C14.3804 12.2351 15.6916 11.5 17.25 11.5C18.8084 11.5 20.1196 12.2351 21.0024 13.1641C21.0873 13.2534 21.1699 13.3464 21.2499 13.4426V9.94359C21.25 8.10585 21.25 6.65018 21.0968 5.51098C20.9392 4.33856 20.6071 3.38961 19.8587 2.64124C19.1103 1.89288 18.1614 1.56076 16.989 1.40314Z" fill="#141B34"/>
                        <path d="M19.3252 21.8018C19.2806 21.7816 19.2367 21.76 19.1936 21.7371C19.1627 21.8084 19.1297 21.8786 19.0947 21.9475C19.1732 21.9017 19.2501 21.8532 19.3252 21.8018Z" fill="#141B34"/>
                        </g>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 6C6.75 5.58579 7.08579 5.25 7.5 5.25H16.5C16.9142 5.25 17.25 5.58579 17.25 6C17.25 6.41421 16.9142 6.75 16.5 6.75H7.5C7.08579 6.75 6.75 6.41421 6.75 6Z" fill="#141B34"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 10C6.75 9.58579 7.08579 9.25 7.5 9.25H13.5C13.9142 9.25 14.25 9.58579 14.25 10C14.25 10.4142 13.9142 10.75 13.5 10.75H7.5C7.08579 10.75 6.75 10.4142 6.75 10Z" fill="#141B34"/>
                    </svg>
                    <div class="font-semibold [--text-hover:var(--color-primary-600)] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover)" data-hover-effect>Status Lamaran</div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="p-4 shrink-0 border-t border-dark-100 | lg:p-6">
              <ul class="flex flex-col gap-2">
                <li>
                  <button type="button" class="flex items-center gap-3 w-full" data-logout-btn data-hover-group>
                    <svg class="icon icon-fill size-6 text-dark-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M12.85 4C8.03858 4 4.25 7.64154 4.25 12C4.25 16.3585 8.03858 20 12.85 20C13.2801 20 13.7022 19.9707 14.1143 19.9142C14.6615 19.8393 15.1658 20.2221 15.2407 20.7693C15.3157 21.3164 14.9329 21.8208 14.3857 21.8957C13.8838 21.9645 13.371 22 12.85 22C7.05756 22 2.25 17.5827 2.25 12C2.25 6.41734 7.05756 2 12.85 2C13.371 2 13.8838 2.03552 14.3857 2.10427C14.9329 2.17922 15.3157 2.68355 15.2407 3.23073C15.1658 3.7779 14.6615 4.16072 14.1143 4.08576C13.7022 4.02931 13.2801 4 12.85 4Z" fill="#141B34"/>
                      <path d="M10.75 13.0059C10.1977 13.0059 9.75 12.5581 9.75 12.0059C9.75 11.4536 10.1977 11.0059 10.75 11.0059L17.25 11.0059L17.25 10.4116C17.2499 10.236 17.2497 10.0203 17.2718 9.84387L17.2722 9.84053C17.288 9.71408 17.3598 9.13804 17.9254 8.86368C18.4923 8.58872 18.9924 8.89065 19.1006 8.95597L19.5691 9.29511C19.9449 9.58975 20.4594 9.99545 20.8504 10.3759C21.0455 10.5657 21.2467 10.783 21.4056 11.0139C21.5468 11.2191 21.75 11.5693 21.75 12C21.75 12.4307 21.5468 12.7809 21.4056 12.9861C21.2467 13.217 21.0455 13.4343 20.8504 13.6241C20.4594 14.0046 19.9449 14.4102 19.5691 14.7049L19.1006 15.044C18.9924 15.1093 18.4922 15.4113 17.9254 15.1363C17.3598 14.862 17.288 14.2859 17.2722 14.1595L17.2718 14.1561C17.2497 13.9797 17.2499 13.764 17.25 13.5884L17.25 13.0059L10.75 13.0059Z" fill="#141B34"/>
                    </svg>
                    <div class="font-semibold text-red-500 [--text-hover:var(--color-red-600)]" data-hover-effect>Keluar</div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    // ── Handler logout ─────────────────────────────────────────────────────
    document
      .querySelector("[data-logout-btn]")
      ?.addEventListener("click", handleLogout);
  } else {
    // ── Tidak ada sesi → tampilan header publik ──────────────────────────
    authHeader.innerHTML = `
      <div class="relative | not-lg:hidden">
        <div class="opacity-0 transition-all duration-800 ease-custom [.is-dark_&]:opacity-100 [.is-sticky_&,.is-hover-menu_&]:opacity-0">
          <a href="page-contact.html" class="btn btn-white btn-circle-primary | not-lg:hidden" data-hover-effect>
            Kontak Kami
            <svg class="icon icon-stroke circle-icon circle-right icon-up-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 6.5L6 18" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 6H18V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <div class="absolute inset-0 w-min transition-all duration-800 ease-custom [.is-dark_&]:opacity-0 [.is-dark_&]:invisible [.is-sticky_&,.is-hover-menu_&]:opacity-100 [.is-sticky_&,.is-hover-menu_&]:visible">
          <a href="page-contact.html" class="btn btn-primary btn-circle-white | not-lg:hidden" data-hover-effect>
            Kontak Kami
            <svg class="icon icon-stroke circle-icon circle-right icon-up-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 6.5L6 18" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 6H18V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    `;
  }
};

const getAvatarSrc = (user, BASE_URL) => {
  // Prioritas 1: cache yang disimpan setelah upload (selalu up-to-date)
  const cached = localStorage.getItem("avatar_cache");
  const avatarFile = cached || user.avatar;
  return avatarFile ? `${BASE_URL}/pubs/uploads/avatar/${avatarFile}` : null;
};

barba.hooks.once(() => {
  initSectionHeader();
  initLogoutModal();
  initLoginModal();
  checkLoginPage();
});

barba.hooks.beforeEnter(() => {
  checkLoginPage();
});
barba.hooks.enter(() => {
  checkLoginPage();
});

window.addEventListener("avatar:updated", (e) => {
  // Cache sudah di-set di _profile.js sebelum event ini di-dispatch
  // Cukup re-render header dengan data terbaru
  checkLoginPage();
});
