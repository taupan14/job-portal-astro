// src/scripts/form/formCompany.js
import { showToast } from "@js/_toast";
import { initializeModals, showModal } from "@js/_modal";

const BASE_URL = import.meta.env.PUBLIC_API_URL;

// ── Circular Progress on Button ───────────────────────────────────────────────
const getSubmitBtn = () => document.querySelector("[data-submit-company]");

const showProgress = () => {
  const submitBtn = getSubmitBtn();
  if (!submitBtn) return;

  const btnIcon = submitBtn.querySelector(".btn-icon");
  if (!btnIcon) return;

  btnIcon.dataset.originalHtml = btnIcon.innerHTML;
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

  btnIcon.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13L9 17L19 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

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
  { id: "select-employee", label: "Jumlah Karyawan" },
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

// ── Dokumen Upload ────────────────────────────────────────────────────────────
let documentList = []; // [{ name: string, file: File }]

const renderDocumentList = () => {
  const container = document.getElementById("document-list");
  if (!container) return;

  if (documentList.length === 0) {
    container.innerHTML = `
      <div class="text-sm text-dark-400 text-center py-6 border border-dashed border-dark-200 rounded-lg" id="doc-empty-state">
        Belum ada dokumen yang ditambahkan
      </div>`;
    return;
  }

  container.innerHTML = documentList
    .map(
      (doc, i) => `
      <div class="flex items-center gap-4 p-4 border border-dark-100 rounded-lg bg-dark-50" data-doc-item="${i}">
        <div class="flex items-center justify-center size-10 rounded-lg bg-red-50 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4C4 2.89543 4.89543 2 6 2H14L20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z" stroke="#ef4444" stroke-width="1.5"/>
            <path d="M14 2V8H20" stroke="#ef4444" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M8 13H16M8 17H13" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-dark-950 truncate">${doc.name}</div>
          <div class="text-xs text-dark-400 truncate">${doc.file.name} · ${(doc.file.size / 1024).toFixed(0)} KB</div>
        </div>
        <button type="button" class="btn btn-icon btn-sm btn-ghost text-red-500 shrink-0" data-doc-remove="${i}" title="Hapus dokumen">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>`,
    )
    .join("");

  // Bind remove buttons
  container.querySelectorAll("[data-doc-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.docRemove, 10);
      documentList.splice(idx, 1);
      renderDocumentList();
    });
  });
};

const initDocumentUpload = () => {
  const addBtn = document.getElementById("btn-add-document");
  const docNameInput = document.getElementById("input-doc-name");
  const docFileInput = document.getElementById("input-doc-file");
  const docFileLabel = document.getElementById("doc-file-label");

  if (!addBtn || !docNameInput || !docFileInput) return;

  // Preview nama file saat dipilih
  docFileInput.addEventListener("change", () => {
    const file = docFileInput.files?.[0];
    if (docFileLabel) {
      docFileLabel.textContent = file ? file.name : "Pilih file PDF *";
    }
  });

  addBtn.addEventListener("click", () => {
    const name = docNameInput.value.trim();
    const file = docFileInput.files?.[0] ?? null;

    // Validasi input dokumen
    if (!name) {
      showToast("Nama dokumen tidak boleh kosong.", "error");
      docNameInput.focus();
      return;
    }
    if (!file) {
      showToast("Silakan pilih file PDF.", "error");
      return;
    }
    if (file.type !== "application/pdf") {
      showToast("Hanya file PDF yang diperbolehkan.", "error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast("Ukuran file maksimal 10MB.", "error");
      return;
    }

    documentList.push({ name, file });
    renderDocumentList();

    // Reset form dokumen
    docNameInput.value = "";
    docFileInput.value = "";
    if (docFileLabel) docFileLabel.textContent = "Pilih file PDF *";
  });

  renderDocumentList();
};

// ── Submit ────────────────────────────────────────────────────────────────────
export const initFormCompany = () => {
  const submitBtn = document.querySelector("[data-submit-company]");
  if (!submitBtn) return;

  initializeModals();
  initDocumentUpload();

  submitBtn.addEventListener("click", async () => {
    // 1. Validasi field utama
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

    try {
      // 3. Upload foto avatar jika ada
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

      // 4. Upload semua dokumen ke folder "documents"
      const uploadedDocs = []; // [{ doc_name, filename }]

      for (const doc of documentList) {
        const formData = new FormData();
        formData.append("file", doc.file);

        const uploadRes = await fetch(
          `${BASE_URL}/api/upload?folder=documents`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          },
        );

        const uploadJson = await uploadRes.json().catch(() => null);

        if (!uploadRes.ok) {
          throw new Error(
            uploadJson?.message ?? `Gagal mengupload dokumen "${doc.name}".`,
          );
        }

        uploadedDocs.push({
          doc_name: doc.name,
          filename: uploadJson.filename,
        });
      }

      // 5. Kirim data company + documents dalam satu request
      const fields = {
        avatar: avatarFilename ?? "",
        brand: document.querySelector('[name="brand"]')?.value ?? "",
        legal_name: document.querySelector('[name="name"]')?.value ?? "",
        business_field: document.querySelector('[name="sector"]')?.value ?? "",
        since: document.querySelector('[name="since"]')?.value ?? "",
        employess: document.querySelector('[name="employee"]')?.value ?? "",
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
        documents: uploadedDocs, // array dokumen yang sudah diupload
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

      // 6. Sukses — tampilkan centang dulu baru modal
      completeProgress();

      setTimeout(() => {
        const modalSuccess = document.getElementById("modal-company-success");
        if (modalSuccess) {
          showModal(modalSuccess);
        }
      }, 1000);
    } catch (err) {
      failProgress();
      showToast(err.message, "error");
    }
  });

  // Live validation — clear error on change/input
  requiredFields.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("change", () => setFieldError(el, false));
    el.addEventListener("input", () => setFieldError(el, false));
  });
};
