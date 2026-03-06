import barba from "@barba/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import Splitting from "splitting";
import { initProfilePage } from "@scripts/form/_profile.js";
import { initDatepicker } from "@js/_datepicker.js";
// import SplitType from "split-type";

import { navigate } from "astro:transitions/client";
import { hideModal } from "@js/_modal";

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("custom", "0.625,0.05,0,1");

const delay = (n) => {
  n = n || 2000;
  return new Promise((resolve) => {
    setTimeout(resolve, n);
  });
};

let animPreloaderIn = {
  clipPath: "inset(0% 0% 0% 0%)",
  duration: 1,
  ease: "custom",
};
let animPreloaderOut = {
  clipPath: "inset(0% 0% 100% 0%)",
  duration: 1,
  ease: "custom",
};

// Page Transition In
const pageTransitionIn = async () => {
  const preloaderDiv = document.createElement("div");
  preloaderDiv.id = "preloader";
  preloaderDiv.className = "bg-primary-600 fixed inset-0 z-[9999]";
  // preloaderDiv.className = "bg-primary-600 fixed inset-0 z-[9999]";

  const preloaderTransitionDiv = document.createElement("div");
  preloaderTransitionDiv.id = "preloader-transition";

  preloaderDiv.appendChild(preloaderTransitionDiv);
  document.body.appendChild(preloaderDiv);

  return gsap
    .timeline()
    .add("start")
    .fromTo(
      preloaderTransitionDiv,
      {
        clipPath: "inset(100% 0% 0% 0%)",
      },
      {
        delay: 0.15,
        ...animPreloaderIn,
      },
      "start",
    )
    .fromTo(
      preloaderDiv,
      {
        clipPath: "inset(100% 0% 0% 0%)",
      },
      {
        ...animPreloaderIn,
      },
      "start",
    );
};

// Page Transition Out
const pageTransitionOut = async () => {
  const preloader = document.querySelector("#preloader");
  const preloaderTransition = preloader.querySelector("#preloader-transition");

  // gsap.from(app, {
  //     opacity: 0,
  //     duration: 0,
  //     ease: 'none'
  // })

  return gsap
    .timeline()
    .add("start")
    .fromTo(
      preloaderTransition,
      {
        clipPath: "inset(0% 0% 0% 0%)",
      },
      {
        ...animPreloaderOut,
      },
      "start",
    )
    .fromTo(
      preloader,
      {
        clipPath: "inset(0% 0% 0% 0%)",
      },
      {
        delay: 0.15,
        ...animPreloaderOut,
        onComplete: () => preloader.remove(),
      },
      "start",
    );
};

const pageTransitionOnce = async () => {
  const preloader = document.querySelector("#preloader");
  const preloaderTransition = preloader.querySelector("#preloader-transition");

  return gsap
    .timeline()
    .add("start")
    .fromTo(
      preloaderTransition,
      {
        clipPath: "inset(0% 0% 0% 0%)",
      },
      {
        ...animPreloaderOut,
      },
      "start",
    )
    .fromTo(
      preloader,
      {
        clipPath: "inset(0% 0% 0% 0%)",
      },
      {
        delay: 0.15,
        ...animPreloaderOut,
        onComplete: () => {
          preloader.querySelector("#preloader-spinner").remove();
          preloader.remove();
        },
      },
      "start",
    );
};

