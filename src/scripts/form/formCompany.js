// src/scripts/form/formCompany.js
import gsap from "gsap";
import { showToast } from "@js/_toast";
import { initializeModals, showModal } from "@js/_modal";
import barba from "@barba/core";

const BASE_URL = import.meta.env.PUBLIC_API_URL;

// ── Circular Progress on Button ───────────────────────────────────────────────
const getSubmitBtn = () => document.querySelector("[data-submit-company]");

const showProgress = () => {
  const submitBtn = getSubmitBtn();
  if (!submitBtn) return;

  const btnIcon = submitBtn.querySelector(".btn-icon");
  if (!btnIcon) return;

  // Simpan icon asli
  btnIcon.dataset.originalHtml = btnIcon.innerHTML;

  // Ganti icon dengan circular spinner
  btnIcon.innerHTML = `
    <svg class="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5" stroke-opacity="0.3"/>
      <path d="M12 2C6.477 2 2 6.477 2 12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;

  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";
  submitBtn.style.pointerEvents = "none";
};

const completeProgress = () => {
  const submitBtn = getSubmitBtn();
  if (!submitBtn) return;

  const btnIcon = submitBtn.querySelector(".btn-icon");
  if (!btnIcon) return;

  // Ganti spinner dengan icon centang
  btnIcon.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13L9 17L19 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // Kembalikan ke icon asli setelah 1 detik
  setTimeout(() => {
    if (btnIcon.dataset.originalHtml) {
      btnIcon.innerHTML = btnIcon.dataset.originalHtml;
      delete btnIcon.dataset.originalHtml;
    }
    submitBtn.disabled = false;
    submitBtn.style.opacity = "";
    submitBtn.style.pointerEvents = "";
  }, 1000);
};

const failProgress = () => {
  const submitBtn = getSubmitBtn();
  if (!submitBtn) return;

  const btnIcon = submitBtn.querySelector(".btn-icon");
  if (!btnIcon) return;

  // Kembalikan ke icon asli langsung
  if (btnIcon.dataset.originalHtml) {
    btnIcon.innerHTML = btnIcon.dataset.originalHtml;
    delete btnIcon.dataset.originalHtml;
  }

  submitBtn.disabled = false;
  submitBtn.style.opacity = "";
  submitBtn.style.pointerEvents = "";
};

// ── Validasi ──────────────────────────────────────────────────────────────────
const requiredFields = [
  { id: "input-brand", label: "Nama Merek / Perusahaan" },
  { id: "input-name", label: "Nama Legalitas" },
  { id: "input-sector", label: "Bidang Usaha" },
  { id: "input-since", label: "Berdiri Sejak" },
  { id: "input-pic", label: "Nama PIC" },
  { id: "input-position", label: "Posisi PIC" },
  { id: "input-nohp", label: "Nomor Handphone" },
  { id: "input-email", label: "Alamat Email" },
  { id: "input-address", label: "Alamat Lengkap" },
  { id: "select-province", label: "Provinsi" },
  { id: "select-cityreg", label: "Kota/Kabupaten" },
  { id: "select-subdistrict", label: "Kecamatan" },
  { id: "select-ward", label: "Kelurahan" },
  { id: "input-postalcode", label: "Kodepos" },
];

const setFieldError = (el, hasError) => {
  const wrapper = el.closest(".c-form-wrapper");
  if (!wrapper) return;

  if (hasError) {
    wrapper.classList.add("is-error");
    if (!wrapper.querySelector(".field-error-msg")) {
      const msg = document.createElement("div");
      msg.className = "field-error-msg text-xs mt-1 text-red-500";
      msg.textContent = "Form tidak boleh kosong";
      wrapper.appendChild(msg);
    }
  } else {
    wrapper.classList.remove("is-error");
    wrapper.querySelector(".field-error-msg")?.remove();
  }
};

const validate = () => {
  let isValid = true;
  requiredFields.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const isEmpty = !el.value?.trim();
    setFieldError(el, isEmpty);
    if (isEmpty) isValid = false;
  });
  return isValid;
};

// ── Submit ────────────────────────────────────────────────────────────────────
export const initFormCompany = () => {
  const submitBtn = document.querySelector("[data-submit-company]");
  if (!submitBtn) return;

  initializeModals();

  submitBtn.addEventListener("click", async () => {
    // 1. Validasi
    if (!validate()) {
      showToast("Harap lengkapi semua field yang wajib diisi.", "error");
      const firstError = document.querySelector(".c-form-wrapper.is-error");
      if (firstError) {
        const headerHeight =
          document.querySelector("#section-header")?.clientHeight ?? 80;
        const top =
          firstError.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          16;
        window.scrollTo({ top, behavior: "smooth" });
      }
      return;
    }

    // 2. Disable button & mulai circular progress
    showProgress();
    // console.log("submit clicked");

    try {
      // 3. Upload foto jika ada
      let avatarFilename = null;
      const photoInput = document.getElementById("input-photo-profile");
      const photoFile = photoInput?.files[0] ?? null;

      if (photoFile) {
        const formData = new FormData();
        formData.append("file", photoFile);

        const uploadRes = await fetch(`${BASE_URL}/api/upload?folder=avatar`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const uploadJson = await uploadRes.json().catch(() => null);

        if (!uploadRes.ok) {
          throw new Error(uploadJson?.message ?? "Gagal mengupload foto.");
        }

        avatarFilename = uploadJson.filename;
      }

      // 4. Kirim data company
      const fields = {
        avatar: avatarFilename ?? "",
        brand: document.querySelector('[name="brand"]')?.value ?? "",
        legal_name: document.querySelector('[name="name"]')?.value ?? "",
        business_field: document.querySelector('[name="sector"]')?.value ?? "",
        since: document.querySelector('[name="since"]')?.value ?? "",
        website: document.querySelector('[name="website"]')?.value ?? "",
        pic_name: document.querySelector('[name="pic"]')?.value ?? "",
        pic_position: document.querySelector('[name="position"]')?.value ?? "",
        pic_number: document.querySelector('[name="nohp"]')?.value ?? "",
        pic_email: document.querySelector('[name="email"]')?.value ?? "",
        address: document.querySelector('[name="address"]')?.value ?? "",
        regency: document.querySelector('[name="cityreg"]')?.value ?? "",
        district: document.querySelector('[name="subdistrict"]')?.value ?? "",
        village: document.querySelector('[name="ward"]')?.value ?? "",
        poscode: document.querySelector('[name="postalcode"]')?.value ?? "",
      };

      const res = await fetch(`${BASE_URL}/api/companies`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          json?.message ?? "Terjadi kesalahan, silakan coba lagi.",
        );
      }

      // 5. Sukses — tampilkan centang dulu baru modal
      completeProgress();

      setTimeout(() => {
        const modalSuccess = document.getElementById("modal-company-success");
        if (modalSuccess) {
          showModal(modalSuccess);
        }
      }, 1000); // tunggu animasi centang selesai
    } catch (err) {
      failProgress();
      showToast(err.message, "error");
    }
  });

  // Live validation
  requiredFields.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("change", () => setFieldError(el, false));
    el.addEventListener("input", () => setFieldError(el, false));
  });
};
