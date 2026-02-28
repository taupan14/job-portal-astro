import barba from "@barba/core";

export const initSectionFooter = async () => {
  const sectionFooter = document.createElement("footer");
  sectionFooter.id = "section-footer";
  sectionFooter.className =
    "relative isolate bg-gradient-to-b from-dark-950 via-primary-900 to-primary-600 overflow-clip mt-16";

  sectionFooter.innerHTML = `
        <section class="py-16 | lg:py-24 2xl:pt-32">
            <div class="max-container">
                <div class="grid gap-16 | lg:grid-cols-12">
                    <div class="col-span-full | lg:col-span-3">
                        <div class="flex flex-col gap-16 | not-lg:items-center not-lg:text-center">
                            <a href="./" class="inline-flex items-center flex-nowrap gap-3">
                                <div class="size-11 shrink-0">
                                    <img src="./assets/images/logo/logo-icon.png" alt="RUN8" class="size-full object-contain">
                                </div>
                                <div class="flex flex-col text-base leading-none uppercase font-extrabold whitespace-nowrap text-white">
                                    <div>Radar Utama</div>
                                    <div>Nusantara</div>
                                </div>
                            </a>
                            <div class="flex flex-col items-start gap-6 | not-lg:items-center not-lg:text-center">
                                <address class="not-italic text-sm font-bold uppercase tracking-wide text-white text-baance">
                                    <p>Jl. Gas alam No.65 A, Kelurahan Curug, Kecamatan Cimanggis Depok 16451</p>
                                </address>
                                <a href="#!" class="link text-sm font-bold uppercase tracking-wide text-white [--link-underline:white]">Get Direction</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-full | lg:col-span-9">
                        <div class="grid gap-16 | lg:grid-cols-3">
                            <div class="col-span-full | lg:col-span-1">
                                <div class="flex flex-col gap-8 | not-lg:items-center not-lg:text-center">
                                    <div class="w-full text-sm font-bold uppercase tracking-wide text-white py-4 border-b border-white">Quick Link</div>
                                    <ul class="flex flex-col gap-1">
                                        <li><a href="page-about.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Tentang Kami</a></li>
                                        <li><a href="page-blog.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Berita</a></li>
                                        <li><a href="page-gallery.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Gallery</a></li>
                                        <li><a href="page-faq.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">FAQ</a></li>
                                        <li><a href="page-policy.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-span-full | lg:col-span-1">
                                <div class="flex flex-col gap-8 | not-lg:items-center not-lg:text-center">
                                    <div class="w-full text-sm font-bold uppercase tracking-wide text-white py-4 border-b border-white">Service Kami</div>
                                    <ul class="flex flex-col gap-1">
                                        <li><a href="page-service-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Cleaning Service</a></li>
                                        <li><a href="page-service-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Sales</a></li>
                                        <li><a href="page-service-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Kurir</a></li>
                                        <li><a href="page-service-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Pest Control</a></li>
                                        <li><a href="page-service-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Crew Store</a></li>
                                        <li><a href="page-service-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Alih Daya</a></li>
                                        <li><a href="page-service-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Security</a></li>
                                        <li><a href="page-service-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Receptionist</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-span-full | lg:col-span-1">
                                <div class="flex flex-col gap-8 | not-lg:items-center not-lg:text-center">
                                    <div class="w-full text-sm font-bold uppercase tracking-wide text-white py-4 border-b border-white">Produk Kami</div>
                                    <ul class="flex flex-col gap-1">
                                        <li><a href="page-product-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Software HRIS</a></li>
                                        <li><a href="page-product-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Software ERP</a></li>
                                        <li><a href="page-product-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Software Parkir</a></li>
                                        <li><a href="page-product-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Online Travel Agen</a></li>
                                        <li><a href="page-product-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Software Cash Collect</a></li>
                                        <li><a href="page-product-detail.html" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Software Recruitment</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="pb-8">
            <div class="max-container">
                <div class="grid gap-16 | lg:grid-cols-12 lg:items-end">
                    <div class="col-span-full | lg:col-span-4">
                        <div class="flex items-center gap-2 | not-lg:justify-center">
                            <a href="#!" aria-label="Facebook" class="btn btn-icon btn-white btn-outline [--ring-color:rgba(255,255,255,0.4)]" data-hover-effect data-tooltip="Facebook" data-tooltip-placement="right">
                                <svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55869 10.2083C4.47617 10.2083 4.25024 10.4146 4.25024 11.4028V13.1944C4.25024 14.1826 4.47617 14.3889 5.55869 14.3889H8.17557V21.5556C8.17557 22.5438 8.40149 22.75 9.48401 22.75H12.1009C13.1834 22.75 13.4093 22.5438 13.4093 21.5556V14.3889H16.3477C17.1687 14.3889 17.3803 14.2432 17.6058 13.5226L18.1666 11.7309C18.5529 10.4965 18.3148 10.2083 16.9085 10.2083H13.4093V7.22222C13.4093 6.56255 13.9951 6.02778 14.7178 6.02778H18.4418C19.5243 6.02778 19.7502 5.82154 19.7502 4.83333V2.44444C19.7502 1.45624 19.5243 1.25 18.4418 1.25H14.7178C11.1046 1.25 8.17557 3.92386 8.17557 7.22222V10.2083H5.55869Z" fill="#141B34"/>
                                </svg>
                            </a>
                            <a href="#!" aria-label="X/Twitter" class="btn btn-icon btn-white btn-outline [--ring-color:rgba(255,255,255,0.4)]" data-hover-effect data-tooltip="X/Twitter" data-tooltip-placement="right">
                                <svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.3569 2.78113C2.52359 2.45513 2.85886 2.25 3.225 2.25H8.1C8.41308 2.25 8.70711 2.40034 8.89041 2.65415L13.5354 9.08571L20.0856 2.53557C20.4663 2.15481 21.0837 2.15481 21.4644 2.53557C21.8452 2.91633 21.8452 3.53367 21.4644 3.91443L14.6919 10.687L21.5654 20.2041C21.7798 20.501 21.8098 20.8929 21.6431 21.2189C21.4764 21.5449 21.1411 21.75 20.775 21.75H15.9C15.5869 21.75 15.2929 21.5997 15.1096 21.3459L10.4646 14.9143L3.91443 21.4644C3.53367 21.8452 2.91634 21.8452 2.53557 21.4644C2.15481 21.0837 2.15481 20.4663 2.53557 20.0856L9.30811 13.313L2.43459 3.79585C2.22022 3.49903 2.19021 3.10713 2.3569 2.78113Z" fill="#141B34"/>
                                </svg>
                            </a>
                            <a href="#!" aria-label="LinkedIn" class="btn btn-icon btn-white btn-outline [--ring-color:rgba(255,255,255,0.4)]" data-hover-effect data-tooltip="Linked In" data-tooltip-placement="right">
                                <svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 9H4.5C3.55719 9 3.08579 9 2.79289 9.29289C2.5 9.58579 2.5 10.0572 2.5 11V19.5C2.5 20.4428 2.5 20.9142 2.79289 21.2071C3.08579 21.5 3.55719 21.5 4.5 21.5H5C5.94281 21.5 6.41421 21.5 6.70711 21.2071C7 20.9142 7 20.4428 7 19.5V11C7 10.0572 7 9.58579 6.70711 9.29289C6.41421 9 5.94281 9 5 9Z" fill="#141B34"/>
                                    <path d="M7 4.75C7 5.99264 5.99264 7 4.75 7C3.50736 7 2.5 5.99264 2.5 4.75C2.5 3.50736 3.50736 2.5 4.75 2.5C5.99264 2.5 7 3.50736 7 4.75Z" fill="#141B34"/>
                                    <path d="M11.826 9H11C10.0572 9 9.58579 9 9.29289 9.29289C9 9.58579 9 10.0572 9 11V19.5C9 20.4428 9 20.9142 9.29289 21.2071C9.58579 21.5 10.0572 21.5 11 21.5H11.5C12.4428 21.5 12.9142 21.5 13.2071 21.2071C13.5 20.9142 13.5 20.4428 13.5 19.5L13.5001 16.0001C13.5001 14.3433 14.0281 13.0001 15.5879 13.0001C16.3677 13.0001 17 13.6717 17 14.5001V19.0001C17 19.9429 17 20.4143 17.2929 20.7072C17.5857 21.0001 18.0572 21.0001 19 21.0001H19.4987C20.4413 21.0001 20.9126 21.0001 21.2055 20.7073C21.4984 20.4145 21.4985 19.9432 21.4987 19.0006L21.5001 13.5002C21.5001 11.015 19.1364 9.00024 16.7968 9.00024C15.4649 9.00024 14.2767 9.65309 13.5001 10.674C13.5 10.0439 13.5 9.72893 13.3632 9.495C13.2765 9.34686 13.1531 9.22353 13.005 9.13687C12.7711 9 12.4561 9 11.826 9Z" fill="#141B34"/>
                                </svg>
                            </a>
                            <a href="#!" aria-label="Instagram" class="btn btn-icon btn-white btn-outline [--ring-color:rgba(255,255,255,0.4)]" data-hover-effect data-tooltip="Instagram" data-tooltip-placement="right">
                                <svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0572 1.75H12.0572C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50271 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V11.9428V12.0572V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H12.0572H11.9428H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50271 5.31137 2.11568 6.68802 1.93059C8.03143 1.74998 9.7521 1.74999 11.9428 1.75H11.9428H12.0572ZM16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12ZM17.5123 7.5C18.0621 7.5 18.5078 7.05229 18.5078 6.5C18.5078 5.94772 18.0621 5.5 17.5123 5.5H17.5033C16.9535 5.5 16.5078 5.94772 16.5078 6.5C16.5078 7.05228 16.9535 7.5 17.5033 7.5H17.5123Z" fill="#141B34"/>
                                </svg> 
                            </a>
                        </div>
                    </div>
                    <div class="col-span-full | lg:col-span-3 lg:col-start-10">
                        <div class="flex flex-col items-center text-center gap-2 | lg:items-end lg:text-end">
                            <div class="text-sm font-bold uppercase tracking-wide text-white/70">© 2025</div>
                            <div class="flex flex-col h2 leading-[0.9] text-white | not-lg:items-center not-lg:text-center">
                                <div>Radar Utama</div>
                                <div>Nusantara</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="absolute inset-0 [-webkit-mask-image:radial-gradient(closest-side,black,transparent)] -z-1 -translate-y-1/4 pointer-events-none opacity-20 [--square:4rem] [--line-w:1px] | lg:[--square:6rem] lg:[--line-w:1px]">
            <div class="size-full bg-[repeating-linear-gradient(to_left,var(--color-primary-200),var(--color-primary-200)_var(--line-w),transparent_var(--line-w),transparent_var(--square)),repeating-linear-gradient(to_bottom,var(--color-primary-200),var(--color-primary-200)_var(--line-w),transparent_var(--line-w),transparent_var(--square))]"></div>
        </div>
    `;

  const app = document.querySelector("#app");
  if (app) {
    app.append(sectionFooter);
  }
};

barba.hooks.once(() => {
  initSectionFooter();
});