// Header
const initHeader = async () => {
  const sectionHeader = document.querySelector("#section-header");
  const container = document.querySelector('[data-barba="container"]');
  const headerScheme = container.dataset.headerScheme;

  sectionHeader.querySelectorAll("[data-menu]").forEach((menu) => {
    const toggleHoverClass = (add) => {
      sectionHeader.classList[add ? "add" : "remove"]("is-hover-menu");
    };
    menu.addEventListener("mouseenter", () => toggleHoverClass(true));
    menu.addEventListener("mouseleave", () => toggleHoverClass(false));
  });

  const setHeaderScheme = (scheme) => {
    sectionHeader.classList.add(`is-${scheme}`);
    sectionHeader.classList.remove(
      `is-${scheme === "dark" ? "light" : "dark"}`,
    );
  };

  setHeaderScheme(headerScheme === "dark" ? "dark" : "light");

  if (!window.headerInitialized) {
    setHeaderScheme(headerScheme === "dark" ? "dark" : "light");
    window.headerInitialized = true;
  }

  document.querySelectorAll("[data-barba-active]").forEach((barbaActive) => {
    const link = barbaActive.querySelector("a");
    const linkHref = link?.getAttribute("href");

    // Support both: static HTML (page-profile.html) and Astro paths (/profile)
    const rawPath = window.location.pathname;
    const currentPath = rawPath.split("/").pop() || "index.html";

    barbaActive.classList.remove("is-active");

    const hasMatchingChild = Array.from(
      barbaActive.querySelectorAll("[data-barba-active-child]"),
    ).some((child) => child.getAttribute("href") === currentPath);

    const isActive =
      hasMatchingChild ||
      linkHref === currentPath || // static: "page-profile.html"
      linkHref === rawPath || // Astro exact: "/profile"
      (linkHref !== "/" &&
        linkHref !== "/profile" &&
        rawPath.startsWith(linkHref ?? "")) || // Astro sub: "/profile/document"
      (linkHref === "./" && currentPath === "index.html");

    if (isActive) {
      barbaActive.classList.add("is-active");
      const hoverEffect = barbaActive.querySelector(".btn-hover");
      hoverEffect?.classList.add("!translate-y-0", "!rounded-none");
    } else {
      const hoverEffect = barbaActive.querySelector(".btn-hover");
      hoverEffect?.classList.remove("!translate-y-0", "!rounded-none");
    }
  });

  ScrollTrigger.create({
    start: "top",
    end: "max",
    onUpdate: (self) => {
      const scrollPosition = self.scroll();
      const headerHeight = sectionHeader.clientHeight;

      if (scrollPosition >= headerHeight) {
        sectionHeader.classList.add("is-sticky");
      } else {
        sectionHeader.classList.remove("is-sticky");
      }
    },
  });
};

// Header Height
const initSpaceHeader = async () => {
  const sectionHeader = document.querySelector("#section-header");
  document.documentElement.style.setProperty(
    "--space-header",
    `${sectionHeader.getBoundingClientRect().height}px`,
  );
};

// Button Hover Effect
const initBtnHover = async () => {
  document.querySelectorAll("[data-hover-effect]").forEach((hoverEffect) => {
    const handleMouseEnter = () => {
      if (!hoverEffect.classList.contains("is-hover")) {
        hoverEffect.classList.add("is-hover");
      }
    };

    const handleMouseLeave = () => {
      if (
        hoverEffect.classList.contains("is-hover") &&
        !hoverEffect.classList.contains("is-hover-group")
      ) {
        setTimeout(() => {
          hoverEffect.classList.remove("is-hover");
        }, 200);
      }
    };

    if (hoverEffect.querySelector(".btn-circle")) return;

    const circleIcons = hoverEffect.querySelectorAll(".circle-icon");

    circleIcons.forEach((circleIcon) => {
      const wrapperDiv = document.createElement("div");
      wrapperDiv.classList.add("btn-circle");
      wrapperDiv.appendChild(circleIcon.cloneNode(true));
      circleIcon.parentElement.replaceChild(wrapperDiv, circleIcon);
    });

    hoverEffect.querySelectorAll(".btn-circle").forEach((btnCircle) => {
      btnCircle.childNodes.forEach((node) => {
        if (node.tagName === "svg") {
          const btnDiv = document.createElement("div");
          btnDiv.className = "inline-flex overflow-clip shrink-0";
          btnDiv.appendChild(node.cloneNode(true));
          btnCircle.insertBefore(btnDiv, node.nextSibling);
          node.parentNode.removeChild(node);
        }
      });
    });

    hoverEffect.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
        const btnDiv = document.createElement("div");
        const btnSpan = document.createElement("span");

        btnDiv.className = "inline-flex overflow-clip shrink-0";

        btnSpan.appendChild(node.cloneNode(true));
        btnDiv.appendChild(btnSpan);
        hoverEffect.replaceChild(btnDiv, node);
      } else if (node.tagName === "svg") {
        const btnDiv = document.createElement("div");
        btnDiv.className = "inline-flex overflow-clip shrink-0";
        btnDiv.appendChild(node.cloneNode(true));
        hoverEffect.insertBefore(btnDiv, node.nextSibling);
        node.parentNode.removeChild(node);
      }
    });

    const btnSpan = hoverEffect.querySelectorAll("span");
    const icons = hoverEffect.querySelectorAll(".icon");

    setTimeout(() => {
      if (btnSpan.length) {
        hoverEffect.style.setProperty(
          "--y-shadow",
          `${btnSpan[0].scrollHeight}px`,
        );
      }

      if (icons.length) {
        hoverEffect.style.setProperty(
          "--icon-width",
          `${icons[0].clientWidth}px`,
        );
      }
    }, 200);

    const handleUpdate = (elements, className, hoverTextVar) => {
      elements.forEach((el) => {
        el.classList.add(className);
      });
    };

    const handleRemove = (elements, className) => {
      elements.forEach((el) => {
        el.classList.remove(className);
      });
    };

    let parent = hoverEffect.parentElement;

    hoverEffect.addEventListener("mouseenter", () => {
      handleUpdate(btnSpan, "text-[var(--text-hover)]", "--text-hover");
      handleUpdate(icons, "text-[var(--icon-hover)]", "--icon-hover");
      handleMouseEnter();
    });

    hoverEffect.addEventListener("mouseleave", () => {
      handleRemove(btnSpan, "text-[var(--text-hover)]");
      handleRemove(icons, "text-[var(--icon-hover)]");
      handleMouseLeave();
    });

    while (parent) {
      if (
        parent.nodeType === Node.ELEMENT_NODE &&
        parent.hasAttribute("data-hover-group")
      ) {
        parent.addEventListener("mouseenter", () => {
          handleUpdate(btnSpan, "text-[var(--text-hover)]", "--text-hover");
          handleUpdate(icons, "text-[var(--icon-hover)]", "--icon-hover");
          handleMouseEnter();
          hoverEffect.classList.add("is-hover-group");
        });

        parent.addEventListener("mouseleave", () => {
          handleRemove(btnSpan, "text-[var(--text-hover)]");
          handleRemove(icons, "text-[var(--icon-hover)]");
          handleMouseLeave();
          hoverEffect.classList.remove("is-hover-group");
        });
        break;
      }
      parent = parent.parentElement;
    }
  });
};

