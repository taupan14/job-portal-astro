// src/scripts/logout.js
// ─────────────────────────────────────────────────────────────────────────────
// Modal konfirmasi logout
// Cara pakai: import { initLogoutModal, handleLogout } from "./logout.js"
//
// 1. Panggil initLogoutModal() sekali saat DOM ready (atau di barba.hooks.once)
// 2. Ganti semua [data-logout-btn] handler dengan handleLogout()
// ─────────────────────────────────────────────────────────────────────────────

// ── Inject modal HTML ke body (hanya sekali) ──────────────────────────────────
export const initLogoutModal = () => {
  if (document.getElementById("logout-modal")) return; // sudah ada

  const modal = document.createElement("div");
  modal.id = "logout-modal";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", "logout-modal-title");

  modal.innerHTML = `
    <div
      id="logout-modal-backdrop"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style="background:rgba(0,0,0,0.45);backdrop-filter:blur(4px);"
    >
      <div
        id="logout-modal-box"
        class="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
        style="transform:scale(0.95);opacity:0;transition:transform 0.25s cubic-bezier(.34,1.56,.64,1),opacity 0.2s ease;"
      >
        <!-- Icon -->
        <div class="flex justify-center pt-8 pb-4">
          <div class="flex items-center justify-center size-16 rounded-full bg-red-50">
            <svg class="size-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M12.85 4C8.03858 4 4.25 7.64154 4.25 12C4.25 16.3585 8.03858 20 12.85 20C13.2801 20 13.7022 19.9707 14.1143 19.9142C14.6615 19.8393 15.1658 20.2221 15.2407 20.7693C15.3157 21.3164 14.9329 21.8208 14.3857 21.8957C13.8838 21.9645 13.371 22 12.85 22C7.05756 22 2.25 17.5827 2.25 12C2.25 6.41734 7.05756 2 12.85 2C13.371 2 13.8838 2.03552 14.3857 2.10427C14.9329 2.17922 15.3157 2.68355 15.2407 3.23073C15.1658 3.7779 14.6615 4.16072 14.1143 4.08576C13.7022 4.02931 13.2801 4 12.85 4Z" fill="currentColor"/>
              <path d="M10.75 13.0059C10.1977 13.0059 9.75 12.5581 9.75 12.0059C9.75 11.4536 10.1977 11.0059 10.75 11.0059L17.25 11.0059L17.25 10.4116C17.2499 10.236 17.2497 10.0203 17.2718 9.84387C17.288 9.71408 17.3598 9.13804 17.9254 8.86368C18.4923 8.58872 18.9924 8.89065 19.1006 8.95597L19.5691 9.29511C19.9449 9.58975 20.4594 9.99545 20.8504 10.3759C21.0455 10.5657 21.2467 10.783 21.4056 11.0139C21.5468 11.2191 21.75 11.5693 21.75 12C21.75 12.4307 21.5468 12.7809 21.4056 12.9861C21.2467 13.217 21.0455 13.4343 20.8504 13.6241C20.4594 14.0046 19.9449 14.4102 19.5691 14.7049L19.1006 15.044C18.9924 15.1093 18.4922 15.4113 17.9254 15.1363C17.3598 14.862 17.288 14.2859 17.2722 14.1595C17.2497 13.9797 17.2499 13.764 17.25 13.5884L17.25 13.0059L10.75 13.0059Z" fill="currentColor"/>
            </svg>
          </div>
        </div>

        <!-- Text -->
        <div class="text-center px-8 pb-6">
          <h5 id="logout-modal-title" class="text-dark-950 mb-2">Keluar dari Akun?</h5>
          <p class="text-sm font-medium text-dark-400">
            Sesi kamu akan diakhiri. Kamu perlu login kembali untuk mengakses akun.
          </p>
        </div>

        <!-- Actions -->
        <div class="grid grid-cols-2 border-t border-dark-100">
          <button
            type="button"
            id="logout-modal-cancel"
            class="py-4 text-sm font-bold text-dark-400 transition-colors hover:text-dark-950 hover:bg-dark-50 border-r border-dark-100"
          >
            Batal
          </button>
          <button
            type="button"
            id="logout-modal-confirm"
            class="py-4 text-sm font-bold text-red-500 transition-colors hover:text-red-600 hover:bg-red-50"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  `;

  // Sembunyikan dulu sebelum di-append
  modal.style.display = "none";
  document.body.appendChild(modal);

  // ── Event listeners modal ───────────────────────────────────────────────
  const backdrop = modal.querySelector("#logout-modal-backdrop");
  const box = modal.querySelector("#logout-modal-box") as HTMLElement;
  const btnCancel = modal.querySelector("#logout-modal-cancel");
  const btnConfirm = modal.querySelector("#logout-modal-confirm");

  // Tutup saat klik backdrop (luar box)
  backdrop?.addEventListener("click", (e) => {
    if (e.target === backdrop) closeLogoutModal();
  });

  // Tutup saat tekan Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display !== "none") {
      closeLogoutModal();
    }
  });

  btnCancel?.addEventListener("click", closeLogoutModal);

  btnConfirm?.addEventListener("click", () => {
    // Jalankan animasi keluar dulu, baru eksekusi logout
    if (box) {
      box.style.transform = "scale(0.9)";
      box.style.opacity = "0";
    }
    setTimeout(() => {
      executeLogout();
    }, 180);
  });
};

// ── Buka modal ─────────────────────────────────────────────────────────────
export const openLogoutModal = () => {
  const modal = document.getElementById("logout-modal");
  const box = modal?.querySelector("#logout-modal-box") as HTMLElement | null;
  if (!modal) return;

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // cegah scroll background

  // Animasi masuk — sedikit delay agar display:block sudah teraplikasi
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (box) {
        box.style.transform = "scale(1)";
        box.style.opacity = "1";
      }
    });
  });
};

// ── Tutup modal ────────────────────────────────────────────────────────────
export const closeLogoutModal = () => {
  const modal = document.getElementById("logout-modal");
  const box = modal?.querySelector("#logout-modal-box") as HTMLElement | null;
  if (!modal) return;

  if (box) {
    box.style.transform = "scale(0.95)";
    box.style.opacity = "0";
  }

  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }, 200);
};

// ── Eksekusi logout (dipanggil setelah konfirmasi) ─────────────────────────
export const executeLogout = () => {
  // Hapus semua auth data
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  localStorage.removeItem("avatar_cache");

  // Hapus cookies
  document.cookie = "auth_token=;  path=/; max-age=0; SameSite=Lax";
  document.cookie = "avatar_cache=; path=/; max-age=0; SameSite=Lax";

  window.location.href = "/";
};

// ── Shortcut: panggil ini di data-logout-btn click handler ────────────────
export const handleLogout = () => {
  openLogoutModal();
};
