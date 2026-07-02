/* ═══════════════════════════════════════════════════════
   main.js  —  Shared utilities across all pages
   Jahanzaib Wakeel Portfolio
═══════════════════════════════════════════════════════ */
"use strict";

/* ── CUSTOM CURSOR ─────────────────────────────────── */
const cursor     = document.getElementById("cursor");
const cursorRing = document.getElementById("cursor-ring");
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("mousemove", e => {
  if (!finePointer || reduceMotion) return;
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + "px";
    cursor.style.top  = mouseY + "px";
  }
});

(function animateRing() {
  if (!finePointer || reduceMotion) {
    cursor && (cursor.style.display = "none");
    cursorRing && (cursorRing.style.display = "none");
    return;
  }
  ringX += (mouseX - ringX) * 0.11;
  ringY += (mouseY - ringY) * 0.11;
  if (cursorRing) {
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top  = ringY + "px";
  }
  requestAnimationFrame(animateRing);
})();

function initCursorHover() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll("a, button, .proj-card, .stat-card, .sk-card, .modal-link, .ct-link").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor    && cursor.classList.add("cursor-grow");
      cursorRing && cursorRing.classList.add("ring-grow");
    });
    el.addEventListener("mouseleave", () => {
      cursor    && cursor.classList.remove("cursor-grow");
      cursorRing && cursorRing.classList.remove("ring-grow");
    });
  });
}

/* ── SCROLL PROGRESS BAR ───────────────────────────── */
function initProgress() {
  const bar = document.getElementById("progress");
  if (!bar) return;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + "%";
      ticking = false;
    });
  }, { passive: true });
}

/* ── NAV SCROLL ────────────────────────────────────── */
function initNav() {
  const nav = document.querySelector("nav");
  if (!nav) return;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
      ticking = false;
    });
  }, { passive: true });
}

/* ── ACTIVE NAV LINK HIGHLIGHT ─────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-links a");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => obs.observe(s));
}

/* ── SCROLL REVEAL ─────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute("data-delay") || "0");
        setTimeout(() => entry.target.classList.add("visible"), delay * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => obs.observe(el));
}

/* ── HIRE ME MODAL ─────────────────────────────────── */
function initModal() {
  const overlay = document.getElementById("modal");
  if (!overlay) return;

  window.openModal = () => {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  window.closeModal = () => {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  /* Wire nav-cta and any button with data-modal */
  document.querySelectorAll("[data-modal='open']").forEach(btn => {
    btn.addEventListener("click", openModal);
  });
}

/* ── COUNTER ANIMATION ─────────────────────────────── */
function animateCounter(el, target, suffix = "") {
  const duration = 1600;
  const steps    = duration / 16;
  const inc      = target / steps;
  let   current  = 0;
  const timer = setInterval(() => {
    current += inc;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

function initCounters() {
  const grids = document.querySelectorAll(".stats-grid");
  if (!grids.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".stat-num").forEach(el => {
          const raw = el.textContent.trim();
          if (raw === "∞") return;
          const num = parseInt(raw);
          const suf = raw.includes("+") ? "+" : "";
          animateCounter(el, num, suf);
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  grids.forEach(g => obs.observe(g));
}

/* ── TYPED TEXT ────────────────────────────────────── */
window.typeText = function (el, text, speed = 28, delay = 0) {
  if (!el) return;
  el.textContent = "";
  let i = 0;
  setTimeout(() => {
    const t = setInterval(() => {
      if (i < text.length) { el.textContent += text[i++]; }
      else clearInterval(t);
    }, speed);
  }, delay);
};

/* ── GLITCH EFFECT ─────────────────────────────────── */
const glitchTimers = new WeakMap();

window.glitchOnce = function (el) {
  if (!el) return;
  if (!el.dataset.glitchHtml) {
    el.dataset.glitchHtml = el.innerHTML;
    el.dataset.glitchText = el.textContent;
  }

  const previous = glitchTimers.get(el);
  if (previous) clearInterval(previous);

  const originalText = el.dataset.glitchText;
  const originalHtml = el.dataset.glitchHtml;
  const chars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%!";
  let iter = 0;
  const interval = setInterval(() => {
    el.textContent = originalText.split("").map((c, i) => {
      if (c === " ") return " ";
      if (i < iter)  return originalText[i];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    if (iter >= originalText.length) {
      el.innerHTML = originalHtml;
      clearInterval(interval);
      glitchTimers.delete(el);
    }
    iter += 0.55;
  }, 28);
  glitchTimers.set(el, interval);
};

function initGlitch() {
  document.querySelectorAll("[data-glitch]").forEach(el => {
    el.dataset.glitchHtml = el.innerHTML;
    el.dataset.glitchText = el.textContent;
    el.addEventListener("mouseenter", () => glitchOnce(el));
  });
}

/* ── MAGNETIC BUTTONS ──────────────────────────────── */
function initMagnetic() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll(".btn-volt, .btn-outline").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = ((e.clientX - r.left) - r.width  / 2) * 0.28;
      const y = ((e.clientY - r.top)  - r.height / 2) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });
}

/* ── SKILL CARD TILT ───────────────────────────────── */
function initTilt() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll(".sk-card, .proj-card, .stat-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left) / r.width  - 0.5;
      const y  = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-5px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

/* ── FOOTER YEAR ───────────────────────────────────── */
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ── INIT ALL ──────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initCursorHover();
  initProgress();
  initNav();
  initActiveNav();
  initReveal();
  initModal();
  initCounters();
  initGlitch();
  initMagnetic();
  initTilt();
  initYear();
});

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function initMotionCanvas() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const enableAmbientCanvas = false;
  if (!enableAmbientCanvas) return;
  if (document.getElementById("three-canvas")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "motion-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  const colors = ["#ff2bd6", "#00f5ff", "#f8ff4a", "#bc8cff"];
  let width = 0;
  let height = 0;
  let scrollRatio = 0;
  let pointer = { x: 0.5, y: 0.5 };
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.min(130, Math.max(54, Math.floor(width / 15)));
    particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2,
      r: Math.random() * 1.8 + 0.5,
      a: Math.random() * 0.45 + 0.14,
      phase: Math.random() * Math.PI * 2,
      color: colors[i % colors.length],
    }));
  }

  function updateScroll() {
    const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
    scrollRatio = window.scrollY / max;
  }

  document.addEventListener("mousemove", e => {
    pointer.x = e.clientX / Math.max(1, width);
    pointer.y = e.clientY / Math.max(1, height);
  }, { passive: true });
  window.addEventListener("resize", resize);
  window.addEventListener("scroll", updateScroll, { passive: true });

  resize();
  updateScroll();

  let tick = 0;
  function draw() {
    tick += 0.006;
    ctx.clearRect(0, 0, width, height);

    const hueShift = scrollRatio * Math.PI * 2;
    const glowX = width * (0.18 + pointer.x * 0.64);
    const glowY = height * (0.16 + pointer.y * 0.62);
    const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.max(width, height) * 0.62);
    glow.addColorStop(0, `rgba(0,245,255,${0.10 + scrollRatio * 0.07})`);
    glow.addColorStop(0.42, "rgba(255,43,214,0.055)");
    glow.addColorStop(1, "rgba(5,2,13,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    particles.forEach((p, i) => {
      const drift = tick * (0.55 + p.z) + p.phase + hueShift;
      p.x += Math.cos(drift) * p.z * 0.45 + (pointer.x - 0.5) * p.z * 0.34;
      p.y += Math.sin(drift * 1.15) * p.z * 0.42 + scrollRatio * p.z * 0.86;

      if (p.x < -30) p.x = width + 30;
      if (p.x > width + 30) p.x = -30;
      if (p.y < -30) p.y = height + 30;
      if (p.y > height + 30) p.y = -30;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (1 + scrollRatio * 1.2), 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(p.color, p.a);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j += 9) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,245,255,${(1 - dist / 120) * 0.075})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
}