// Icon Size
const initIconSvg = async () => {
  document.querySelectorAll(".icon-stroke > *").forEach((iconStroke) => {
    iconStroke.setAttribute("vector-effect", "non-scaling-stroke");
    iconStroke.setAttribute("stroke-linecap", "round");
    iconStroke.setAttribute("stroke-linejoin", "round");
  });
};

// Indent Title
const initTitleIndent = async () => {
  const init = [];
  document.querySelectorAll("[data-title-wrapper]").forEach((dataTitle) => {
    let subtitle = dataTitle.querySelector("[data-subtitle]"),
      title = dataTitle.querySelector("[data-title]"),
      subtitleWidth = subtitle.clientWidth,
      titleHeight = parseFloat(getComputedStyle(title).lineHeight);

    dataTitle.style.setProperty("--subtitle-width", `${subtitleWidth}px`);
    dataTitle.style.setProperty("--title-height", `${titleHeight / 2}px`);

    dataTitle.classList.add("relative");
    subtitle.classList.add(
      "lg:absolute",
      "lg:top-(--title-height)",
      "lg:left-0",
      "lg:-translate-y-1/2",
    );
    title.classList.add(
      "lg:indent-[calc(var(--subtitle-width)+(var(--spacing)*8))]",
    );

    init.push(dataTitle);
  });

  return init;
};

// Splitting Lines
const initSplitLine = async () => {
  document.querySelectorAll("[data-split-line]").forEach((splitLine) => {
    const splitText = Splitting({ target: splitLine, by: "lines" });
    splitText.forEach((splitResult) => {
      let lineIndex = 0;
      const wrappedLines = splitResult.lines
        .map(
          (wordsArr, i) =>
            `<div class="line w-fit" style="--line-index: ${i}">${wordsArr.map((word) => `${word.outerHTML}<span class="whitespace"></span>`).join("")}</div>`,
        )
        .join("");
      splitResult.el.innerHTML = wrappedLines;
    });

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
        console.log("style changed!");
      });
    });

    const targets = document.querySelector(".word");
    Array.from(targets).forEach((el) => {
      observer.observe(el, { attributes: true, attributeFilter: ["style"] });
    });

    setTimeout(() => {
      const lines = splitLine.querySelectorAll(".line");
      const width =
        splitLine.clientWidth +
        parseInt(window.getComputedStyle(lines[0]).paddingLeft, 10) * 2;
      const firstWidth = lines[0].getBoundingClientRect().width;
      const lastWidth = lines[lines.length - 1].getBoundingClientRect().width;
      const title = splitLine.parentElement.closest("[data-title]");

      if (title) {
        title.style.setProperty("--width", `${width}px`);
        title.style.setProperty("--first-width", `${firstWidth}px`);
        title.style.setProperty("--last-width", `${lastWidth}px`);
      }
    }, 200);
  });
};

