/* =========================
   Portfolio Script.js
   ========================= */

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  
  /* -------------------------
     Preloader
  ------------------------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    preloader.style.display = "none";
  });

  /* -------------------------
     Dark/Light Mode Toggle
  ------------------------- */
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });

  /* -------------------------
     Typing Effect
  ------------------------- */
  const typingElement = document.getElementById("typing");
  if (typingElement) {
    const roles = ["Web Developer", "Python Developer", "Data Analyst"];
    let roleIndex = 0;
    let charIndex = 0;

    function typeRole() {
      if (charIndex < roles[roleIndex].length) {
        typingElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, 100);
      } else {
        setTimeout(eraseRole, 2000);
      }
    }

    function eraseRole() {
      if (charIndex > 0) {
        typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseRole, 50);
      } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
      }
    }

    typeRole();
  }

  /* -------------------------
     Back-to-top Button
  ------------------------- */
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------------------------
     Smooth Scroll for Nav Links
  ------------------------- */
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* -------------------------
     Animated Counters
  ------------------------- */
  const counters = document.querySelectorAll("#projects-count, #certifications-count, #skills-count, #experience-count");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target") || 50; // default
    let count = 0;
    const update = () => {
      if (count < target) {
        count++;
        counter.textContent = count;
        requestAnimationFrame(update);
      }
    };
    update();
  };

  counters.forEach(counter => {
    // Trigger when visible
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(counter);
          observer.unobserve(counter);
        }
      });
    });
    observer.observe(counter);
  });

  /* -------------------------
     Scroll Animations
  ------------------------- */
  const animatedEls = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animatedEls.forEach(el => observer.observe(el));

  /* -------------------------
     Project Modal Popup
  ------------------------- */
  const projectCards = document.querySelectorAll(".project-card");
  if (projectCards.length) {
    const modal = document.createElement("div");
    modal.id = "project-modal";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <h3 id="modal-title"></h3>
        <img id="modal-image" alt="Project Image">
        <p id="modal-description"></p>
        <p><strong>Technologies:</strong> <span id="modal-tech"></span></p>
        <div class="modal-buttons">
          <a id="modal-github" class="btn btn-dark" target="_blank">GitHub</a>
          <a id="modal-demo" class="btn btn-primary" target="_blank">Live Demo</a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeModal = modal.querySelector(".close");
    const closeModalOverlay = e => {
      if (e.target === modal || e.target === closeModal) {
        modal.style.display = "none";
      }
    };

    closeModal.addEventListener("click", closeModalOverlay);
    modal.addEventListener("click", closeModalOverlay);

    projectCards.forEach(card => {
      card.addEventListener("click", () => {
        document.getElementById("modal-title").textContent = card.dataset.title || "Project";
        const modalImage = document.getElementById("modal-image");
        modalImage.src = card.dataset.image || "";
        modalImage.alt = card.dataset.title || "Project Image";
        document.getElementById("modal-description").textContent = card.dataset.description || "";
        document.getElementById("modal-tech").textContent = card.dataset.tech || "";
        document.getElementById("modal-github").href = card.dataset.github || "#";
        document.getElementById("modal-demo").href = card.dataset.demo || "#";
        modal.style.display = "flex";
      });
    });
  }

  /* -------------------------
     Toast Notifications
  ------------------------- */
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* -------------------------
     Contact Form Validation
  ------------------------- */
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast("Please enter a valid email.", "error");
      return;
    }

    showToast("Message sent successfully!", "success");
    contactForm.reset();
  });

});
/* Certificate Filter */
const filterButtons = document.querySelectorAll(".filter-btn");
const certCards = document.querySelectorAll(".cert-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.filter;

    certCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // Active button styling
    filterButtons.forEach(b => b.classList.remove("btn-primary"));
    filterButtons.forEach(b => b.classList.add("btn-outline-primary"));
    btn.classList.remove("btn-outline-primary");
    btn.classList.add("btn-primary");
  });
});

/* skills */
/* Skill Progress Animation */
const skillFills = document.querySelectorAll(".progress-fill");

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const target = fill.getAttribute("data-progress");
      fill.style.width = target + "%";
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

