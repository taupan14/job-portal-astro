// src/scripts/form/_jobs.js
import { showModal, hideModal } from "@js/_modal";

const API_URL = import.meta.env.PUBLIC_API_URL;
let count = 0;

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Bind form search → redirect ke /jobs via barba.go()
 */
const bindSearchForm = (container, formSelector, submitBtnSelector) => {
  const form = container.querySelector(formSelector);
  if (!form) return;

  // Clone untuk hapus event listener lama (hindari double-bind saat Barba navigate)
  const freshForm = form.cloneNode(true);
  form.parentNode.replaceChild(freshForm, form);

  // const freshSubmitBtn = container.querySelector(submitBtnSelector);
  const freshSubmitBtn = freshForm.querySelector(submitBtnSelector);
  freshSubmitBtn?.addEventListener("click", () => freshForm.requestSubmit());

  count = 0;
  freshForm.addEventListener("submit", (e) => {
    e.preventDefault();

    count++;
    if (count > 1) return;

    const params = new URLSearchParams();
    const keyword =
      freshForm.querySelector("#input-keyword")?.value.trim() ?? "";
    const province = freshForm.querySelector("#select-province")?.value ?? "";
    const category = freshForm.querySelector("#select-category")?.value ?? "";

    if (keyword) params.set("q", keyword);
    if (province) params.set("province", province);
    if (category) params.set("category", category);
    params.set("page", "1");

    const query = params.toString();
    const href = `/jobs${query ? `?${query}` : ""}`;

    goTo(href);
  });
};

// ─── Per-page inits ───────────────────────────────────────────────────────────

/**
 * Homepage (data-barba-namespace="home")
 */
const initHomeSearch = (container) => {
  bindSearchForm(container, "[data-search-home]", "[data-search-home-submit]");
};

/**
 * Halaman jobs list (data-barba-namespace="jobs")
 */
const initJobsSearch = (container) => {
  bindSearchForm(container, "[data-search-jobs]", "[data-search-jobs-submit]");
};

/**
 * Halaman jobs detail (data-barba-namespace="jobs-detail")
 */
