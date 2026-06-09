/* ═══════════════════════════════════════════════════════
   main.js  —  Shared utilities across all pages
   Jahanzaib Wakeel Portfolio
═══════════════════════════════════════════════════════ */
"use strict";

/* ── CUSTOM CURSOR ─────────────────────────────────── */
const cursor     = document.getElementById("cursor");
const cursorRing = document.getElementById("cursor-ring");
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + "px";
    cursor.style.top  = mouseY + "px";
  }
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.11;
  ringY += (mouseY - ringY) * 0.11;
  if (cursorRing) {
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top  = ringY + "px";
  }
  requestAnimationFrame(animateRing);
})();

function initCursorHover() {
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
  window.addEventListener("scroll", () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + "%";
  }, { passive: true });
}

/* ── NAV SCROLL ────────────────────────────────────── */
function initNav() {
  const nav = document.querySelector("nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
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
window.glitchOnce = function (el) {
  if (!el) return;
  const original = el.textContent;
  const chars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%!";
  let iter = 0;
  const interval = setInterval(() => {
    el.textContent = original.split("").map((c, i) => {
      if (c === " ") return " ";
      if (i < iter)  return original[i];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    if (iter >= original.length) { el.textContent = original; clearInterval(interval); }
    iter += 0.55;
  }, 28);
};

function initGlitch() {
  document.querySelectorAll("[data-glitch]").forEach(el => {
    el.addEventListener("mouseenter", () => glitchOnce(el));
  });
}

/* ── MAGNETIC BUTTONS ──────────────────────────────── */
function initMagnetic() {
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
