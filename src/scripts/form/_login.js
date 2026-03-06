// src/scripts/_login.js

const BASE_URL = import.meta.env.PUBLIC_API_URL;

// ── Inject keyframe spin sekali ke <head> ─────────────────────────────────────
const injectSpinnerStyle = () => {
  if (document.getElementById("login-spinner-style")) return;
  const style = document.createElement("style");
  style.id = "login-spinner-style";
  style.textContent = `
    @keyframes login-spin {
      to { transform: rotate(360deg); }
    }
    .login-spinner {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: login-spin 0.6s linear infinite;
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);
};

// ── Set state loading pada tombol submit ──────────────────────────────────────
const setSubmitLoading = (btn, loading) => {
  if (!btn) return;
  if (loading) {
    btn.disabled = true;
    btn.dataset.originalHtml = btn.innerHTML;
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.gap = "0.5rem";
    btn.innerHTML = `<span class="login-spinner"></span>Memproses...`;
  } else {
    btn.disabled = false;
    btn.style.display = "";
    btn.style.alignItems = "";
    btn.style.justifyContent = "";
    btn.style.gap = "";
    if (btn.dataset.originalHtml) {
      btn.innerHTML = btn.dataset.originalHtml;
      delete btn.dataset.originalHtml;
    }
  }
};

// ── Tampilkan pesan error di dalam modal ──────────────────────────────────────
const showLoginError = (form, message) => {
  let el = form.querySelector("[data-login-error]");
  if (!el) {
    el = document.createElement("div");
    el.setAttribute("data-login-error", "");
    el.style.cssText =
      "font-size:.875rem;font-weight:500;color:#ef4444;background:#fef2f2;padding:.75rem 1rem;border-radius:.5rem;margin-bottom:.5rem;";
    const submitBtn = form.querySelector("[type='submit']");
    submitBtn?.parentElement?.insertBefore(el, submitBtn);
  }
  el.textContent = message;
  el.style.display = "block";
};

const clearLoginError = (form) => {
  const el = form.querySelector("[data-login-error]");
  if (el) el.style.display = "none";
};

// ── Inisialisasi form login di dalam modal ────────────────────────────────────
export const initLoginModal = () => {
  const modal = document.getElementById("modal-cari-loker");
  if (!modal) return;

  if (modal.dataset.loginInit === "true") return;
  modal.dataset.loginInit = "true";

  injectSpinnerStyle();

  const form = modal.querySelector("form[data-login-form]");
  const inputEmail = form?.querySelector("input[name='input-email']");
  const inputPassword = form?.querySelector("input[name='input-password']");
  const submitBtn = form?.querySelector("[type='submit']");

  if (!form || !inputEmail || !inputPassword) return;

  form.removeAttribute("action");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearLoginError(form);

    const email = inputEmail.value.trim();
    const password = inputPassword.value;

    if (!email || !password) {
      showLoginError(form, "Email dan password wajib diisi.");
      return;
    }

    setSubmitLoading(submitBtn, true);

    try {
      const res = await fetch(`${BASE_URL}/api/applicants/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.message ?? "Email atau password salah.");
      }

      // ── Simpan sesi ──────────────────────────────────────────────────
      if (json.token) {
        localStorage.setItem("auth_token", json.token);
        localStorage.setItem("auth_user", JSON.stringify(json.applicant));
        document.cookie = `auth_token=${json.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

        if (json.applicant?.avatar) {
          localStorage.setItem("avatar_cache", json.applicant.avatar);
          document.cookie = `avatar_cache=${json.applicant.avatar}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        }
      }

      // ── Tutup modal & refresh header ─────────────────────────────────
      const modalEl = document.getElementById("modal-cari-loker");
      if (modalEl) {
        if (typeof window.hideModal === "function") {
          window.hideModal(modalEl);
        } else {
          modalEl.classList.add("invisible");
        }
      }

      window.dispatchEvent(new CustomEvent("avatar:updated"));

      setTimeout(() => {
        window.location.href = "/profile";
      }, 300);
    } catch (err) {
      showLoginError(form, err.message ?? "Terjadi kesalahan. Coba lagi.");
      setSubmitLoading(submitBtn, false);
    }
  });

  [inputEmail, inputPassword].forEach((el) => {
    el?.addEventListener("input", () => clearLoginError(form));
  });
};
