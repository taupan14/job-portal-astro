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

// const initSinglePicker = (selector) => {
//   const el = document.querySelector(selector);
//   if (!el) return; // ← guard sudah ada, tapi perlu pastikan duDatepicker tidak dipanggil jika el null
//   try {
//     duDatepicker(selector, { ...configDatepicker });
//   } catch (e) {
//     console.warn(`initSinglePicker gagal untuk ${selector}:`, e);
//   }
// };

const initSinglePicker = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    duDatepicker(selector, { ...configDatepicker });
    // Restore value dari data-value setelah init
    if (el.dataset.value) {
      const date = new Date(el.dataset.value);
      el.value = date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
  } catch (e) {
    console.warn(`initSinglePicker gagal untuk ${selector}:`, e);
  }
};

const initRangePicker = (containerId, options = {}) => {
  document.querySelectorAll(containerId).forEach((datePicker) => {
    const rangePicker = datePicker.querySelector("[data-rangepicker]");
    if (!rangePicker) return;
    try {
      duDatepicker(rangePicker, {
        range: true,
        ...options,
        ...configDatepicker,
      });
    } catch (e) {
      console.warn(`initRangePicker gagal:`, e);
    }
  });
};

const initExpRangePicker = (index) => {
  const container = document.querySelector(`#pengalaman-datepicker-${index}`);
  if (!container) return;
  const rangePicker = container.querySelector("[data-rangepicker]");
  if (!rangePicker) return;
  try {
    duDatepicker(rangePicker, {
      range: true,
      fromTarget: `#pengalaman-from-date-${index}`,
      toTarget: `#pengalaman-to-date-${index}`,
      ...configDatepicker,
    });
  } catch (e) {
    console.warn(`initExpRangePicker gagal untuk index ${index}:`, e);
  }
};

const fixCalendarIcons = () => {
  document.querySelectorAll(".dcalendarpicker").forEach((dcalendar) => {
    const yearsView = dcalendar.querySelector(".dudp__years-view");
    const prev = dcalendar.querySelector(".dudp__btn-cal-prev");
    const next = dcalendar.querySelector(".dudp__btn-cal-next");

    if (yearsView) yearsView.setAttribute("data-lenis-prevent", "");
    if (prev) {
      prev.textContent = "";
      prev.innerHTML = `<svg class="icon icon-stroke text-primary-600 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6L9 12.0001L15 18" stroke="#141B34" stroke-width="1.5" stroke-miterlimit="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    if (next) {
      next.textContent = "";
      next.innerHTML = `<svg class="icon icon-stroke text-primary-600 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.00005 6L15 12L9 18" stroke="#141B34" stroke-width="1.5" stroke-miterlimit="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
  });
};

export const initDatepicker = async () => {
  // Kosongkan value sebelum init
  const birthdateEl = document.querySelector("#input-birthdate");
  if (birthdateEl) birthdateEl.value = "";

  const sinceEl = document.querySelector("#input-since");
  if (sinceEl) sinceEl.value = "";

  initSinglePicker("#input-birthdate");
  initSinglePicker("#input-since");

  // Restore nilai birthdate setelah init
  if (birthdateEl?.dataset.value) {
    try {
      const date = new Date(birthdateEl.dataset.value);
      birthdateEl.value = date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      console.warn("Gagal format birthdate:", e);
    }
  }

  initRangePicker("#formal-datepicker", {
    fromTarget: "#formal-from-date",
    toTarget: "#formal-to-date",
  });

  initRangePicker("#nonformal-datepicker", {
    fromTarget: "#nonformal-from-date",
    toTarget: "#nonformal-to-date",
  });

  document
    .querySelectorAll("[id^='pengalaman-datepicker-']")
    .forEach((container) => {
      const index = container.id.replace("pengalaman-datepicker-", "");
      initExpRangePicker(index);
    });

  fixCalendarIcons();

  window.__initExpRangePicker = (index) => {
    initExpRangePicker(index);
    setTimeout(fixCalendarIcons, 50);
  };
};
