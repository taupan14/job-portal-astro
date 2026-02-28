// src/scripts/form/formApplicant.js
import gsap from "gsap";
import { showToast } from "@js/_toast";
import { initializeModals, showModal } from "@js/_modal";

const BASE_URL = import.meta.env.PUBLIC_API_URL;

// ── Tab Navigation + Slider Indicator (satu fungsi, satu listener) ────────────────────
export const initTabs = () => {
  // Selector spesifik: hanya button yang punya KEDUA atribut sekaligus
  const tabs = document.querySelectorAll("[data-tab-nav][data-tab-target]");
  const contents = document.querySelectorAll("[data-tab-content]");
  const slider = document.querySelector("[data-tab-slider]");

  if (!tabs.length) return;

  // Buat indikator garis bawah sekali saja
  const indicator = document.createElement("div");
  indicator.className =
    "absolute bottom-0 h-0.5 bg-primary-600 transition-all duration-500 ease-custom";
  if (slider) slider.appendChild(indicator);

  const moveIndicator = (el) => {
    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;
  };

  const activateTab = (activeTab) => {
    // 1. Hapus is-active dari semua tab button
    tabs.forEach((t) => t.classList.remove("is-active"));

    // 2. Sembunyikan semua konten
    contents.forEach((c) => {
      c.classList.remove("is-active");
      c.setAttribute("aria-hidden", "true");
    });

    // 3. Aktifkan tab yang diklik
    activeTab.classList.add("is-active");

    // 4. Tampilkan konten yang sesuai
    const target = document.getElementById(activeTab.dataset.tabTarget);
    if (target) {
      target.classList.add("is-active");
      target.setAttribute("aria-hidden", "false");
    }

    // 5. Geser indikator ke tab aktif
    moveIndicator(activeTab);
  };

  // Pasang SATU listener per tab (tidak ada double listener lagi)
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab));
  });

  // Set posisi awal indikator berdasarkan is-active di HTML
  const initial = document.querySelector(
    "[data-tab-nav][data-tab-target].is-active",
  );
  if (initial) moveIndicator(initial);
};

// Alias kosong — agar tidak error jika masih dipanggil di tempat lain
export const initTabSlider = () => {};

// ── Currency Format (Rupiah) ──────────────────────────────────────────────────
const formatRupiah = (value) => {
  const number = String(value).replace(/\D/g, "");
  if (!number) return "";
  return "Rp " + Number(number).toLocaleString("id-ID");
};

const getRawSalary = (value) => {
  return String(value).replace(/\D/g, "");
};

export const initCurrencyInputs = (container = document) => {
  const salaryInputs = container.querySelectorAll("[data-salary-input]");
  salaryInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const raw = getRawSalary(e.target.value);
      e.target.value = raw ? formatRupiah(raw) : "";
    });
    input.addEventListener("blur", (e) => {
      const raw = getRawSalary(e.target.value);
      e.target.value = raw ? formatRupiah(raw) : "";
    });
    input.addEventListener("focus", (e) => {
      const raw = getRawSalary(e.target.value);
      e.target.value = raw || "";
    });
  });
};

// ── Experience Rows ───────────────────────────────────────────────────────────
let experienceCount = 1;

