// ============================================================
//  PORTFOLIO — script.js
//  Futuristic Interactive Portfolio Engine
// ============================================================

(function () {
  "use strict";

  // ─── Merge localStorage overrides into portfolioData ──────
  const STORAGE_KEY = "portfolioDataOverrides";

  function loadOverrides() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const overrides = JSON.parse(raw);
      // Deep-merge arrays and objects
      for (const key of Object.keys(overrides)) {
        if (Array.isArray(overrides[key])) {
          portfolioData[key] = overrides[key];
        } else if (typeof overrides[key] === "object" && overrides[key] !== null) {
          Object.assign(portfolioData[key], overrides[key]);
        } else {
          portfolioData[key] = overrides[key];
        }
      }
    } catch (e) {
      console.warn("Could not load overrides", e);
    }
  }

  function saveOverrides(section, data) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const overrides = raw ? JSON.parse(raw) : {};
      overrides[section] = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch (e) {
      console.warn("Could not save overrides", e);
    }
  }

  loadOverrides();

  // ─── Toast ────────────────────────────────────────────────
  function showToast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3000);
  }

  // ─── Loading Screen ──────────────────────────────────────
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("loading-screen").classList.add("hidden");
    }, 1200);
  });

  // ─── Scroll Progress ─────────────────────────────────────
  const scrollProgress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  });

  // ─── Cursor Glow ─────────────────────────────────────────
  const cursorGlow = document.getElementById("cursor-glow");
  let mouseX = -400, mouseY = -400;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animateCursor() {
    cursorGlow.style.left = mouseX + "px";
    cursorGlow.style.top = mouseY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // ─── Particle Background ─────────────────────────────────
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const PARTICLE_COUNT = 60;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    // Draw connections
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ─── Floating Tech Icons ─────────────────────────────────
  const floatingContainer = document.getElementById("floating-icons");
  portfolioData.techIcons.forEach((icon, i) => {
    const el = document.createElement("span");
    el.className = "floating-icon";
    el.textContent = icon;
    el.style.left = Math.random() * 90 + 5 + "%";
    el.style.top = Math.random() * 90 + 5 + "%";
    el.style.animationDelay = i * 1.5 + "s";
    el.style.animationDuration = 15 + Math.random() * 15 + "s";
    floatingContainer.appendChild(el);
  });

  // ─── Navbar Scroll ────────────────────────────────────────
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });

  // Active nav link
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute("id");
    });
    navLinks.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  });

  // Mobile menu
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const navLinksEl = document.getElementById("nav-links");
  mobileBtn.addEventListener("click", () => {
    navLinksEl.classList.toggle("open");
  });
  navLinksEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) navLinksEl.classList.remove("open");
  });

  // ─── Theme Toggle ────────────────────────────────────────
  const themeBtn = document.getElementById("theme-toggle");
  let darkMode = localStorage.getItem("theme") !== "light";
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    themeBtn.textContent = darkMode ? "🌙" : "☀️";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }
  applyTheme();
  themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    applyTheme();
  });

  // ─── Edit Mode Toggle ────────────────────────────────────
  const editBtn = document.getElementById("edit-toggle");
  let editMode = false;
  editBtn.addEventListener("click", () => {
    editMode = !editMode;
    document.body.classList.toggle("edit-mode", editMode);
    editBtn.classList.toggle("active", editMode);
    showToast(editMode ? "Edit Mode ON — Click ✏️ icons to edit" : "Edit Mode OFF");
  });



  // ─── Render Functions ─────────────────────────────────────

  // Hero
  function renderHero() {
    const d = portfolioData.hero;
    document.getElementById("hero-name").textContent = d.name;
    document.getElementById("hero-title").textContent = d.title;
    const btns = document.getElementById("hero-buttons");
    btns.innerHTML = `
      <a href="#projects" class="btn btn-primary">View Projects ↓</a>
      <a href="#about"    class="btn btn-secondary">About Me →</a>
    `;
  }

  // Typing animation
  function startTyping() {
    const el = document.getElementById("typing-text");
    const texts = portfolioData.hero.typingTexts;
    let textIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const current = texts[textIdx];
      if (deleting) {
        el.textContent = current.substring(0, charIdx--);
        if (charIdx < 0) {
          deleting = false;
          textIdx = (textIdx + 1) % texts.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 35);
      } else {
        el.textContent = current.substring(0, charIdx++);
        if (charIdx > current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 80);
      }
    }
    tick();
  }

  // About
  function renderAbout() {
    document.getElementById("about-text").innerHTML = `<p>${portfolioData.about.summary}</p>`;
    const stats = document.getElementById("about-stats");
    stats.innerHTML = portfolioData.about.stats
      .map(
        (s, i) => `
      <div class="stat-card glass-card reveal reveal-delay-${i + 1}">
        <div class="stat-number" data-target="${s.value}" data-suffix="${s.suffix}" data-decimals="${s.decimals || 0}">0</div>
        <div class="stat-label">${s.label}</div>
      </div>`
      )
      .join("");
  }

  // Education
  function renderEducation() {
    const tl = document.getElementById("education-timeline");
    tl.innerHTML = portfolioData.education
      .map(
        (e, i) => `
      <div class="timeline-item reveal reveal-delay-${(i % 4) + 1}" data-section="education" data-index="${i}">
        <div class="timeline-dot">${e.icon}</div>
        <div class="timeline-content glass-card">
          <button class="edit-icon" data-action="edit" data-section="education" data-index="${i}">✏️</button>
          <button class="delete-btn" data-action="delete" data-section="education" data-index="${i}">✕</button>
          <div class="timeline-period">${e.period}</div>
          <h3 class="timeline-title">${e.institution}</h3>
          <p class="timeline-subtitle">${e.degree}</p>
          <span class="timeline-grade">${e.grade}</span>
        </div>
      </div>`
      )
      .join("");
    // Add "add" card
    tl.innerHTML += `<div class="add-card" data-section="education" data-action="add">＋</div>`;
  }

  // Skills
  function renderSkills() {
    const grid = document.getElementById("skills-grid");
    const categories = [
      { key: "languages", label: "💻 Languages" },
      { key: "tools", label: "🔧 Tools" },
      { key: "soft", label: "🧠 Soft Skills" },
    ];
    grid.innerHTML = categories
      .map(
        (cat) => `
      <div class="skills-category glass-card reveal">
        <h3>${cat.label}</h3>
        ${portfolioData.skills[cat.key]
            .map(
              (s) => `
          <div class="skill-item">
            <div class="skill-header">
              <span class="skill-name">${s.name}</span>
              <span class="skill-percent">${s.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-fill" data-level="${s.level}"></div>
            </div>
          </div>`
            )
            .join("")}
      </div>`
      )
      .join("");
  }

  // Animate skill bars
  function animateSkills() {
    document.querySelectorAll(".skill-fill").forEach((bar) => {
      const level = bar.getAttribute("data-level");
      bar.style.width = level + "%";
      bar.classList.add("animated");
    });
  }

  // Projects (with 3D tilt)
  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = portfolioData.projects
      .map(
        (p, i) => `
      <div class="project-card glass-card reveal reveal-delay-${(i % 4) + 1}" data-index="${i}">
        <div class="card-inner-glow"></div>
        <button class="edit-icon" data-action="edit" data-section="projects" data-index="${i}">✏️</button>
        <button class="delete-btn" data-action="delete" data-section="projects" data-index="${i}">✕</button>
        <span class="card-icon">${p.icon}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <span class="view-btn" data-project="${i}">View Details →</span>
      </div>`
      )
      .join("");
    grid.innerHTML += `<div class="add-card" data-section="projects" data-action="add">＋</div>`;

    // Click handlers for modal
    grid.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openProjectModal(+btn.getAttribute("data-project"));
      });
    });
    grid.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => {
        if (!editMode) openProjectModal(+card.getAttribute("data-index"));
      });
    });

    // 3D Tilt effect
    setup3DTilt();
  }

  function setup3DTilt() {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        // Inner glow follows mouse
        const glow = card.querySelector(".card-inner-glow");
        if (glow) {
          glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,212,255,.12) 0%, transparent 60%)`;
        }
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

  // Certifications
  function renderCertifications() {
    const grid = document.getElementById("cert-grid");
    grid.innerHTML = portfolioData.certifications
      .map(
        (c, i) => `
      <div class="cert-card glass-card reveal reveal-delay-${(i % 4) + 1}">
        <button class="edit-icon" data-action="edit" data-section="certifications" data-index="${i}">✏️</button>
        <button class="delete-btn" data-action="delete" data-section="certifications" data-index="${i}">✕</button>
        <span class="cert-icon">${c.icon}</span>
        <h3>${c.title}</h3>
        <p class="cert-issuer">${c.issuer}</p>
      </div>`
      )
      .join("");
    grid.innerHTML += `<div class="add-card" data-section="certifications" data-action="add">＋</div>`;
  }

  // Achievements
  function renderAchievements() {
    const grid = document.getElementById("achievements-grid");
    grid.innerHTML = portfolioData.achievements
      .map(
        (a, i) => `
      <div class="achievement-card glass-card reveal reveal-delay-${(i % 4) + 1}">
        <button class="edit-icon" data-action="edit" data-section="achievements" data-index="${i}">✏️</button>
        <button class="delete-btn" data-action="delete" data-section="achievements" data-index="${i}">✕</button>
        <div class="achievement-stat">${a.stat}</div>
        <h3>${a.title}</h3>
        <p>${a.description}</p>
      </div>`
      )
      .join("");
    grid.innerHTML += `<div class="add-card" data-section="achievements" data-action="add">＋</div>`;
  }

  // Languages
  function renderLanguages() {
    const grid = document.getElementById("languages-grid");
    grid.innerHTML = portfolioData.languages
      .map(
        (l, i) => `
      <div class="mini-card glass-card reveal reveal-delay-${(i % 4) + 1}">
        <div class="icon">🗣️</div>
        <h4>${l.name}</h4>
        <div class="detail">${l.proficiency}</div>
      </div>`
      )
      .join("");
  }

  // Hobbies
  function renderHobbies() {
    const grid = document.getElementById("hobbies-grid");
    grid.innerHTML = portfolioData.hobbies
      .map(
        (h, i) => `
      <div class="mini-card glass-card reveal reveal-delay-${(i % 4) + 1}">
        <div class="icon">${h.icon}</div>
        <h4>${h.name}</h4>
      </div>`
      )
      .join("");
  }

  // Footer
  function renderFooter() {
    document.getElementById("footer-year").textContent = new Date().getFullYear();
    const fl = document.getElementById("footer-links");
    const s = portfolioData.social;
    fl.innerHTML = `
      <a href="${s.github}" target="_blank">GitHub</a>
      <a href="${s.linkedin}" target="_blank">LinkedIn</a>
      <a href="mailto:${s.email}">Email</a>
    `;
  }

  // ─── Project Modal ────────────────────────────────────────
  const modalOverlay = document.getElementById("project-modal");
  function openProjectModal(idx) {
    const p = portfolioData.projects[idx];
    if (!p) return;
    document.getElementById("modal-icon").textContent = p.icon;
    document.getElementById("modal-title").textContent = p.title;
    document.getElementById("modal-desc").textContent = p.details || p.description;
    document.getElementById("modal-tags").innerHTML = p.tags
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
    document.getElementById("modal-link").href = p.link || "#";
    modalOverlay.classList.add("active");
  }
  document.getElementById("modal-close").addEventListener("click", () => {
    modalOverlay.classList.remove("active");
  });
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove("active");
  });

  // ─── Edit System ──────────────────────────────────────────
  const editOverlay = document.getElementById("edit-modal-overlay");
  const editFields = document.getElementById("edit-modal-fields");
  const editTitle = document.getElementById("edit-modal-title");
  let currentEditSection = null;
  let currentEditIndex = null;
  let currentEditIsNew = false;

  const sectionFieldDefs = {
    education: [
      { key: "institution", label: "Institution" },
      { key: "degree", label: "Degree / Class" },
      { key: "period", label: "Period" },
      { key: "grade", label: "Grade" },
      { key: "icon", label: "Icon (emoji)" },
    ],
    projects: [
      { key: "title", label: "Project Title" },
      { key: "description", label: "Short Description", type: "textarea" },
      { key: "details", label: "Full Details", type: "textarea" },
      { key: "tags", label: "Tags (comma-separated)" },
      { key: "icon", label: "Icon (emoji)" },
      { key: "link", label: "Project Link" },
    ],
    certifications: [
      { key: "title", label: "Certificate Title" },
      { key: "issuer", label: "Issuing Organization" },
      { key: "icon", label: "Icon (emoji)" },
      { key: "link", label: "Link" },
    ],
    achievements: [
      { key: "title", label: "Achievement Title" },
      { key: "stat", label: "Highlight Stat" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  };

  function openEditModal(section, index, isNew) {
    currentEditSection = section;
    currentEditIndex = index;
    currentEditIsNew = isNew;
    const fields = sectionFieldDefs[section];
    if (!fields) return;

    editTitle.textContent = isNew ? `Add New ${section}` : `Edit ${section}`;
    const item = isNew ? {} : portfolioData[section][index];

    editFields.innerHTML = fields
      .map((f) => {
        let val = item[f.key] || "";
        if (f.key === "tags" && Array.isArray(val)) val = val.join(", ");
        const inputTag =
          f.type === "textarea"
            ? `<textarea id="edit-${f.key}" rows="3">${val}</textarea>`
            : `<input type="text" id="edit-${f.key}" value="${val}" />`;
        return `<div class="form-group"><label>${f.label}</label>${inputTag}</div>`;
      })
      .join("");

    editOverlay.classList.add("active");
  }

  document.getElementById("edit-modal-save").addEventListener("click", () => {
    const fields = sectionFieldDefs[currentEditSection];
    if (!fields) return;
    const newItem = {};
    fields.forEach((f) => {
      const el = document.getElementById(`edit-${f.key}`);
      let val = el.value.trim();
      if (f.key === "tags") val = val.split(",").map((t) => t.trim()).filter(Boolean);
      newItem[f.key] = val;
    });

    if (currentEditIsNew) {
      portfolioData[currentEditSection].push(newItem);
    } else {
      portfolioData[currentEditSection][currentEditIndex] = newItem;
    }

    saveOverrides(currentEditSection, portfolioData[currentEditSection]);
    editOverlay.classList.remove("active");
    renderAll();
    attachEditListeners();
    showToast("Changes saved ✓");
  });

  document.getElementById("edit-modal-cancel").addEventListener("click", () => {
    editOverlay.classList.remove("active");
  });
  editOverlay.addEventListener("click", (e) => {
    if (e.target === editOverlay) editOverlay.classList.remove("active");
  });

  function attachEditListeners() {
    // Edit buttons
    document.querySelectorAll('[data-action="edit"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openEditModal(btn.dataset.section, +btn.dataset.index, false);
      });
    });

    // Delete buttons
    document.querySelectorAll('[data-action="delete"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const section = btn.dataset.section;
        const index = +btn.dataset.index;
        if (confirm("Delete this item?")) {
          portfolioData[section].splice(index, 1);
          saveOverrides(section, portfolioData[section]);
          renderAll();
          attachEditListeners();
          showToast("Item deleted");
        }
      });
    });

    // Add buttons
    document.querySelectorAll('[data-action="add"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        openEditModal(btn.dataset.section, null, true);
      });
    });
  }

  // ─── Animated Stat Counters ───────────────────────────────
  function animateCounters() {
    document.querySelectorAll(".stat-number").forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toFixed(decimals) + suffix;
      }, 25);
    });
  }

  // ─── Section Reveal (Intersection Observer) ───────────────
  function setupReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Trigger skill bars when skills section is visible
            if (entry.target.closest("#skills")) {
              animateSkills();
            }
            // Trigger counters when about section is visible
            if (entry.target.closest("#about") && entry.target.classList.contains("stat-card")) {
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  // ─── Parallax ─────────────────────────────────────────────
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    document.querySelectorAll(".parallax-layer").forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0.3");
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
    // Subtle parallax on hero
    const hero = document.getElementById("hero");
    if (hero) {
      const heroContent = hero.querySelector(".hero-content");
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
      }
    }
  });

  // ─── Keyboard shortcut ────────────────────────────────────
  document.addEventListener("keydown", (e) => {
    // Escape closes modals & command palette
    if (e.key === "Escape") {
      modalOverlay.classList.remove("active");
      editOverlay.classList.remove("active");
      closeCmdPalette();
    }
    // Ctrl+K or Cmd+K opens command palette
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      toggleCmdPalette();
    }
  });

  // ─── Command Palette ──────────────────────────────────────
  const cmdOverlay = document.getElementById("cmd-palette-overlay");
  const cmdInput = document.getElementById("cmd-palette-input");
  const cmdResults = document.getElementById("cmd-palette-results");
  let cmdSelectedIdx = 0;

  document.getElementById("cmd-palette-btn").addEventListener("click", toggleCmdPalette);

  function toggleCmdPalette() {
    if (cmdOverlay.classList.contains("active")) {
      closeCmdPalette();
    } else {
      openCmdPalette();
    }
  }
  function openCmdPalette() {
    cmdOverlay.classList.add("active");
    cmdInput.value = "";
    cmdSelectedIdx = 0;
    renderCmdResults("");
    setTimeout(() => cmdInput.focus(), 100);
  }
  function closeCmdPalette() {
    cmdOverlay.classList.remove("active");
  }
  cmdOverlay.addEventListener("click", (e) => {
    if (e.target === cmdOverlay) closeCmdPalette();
  });

  cmdInput.addEventListener("input", () => {
    cmdSelectedIdx = 0;
    renderCmdResults(cmdInput.value.trim().toLowerCase());
  });
  cmdInput.addEventListener("keydown", (e) => {
    const items = cmdResults.querySelectorAll(".cmd-result");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      cmdSelectedIdx = Math.min(cmdSelectedIdx + 1, items.length - 1);
      highlightCmd(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      cmdSelectedIdx = Math.max(cmdSelectedIdx - 1, 0);
      highlightCmd(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (items[cmdSelectedIdx]) items[cmdSelectedIdx].click();
    }
  });

  function highlightCmd(items) {
    items.forEach((it, i) => it.classList.toggle("selected", i === cmdSelectedIdx));
  }

  function renderCmdResults(query) {
    const cmds = portfolioData.commandPalette || [];
    const filtered = query ? cmds.filter(c => c.label.toLowerCase().includes(query)) : cmds;
    cmdResults.innerHTML = filtered.map((c, i) => `
      <div class="cmd-result ${i === 0 ? 'selected' : ''}" data-action="${c.action}" data-target="${c.target}">
        <span>${c.label}</span>
        <span class="cmd-action-type">${c.action}</span>
      </div>
    `).join("");

    cmdResults.querySelectorAll(".cmd-result").forEach(el => {
      el.addEventListener("click", () => {
        const action = el.dataset.action;
        const target = el.dataset.target;
        closeCmdPalette();
        if (action === "navigate") {
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
        } else if (action === "theme") {
          darkMode = !darkMode; applyTheme();
        } else if (action === "edit") {
          editMode = !editMode;
          document.body.classList.toggle("edit-mode", editMode);
          editBtn.classList.toggle("active", editMode);
          showToast(editMode ? "Edit Mode ON" : "Edit Mode OFF");
        } else if (action === "link") {
          window.open(target, "_blank");
        }
      });
    });
  }

  // ─── AI Terminal (v2 — Dynamic & Animated) ─────────────────
  function initTerminal() {
    const body = document.getElementById("terminal-body");
    const input = document.getElementById("terminal-input");
    const promptEl = document.getElementById("terminal-prompt");
    const td = portfolioData.terminal;
    if (!td || !body || !input || !promptEl) return;

    const PROMPT = td.prompt || "aniket@portfolio:~$";
    promptEl.textContent = PROMPT + " ";

    const commandHistory = [];
    let historyIndex = -1;
    let isTyping = false; // lock input while typing animation runs

    // ── Supported commands (keys) for tab-complete ──
    const SUPPORTED_COMMANDS = [
      "help", "about", "skills", "projects", "education",
      "achievements", "clear",
      "whoami", "neofetch", "leetcode", "certifications",
      "hobbies", "languages", "date", "banner"
    ];

    // ── Greeting ──
    addLineInstant(td.greeting || "Welcome to AS.dev Terminal v2.0", "t-greeting");
    addLineInstant('Type "help" for a list of commands.', "t-hint");
    addLineInstant("", "t-spacer");

    // Focus input when clicking anywhere in terminal
    document.getElementById("terminal-window").addEventListener("click", () => {
      if (!isTyping) input.focus();
    });

    // ── Input handling ──
    input.addEventListener("keydown", (e) => {
      if (isTyping) { e.preventDefault(); return; }

      if (e.key === "Enter") {
        const raw = input.value.trim();
        const cmd = raw.toLowerCase();
        input.value = "";
        if (raw) {
          commandHistory.unshift(raw);
          if (commandHistory.length > 50) commandHistory.pop();
        }
        historyIndex = -1;
        processCommand(cmd, raw);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[historyIndex];
          // Move caret to end
          setTimeout(() => { input.selectionStart = input.selectionEnd = input.value.length; }, 0);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[historyIndex];
        } else {
          historyIndex = -1;
          input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        const partial = input.value.trim().toLowerCase();
        if (partial) {
          const matches = SUPPORTED_COMMANDS.filter(c => c.startsWith(partial));
          if (matches.length === 1) {
            input.value = matches[0];
          } else if (matches.length > 1) {
            addCommandLine(partial);
            addLineInstant(matches.join("  "), "t-output");
            addLineInstant("", "t-spacer");
          }
        }
      }
    });

    // ── Build dynamic command output from portfolioData ──
    function getCommandOutput(cmd) {
      switch (cmd) {
        case "help":
          return [
            { text: "╔══════════════════════════════════════════════════╗", cls: "t-box" },
            { text: "║          📖 Available Commands                   ║", cls: "t-box" },
            { text: "╠══════════════════════════════════════════════════╣", cls: "t-box" },
            { text: "║  help          — Show this help message          ║", cls: "t-box" },
            { text: "║  about         — About me                       ║", cls: "t-box" },
            { text: "║  skills        — Programming languages & tools   ║", cls: "t-box" },
            { text: "║  projects      — List my projects                ║", cls: "t-box" },
            { text: "║  education     — Education timeline              ║", cls: "t-box" },
            { text: "║  achievements  — Notable milestones              ║", cls: "t-box" },
            { text: "║  certifications— Professional credentials        ║", cls: "t-box" },
            { text: "║  whoami        — Quick intro                     ║", cls: "t-box" },
            { text: "║  neofetch      — System info (portfolio style)   ║", cls: "t-box" },
            { text: "║  leetcode      — LeetCode stats                  ║", cls: "t-box" },
            { text: "║  banner        — Show welcome banner             ║", cls: "t-box" },
            { text: "║  date          — Current date & time             ║", cls: "t-box" },
            { text: "║  clear         — Clear the terminal              ║", cls: "t-box" },
            { text: "╚══════════════════════════════════════════════════╝", cls: "t-box" },
          ];

        case "about": {
          const a = portfolioData.about;
          const h = portfolioData.hero;
          return [
            { text: `┌─ 👤 About ${h.name} ──────────────────────────`, cls: "t-header" },
            { text: "", cls: "t-spacer" },
            { text: a.summary, cls: "t-output" },
            { text: "", cls: "t-spacer" },
            { text: "── Quick Stats ──", cls: "t-accent" },
            ...a.stats.map(s => ({
              text: `  • ${s.label}: ${s.decimals ? s.value.toFixed(s.decimals) : s.value}${s.suffix}`,
              cls: "t-output"
            })),
            { text: "", cls: "t-spacer" },
          ];
        }

        case "skills": {
          const sk = portfolioData.skills;
          const lines = [
            { text: "┌─ 🛠️ Technical Skills ─────────────────────────", cls: "t-header" },
            { text: "", cls: "t-spacer" },
          ];
          // Languages
          lines.push({ text: "💻 Programming Languages:", cls: "t-accent" });
          sk.languages.forEach(s => {
            const bar = "█".repeat(Math.round(s.level / 5)) + "░".repeat(20 - Math.round(s.level / 5));
            lines.push({ text: `  ${s.name.padEnd(10)} ${bar} ${s.level}%`, cls: "t-output" });
          });
          lines.push({ text: "", cls: "t-spacer" });
          // Tools
          lines.push({ text: "🔧 Tools:", cls: "t-accent" });
          sk.tools.forEach(s => {
            const bar = "█".repeat(Math.round(s.level / 5)) + "░".repeat(20 - Math.round(s.level / 5));
            lines.push({ text: `  ${s.name.padEnd(14)} ${bar} ${s.level}%`, cls: "t-output" });
          });
          lines.push({ text: "", cls: "t-spacer" });
          // Soft skills
          lines.push({ text: "🧠 Soft Skills:", cls: "t-accent" });
          sk.soft.forEach(s => {
            const bar = "█".repeat(Math.round(s.level / 5)) + "░".repeat(20 - Math.round(s.level / 5));
            lines.push({ text: `  ${s.name.padEnd(16)} ${bar} ${s.level}%`, cls: "t-output" });
          });
          lines.push({ text: "", cls: "t-spacer" });
          return lines;
        }

        case "projects": {
          const pj = portfolioData.projects;
          const lines = [
            { text: "┌─ 🚀 Projects ─────────────────────────────────", cls: "t-header" },
            { text: "", cls: "t-spacer" },
          ];
          pj.forEach((p, i) => {
            lines.push({ text: `  ${p.icon} [${i + 1}] ${p.title}`, cls: "t-accent" });
            lines.push({ text: `      ${p.description}`, cls: "t-output" });
            lines.push({ text: `      Tags: ${p.tags.join(", ")}`, cls: "t-muted" });
            lines.push({ text: "", cls: "t-spacer" });
          });
          return lines;
        }

        case "education": {
          const ed = portfolioData.education;
          const lines = [
            { text: "┌─ 🎓 Education Timeline ───────────────────────", cls: "t-header" },
            { text: "", cls: "t-spacer" },
          ];
          ed.forEach(e => {
            lines.push({ text: `  ${e.icon} ${e.institution}`, cls: "t-accent" });
            lines.push({ text: `     ${e.degree}`, cls: "t-output" });
            lines.push({ text: `     Period: ${e.period}  |  ${e.grade}`, cls: "t-muted" });
            lines.push({ text: "", cls: "t-spacer" });
          });
          return lines;
        }

        case "achievements": {
          const ach = portfolioData.achievements;
          const lines = [
            { text: "┌─ 🏆 Achievements ─────────────────────────────", cls: "t-header" },
            { text: "", cls: "t-spacer" },
          ];
          ach.forEach(a => {
            lines.push({ text: `  ⭐ ${a.title} — ${a.stat}`, cls: "t-accent" });
            lines.push({ text: `     ${a.description}`, cls: "t-output" });
            lines.push({ text: "", cls: "t-spacer" });
          });
          return lines;
        }



        case "certifications": {
          const certs = portfolioData.certifications;
          const lines = [
            { text: "┌─ 📜 Certifications ───────────────────────────", cls: "t-header" },
            { text: "", cls: "t-spacer" },
          ];
          certs.forEach(c => {
            lines.push({ text: `  ${c.icon} ${c.title}`, cls: "t-accent" });
            lines.push({ text: `     Issued by: ${c.issuer}`, cls: "t-muted" });
            lines.push({ text: "", cls: "t-spacer" });
          });
          return lines;
        }

        case "whoami":
          return [
            { text: `${portfolioData.hero.name} — ${portfolioData.hero.title}`, cls: "t-accent" },
            { text: "", cls: "t-spacer" },
          ];

        case "neofetch": {
          const neofetchLines = (td.commands.neofetch || "").split("\n");
          return neofetchLines.map(l => ({ text: l, cls: "t-output" })).concat([{ text: "", cls: "t-spacer" }]);
        }

        case "leetcode": {
          const leetLines = (td.commands.leetcode || "").split("\n");
          return leetLines.map(l => ({ text: l, cls: "t-output" })).concat([{ text: "", cls: "t-spacer" }]);
        }

        case "languages": {
          const langs = portfolioData.languages;
          const lines = [
            { text: "┌─ 🗣️ Languages ─────────────────────────────────", cls: "t-header" },
            { text: "", cls: "t-spacer" },
          ];
          langs.forEach(l => {
            lines.push({ text: `  • ${l.name} — ${l.proficiency}`, cls: "t-output" });
          });
          lines.push({ text: "", cls: "t-spacer" });
          return lines;
        }

        case "hobbies": {
          const hob = portfolioData.hobbies;
          const lines = [
            { text: "┌─ 🎯 Hobbies ───────────────────────────────────", cls: "t-header" },
            { text: "", cls: "t-spacer" },
          ];
          hob.forEach(h => {
            lines.push({ text: `  ${h.icon} ${h.name}`, cls: "t-output" });
          });
          lines.push({ text: "", cls: "t-spacer" });
          return lines;
        }

        case "date":
          return [
            { text: `  📅 ${new Date().toLocaleString()}`, cls: "t-output" },
            { text: "", cls: "t-spacer" },
          ];

        case "banner":
          return [
            { text: "", cls: "t-spacer" },
            { text: "    █████╗ ███████╗   ██████╗ ███████╗██╗   ██╗", cls: "t-banner" },
            { text: "   ██╔══██╗██╔════╝   ██╔══██╗██╔════╝██║   ██║", cls: "t-banner" },
            { text: "   ███████║███████╗   ██║  ██║█████╗  ██║   ██║", cls: "t-banner" },
            { text: "   ██╔══██║╚════██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝", cls: "t-banner" },
            { text: "   ██║  ██║███████║██╗██████╔╝███████╗ ╚████╔╝ ", cls: "t-banner" },
            { text: "   ╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ ╚══════╝  ╚═══╝  ", cls: "t-banner" },
            { text: "", cls: "t-spacer" },
            { text: `   ${portfolioData.hero.tagline}`, cls: "t-accent" },
            { text: "", cls: "t-spacer" },
          ];

        default:
          return null; // unrecognized
      }
    }

    // ── Process a command ──
    function processCommand(cmd, rawInput) {
      // Echo the command line
      addCommandLine(rawInput || cmd);

      // Empty input
      if (!cmd) return;

      // Clear
      if (cmd === "clear") {
        body.innerHTML = "";
        return;
      }



      const output = getCommandOutput(cmd);
      if (output) {
        typeLines(output);
      } else {
        typeLines([
          { text: `Command not recognized: "${cmd}". Type 'help' to see available commands.`, cls: "t-error" },
          { text: "", cls: "t-spacer" },
        ]);
      }
    }

    // ── Typing animation for output lines ──
    function typeLines(lines) {
      isTyping = true;
      input.disabled = true;
      let lineIdx = 0;

      function nextLine() {
        if (lineIdx >= lines.length) {
          isTyping = false;
          input.disabled = false;
          input.focus();
          return;
        }
        const { text, cls } = lines[lineIdx];
        lineIdx++;

        // For box-drawing, banners, and spacers — show instantly
        if (cls === "t-box" || cls === "t-banner" || cls === "t-spacer" || cls === "t-header" || text.length === 0) {
          addLineInstant(text, cls);
          setTimeout(nextLine, 18);
          return;
        }

        // Animate character by character
        const div = document.createElement("div");
        div.className = "t-line " + cls;
        body.appendChild(div);
        scrollToBottom();

        let charIdx = 0;
        const speed = Math.max(8, Math.min(22, 600 / (text.length || 1))); // adaptive speed
        function typeChar() {
          if (charIdx < text.length) {
            div.textContent += text[charIdx];
            charIdx++;
            scrollToBottom();
            setTimeout(typeChar, speed);
          } else {
            setTimeout(nextLine, 30);
          }
        }
        typeChar();
      }

      nextLine();
    }

    // ── Add a line instantly (no animation) ──
    function addLineInstant(text, cls) {
      const div = document.createElement("div");
      div.className = "t-line " + (cls || "t-output");
      div.textContent = text;
      body.appendChild(div);
      scrollToBottom();
    }

    // ── Add the command echo line ──
    function addCommandLine(rawText) {
      const div = document.createElement("div");
      div.className = "t-line t-cmd-echo";
      div.innerHTML = `<span class="t-prompt-text">${escapeHtml(PROMPT)}</span> <span class="t-cmd-text">${escapeHtml(rawText)}</span>`;
      body.appendChild(div);
      scrollToBottom();
    }

    // ── Scroll to bottom ──
    function scrollToBottom() {
      body.scrollTop = body.scrollHeight;
    }
  }

  function escapeHtml(str) {
    const el = document.createElement("span");
    el.textContent = str;
    return el.innerHTML;
  }


  // ─── Tech Stack Orbit ─────────────────────────────────────
  function renderOrbit() {
    const container = document.getElementById("orbit-container");
    if (!container || !portfolioData.techOrbit) return;
    container.innerHTML = `
      <div class="orbit-ring orbit-ring-1"></div>
      <div class="orbit-ring orbit-ring-2"></div>
      <div class="orbit-ring orbit-ring-3"></div>
      <div class="orbit-center">🧠</div>
    `;
    const orbitRadii = { 1: 80, 2: 140, 3: 200 };
    const orbitDurations = { 1: 15, 2: 25, 3: 35 };
    const orbitCounts = { 1: 0, 2: 0, 3: 0 };

    // Count items per orbit
    portfolioData.techOrbit.forEach(t => { orbitCounts[t.orbit] = (orbitCounts[t.orbit] || 0) + 1; });
    const orbitIdx = { 1: 0, 2: 0, 3: 0 };

    portfolioData.techOrbit.forEach(tech => {
      const o = tech.orbit;
      const count = orbitCounts[o];
      const idx = orbitIdx[o]++;
      const radius = orbitRadii[o];
      const duration = orbitDurations[o];
      const delay = -(duration / count) * idx;

      const el = document.createElement("div");
      el.className = "orbit-item";
      el.style.setProperty("--orbit-radius", radius + "px");
      el.style.setProperty("--orbit-duration", duration + "s");
      el.style.setProperty("--orbit-delay", delay + "s");
      el.style.top = "50%";
      el.style.left = "50%";
      el.style.marginTop = "-24px";
      el.style.marginLeft = "-24px";
      el.innerHTML = `${tech.icon}<span class="orbit-label">${tech.name}</span>`;
      el.title = tech.name;
      container.appendChild(el);
    });
  }

  // ─── Skill Radar Chart ────────────────────────────────────
  function renderRadarChart() {
    const radarCanvas = document.getElementById("radar-chart");
    if (!radarCanvas || !portfolioData.radarSkills) return;

    const ctx2 = radarCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const size = 420;
    radarCanvas.width = size * dpr;
    radarCanvas.height = size * dpr;
    radarCanvas.style.width = size + "px";
    radarCanvas.style.height = size + "px";
    ctx2.scale(dpr, dpr);

    const center = size / 2;
    const maxR = size * 0.38;
    const skills = portfolioData.radarSkills;
    const n = skills.length;
    const angleStep = (Math.PI * 2) / n;

    // Draw concentric pentagons
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    levels.forEach(lev => {
      ctx2.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const x = center + Math.cos(angle) * maxR * lev;
        const y = center + Math.sin(angle) * maxR * lev;
        if (i === 0) ctx2.moveTo(x, y);
        else ctx2.lineTo(x, y);
      }
      ctx2.closePath();
      ctx2.strokeStyle = "rgba(0,212,255,.1)";
      ctx2.lineWidth = 1;
      ctx2.stroke();
    });

    // Draw axes
    for (let i = 0; i < n; i++) {
      const angle = angleStep * i - Math.PI / 2;
      ctx2.beginPath();
      ctx2.moveTo(center, center);
      ctx2.lineTo(center + Math.cos(angle) * maxR, center + Math.sin(angle) * maxR);
      ctx2.strokeStyle = "rgba(0,212,255,.08)";
      ctx2.lineWidth = 1;
      ctx2.stroke();
    }

    // Animate the data polygon
    let progress = 0;
    function drawFrame() {
      progress = Math.min(progress + 0.02, 1);

      // Clear only the data area by redrawing background
      // We re-draw the whole chart for simplicity
      ctx2.clearRect(0, 0, size, size);

      // Redraw grid
      levels.forEach(lev => {
        ctx2.beginPath();
        for (let i = 0; i <= n; i++) {
          const angle = angleStep * i - Math.PI / 2;
          const x = center + Math.cos(angle) * maxR * lev;
          const y = center + Math.sin(angle) * maxR * lev;
          if (i === 0) ctx2.moveTo(x, y); else ctx2.lineTo(x, y);
        }
        ctx2.closePath();
        ctx2.strokeStyle = "rgba(0,212,255,.1)";
        ctx2.lineWidth = 1;
        ctx2.stroke();
      });
      for (let i = 0; i < n; i++) {
        const angle = angleStep * i - Math.PI / 2;
        ctx2.beginPath();
        ctx2.moveTo(center, center);
        ctx2.lineTo(center + Math.cos(angle) * maxR, center + Math.sin(angle) * maxR);
        ctx2.strokeStyle = "rgba(0,212,255,.08)";
        ctx2.lineWidth = 1;
        ctx2.stroke();
      }

      // Data polygon
      ctx2.beginPath();
      skills.forEach((s, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const r = (s.value / 100) * maxR * progress;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        if (i === 0) ctx2.moveTo(x, y); else ctx2.lineTo(x, y);
      });
      ctx2.closePath();
      const grad = ctx2.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, "rgba(0,212,255,.25)");
      grad.addColorStop(1, "rgba(168,85,247,.25)");
      ctx2.fillStyle = grad;
      ctx2.fill();
      ctx2.strokeStyle = "rgba(0,212,255,.7)";
      ctx2.lineWidth = 2;
      ctx2.stroke();

      // Data points
      skills.forEach((s, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const r = (s.value / 100) * maxR * progress;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        ctx2.beginPath();
        ctx2.arc(x, y, 4, 0, Math.PI * 2);
        ctx2.fillStyle = "#00d4ff";
        ctx2.fill();
        ctx2.beginPath();
        ctx2.arc(x, y, 6, 0, Math.PI * 2);
        ctx2.strokeStyle = "rgba(0,212,255,.3)";
        ctx2.lineWidth = 1;
        ctx2.stroke();
      });

      // Axis labels
      ctx2.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text-secondary").trim() || "#9a9abf";
      ctx2.font = "12px 'Outfit', sans-serif";
      ctx2.textAlign = "center";
      ctx2.textBaseline = "middle";
      skills.forEach((s, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const lx = center + Math.cos(angle) * (maxR + 24);
        const ly = center + Math.sin(angle) * (maxR + 24);
        ctx2.fillText(s.axis, lx, ly);
      });

      if (progress < 1) requestAnimationFrame(drawFrame);
    }

    // Observer to trigger animation when visible
    const radarObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progress = 0;
          drawFrame();
          radarObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    radarObs.observe(radarCanvas.closest(".radar-container"));
  }

  // ─── Master Render ────────────────────────────────────────
  function renderAll() {
    renderHero();
    renderAbout();
    renderEducation();
    renderSkills();
    renderProjects();
    renderCertifications();
    renderAchievements();
    renderLanguages();
    renderHobbies();
    renderFooter();
    renderOrbit();

    // Re-observe for reveal animations
    setTimeout(setupReveal, 50);
  }

  renderAll();
  attachEditListeners();
  startTyping();
  initTerminal();
  renderRadarChart();
})();
