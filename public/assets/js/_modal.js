import barba from "@barba/core";
import gsap from "gsap";

const mediaQuery = window.matchMedia("(min-width: 1024px)");
let backdrop = null;

const createBackdrop = (parent) => {
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className =
      "fixed top-0 inset-x-0 h-dvh bg-gradient-to-b from-dark-950/90 to-primary-800/80 backdrop-blur opacity-0 z-50";
    parent.appendChild(backdrop);
  }
};

const showModal = (modal) => {
  // console.log("Showing modal:", modal.id); // Debug output

  document.documentElement.classList.add("is-open-modal");

  modal.classList.remove("invisible");
  modal.classList.add("visible");

  createBackdrop(document.body); // Changed to document.body for backdrop parent

  gsap.to(backdrop, {
    opacity: 1,
    duration: 0.5,
    ease: "power3.inOut",
  });

  if (mediaQuery.matches) {
    gsap.set(modal.querySelector("[data-modal-content]"), {
      clipPath: "inset(50% round 0.5rem)",
    });

    gsap.to(modal.querySelector("[data-modal-content]"), {
      clipPath: "inset(0% round 0.5rem)",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        window.dispatchEvent(new Event("resize"));
      },
    });
  } else {
    gsap.to(modal.querySelector("[data-modal-content]"), {
      opacity: 1,
      yPercent: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });
  }
};
export { showModal };

export const hideModal = (modal) => {
  // console.log("Hiding modal:", modal.id);

  function hideModalEl() {
    modal.classList.remove("visible");
    modal.classList.add("invisible");
  }

  document.documentElement.classList.remove("is-open-modal");

  const stopVideoYt = () => {
    modal.querySelectorAll("iframe").forEach((modalVideoYt) => {
      modalVideoYt.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*",
      );
    });
  };

  if (mediaQuery.matches) {
    gsap.to(modal.querySelector("[data-modal-content]"), {
      clipPath: "inset(50% round 0.5rem)",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        hideModalEl();
        stopVideoYt();
      },
    });

    if (backdrop) {
      // ← tambah null check
      gsap.to(backdrop, {
        delay: 0.25,
        opacity: 0,
        onComplete: () => {
          if (backdrop) {
            // ← tambah null check
            backdrop.remove();
            backdrop = null;
          }
        },
      });
    }
  } else {
    gsap.to(modal.querySelector("[data-modal-content]"), {
      opacity: 0,
      yPercent: 25,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        hideModalEl();
      },
    });

    if (backdrop) {
      // ← tambah null check
      gsap.to(backdrop, {
        delay: 0.25,
        opacity: 0,
        onComplete: () => {
          if (backdrop) {
            // ← tambah null check
            backdrop.remove();
            backdrop = null;
          }
        },
      });
    }
  }
};

const closeModalOnEscape = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const modals = document.querySelectorAll("[data-modal]");
      modals.forEach((modal) => {
        if (!modal.classList.contains("invisible")) {
          hideModal(modal);
        }
      });
    }
  });
};

const resetModals = () => {
  const modals = document.querySelectorAll("[data-modal]");
  modals.forEach((modal) => {
    modal.classList.remove("visible");
    modal.classList.add("invisible");
    if (backdrop) {
      backdrop.remove();
      backdrop = null;
    }
  });
  document.documentElement.classList.remove("is-open-modal");
};

export const initializeModals = () => {
  const modals = document.querySelectorAll("[data-modal]");

  modals.forEach((modal) => {
    if (!modal.hasAttribute("data-initialized")) {
      if (mediaQuery.matches) {
        gsap.set(modal.querySelector("[data-modal-content]"), {
          clipPath: "inset(50% round 0.5rem)",
        });
      } else {
        gsap.set(modal.querySelector("[data-modal-content]"), {
          opacity: 0,
          yPercent: 25,
        });
      }
      modal.setAttribute("data-initialized", "true");
    }
  });

  const modalToggle = document.querySelectorAll("[data-modal-target]");

  modalToggle.forEach((modalToggleEl) => {
    modalToggleEl.addEventListener("click", (event) => {
      event.preventDefault();

      const modalTargetId = modalToggleEl.getAttribute("data-modal-target");
      const modalTarget = document.getElementById(modalTargetId);

      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));

        if (modalTarget) {
          if (modalTarget.classList.contains("invisible")) {
            showModal(modalTarget);
          }
        }
      }, 250);
    });
  });

  const modalHideElements = document.querySelectorAll("[data-modal-hide]");

  modalHideElements.forEach((modalHideEl) => {
    modalHideEl.addEventListener("click", (event) => {
      event.preventDefault();

      const modal = modalHideEl.closest("[data-modal]");
      if (modal) {
        hideModal(modal);
      }
    });
  });

  closeModalOnEscape();
};

export const modal = () => {
  const modals = document.querySelectorAll("[data-modal]");

  modals.forEach((modal) => {
    if (!modal.hasAttribute("data-auto-modal")) {
      modal.classList.add("invisible");
    } else {
      modal.classList.remove("invisible");
      modal.classList.add("visible");
      showModal(modal);
    }
  });
};

barba.hooks.beforeEnter(() => {
  if (backdrop) {
    backdrop.remove();
    backdrop = null;
  }
  resetModals();
  initializeModals();
});

// barba.hooks.enter(() => {
//   // ← tambahkan ini
//   initializeModals();
// });

barba.hooks.afterLeave(() => {
  resetModals();
});

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-barba-navigate]");
  if (!target) return;
  e.preventDefault();

  const path = target.getAttribute("data-barba-navigate");
  if (!path) return;

  const parentModal = target.closest("[data-modal]");
  if (parentModal) {
    hideModal(parentModal);
    setTimeout(() => barba.go(path), 600); // tunggu animasi hideModal selesai (0.5s + buffer)
  } else {
    barba.go(path);
  }
});