const createExperienceItem = (index) => {
  const item = document.createElement("div");
  item.className = "relative grid gap-6";
  item.setAttribute("data-experience-item", "");

  item.innerHTML = `
    <div class="flex items-center gap-4">
      <h5 class="text-xl text-balance tracking-normal">Pengalaman ${String(index).padStart(2, "0")}.</h5>
      <div class="grow h-px bg-dark-300"></div>
      <button type="button" class="btn btn-icon btn-xs btn-danger" data-delete-experience>
        <svg class="icon icon-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
            stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="grid gap-6 | lg:grid-cols-2">
      <div class="col-span-full | lg:col-span-1">
        <div class="c-form-wrapper">
          <div class="c-form c-form-default">
            <label class="c-label">Nama Perusahaan</label>
            <input type="text" name="exp-company-${index}" class="c-input" placeholder="Masukan nama perusahaan *" data-exp-field="company_name"/>
          </div>
        </div>
      </div>
      <div class="col-span-full | lg:col-span-1">
        <div class="c-form-wrapper">
          <div class="c-form c-form-default">
            <label class="c-label">Jabatan</label>
            <input type="text" name="exp-jabatan-${index}" class="c-input" placeholder="Masukan jabatan *" data-exp-field="position"/>
          </div>
        </div>
      </div>
      <div class="col-span-full | lg:col-span-1">
        <div class="c-form-wrapper">
          <div class="c-form c-form-default">
            <label class="c-label">Tanggal Mulai</label>
            <input type="text" class="c-input" name="exp-from-${index}" id="pengalaman-from-date-${index}" placeholder="dd mmmm, yyyy" data-exp-field="start_date" readonly/>
          </div>
        </div>
      </div>
      <div class="col-span-full | lg:col-span-1">
        <div class="c-form-wrapper">
          <div class="c-form c-form-default">
            <label class="c-label">Tanggal Selesai</label>
            <input type="text" class="c-input" name="exp-to-${index}" id="pengalaman-to-date-${index}" placeholder="dd mmmm, yyyy" data-exp-field="finish_date" readonly/>
          </div>
        </div>
      </div>
      <div id="pengalaman-datepicker-${index}" class="hidden"><div data-rangepicker></div></div>
      <div class="col-span-full">
        <div class="c-form-wrapper">
          <div class="c-form c-form-default">
            <label class="c-label">Keterangan</label>
            <textarea name="exp-desc-${index}" class="c-input c-textarea" placeholder="Masukan keterangan pekerjaan *" data-exp-field="description"></textarea>
          </div>
        </div>
      </div>
      <div class="col-span-full | lg:col-span-1">
        <div class="c-form-wrapper">
          <div class="c-form c-form-default">
            <label class="c-label">Gaji /bulan</label>
            <input type="text" inputmode="numeric" name="exp-salary-${index}" class="c-input" placeholder="Rp 0" data-exp-field="salary" data-salary-input/>
          </div>
        </div>
      </div>
    </div>
  `;

  // Delete handler
  item
    .querySelector("[data-delete-experience]")
    .addEventListener("click", () => {
      if (document.querySelectorAll("[data-experience-item]").length <= 1) {
        showToast("Minimal harus ada 1 pengalaman kerja.", "error");
        return;
      }
      gsap.to(item, {
        opacity: 0,
        height: 0,
        marginBottom: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          item.remove();
          renumberExperiences();
        },
      });
    });

  // Init currency input pada item baru
  initCurrencyInputs(item);

  return item;
};

const renumberExperiences = () => {
  const items = document.querySelectorAll("[data-experience-item]");
  items.forEach((item, i) => {
    const heading = item.querySelector("h5");
    if (heading)
      heading.textContent = `Pengalaman ${String(i + 1).padStart(2, "0")}.`;
  });
};

export const initExperienceRows = () => {
  const container = document.querySelector("[data-experience]");
  const addBtn = document.querySelector("[data-add-experience]");

  if (!container || !addBtn) return;

  // Init delete pada item pertama (yang sudah ada di DOM)
  const firstItem = container.querySelector("[data-experience-item]");
  if (firstItem) {
    const deleteBtn = firstItem.querySelector("[data-delete-experience]");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        showToast("Minimal harus ada 1 pengalaman kerja.", "error");
      });
    }
    initCurrencyInputs(firstItem);
  }

  addBtn.addEventListener("click", () => {
    experienceCount++;
    const newItem = createExperienceItem(experienceCount);

    gsap.set(newItem, { opacity: 0, y: 20 });
    container.appendChild(newItem);
    gsap.to(newItem, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });

    // Init rangepicker untuk row baru setelah masuk DOM
    if (window.__initExpRangePicker) {
      window.__initExpRangePicker(experienceCount);
    }
  });
};

// ── Collect Experience Data ───────────────────────────────────────────────────
const collectExperiences = () => {
  const items = document.querySelectorAll("[data-experience-item]");
  return Array.from(items).map((item) => ({
    company_name:
      item.querySelector("[data-exp-field='company_name']")?.value?.trim() ??
      "",
    position:
      item.querySelector("[data-exp-field='position']")?.value?.trim() ?? "",
    start_date:
      item.querySelector("[data-exp-field='start_date']")?.value?.trim() ?? "",
    finish_date:
      item.querySelector("[data-exp-field='finish_date']")?.value?.trim() ?? "",
    description:
      item.querySelector("[data-exp-field='description']")?.value?.trim() ?? "",
    salary: getRawSalary(
      item.querySelector("[data-exp-field='salary']")?.value ?? "0",
    ),
  }));
};

// ── Submit Button Progress ────────────────────────────────────────────────────
const getSubmitBtn = () => document.querySelector("[data-submit-applicant]");

const showProgress = () => {
  const btn = getSubmitBtn();
  if (!btn) return;
  const icon = btn.querySelector(".btn-icon");
  if (!icon) return;
  icon.dataset.originalHtml = icon.innerHTML;
  icon.innerHTML = `
    <svg class="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5" stroke-opacity="0.3"/>
      <path d="M12 2C6.477 2 2 6.477 2 12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`;
  btn.disabled = true;
  btn.style.opacity = "0.7";
  btn.style.pointerEvents = "none";
};

