import barba from "@barba/core";

let footerData = null;
const BASE_URL = import.meta.env.PUBLIC_API_URL;

export const apiGet = async (url) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("apiGet error:", err);
    return null;
  }
};

// ─── SVG Icons per platform ───────────────────────────────────────────────────
const SOCIAL_ICONS = {
  instagram: `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0572 1.75H11.9428C9.7521 1.74999 8.03143 1.74998 6.68802 1.93059C5.31137 2.11568 4.21911 2.50271 3.36091 3.36091C2.50272 4.21911 2.11568 5.31137 1.93059 6.68802C1.74998 8.03144 1.74999 9.7521 1.75 11.9428V12.0572C1.74999 14.2479 1.74998 15.9686 1.93059 17.312C2.11568 18.6886 2.50272 19.7809 3.36091 20.6391C4.21911 21.4973 5.31137 21.8843 6.68802 22.0694C8.03144 22.25 9.7521 22.25 11.9428 22.25H12.0572C14.2479 22.25 15.9686 22.25 17.312 22.0694C18.6886 21.8843 19.7809 21.4973 20.6391 20.6391C21.4973 19.7809 21.8843 18.6886 22.0694 17.312C22.25 15.9686 22.25 14.2479 22.25 12.0572V11.9428C22.25 9.7521 22.25 8.03144 22.0694 6.68802C21.8843 5.31137 21.4973 4.21911 20.6391 3.36091C19.7809 2.50271 18.6886 2.11568 17.312 1.93059C15.9686 1.74998 14.2479 1.74999 12.0572 1.75ZM16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12ZM17.5123 7.5C18.0621 7.5 18.5078 7.05229 18.5078 6.5C18.5078 5.94772 18.0621 5.5 17.5123 5.5H17.5033C16.9535 5.5 16.5078 5.94772 16.5078 6.5C16.5078 7.05228 16.9535 7.5 17.5033 7.5H17.5123Z" fill="#141B34"/>
  </svg>`,

  facebook: `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55869 10.2083C4.47617 10.2083 4.25024 10.4146 4.25024 11.4028V13.1944C4.25024 14.1826 4.47617 14.3889 5.55869 14.3889H8.17557V21.5556C8.17557 22.5438 8.40149 22.75 9.48401 22.75H12.1009C13.1834 22.75 13.4093 22.5438 13.4093 21.5556V14.3889H16.3477C17.1687 14.3889 17.3803 14.2432 17.6058 13.5226L18.1666 11.7309C18.5529 10.4965 18.3148 10.2083 16.9085 10.2083H13.4093V7.22222C13.4093 6.56255 13.9951 6.02778 14.7178 6.02778H18.4418C19.5243 6.02778 19.7502 5.82154 19.7502 4.83333V2.44444C19.7502 1.45624 19.5243 1.25 18.4418 1.25H14.7178C11.1046 1.25 8.17557 3.92386 8.17557 7.22222V10.2083H5.55869Z" fill="#141B34"/>
  </svg>`,

  tiktok: `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.8218 5.1344C16.0887 4.29394 15.648 3.19805 15.648 2H14.7293M16.8218 5.1344C17.4949 5.90685 18.3818 6.48444 19.3993 6.72285C19.7878 6.81466 20.1925 6.86282 20.6073 6.86282V10.2502C18.7426 10.2502 17.013 9.65198 15.5954 8.63892L15.648 15.2402C15.648 18.9623 12.6502 21.9726 8.94413 21.9726C7.52547 21.9726 6.20834 21.5267 5.13446 20.7574C3.75917 19.7652 2.83203 18.2247 2.83203 16.4684C2.83203 13.3181 5.52373 10.6264 8.67403 10.3764M16.8218 5.1344C16.8039 5.12276 16.7861 5.11105 16.7684 5.09927M7.96558 18.134C7.23255 17.6271 6.75024 16.7837 6.75024 15.8275C6.75024 14.2312 8.04618 12.9352 9.64249 12.9352C9.94802 12.9352 10.2429 12.9816 10.5207 13.0668V9.60095V6.48012C9.94321 6.39787 9.35261 6.35499 8.75238 6.35499C7.06992 6.35499 5.49766 6.81853 4.14719 7.62684" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  youtube: `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 12C1.75 8.18672 1.75 6.28009 2.68519 4.98754C3.00873 4.54044 3.40611 4.1541 3.86338 3.83886C5.1765 2.93128 7.11762 2.84951 11 2.75695V2.75C14.8824 2.84951 16.8235 2.93128 18.1366 3.83886C18.5939 4.1541 18.9913 4.54044 19.3148 4.98754C20.25 6.28009 20.25 8.18672 20.25 12C20.25 15.8133 20.25 17.7199 19.3148 19.0125C18.9913 19.4596 18.5939 19.8459 18.1366 20.1611C16.8235 21.0687 14.8824 21.1505 11 21.25C7.11762 21.1505 5.1765 21.0687 3.86338 20.1611C3.40611 19.8459 3.00873 19.4596 2.68519 19.0125C1.75 17.7199 1.75 15.8133 1.75 12ZM14.8561 12.7004L10.4561 15.4504C9.78192 15.8654 9.25 15.5135 9.25 14.75V9.25C9.25 8.48651 9.78192 8.13459 10.4561 8.54963L14.8561 11.2996C15.5076 11.6998 15.5076 12.3002 14.8561 12.7004Z" fill="#141B34"/>
  </svg>`,

  "x (twitter)": `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.3569 2.78113C2.52359 2.45513 2.85886 2.25 3.225 2.25H8.1C8.41308 2.25 8.70711 2.40034 8.89041 2.65415L13.5354 9.08571L20.0856 2.53557C20.4663 2.15481 21.0837 2.15481 21.4644 2.53557C21.8452 2.91633 21.8452 3.53367 21.4644 3.91443L14.6919 10.687L21.5654 20.2041C21.7798 20.501 21.8098 20.8929 21.6431 21.2189C21.4764 21.5449 21.1411 21.75 20.775 21.75H15.9C15.5869 21.75 15.2929 21.5997 15.1096 21.3459L10.4646 14.9143L3.91443 21.4644C3.53367 21.8452 2.91634 21.8452 2.53557 21.4644C2.15481 21.0837 2.15481 20.4663 2.53557 20.0856L9.30811 13.313L2.43459 3.79585C2.22022 3.49903 2.19021 3.10713 2.3569 2.78113Z" fill="#141B34"/>
  </svg>`,

  twitter: `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.3569 2.78113C2.52359 2.45513 2.85886 2.25 3.225 2.25H8.1C8.41308 2.25 8.70711 2.40034 8.89041 2.65415L13.5354 9.08571L20.0856 2.53557C20.4663 2.15481 21.0837 2.15481 21.4644 2.53557C21.8452 2.91633 21.8452 3.53367 21.4644 3.91443L14.6919 10.687L21.5654 20.2041C21.7798 20.501 21.8098 20.8929 21.6431 21.2189C21.4764 21.5449 21.1411 21.75 20.775 21.75H15.9C15.5869 21.75 15.2929 21.5997 15.1096 21.3459L10.4646 14.9143L3.91443 21.4644C3.53367 21.8452 2.91634 21.8452 2.53557 21.4644C2.15481 21.0837 2.15481 20.4663 2.53557 20.0856L9.30811 13.313L2.43459 3.79585C2.22022 3.49903 2.19021 3.10713 2.3569 2.78113Z" fill="#141B34"/>
  </svg>`,

  whatsapp: `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 13.8397 2.49933 15.5636 3.37046 17.0412L2.05735 21.4155C1.92586 21.8488 2.31607 22.2571 2.75442 22.1461L7.32105 20.9843C8.75212 21.7961 10.3693 22.25 12.0872 22.25C17.558 22.25 22 17.7844 22 12.25C22 6.72715 17.5228 2 12 2ZM8.4375 7.5C8.22 7.5 7.875 7.5825 7.575 7.9125C7.275 8.2425 6.375 9.0825 6.375 10.7925C6.375 12.5025 7.6 14.1525 7.7625 14.3775C7.925 14.6025 10.2125 18.2775 13.7375 19.7025C16.6625 20.895 17.2625 20.67 17.9 20.61C18.5375 20.55 19.9625 19.77 20.2325 18.96C20.5025 18.15 20.5025 17.46 20.42 17.31C20.3375 17.1625 20.1125 17.0825 19.775 16.9225C19.4375 16.7625 17.75 15.9225 17.45 15.8175C17.15 15.7125 16.925 15.66 16.7 15.99C16.475 16.32 15.8 17.085 15.6 17.31C15.4 17.535 15.2 17.5625 14.8625 17.4025C14.525 17.2425 13.4375 16.8825 12.1625 15.7425C11.175 14.865 10.4875 13.785 10.2875 13.4475C10.0875 13.11 10.2675 12.9275 10.4275 12.7675C10.57 12.6225 10.7625 12.39 10.925 12.1875C11.0875 11.985 11.1425 11.8425 11.2475 11.6175C11.3525 11.3925 11.3 11.19 11.2175 11.0325C11.135 10.875 10.4675 9.15 10.1825 8.475C9.9125 7.8225 9.635 7.9125 9.425 7.905C9.2275 7.8975 9.0025 7.8975 8.7775 7.8975L8.4375 7.5Z" fill="#141B34"/>
  </svg>`,

  linkedin: `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 9H4.5C3.55719 9 3.08579 9 2.79289 9.29289C2.5 9.58579 2.5 10.0572 2.5 11V19.5C2.5 20.4428 2.5 20.9142 2.79289 21.2071C3.08579 21.5 3.55719 21.5 4.5 21.5H5C5.94281 21.5 6.41421 21.5 6.70711 21.2071C7 20.9142 7 20.4428 7 19.5V11C7 10.0572 7 9.58579 6.70711 9.29289C6.41421 9 5.94281 9 5 9Z" fill="#141B34"/>
    <path d="M7 4.75C7 5.99264 5.99264 7 4.75 7C3.50736 7 2.5 5.99264 2.5 4.75C2.5 3.50736 3.50736 2.5 4.75 2.5C5.99264 2.5 7 3.50736 7 4.75Z" fill="#141B34"/>
    <path d="M11.826 9H11C10.0572 9 9.58579 9 9.29289 9.29289C9 9.58579 9 10.0572 9 11V19.5C9 20.4428 9 20.9142 9.29289 21.2071C9.58579 21.5 10.0572 21.5 11 21.5H11.5C12.4428 21.5 12.9142 21.5 13.2071 21.2071C13.5 20.9142 13.5 20.4428 13.5 19.5L13.5001 16.0001C13.5001 14.3433 14.0281 13.0001 15.5879 13.0001C16.3677 13.0001 17 13.6717 17 14.5001V19.0001C17 19.9429 17 20.4143 17.2929 20.7072C17.5857 21.0001 18.0572 21.0001 19 21.0001H19.4987C20.4413 21.0001 20.9126 21.0001 21.2055 20.7073C21.4984 20.4145 21.4985 19.9432 21.4987 19.0006L21.5001 13.5002C21.5001 11.015 19.1364 9.00024 16.7968 9.00024C15.4649 9.00024 14.2767 9.65309 13.5001 10.674C13.5 10.0439 13.5 9.72893 13.3632 9.495C13.2765 9.34686 13.1531 9.22353 13.005 9.13687C12.7711 9 12.4561 9 11.826 9Z" fill="#141B34"/>
  </svg>`,

  github: `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 16.4183 4.87398 20.1591 8.84271 21.4895C9.34268 21.5811 9.52768 21.2735 9.52768 21.0107C9.52768 20.7748 9.51885 20.0891 9.51466 19.2723C6.74527 19.8779 6.15824 18.0057 6.15824 18.0057C5.70297 16.8427 5.04418 16.5365 5.04418 16.5365C4.13535 15.9148 5.11328 15.9268 5.11328 15.9268C6.11914 15.9967 6.64967 16.9645 6.64967 16.9645C7.54297 18.5028 8.97021 18.0533 9.54599 17.8002C9.63574 17.1536 9.89697 16.7047 10.1846 16.4512C7.97803 16.195 5.65430 15.3445 5.65430 11.5288C5.65430 10.4253 6.04883 9.52344 6.66992 8.82031C6.56836 8.56348 6.22168 7.53418 6.76660 6.14453C6.76660 6.14453 7.60938 5.87109 9.50244 7.17871C10.2942 6.95508 11.1504 6.8418 12.0000 6.83789C12.8496 6.8418 13.7061 6.95508 14.4990 7.17871C16.3906 5.87109 17.2334 6.14453 17.2334 6.14453C17.7783 7.53418 17.4316 8.56348 17.3301 8.82031C17.9521 9.52344 18.3447 10.4253 18.3447 11.5288C18.3447 15.3545 16.0166 16.1924 13.8027 16.4434C14.1592 16.7559 14.4766 17.3721 14.4766 18.3096C14.4766 19.6494 14.4648 20.7334 14.4648 21.0107C14.4648 21.2754 14.6475 21.5854 15.1553 21.4883C19.1289 20.1562 22 16.4141 22 12C22 6.47715 17.5228 2 12 2Z" fill="#141B34"/>
  </svg>`,

  threads: `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.3 10.45C19.18 10.39 19.07 10.33 18.95 10.28C18.72 7.13 16.97 5.35 14.15 5.33H14.12C12.43 5.33 11 6.04 10.1 7.32L11.46 8.27C12.12 7.31 13.14 6.87 14.12 6.87C15.67 6.87 16.81 7.69 17.26 9.09C16.68 8.98 16.05 8.93 15.38 8.96C12.67 9.1 10.9 10.6 11.02 12.75C11.09 13.85 11.65 14.79 12.59 15.38C13.38 15.88 14.41 16.12 15.48 16.06C16.9 15.98 18.01 15.44 18.77 14.46C19.35 13.71 19.71 12.74 19.86 11.51C20.37 11.83 20.75 12.26 20.96 12.81C21.31 13.75 21.33 15.24 20.17 16.47C19.16 17.54 17.7 18.02 15.43 18.03C12.88 18.02 10.97 17.18 9.74 15.53C8.58 13.97 7.99 11.71 7.97 8.82C7.99 5.93 8.58 3.67 9.74 2.11C10.97 0.46 12.88 -0.38 15.43 -0.39C17.99 -0.38 19.93 0.47 21.19 2.12C21.81 2.93 22.27 3.94 22.59 5.11L24 4.73C23.61 3.32 23.04 2.11 22.28 1.11C20.71 -0.92 18.38 -1.97 15.43 -1.97C12.48 -1.97 10.17 -0.91 8.6 1.13C7.19 2.97 6.48 5.57 6.47 8.82C6.48 12.07 7.19 14.67 8.6 16.51C10.17 18.55 12.48 19.61 15.43 19.61C18 19.6 19.87 18.99 21.2 17.59C22.89 15.82 22.84 13.6 22.27 12.08C21.86 11.01 21.06 10.15 19.3 10.45ZM15.4 14.53C14.01 14.61 12.58 13.97 12.51 12.66C12.46 11.68 13.27 10.59 15.45 10.47C15.69 10.46 15.92 10.46 16.14 10.46C16.86 10.46 17.53 10.53 18.14 10.68C17.87 13.48 16.71 14.46 15.4 14.53Z" fill="#141B34"/>
  </svg>`,
};

// Fallback icon untuk platform yang belum terdaftar
const FALLBACK_ICON = `<svg class="icon icon-fill icon-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 3a7 7 0 1 1 0 14A7 7 0 0 1 12 5Zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1 4v6h2v-6h-2Z" fill="#141B34"/>
</svg>`;

// Resolve icon berdasarkan platform_name (case-insensitive)
function getSocialIcon(platformName) {
  const key = platformName.toLowerCase().trim();
  return SOCIAL_ICONS[key] ?? FALLBACK_ICON;
}

// Render deretan tombol sosial media dari array socials
function renderSocials(socials) {
  if (!socials || socials.length === 0) return "";

  return socials
    .slice()
    .sort((a, b) => a.position - b.position)
    .map(
      (s) => `
      <a
        href="${s.url}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${s.platform_name}"
        class="btn btn-icon btn-white btn-outline [--ring-color:rgba(255,255,255,0.4)]"
        data-hover-effect
        data-tooltip="${s.account_name}"
        data-tooltip-placement="top"
      >
        ${getSocialIcon(s.platform_name)}
      </a>
    `,
    )
    .join("");
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export const initSectionFooter = async () => {
  if (!footerData) {
    try {
      const resp = await apiGet("/api/footers");
      if (!resp) return;
      footerData = resp.data;
    } catch (err) {
      console.error("Failed fetch footer:", err);
      return;
    }
  }

  const sectionFooter = document.createElement("footer");
  sectionFooter.id = "section-footer";
  sectionFooter.className =
    "relative isolate bg-gradient-to-b from-dark-950 via-primary-900 to-primary-600 overflow-clip mt-16";

  const renderServices = () =>
    footerData.services
      .map(
        (s) => `
        <li>
          <a href="/service/${s.slug}" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 hover:text-white">
            ${s.title}
          </a>
        </li>
      `,
      )
      .join("");

  const renderProducts = () =>
    footerData.products
      .map(
        (p) => `
        <li>
          <a href="/product/${p.slug}" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 hover:text-white">
            ${p.title}
          </a>
        </li>
      `,
      )
      .join("");

  sectionFooter.innerHTML = `
    <section class="py-16 | lg:py-24 2xl:pt-32">
      <div class="max-container">
        <div class="grid gap-16 | lg:grid-cols-12">
          <div class="col-span-full | lg:col-span-3">
            <div class="flex flex-col gap-16 | not-lg:items-center not-lg:text-center">
              <a href="./" class="inline-flex items-center flex-nowrap gap-3">
                <div class="size-11 shrink-0">
                  <img src="/assets/images/logo/logo-icon.png" alt="RUN8" class="size-full object-contain">
                </div>
                <div class="flex flex-col text-base leading-none uppercase font-extrabold whitespace-nowrap text-white">
                  <div>Radar Utama</div>
                  <div>Nusantara Lapan</div>
                </div>
              </a>
              <div class="flex flex-col gap-6 not-lg:items-center not-lg:text-center">
                <address class="not-italic text-sm font-bold uppercase text-white">
                  <p>${footerData.company.address}</p>
                </address>
                <a href="${footerData.company.maps_url}" target="_blank"
                  class="link inline-block w-fit text-sm font-bold uppercase text-white">
                  Get Direction
                </a>
              </div>
            </div>
          </div>
          <div class="col-span-full | lg:col-span-9">
            <div class="grid gap-16 | lg:grid-cols-3">
              <div class="col-span-full | lg:col-span-1">
                <div class="flex flex-col gap-8 | not-lg:items-center not-lg:text-center">
                  <div class="w-full text-sm font-bold uppercase tracking-wide text-white py-4 border-b-[0.5px] border-white">Quick Link</div>
                  <ul class="flex flex-col gap-1">
                    <li><a href="/about-us" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Tentang Kami</a></li>
                    <li><a href="/blog" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Berita</a></li>
                    <li><a href="/gallery" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Gallery</a></li>
                    <li><a href="/faqs" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">FAQ</a></li>
                    <li><a href="/privacy-policy" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Privacy Policy</a></li>
                    <li><a href="/term-condition" class="text-sm font-bold uppercase tracking-wide link link-reverse text-white/70 [--link-underline:white] hover:text-white">Term & Condition</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-span-full | lg:col-span-1">
                <div class="flex flex-col gap-8 | not-lg:items-center not-lg:text-center">
                  <div class="w-full text-sm font-bold uppercase tracking-wide text-white py-4 border-b-[0.5px] border-white">Layanan Kami</div>
                  <ul>${renderServices()}</ul>
                </div>
              </div>
              <div class="col-span-full | lg:col-span-1">
                <div class="flex flex-col gap-8 | not-lg:items-center not-lg:text-center">
                  <div class="w-full text-sm font-bold uppercase tracking-wide text-white py-4 border-b-[0.5px] border-white">Produk Kami</div>
                  <ul>${renderProducts()}</ul>
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
            <div class="flex items-center gap-2 flex-wrap | not-lg:justify-center">
              ${renderSocials(footerData.socials)}
            </div>
          </div>
          <div class="col-span-full | lg:col-span-3 lg:col-start-10">
            <div class="flex flex-col items-center text-center gap-2 | lg:items-end lg:text-end">
              <div class="text-sm font-bold uppercase tracking-wide text-white/70">© 2025</div>
              <div class="flex flex-col h2 leading-[0.9] text-white | not-lg:items-center not-lg:text-center">
                <div>Radar Utama</div>
                <div>Nusantara Lapan</div>
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