window.addEventListener("resize", () => {
  initTitleIndent();
  initSplitLine();
});

// Accordion

const initAccordion = async () => {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const accordionItems = accordion.querySelectorAll(".accordion-item");

    accordionItems.forEach((accordionItem) => {
      const header = accordionItem.querySelector("[data-target]");
      const contentId = header.getAttribute("data-target");
      const content = document.getElementById(contentId);
      const contentWrapper = content.closest(".accordion-content");

      const toggleAccordion = () => {
        const isActive = accordionItem.classList.contains("is-open");
        const maxHeight = isActive ? 0 : `${content.scrollHeight}px`;

        if (isActive) {
          accordionItem.classList.remove("is-open");
          gsap.to(content, {
            maxHeight: maxHeight,
            duration: 0.5,
            ease: "power3.inOut",
          });
        } else {
          gsap.to(content, {
            maxHeight: maxHeight,
            duration: 0.5,
            ease: "power3.inOut",
          });
          accordionItem.classList.add("is-open");
        }

        if (contentWrapper) {
          contentWrapper.setAttribute(
            "aria-expanded",
            isActive ? "false" : "true",
          );
        }

        return isActive ? "closed" : "opened";
      };

      const headerHeight =
        document.querySelector("#section-header").clientHeight;

      const headerClone = header.cloneNode(true);
      header.parentNode.replaceChild(headerClone, header);

      headerClone.addEventListener("click", () => {
        const isParentAccordion = accordion.hasAttribute("data-parent");

        if (accordionItem.hasAttribute("data-scroll-top")) {
          setTimeout(() => {
            const rect = accordionItem.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const scrollPosition = elementTop - headerHeight;

            window.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
          }, 500);
        }

        if (isParentAccordion) {
          accordionItems.forEach((otherItem) => {
            if (
              otherItem !== accordionItem &&
              otherItem.classList.contains("is-open")
            ) {
              const otherHeader = otherItem.querySelector("[data-target]");
              if (!otherHeader) return;

              const otherContentId = otherHeader.getAttribute("data-target");
              const otherContent = document.getElementById(otherContentId);

              if (!otherContent) return;

              otherItem.classList.remove("is-open");
              gsap.to(otherContent, {
                maxHeight: 0,
                duration: 0.5,
                ease: "power3.inOut",
              });

              const otherContentWrapper =
                otherItem.querySelector(".accordion-content");
              if (otherContentWrapper) {
                otherContentWrapper.setAttribute("aria-expanded", "false");
              }
            }
          });
        }

        toggleAccordion();
      });

      if (contentWrapper) {
        const isHidden =
          contentWrapper.getAttribute("aria-expanded") === "false";
        gsap.set(content, {
          maxHeight: isHidden ? 0 : `${content.scrollHeight}px`,
        });
        accordionItem.classList.toggle("is-open", !isHidden);
      }
    });
  });
};

// Button Like
const initBtnLike = async () => {
  const init = [];

  document.querySelectorAll(".btn-like").forEach((btnLike) => {
    btnLike.addEventListener("click", () => {
      btnLike.classList.toggle("is-liked");
    });

    init.push(btnLike);
  });

  return init;
};

// Input Photo Profile
const initInputPhoto = async () => {
  document.querySelectorAll("[data-photo]").forEach((dataPhoto) => {
    const inputFile = dataPhoto.querySelector("input");

    inputFile.addEventListener("change", () => {
      const file = inputFile.files[0]; // Get the selected file

      if (file) {
        // Check if the <img> tag already exists
        let imgTag = dataPhoto.querySelector("img");

        if (!imgTag) {
          // Create the <img> tag only once
          imgTag = document.createElement("img");
          imgTag.className = "absolute top-0 left-0 size-full object-cover";
          dataPhoto.insertAdjacentElement("afterbegin", imgTag); // Insert into the DOM
        }

        // Read the file and update the <img> tag's src
        const reader = new FileReader();
        reader.onload = function (e) {
          const fileUrl = e.target.result; // Get the data URL
          imgTag.setAttribute("src", fileUrl); // Update the src
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    });
  });
};

// Scroll Section
const initScrollSection = async () => {
  document.querySelectorAll("[data-scroll]").forEach((scrollSection) => {
    const sectionId = scrollSection.getAttribute("data-scroll");

    if (sectionId == "about") {
      const scrollItem = scrollSection.querySelectorAll("[data-scroll-item]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSection,
          toggleActions: "play complete",
          start: "top bottom",
          end: "bottom -120%",
          scrub: true,
        },
      });

      tl.add("start")
        .fromTo(
          scrollItem[0],
          {
            x: "-15vw",
          },
          {
            x: 0,
          },
          "start",
        )
        .fromTo(
          scrollItem[1],
          {
            x: "15vw",
          },
          {
            x: 0,
          },
          "start",
        );
    }
  });
};