const completeProgress = () => {
  const btn = getSubmitBtn();
  if (!btn) return;
  const icon = btn.querySelector(".btn-icon");
  if (!icon) return;
  icon.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 13L9 17L19 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  setTimeout(() => {
    if (icon.dataset.originalHtml) icon.innerHTML = icon.dataset.originalHtml;
    btn.disabled = false;
    btn.style.opacity = "";
    btn.style.pointerEvents = "";
  }, 1000);
};

const failProgress = () => {
  const btn = getSubmitBtn();
  if (!btn) return;
  const icon = btn.querySelector(".btn-icon");
  if (!icon) return;
  if (icon.dataset.originalHtml) icon.innerHTML = icon.dataset.originalHtml;
  btn.disabled = false;
  btn.style.opacity = "";
  btn.style.pointerEvents = "";
};

// ── Validasi ──────────────────────────────────────────────────────────────────
const tabFields = {
  "tab-informasi": [
    { id: "input-name", label: "Nama Pribadi" },
    { id: "input-place-of-birth", label: "Tempat Lahir" },
    { id: "input-birthdate", label: "Tanggal Lahir" },
    { id: "select-gender", label: "Jenis Kelamin" },
    { id: "input-nik", label: "Nomor KTP" },
    { id: "input-email", label: "Email" },
    { id: "input-nohp", label: "Nomor HP" },
    { id: "input-address", label: "Alamat Lengkap" },
    { id: "select-province", label: "Provinsi" },
    { id: "select-cityreg", label: "Kota/Kabupaten" },
    { id: "select-subdistrict", label: "Kecamatan" },
    { id: "select-ward", label: "Kelurahan" },
    { id: "input-postalcode", label: "Kodepos" },
  ],
  "tab-pendidikan": [
    { id: "select-last-education", label: "Pendidikan Terakhir" },
    { id: "input-sekolah", label: "Sekolah/Universitas" },
    { id: "formal-from-date", label: "Tanggal Mulai (Formal)" },
    { id: "formal-to-date", label: "Tanggal Selesai (Formal)" },
    { id: "input-jurusan", label: "Jurusan" },
  ],
  "tab-pengalaman": [],
};

const setFieldError = (el, hasError) => {
  const wrapper = el.closest(".c-form-wrapper");
  if (!wrapper) return;
  if (hasError) {
    wrapper.classList.add("is-error");
    if (!wrapper.querySelector(".field-error-msg")) {
      const msg = document.createElement("div");
      msg.className = "field-error-msg text-xs mt-1 text-red-500";
      msg.textContent = "Field ini tidak boleh kosong";
      wrapper.appendChild(msg);
    }
  } else {
    wrapper.classList.remove("is-error");
    wrapper.querySelector(".field-error-msg")?.remove();
  }
};

const switchToTab = (tabId) => {
  const tabBtn = document.querySelector(`[data-tab-target="${tabId}"]`);
  if (tabBtn) tabBtn.click();
};

const validateTab = (tabId) => {
  const fields = tabFields[tabId] ?? [];
  let isValid = true;
  let firstError = null;

  fields.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const isEmpty = !el.value?.trim();
    setFieldError(el, isEmpty);
    if (isEmpty && !firstError) firstError = el;
    if (isEmpty) isValid = false;
  });

  // Validasi experience jika tab pengalaman
  if (tabId === "tab-pengalaman") {
    const items = document.querySelectorAll("[data-experience-item]");
    items.forEach((item) => {
      [
        "company_name",
        "position",
        "start_date",
        "finish_date",
        "description",
      ].forEach((field) => {
        const el = item.querySelector(`[data-exp-field="${field}"]`);
        if (!el) return;
        const isEmpty = !el.value?.trim();
        setFieldError(el, isEmpty);
        if (isEmpty && !firstError) firstError = el;
        if (isEmpty) isValid = false;
      });
    });
  }

  return { isValid, firstError };
};

const scrollToError = (el) => {
  const headerHeight =
    document.querySelector("#section-header")?.clientHeight ?? 80;
  const top =
    el.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
  window.scrollTo({ top, behavior: "smooth" });
};

// ── Live validation clear ─────────────────────────────────────────────────────
const initLiveValidation = () => {
  Object.values(tabFields)
    .flat()
    .forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", () => setFieldError(el, false));
      el.addEventListener("change", () => setFieldError(el, false));
    });
};

