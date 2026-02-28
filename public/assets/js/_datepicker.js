import barba from "@barba/core";
import duDatepicker from "@dmuy/datepicker";
import "@dmuy/datepicker/dist/duDatepicker.css";

const configDatepicker = {
  theme: "",
  auto: true,
  minDate: null,
  format: "dd mmmm, yyyy",
  previousMonthButtonLabel: "",
  nextMonthButtonLabel: "",
};

// ── Inisialisasi single datepicker ────────────────────────────────────────────
const initSinglePicker = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  duDatepicker(selector, { ...configDatepicker });
};

// ── Inisialisasi range datepicker ─────────────────────────────────────────────
const initRangePicker = (containerId, options = {}) => {
  document.querySelectorAll(containerId).forEach((datePicker) => {
    const rangePicker = datePicker.querySelector("[data-rangepicker]");
    if (!rangePicker) return;
    duDatepicker(rangePicker, {
      range: true,
      ...options,
      ...configDatepicker,
    });
  });
};

// ── Inisialisasi range datepicker untuk 1 experience row (by index) ───────────
// Dipanggil dari formApplicant.js saat row baru ditambah (window.__initExpRangePicker)
const initExpRangePicker = (index) => {
  const container = document.querySelector(`#pengalaman-datepicker-${index}`);
  if (!container) return;

  const rangePicker = container.querySelector("[data-rangepicker]");
  if (!rangePicker) return;

  duDatepicker(rangePicker, {
    range: true,
    fromTarget: `#pengalaman-from-date-${index}`,
    toTarget: `#pengalaman-to-date-${index}`,
    ...configDatepicker,
  });
};

// ── Perbaiki tampilan icon prev/next setelah semua kalender di-render ─────────
const fixCalendarIcons = () => {
  document.querySelectorAll(".dcalendarpicker").forEach((dcalendar) => {
    const yearsView = dcalendar.querySelector(".dudp__years-view");
    const prev = dcalendar.querySelector(".dudp__btn-cal-prev");
    const next = dcalendar.querySelector(".dudp__btn-cal-next");

    if (yearsView) yearsView.setAttribute("data-lenis-prevent", "");

    if (prev) {
      prev.textContent = "";
      prev.innerHTML = `
        <svg class="icon icon-stroke text-primary-600 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L9 12.0001L15 18" stroke="#141B34" stroke-width="1.5" stroke-miterlimit="16" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }

    if (next) {
      next.textContent = "";
      next.innerHTML = `
        <svg class="icon icon-stroke text-primary-600 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.00005 6L15 12L9 18" stroke="#141B34" stroke-width="1.5" stroke-miterlimit="16" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }
  });
};

// ── Inisialisasi semua datepicker di halaman ──────────────────────────────────
const initDatepicker = async () => {
  // Single pickers
  initSinglePicker("#input-birthdate");
  initSinglePicker("#input-since");

  // Range pickers (pendidikan)
  initRangePicker("#formal-datepicker", {
    fromTarget: "#formal-from-date",
    toTarget: "#formal-to-date",
  });

  initRangePicker("#nonformal-datepicker", {
    fromTarget: "#nonformal-from-date",
    toTarget: "#nonformal-to-date",
  });

  // Range pickers (pengalaman kerja) — inisialisasi semua row yang ada di DOM
  // Row pertama selalu ada (hardcoded di HTML), row berikutnya dibuat dinamis
  document
    .querySelectorAll("[id^='pengalaman-datepicker-']")
    .forEach((container) => {
      // Ambil index dari id: "pengalaman-datepicker-1" → "1"
      const index = container.id.replace("pengalaman-datepicker-", "");
      initExpRangePicker(index);
    });

  fixCalendarIcons();

  // ── Expose ke window agar formApplicant.js bisa panggil saat row baru dibuat
  window.__initExpRangePicker = (index) => {
    initExpRangePicker(index);
    // Tunggu sedikit agar DOM dari rangepicker sudah dirender sebelum fix icon
    setTimeout(fixCalendarIcons, 50);
  };
};

barba.hooks.once(async () => {
  await initDatepicker();
});
barba.hooks.beforeEnter(async () => {
  await initDatepicker();
});
