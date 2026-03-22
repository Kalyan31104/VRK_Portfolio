const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const typingText = document.getElementById("typingText");
const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const yearEl = document.getElementById("year");
const cursorGlow = document.querySelector(".cursor-glow");
const preloader = document.getElementById("preloader");
const navSectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const pageSections = Array.from(document.querySelectorAll("main section[id]"));
const educationToggles = document.querySelectorAll(".edu-toggle");
const projectToggles = document.querySelectorAll(".project-toggle");
const skillsSection = document.getElementById("skills");
const skillFilterButtons = document.querySelectorAll(".skill-filter");
const skillCards = document.querySelectorAll(".skill-card");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const downloadResumeBtn = document.getElementById("downloadResumeBtn");
const openMailAppBtn = document.getElementById("openMailAppBtn");

const typingPhrases = [
  "Software Developer | AI & ML Enthusiast",
  "Building scalable software with impact",
  "Transforming ideas into intelligent products"
];

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

window.addEventListener("load", () => {
  if (!preloader) {
    document.body.classList.remove("is-loading");
    return;
  }

  setTimeout(() => {
    preloader.classList.add("hide");
    document.body.classList.remove("is-loading");
  }, 300);
});

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typingText) {
    return;
  }

  const phrase = typingPhrases[phraseIndex];
  const current = phrase.slice(0, charIndex);
  typingText.textContent = current;

  if (!isDeleting && charIndex < phrase.length) {
    charIndex += 1;
    setTimeout(typeLoop, 70);
  } else if (!isDeleting && charIndex === phrase.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1400);
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 35);
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    setTimeout(typeLoop, 260);
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const sectionId = entry.target.getAttribute("id");
      navSectionLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    threshold: 0.35,
    rootMargin: "-20% 0px -50% 0px"
  }
);

pageSections.forEach((section) => sectionObserver.observe(section));

if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsSection.classList.add("in-view");
          skillsObserver.unobserve(skillsSection);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillsObserver.observe(skillsSection);
}

skillFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.dataset.filter || "all";

    skillFilterButtons.forEach((btn) => {
      const isCurrent = btn === button;
      btn.classList.toggle("active", isCurrent);
      btn.setAttribute("aria-selected", String(isCurrent));
    });

    skillCards.forEach((card) => {
      const category = card.dataset.category || "";
      const shouldShow = filterValue === "all" || category === filterValue;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

function animateCounter(counter) {
  const target = Number(counter.dataset.target || "0");
  const duration = 1400;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target % 1 === 0
      ? Math.floor(eased * target)
      : (eased * target).toFixed(1);

    counter.textContent = String(value);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = String(target);
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

educationToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const details = button.nextElementSibling;
    if (!details) {
      return;
    }

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.textContent = isExpanded ? "View More" : "View Less";
    details.hidden = isExpanded;
  });
});

projectToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    if (!card) {
      return;
    }

    const shouldOpen = !card.classList.contains("is-open");

    document.querySelectorAll(".project-card").forEach((item) => {
      item.classList.remove("is-open");
      const itemButton = item.querySelector(".project-toggle");
      if (itemButton) {
        itemButton.setAttribute("aria-expanded", "false");
        itemButton.textContent = "Open Details";
      }
    });

    if (shouldOpen) {
      card.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      button.textContent = "Close Details";

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(() => {
        card.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
          inline: "nearest"
        });
      }, 120);
    }
  });
});

if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("assets/vuppu_Reddy_Kalyan_Resume.pdf");
      if (!response.ok) {
        throw new Error("Resume file is not available right now.");
      }

      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = fileUrl;
      tempLink.download = "Vuppu_Reddy_Kalyan_Resume.pdf";
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      alert("Unable to download resume right now. Please try again.");
    }
  });
}

if (contactForm) {
  const EMAILJS_PUBLIC_KEY = "7_Ocyhd61X7ncjo7r";
  const EMAILJS_SERVICE_ID = "service_vuvzsdf";
  const EMAILJS_TEMPLATE_ID = "template_pak9jsq";
  const PORTFOLIO_OWNER_NAME = "Vuppu Reddy Kalyan";
  const EMAILJS_CDN_URLS = [
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
    "https://unpkg.com/@emailjs/browser@4/dist/email.min.js"
  ];
  let isEmailJsInitialized = false;

  const openMailClientFallback = (payload) => {
    const subject = `Portfolio message from ${payload.from_name}`;
    const body = [
      `Name: ${payload.from_name}`,
      `Email: ${payload.from_email}`,
      "",
      "Message:",
      payload.message
    ].join("\n");

    const mailtoUrl = `mailto:vuppureddykalyan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  if (openMailAppBtn) {
    openMailAppBtn.addEventListener("click", () => {
      const formData = new FormData(contactForm);
      const fromName = String(formData.get("name") || "").trim();
      const fromEmail = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      openMailClientFallback({
        from_name: fromName || "Portfolio Visitor",
        from_email: fromEmail || "",
        message: message || "Hello, I would like to connect with you."
      });
    });
  }

  const loadScript = (src) => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)));
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

  const ensureEmailJsReady = async () => {
    if (typeof emailjs !== "undefined" && isEmailJsInitialized) {
      return true;
    }

    if (typeof emailjs === "undefined") {
      for (const url of EMAILJS_CDN_URLS) {
        try {
          await loadScript(url);
          if (typeof emailjs !== "undefined") {
            break;
          }
        } catch (_error) {
          // Try next CDN URL
        }
      }
    }

    if (typeof emailjs === "undefined") {
      return false;
    }

    if (!isEmailJsInitialized) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      isEmailJsInitialized = true;
    }

    return true;
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!formStatus) {
      return;
    }

    const formData = new FormData(contactForm);
    const fromName = String(formData.get("name") || "").trim();
    const fromEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const payload = {
      // Fields aligned with EmailJS template variables
      name: fromName,
      to_name: PORTFOLIO_OWNER_NAME,
      from_name: fromName,
      from_email: fromEmail,
      message
    };

    if (!payload.from_name || !payload.from_email || !payload.message) {
      formStatus.textContent = "Please fill all fields before sending.";
      formStatus.className = "form-status error";
      return;
    }

    formStatus.textContent = "Sending message...";
    formStatus.className = "form-status";

    if (window.location.protocol === "file:") {
      formStatus.textContent = "EmailJS not supported on file mode. Opening your email app...";
      formStatus.className = "form-status error";
      openMailClientFallback(payload);
      return;
    }

    const isEmailJsReady = await ensureEmailJsReady();

    if (!isEmailJsReady) {
      formStatus.textContent = "EmailJS could not load (network/adblock/domain restriction). Opening your email app...";
      formStatus.className = "form-status error";
      openMailClientFallback(payload);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        payload
      );

      formStatus.textContent = "Message sent successfully. Thank you!";
      formStatus.className = "form-status success";
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      formStatus.textContent = "Could not send via EmailJS. Opening your email app...";
      formStatus.className = "form-status error";
      openMailClientFallback(payload);
    }
  });
}

let glowX = window.innerWidth / 2;
let glowY = window.innerHeight / 2;
let currentX = glowX;
let currentY = glowY;

window.addEventListener("pointermove", (event) => {
  glowX = event.clientX;
  glowY = event.clientY;
});

function animateGlow() {
  if (cursorGlow) {
    currentX += (glowX - currentX) * 0.1;
    currentY += (glowY - currentY) * 0.1;
    cursorGlow.style.transform = `translate(${currentX - 105}px, ${currentY - 105}px)`;
  }
  requestAnimationFrame(animateGlow);
}

typeLoop();
animateGlow();