// ── Main Init ─────────────────────────────────────────────────────────────────
export const initFormApplicant = () => {
  const submitBtn = document.querySelector("[data-submit-applicant]");
  if (!submitBtn) return;

  initializeModals();
  initLiveValidation();

  submitBtn.addEventListener("click", async () => {
    // Validasi semua tab secara berurutan
    const tabs = ["tab-informasi", "tab-pendidikan", "tab-pengalaman"];
    for (const tabId of tabs) {
      const { isValid, firstError } = validateTab(tabId);
      if (!isValid) {
        switchToTab(tabId);
        showToast("Harap lengkapi semua field yang wajib diisi.", "error");
        if (firstError) setTimeout(() => scrollToError(firstError), 300);
        return;
      }
    }

    showProgress();

    try {
      // ── Upload foto ────────────────────────────────────────────────────
      let avatarFilename = null;
      const photoInput = document.getElementById("input-photo-profile");
      const photoFile = photoInput?.files?.[0] ?? null;

      if (photoFile) {
        const formData = new FormData();
        formData.append("file", photoFile);
        const uploadRes = await fetch(`${BASE_URL}/api/upload?folder=avatar`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        const uploadJson = await uploadRes.json().catch(() => null);
        if (!uploadRes.ok)
          throw new Error(uploadJson?.message ?? "Gagal mengupload foto.");
        avatarFilename = uploadJson.filename;
      }

      // ── Kumpulkan data ─────────────────────────────────────────────────
      const nonformalSchool =
        document.getElementById("input-lembaga-pendidikan")?.value?.trim() ??
        "";
      const nonformalStudy =
        document.getElementById("input-bidang-pelajaran")?.value?.trim() ?? "";
      const nonformalFromDate =
        document.getElementById("nonformal-from-date")?.value?.trim() ?? "";
      const nonformalToDate =
        document.getElementById("nonformal-to-date")?.value?.trim() ?? "";
      // Kirim nonformal hanya jika semua field terisi (karena opsional)
      const hasNonformal =
        nonformalSchool &&
        nonformalStudy &&
        nonformalFromDate &&
        nonformalToDate;

      const payload = {
        avatar: avatarFilename ?? "",
        name: document.getElementById("input-name")?.value?.trim() ?? "",
        ktp_number: document.getElementById("input-nik")?.value?.trim() ?? "",
        place_of_birth:
          document.getElementById("input-place-of-birth")?.value?.trim() ?? "",
        date_of_birth:
          document.getElementById("input-birthdate")?.value?.trim() ?? "",
        gender: document.getElementById("select-gender")?.value?.trim() ?? "",
        email: document.getElementById("input-email")?.value?.trim() ?? "",
        phone_number:
          document.getElementById("input-nohp")?.value?.trim() ?? "",
        province:
          document.getElementById("select-province")?.value?.trim() ?? "",
        regency: document.getElementById("select-cityreg")?.value?.trim() ?? "",
        district:
          document.getElementById("select-subdistrict")?.value?.trim() ?? "",
        village: document.getElementById("select-ward")?.value?.trim() ?? "",
        poscode:
          document.getElementById("input-postalcode")?.value?.trim() ?? "",
        address: document.getElementById("input-address")?.value?.trim() ?? "",
        education_formal: {
          last_education:
            document.getElementById("select-last-education")?.value ?? "",
          school_name:
            document.getElementById("input-sekolah")?.value?.trim() ?? "",
          start_date:
            document.getElementById("formal-from-date")?.value?.trim() ?? "",
          finish_date:
            document.getElementById("formal-to-date")?.value?.trim() ?? "",
          study_name:
            document.getElementById("input-jurusan")?.value?.trim() ?? "",
        },
        // Hanya kirim jika semua field non-formal terisi
        ...(hasNonformal
          ? {
              education_nonformal: {
                school_name: nonformalSchool,
                start_date: nonformalFromDate,
                finish_date: nonformalToDate,
                study_name: nonformalStudy,
              },
            }
          : {}),
        experiences: collectExperiences(),
      };

      // ── POST ke backend ────────────────────────────────────────────────
      const res = await fetch(`${BASE_URL}/api/applicants`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const msg =
          json?.errors?.join(", ") ?? json?.message ?? "Terjadi kesalahan.";
        throw new Error(msg);
      }

      // ── Simpan token JWT ───────────────────────────────────────────────
      if (json.token) {
        localStorage.setItem("auth_token", json.token);
        localStorage.setItem("auth_user", JSON.stringify(json.applicant));
      }

      completeProgress();

      setTimeout(() => {
        const modalSuccess = document.getElementById("modal-applicant-success");
        if (modalSuccess) showModal(modalSuccess);
      }, 1000);
    } catch (err) {
      failProgress();
      showToast(err.message, "error");
    }
  });
};
