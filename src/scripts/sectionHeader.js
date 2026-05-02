import barba from "@barba/core";
import { initLogoutModal, handleLogout } from "../lib/logout";
import { initLoginModal } from "@scripts/form/_login.js";
import { renderSvgIcon } from "./iconCollections";

// ── Render menu Layanan dari API (desktop + mobile) ───────────
const loadServicesMenu = async () => {
  const listDesktop = document.getElementById("nav-services-list");
  const listMobile = document.getElementById("nav-services-mobile");
  if (!listDesktop && !listMobile) return;

  const BASE_URL = window.__ENV_PUBLIC_API_URL__ ?? "";

  try {
    const res = await fetch(`${BASE_URL}/api/homepage/services`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const services = (json.data ?? []).filter((s) => s.is_active);

    if (!services.length) {
      const empty = `<li class="col-span-2 text-sm text-dark-400">Belum ada layanan tersedia.</li>`;
      if (listDesktop) listDesktop.innerHTML = empty;
      if (listMobile) listMobile.innerHTML = empty;
      return;
    }

    // ── Desktop: card dengan SVG icon + title + description ──
    if (listDesktop) {
      listDesktop.innerHTML = services
        .map((svc) => {
          const href = svc.slug ? `/service/${svc.slug}` : "/";
          const iconEl = renderSvgIcon(svc.icon ?? "default");
          const desc = svc.page_title
            ? svc.page_title.replace(/<[^>]+>/g, "").substring(0, 65) + "..."
            : "";
          return `
          <li data-nav-submenu>
            <a href="${href}" class="flex items-center gap-4 group" data-barba-active-child>
              <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                ${iconEl}
              </div>
              <div class="w-full flex flex-col items-start gap-1.5">
                <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">${svc.title}</h5>
                ${desc ? `<div class="w-full text-sm font-medium text-dark-400 truncate">${desc}</div>` : ""}
              </div>
            </a>
          </li>`;
        })
        .join("");
    }

    // ── Mobile: pill button sederhana ──
    if (listMobile) {
      listMobile.innerHTML = services
        .map((svc) => {
          const href = svc.slug ? `/service/${svc.slug}` : "/";
          return `
          <li data-nav-submenu>
            <a href="${href}" class="btn btn-sm" data-barba-active-child>${svc.title}</a>
          </li>`;
        })
        .join("");
    }
  } catch (err) {
    console.error("[loadServicesMenu]", err);
    const errMsg = `<li class="col-span-2 text-sm text-dark-400">Gagal memuat layanan.</li>`;
    if (listDesktop) listDesktop.innerHTML = errMsg;
    if (listMobile) listMobile.innerHTML = errMsg;
  }
};

const loadProductsMenu = async () => {
  const listDesktop = document.getElementById("nav-products-list");
  const listMobile = document.getElementById("nav-products-mobile");
  if (!listDesktop && !listMobile) return;

  const BASE_URL = window.__ENV_PUBLIC_API_URL__ ?? "";

  try {
    const res = await fetch(`${BASE_URL}/api/homepage/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const products = (json.data ?? []).filter((s) => s.is_active);

    if (!products.length) {
      const empty = `<li class="col-span-2 text-sm text-dark-400">Belum ada produk tersedia.</li>`;
      if (listDesktop) listDesktop.innerHTML = empty;
      if (listMobile) listMobile.innerHTML = empty;
      return;
    }

    // ── Desktop: card dengan SVG icon + title + description ──
    if (listDesktop) {
      listDesktop.innerHTML = products
        .map((svc) => {
          const href = svc.slug ? `/product/${svc.slug}` : "/";
          const iconEl = renderSvgIcon(svc.icon ?? "default");
          const desc = svc.page_title
            ? svc.page_title.replace(/<[^>]+>/g, "").substring(0, 65) + "..."
            : "";
          return `
          <li data-nav-submenu>
            <a href="${href}" class="flex items-center gap-4 group" data-barba-active-child>
              <div class="size-12 flex items-center justify-center rounded-lg bg-primary-50/50 shrink-0">
                ${iconEl}
              </div>
              <div class="w-full flex flex-col items-start gap-1.5">
                <h5 class="text-lg text-balance tracking-normal group-hover:text-primary-600">${svc.title}</h5>
                ${desc ? `<div class="w-full text-sm font-medium text-dark-400 truncate">${desc}</div>` : ""}
              </div>
            </a>
          </li>`;
        })
        .join("");
    }

    // ── Mobile: pill button sederhana ──
    if (listMobile) {
      listMobile.innerHTML = products
        .map((svc) => {
          const href = svc.slug ? `/product/${svc.slug}` : "/";
          return `
          <li data-nav-submenu>
            <a href="${href}" class="btn btn-sm" data-barba-active-child>${svc.title}</a>
          </li>`;
        })
        .join("");
    }
  } catch (err) {
    console.error("[loadProductsMenu]", err);
    const errMsg = `<li class="col-span-2 text-sm text-dark-400">Gagal memuat produk.</li>`;
    if (listDesktop) listDesktop.innerHTML = errMsg;
    if (listMobile) listMobile.innerHTML = errMsg;
  }
};

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
                            <a href="/about-us" class="flex text-sm font-bold uppercase tracking-wide link link-reverse [--link-underline:var(--color-primary-600)] [.is-active_&]:[--link-from:100%] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover) | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:text-white [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--link-underline:white] [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--text-hover:white]" data-hover-effect>
                                Tentang Kami
                            </a>
                        </li>
                        <li data-menu data-barba-active data-hover-group>
                            <a href="javascript:;" class="flex text-sm font-bold uppercase tracking-wide link link-reverse [--link-underline:var(--color-primary-600)] [.is-active_&]:[--link-from:100%] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover) | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:text-white [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--link-underline:white] [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--text-hover:white]" data-hover-effect>
                                Layanan
                            </a>
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-dvw pointer-events-none drop-shadow-[0_0_3rem_rgba(0,0,0,0.3)] -z-1">
                                <div class="relative pt-(--space-header) bg-white pointer-events-auto" data-submenu>
                                    <div class="pt-8 pb-16">
                                        <div class="max-container">
                                            <div class="grid gap-8 | lg:grid-cols-8 lg:gap-0">
                                                <div class="col-span-full | lg:col-span-2">
                                                    <div class="flex flex-col gap-4 pr-16">
                                                        <div class="h5 text-dark-950">Layanan Kami</div>
                                                        <p class="text-sm font-medium text-dark-400">Kami menawarkan solusi inovatif untuk efisiensi bisnis dan pekerjaan. Dengan teknologi, kami memudahkan proses, menghemat waktu, dan meningkatkan produktivitas.</p>
                                                    </div>
                                                </div>
                                                <div class="col-span-full | lg:col-span-4">
                                                    <ul class="grid gap-8 grid-cols-2 | lg:gap-x-16" id="nav-services-list">
                                                        <!-- diisi oleh loadServicesMenu() -->
                                                    </ul>
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
                                                    <ul class="grid gap-8 grid-cols-2 | lg:gap-x-16" id="nav-products-list">
                                                        <!-- diisi oleh loadProductsMenu() -->
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li data-barba-active>
                            <a href="/our-team" class="flex text-sm font-bold uppercase tracking-wide link link-reverse [--link-underline:var(--color-primary-600)] [.is-active_&]:[--link-from:100%] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover) | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:text-white [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--link-underline:white] [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--text-hover:white]" data-hover-effect>
                                TEAM Kami
                            </a>
                        </li>
                        <li data-barba-active>
                            <a href="/gallery" class="flex text-sm font-bold uppercase tracking-wide link link-reverse [--link-underline:var(--color-primary-600)] [.is-active_&]:[--link-from:100%] [.is-active_&_span]:animate-none [.is-active_&]:text-(--text-hover) | [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:text-white [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--link-underline:white] [.is-dark_&:not(.is-sticky_&,.is-hover-menu_&)]:[--text-hover:white]" data-hover-effect>
                                Gallery
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
                                <a href="/about-us"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Tentang Kami</span></a>
                            </li>
                            <li class="w-full accordion-item overflow-clip" data-barba-active>
                                <a href="javascript:;" data-target="menu-services"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Layanan</span></a>
                                <div id="menu-services" class="accordion-content overflow-clip" aria-expanded="false">
                                    <ul id="nav-services-mobile" class="flex justify-center flex-wrap gap-2 py-6">
                                        <!-- diisi oleh loadServicesMenu() -->
                                    </ul>
                                </div>
                            </li>
                            <li class="w-full accordion-item overflow-clip" data-barba-active>
                                <a href="javascript:;" data-target="menu-product"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Produk</span></a>
                                <div id="menu-product" class="accordion-content overflow-clip" aria-expanded="false">
                                    <ul id="nav-products-mobile" class="flex justify-center flex-wrap gap-2 py-6">
                                        <!-- diisi oleh loadProductsMenu() -->
                                    </ul>
                                </div>
                            </li>
                            <li class="w-full" data-barba-active>
                                <a href="/our-team"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">TEAM Kami</span></a>
                            </li>
                            <li class="w-full" data-barba-active>
                                <a href="/project"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Project</span></a>
                            </li>
                            <li class="w-full" data-barba-active>
                                <a href="/contact-us"><span class="h2 uppercase tracking-tight leading-none [.is-active_&]:text-primary-600">Kontak Kami</span></a>
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
    // Panggil di sini — #nav-services-list sudah ada di DOM
    loadServicesMenu();
    loadProductsMenu();
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
          <a href="/contact-us" class="btn btn-white btn-circle-primary | not-lg:hidden" data-hover-effect>
            Kontak Kami
            <svg class="icon icon-stroke circle-icon circle-right icon-up-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 6.5L6 18" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 6H18V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <div class="absolute inset-0 w-min transition-all duration-800 ease-custom [.is-dark_&]:opacity-0 [.is-dark_&]:invisible [.is-sticky_&,.is-hover-menu_&]:opacity-100 [.is-sticky_&,.is-hover-menu_&]:visible">
          <a href="/contact-us" class="btn btn-primary btn-circle-white | not-lg:hidden" data-hover-effect>
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
          <a href="/contact-us" class="btn btn-white btn-circle-primary | not-lg:hidden" data-hover-effect>
            Kontak Kami
            <svg class="icon icon-stroke circle-icon circle-right icon-up-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 6.5L6 18" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 6H18V16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <div class="absolute inset-0 w-min transition-all duration-800 ease-custom [.is-dark_&]:opacity-0 [.is-dark_&]:invisible [.is-sticky_&,.is-hover-menu_&]:opacity-100 [.is-sticky_&,.is-hover-menu_&]:visible">
          <a href="/contact-us" class="btn btn-primary btn-circle-white | not-lg:hidden" data-hover-effect>
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
  initSectionHeader(); // loadServicesMenu() dipanggil di dalam setelah prepend
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

window.addEventListener("avatar:updated", () => {
  // Cache sudah di-set di _profile.js sebelum event ini di-dispatch
  // Cukup re-render header dengan data terbaru
  checkLoginPage();
});