// Init Reveal
const initRevealAnimation = async () => {
  document.querySelectorAll("[data-reveal]").forEach((reveal) => {
    const revealType = reveal.getAttribute("data-reveal");
    const revealDelay = reveal.getAttribute("data-delay");
    const revealOffsetY = reveal.getAttribute("data-offset-y");
    const revealOffsetX = reveal.getAttribute("data-offset-x");

    console.log(revealOffsetY);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: reveal,
        toggleActions: "play complete",
        start: "top +=80%",
      },
    });

    if (revealType == "fade-in") {
      tl.from(reveal, {
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        delay: revealDelay,
      });
    }

    if (revealType == "fade-in-up") {
      tl.from(reveal, {
        yPercent: revealOffsetY,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        delay: revealDelay,
      });
    }

    if (revealType == "split") {
      reveal.querySelectorAll(".line").forEach((textLines) => {
        const wrapper = document.createElement("div");
        textLines.parentNode.insertBefore(wrapper, textLines);
        wrapper.appendChild(textLines);
        wrapper.className = `line-wrapper overflow-clip`;
      });

      gsap.from(reveal.querySelectorAll(".line"), {
        scrollTrigger: {
          trigger: reveal,
          toggleActions: "play complete",
          start: "top +=80%",
        },
        yPercent: 100,
        duration: 0.8,
        ease: "power4.out",
        delay: revealDelay,
        stagger: 0.075,
      });

      // reveal.anim = gsap.from(reveal.querySelectorAll('.word'), {
      //     scrollTrigger: {
      //         trigger: reveal,
      //         toggleActions: 'play complete',
      //         start: "top bottom",
      //     },
      //     yPercent: 100,
      //     duration: 0.8,
      //     ease: 'power3.out',
      //     delay: revealDelay,
      //     stagger: 0.075
      // })

      // tl.fromTo(reveal.querySelectorAll('.word'), {
      //     yPercent: 100,
      // }, {
      //     yPercent: 0,
      //     duration: 0.8,
      //     ease: 'power3.out',
      //     delay: revealDelay,
      //     stagger: 0.075
      // })
    }
  });
};

//Mega Menu
const initMenu = async () => {
  const init = [];
  document.querySelectorAll("[data-menu]").forEach((menu) => {
    const subMenu = menu.querySelector("[data-submenu]");
    const navSubMenu = menu.querySelectorAll("[data-nav-submenu]");

    if (subMenu) {
      gsap.set(subMenu, { clipPath: "inset(0% 0% 100% 0%)" });

      menu.addEventListener("mouseenter", () => {
        menu.classList.add("is-hover");

        const isMenuActive = menu.classList.contains("is-hover");

        if (isMenuActive) {
          gsap.fromTo(
            subMenu,
            {
              clipPath: "inset(0% 0% 100% 0%)",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.8,
              ease: "custom",
            },
          );
        }
      });

      menu.addEventListener("mouseleave", () => {
        gsap.set(subMenu, { pointerEvents: "none" });
        gsap.fromTo(
          subMenu,
          {
            clipPath: "inset(0% 0% 0% 0%)",
          },
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.8,
            ease: "custom",
            onComplete: () => {
              menu.classList.remove("is-hover");
              gsap.set(subMenu, { pointerEvents: "" });
            },
          },
        );
      });
    }

    init.push(subMenu);
  });
};

