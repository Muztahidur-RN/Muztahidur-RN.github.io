const CONTACT_EMAIL = "muztahidurrahman0314@gmail.com";
const WHATSAPP_NUMBER = "8801580679918";

const ready = (callback) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
};

ready(() => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const projectCards = [...document.querySelectorAll(".project-card")];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      projectCards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        const shouldShow = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  const contactForm = document.querySelector("#contact-form");
  const contactStatus = document.querySelector("#contact-status");
  const inboxButtons = [...document.querySelectorAll(".inbox-send")];

  const setContactStatus = (message, type = "info") => {
    if (!contactStatus) return;
    contactStatus.textContent = message;
    contactStatus.dataset.type = type;
  };

  const buildContactMessage = () => {
    const name = document.querySelector("#contact-name")?.value.trim();
    const email = document.querySelector("#contact-email")?.value.trim();
    const message = document.querySelector("#contact-message")?.value.trim();
    const lines = [];

    if (name) lines.push(`Name: ${name}`);
    if (email) lines.push(`Email: ${email}`);
    lines.push("");
    lines.push(message);

    return { name, email, message, body: lines.join("\n") };
  };

  inboxButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!contactForm?.reportValidity()) return;

      const channel = button.dataset.channel;
      const { name, message, body } = buildContactMessage();
      const subject = `Portfolio message${name ? ` from ${name}` : ""}`;

      if (!message) {
        setContactStatus("Please write a message first.", "error");
        return;
      }

      if (channel === "email") {
        if (!CONTACT_EMAIL) {
          setContactStatus("Email is not configured yet. Add your email to CONTACT_EMAIL in script.js.", "error");
          return;
        }

        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setContactStatus("Opening your email app.", "success");
        return;
      }

      if (channel === "whatsapp") {
        if (!WHATSAPP_NUMBER) {
          setContactStatus("WhatsApp is not configured yet. Add your number to WHATSAPP_NUMBER in script.js.", "error");
          return;
        }

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
        setContactStatus("Opening WhatsApp.", "success");
      }
    });
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = [...document.querySelectorAll("[data-count]")];

  const runCounter = (element) => {
    const target = Number(element.dataset.count);
    if (!Number.isFinite(target) || reducedMotion) {
      element.textContent = target.toLocaleString();
      return;
    }

    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.55 }
    );

    counters.forEach((counter) => observer.observe(counter));
  } else {
    counters.forEach(runCounter);
  }
});