const initJobsDetail = (container) => {
  // const token = localStorage.getItem("auth_token");
  // const isLoggedIn = !!token;

  const isLoggedIn = container.dataset.loggedIn === "true";
  const token = localStorage.getItem("auth_token");

  const vacancyId = container.dataset.vacancyId;
  const pageUrl = container.dataset.pageUrl ?? window.location.href;
  const pageTitle = container.dataset.pageTitle ?? document.title;

  // ── Apply button ────────────────────────────────────────────────────────────
  const applyBtn = container.querySelector("[data-apply-btn]");
  if (applyBtn) {
    // ✅ Clone untuk hapus event listener lama
    const freshApplyBtn = applyBtn.cloneNode(true);
    applyBtn.parentNode.replaceChild(freshApplyBtn, applyBtn);

    freshApplyBtn.addEventListener("click", () => {
      if (!isLoggedIn) {
        const loginModal = document.getElementById("modal-cari-loker");
        if (loginModal) showModal(loginModal);
        return;
      }

      const title = freshApplyBtn.dataset.vacancyTitle ?? "";
      const company = freshApplyBtn.dataset.company ?? "";
      const modalTitle = document.getElementById("modal-apply-title");
      const modalDesc = document.getElementById("modal-apply-desc");
      if (modalTitle) modalTitle.textContent = `Lamar "${title}"?`;
      if (modalDesc)
        modalDesc.textContent = `Anda akan melamar posisi ${title} di ${company}. Pastikan data profil Anda sudah lengkap.`;

      const confirmModal = document.getElementById("modal-apply-confirm");
      if (confirmModal) showModal(confirmModal);
    });
  }

  // ── Confirm apply ───────────────────────────────────────────────────────────
  // ✅ Gunakan container.querySelector + document fallback,
  //    dan clone untuk hapus listener lama
  const confirmBtnRaw = document.querySelector("[data-apply-confirm-btn]");
  if (confirmBtnRaw) {
    const confirmBtn = confirmBtnRaw.cloneNode(true);
    confirmBtnRaw.parentNode.replaceChild(confirmBtn, confirmBtnRaw);

    confirmBtn.addEventListener("click", async () => {
      confirmBtn.textContent = "Mengirim...";
      confirmBtn.setAttribute("disabled", "true");

      try {
        const res = await fetch(`${API_URL}/api/applies/${vacancyId}/apply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          const confirmModal = document.getElementById("modal-apply-confirm");
          if (confirmModal) hideModal(confirmModal);

          const btnWrap = document
            .querySelector("[data-apply-btn]")
            ?.closest("div.flex");
          if (btnWrap) {
            btnWrap.innerHTML = `
              <div class="flex items-center gap-3 p-4 rounded-lg bg-primary-50 ring-1 ring-primary-200">
                <svg class="icon icon-fill text-primary-600 size-5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM16.5303 10.0303C16.8232 9.73744 16.8232 9.26256 16.5303 8.96967C16.2374 8.67678 15.7626 8.67678 15.4697 8.96967L11 13.4393L8.53033 10.9697C8.23744 10.6768 7.76256 10.6768 7.46967 10.9697C7.17678 11.2626 7.17678 11.7374 7.46967 12.0303L10.4697 15.0303C10.7626 15.3232 11.2374 15.3232 11.5303 15.0303L16.5303 10.0303Z" fill="currentColor"/>
                </svg>
                <p class="text-sm font-semibold text-primary-600">Lamaran berhasil dikirim!</p>
              </div>`;
          }
        } else if (data.already_applied) {
          const confirmModal = document.getElementById("modal-apply-confirm");
          if (confirmModal) hideModal(confirmModal);
        } else {
          confirmBtn.textContent = "Ya, Lamar Sekarang";
          confirmBtn.removeAttribute("disabled");
          alert(data.message ?? "Gagal mengirim lamaran");
        }
      } catch (err) {
        console.error("[apply]", err);
        confirmBtn.textContent = "Ya, Lamar Sekarang";
        confirmBtn.removeAttribute("disabled");
      }
    });
  }

  // ── Share button ────────────────────────────────────────────────────────────
  const shareBtnRaw = container.querySelector("[data-share-btn]");
  if (shareBtnRaw) {
    // ✅ Clone untuk hapus event listener lama
    const shareBtn = shareBtnRaw.cloneNode(true);
    shareBtnRaw.parentNode.replaceChild(shareBtn, shareBtnRaw);

    shareBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: pageTitle, url: pageUrl });
          return;
        } catch (err) {
          if (err instanceof Error && err.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(pageUrl);
        const original = shareBtn.getAttribute("data-tooltip");
        shareBtn.setAttribute("data-tooltip", "Link disalin!");
        setTimeout(
          () => shareBtn.setAttribute("data-tooltip", original ?? "Share"),
          2000,
        );
      } catch {
        prompt("Salin link berikut:", pageUrl);
      }
    });
  }
};

const goTo = (href) => {
  if (window.barba) {
    // console.log("using barba.go");
    window.barba.go(href);
  } else {
    // console.log("fallback location.href");
    window.location.href = href;
  }
};

// ─── Entry point ──────────────────────────────────────────────────────────────

/**
 * Dipanggil dari _main.js di barba enter & once.
 * Otomatis deteksi namespace halaman mana yang aktif.
 */
export const initJobsPage = (container) => {
  if (!container) return;

  const namespace = container.dataset.barbaNamespace;
  if (namespace === "home") {
    initHomeSearch(container);
  }

  if (namespace === "jobs") {
    initJobsSearch(container);
  }

  if (namespace === "jobs-detail") {
    initJobsDetail(container);
  }
};