// Mobile Menu
const initMobileMenu = async () => {
  const burgerMenu = document.querySelector("#burger-menu");
  const mobileMenu = document.querySelector("#mobile-menu");
  const mobileMenuContent = document.querySelector("#mobile-menu > div");
  const mobileMenuBg = mobileMenu.querySelector("#mobile-menu-bg");

  gsap.set(mobileMenu, { clipPath: "inset(0% 0% 100% 0)" });
  gsap.set(mobileMenuContent, { opacity: 0 });
  gsap.set(mobileMenuBg, { clipPath: "inset(0% 0% 100% 0)" });

  const burgerToggle = burgerMenu.cloneNode(true);
  burgerMenu.parentNode.replaceChild(burgerToggle, burgerMenu);

  burgerToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("is-active-menu");
    const isActiveMenu =
      document.documentElement.classList.contains("is-active-menu");
    if (isActiveMenu) {
      gsap.fromTo(
        mobileMenu,
        {
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "custom",
        },
      );

      gsap.fromTo(
        mobileMenuContent,
        {
          opacity: 0,
        },
        {
          delay: 0.5,
          opacity: 1,
          duration: 0.9,
          ease: "custom",
        },
      );

      gsap.fromTo(
        mobileMenuBg,
        {
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          delay: 0.15,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "custom",
        },
      );
    } else {
      gsap.fromTo(
        mobileMenuContent,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.9,
          ease: "custom",
        },
      );

      gsap.fromTo(
        mobileMenu,
        {
          clipPath: "inset(0% 0% 0% 0%)",
        },
        {
          delay: 0.55,
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.9,
          ease: "custom",
        },
      );

      gsap.fromTo(
        mobileMenuBg,
        {
          clipPath: "inset(0% 0% 0% 0%)",
        },
        {
          delay: 0.4,
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.9,
          ease: "custom",
        },
      );
    }
  });
};

barba.init({
  debug: true,
  sync: true,
  transitions: [
    {
      name: "global",

      async leave(data) {
        await pageTransitionIn();
        data.current.container.remove();
      },

      async beforeEnter(data) {
        document.documentElement.classList.remove("is-active-menu");

        // Sembunyikan container dulu agar tidak terlihat acak-acakan
        data.next.container.style.visibility = "hidden";
        await initMobileMenu();
      },

      async enter(data) {
        window.scrollTo(0, 0);

        await Promise.all([
          initIconSvg(),
          initBtnHover(),
          initTitleIndent(),
          initSplitLine(),
          initAccordion(),
          initBtnLike(),
          initInputPhoto(),
          initScrollSection(),
          initMobileMenu(),
          initMenu(),
          initRevealAnimation(),
        ]);

        await initHeader();

        // Tampilkan container setelah semua init selesai
        data.next.container.style.visibility = "visible";
        await pageTransitionOut(data.next.container);

        await initDatepicker();
        await initProfilePage();
      },

      async once(data) {
        await delay(1000);
        await Promise.all([
          initIconSvg(),
          initBtnHover(),
          initTitleIndent(),
          initSplitLine(),
          initAccordion(),
          initBtnLike(),
          initSpaceHeader(),
          initInputPhoto(),
          initScrollSection(),
          initMobileMenu(),
          initMenu(),
          initRevealAnimation(),
        ]);

        await initHeader();
        await pageTransitionOnce(data.next.container);

        await initDatepicker();
        // Baru jalankan profile page init
        await initProfilePage();
      },
    },
  ],
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;

  const parentModal = link.closest("[data-modal]");
  if (!parentModal) return;

  // Hanya handle internal link (bukan eksternal / hash)
  const href = link.getAttribute("href");
  if (!href || href.startsWith("http") || href.startsWith("#")) return;

  e.preventDefault();

  hideModal(parentModal);

  // Tunggu animasi modal selesai, baru trigger navigasi Astro
  setTimeout(() => {
    navigate(href);
  }, 550); // sesuaikan dengan durasi animasi close modal kamu
});

// document.addEventListener("click", (e) => {
//   const target = e.target.closest("[data-barba-navigate]");
//   if (!target) return;
//   e.preventDefault();

//   const path = target.getAttribute("data-barba-navigate");
//   const parentModal = target.closest("[data-modal]");

//   // console.log("path:", path);
//   // console.log("parentModal:", parentModal);
//   // console.log("target tag:", target.tagName);
//   // console.log("target type:", target.type);

//   if (parentModal) {
//     parentModal.classList.add("invisible");
//     parentModal.classList.remove("visible");
//     document.documentElement.classList.remove("is-open-modal");

//     const backdrop = document.querySelector(
//       ".fixed.bg-gradient-to-b.backdrop-blur",
//     );
//     if (backdrop) backdrop.remove();

//     barba.go(path);
//   } else {
//     barba.go(path);
//   }
// });