function initCardSpotlights() {
  document.addEventListener("pointermove", e => {
    const card = e.target.closest(".stat-card, .sk-card, .proj-card, .edu-card, .cta-inner, .p2-contact-wrap");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, { passive: true });
}

function initCommandPalette() {
  const commands = [
    { label: "Go to About", target: "#about" },
    { label: "Open Engineering Lab", target: "#lab" },
    { label: "Go to Education", target: "#education" },
    { label: "Open Projects Page", target: "projects.html" },
    { label: "Email Jahanzaib", target: "mailto:jahanzaibwakeel4@gmail.com" },
    { label: "Open GitHub", target: "https://github.com/jahanzaibwakeel" },
    { label: "Open LinkedIn", target: "https://linkedin.com/in/jahanzaib-wakeel060/" },
  ];

  const palette = document.createElement("div");
  palette.className = "command-palette";
  palette.innerHTML = `
    <div class="command-box" role="dialog" aria-label="Quick command palette">
      <input type="search" placeholder="Type a command... try projects, github, email" />
      <div class="command-list"></div>
    </div>
  `;
  document.body.appendChild(palette);

  const input = palette.querySelector("input");
  const list = palette.querySelector(".command-list");

  function render(query = "") {
    const q = query.trim().toLowerCase();
    const rows = commands.filter(c => c.label.toLowerCase().includes(q));
    list.innerHTML = rows.map(c => `<button type="button" data-target="${c.target}">${c.label}</button>`).join("");
  }

  function open() {
    render(input.value);
    palette.classList.add("open");
    setTimeout(() => input.focus(), 40);
  }

  function close() {
    palette.classList.remove("open");
    input.value = "";
  }

  document.addEventListener("keydown", e => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.classList.contains("open") ? close() : open();
    }
    if (e.key === "Escape") close();
  });

  input.addEventListener("input", () => render(input.value));
  palette.addEventListener("click", e => {
    if (e.target === palette) close();
    const btn = e.target.closest("button[data-target]");
    if (!btn) return;
    const target = btn.dataset.target;
    close();
    if (target.startsWith("#")) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = target;
    }
  });
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  initMotionCanvas();
  initCardSpotlights();
  initCommandPalette();
});
