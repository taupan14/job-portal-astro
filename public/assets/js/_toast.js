// src/js/_toast.js
import gsap from "gsap";

const TOAST_DURATION = 4000;

const icons = {
  success: `<svg class="icon icon-stroke size-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  error: `<svg class="icon icon-stroke size-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,
  info: `<svg class="icon icon-stroke size-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,
};

const colors = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
};

let container = null;

const getContainer = () => {
  if (!container || !document.body.contains(container)) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className =
      "fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none";
    document.body.appendChild(container);
  }
  return container;
};

export const showToast = (message, type = "info") => {
  const c = getContainer();

  const toast = document.createElement("div");
  toast.className = `
        pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg
        text-sm font-medium max-w-sm w-full
        ${colors[type] ?? colors.info}
    `.trim();

  // Progress bar
  toast.innerHTML = `
        <div class="mt-0.5">${icons[type] ?? icons.info}</div>
        <div class="flex-1 leading-snug">${message}</div>
        <button class="toast-close ml-auto shrink-0 opacity-50 hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </button>
        <div class="toast-progress absolute bottom-0 left-0 h-0.5 bg-current opacity-30 rounded-b-lg" style="width: 100%"></div>
    `;
  toast.style.position = "relative";
  toast.style.overflow = "hidden";

  c.appendChild(toast);

  // Animate in
  gsap.fromTo(
    toast,
    { x: 60, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
  );

  // Progress bar countdown
  const progressBar = toast.querySelector(".toast-progress");
  gsap.to(progressBar, {
    width: "0%",
    duration: TOAST_DURATION / 1000,
    ease: "none",
  });

  // Auto dismiss
  const timer = setTimeout(() => dismissToast(toast), TOAST_DURATION);

  // Manual close
  toast.querySelector(".toast-close").addEventListener("click", () => {
    clearTimeout(timer);
    dismissToast(toast);
  });
};

const dismissToast = (toast) => {
  gsap.to(toast, {
    x: 60,
    opacity: 0,
    duration: 0.3,
    ease: "power3.in",
    onComplete: () => toast.remove(),
  });
};
