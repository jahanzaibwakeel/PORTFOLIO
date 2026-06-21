/* ═══════════════════════════════════════════════════════
   projects.js  —  Projects page specific functionality
   Jahanzaib Wakeel Portfolio
═══════════════════════════════════════════════════════ */
"use strict";

/* ── PROJECT DATA ──────────────────────────────────── */
const PROJECTS = [
  {
    id: "fraudpulse",
    type: "Full-Stack · Analytics · Real-Time",
    name: "FraudPulse — Fraud Detection Platform",
    short: "Real-time fraud detection with transaction simulation, event-driven scoring, explainable rules, and analyst dashboards. Built on a TypeScript full-stack architecture with PostgreSQL, Redis, Prometheus and Grafana observability.",
    detail: `
      <h3>Overview</h3>
      <p>FraudPulse is a local real-time fraud detection platform I built from scratch to demonstrate end-to-end full-stack engineering across a complex, data-intensive domain. It simulates real transaction traffic, scores each event in real time using configurable rule engines and trained ML models, and surfaces results through a polished analyst dashboard.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Transaction simulation engine generating realistic payment events</li>
        <li>Event-driven scoring pipeline with explainable rule triggers</li>
        <li>ML model integration for anomaly classification</li>
        <li>Analyst review dashboard — risk signals, suspicious activity feeds, investigation queue</li>
        <li>Prometheus metrics + Grafana dashboards for system observability</li>
        <li>Valkey (Redis-compatible) for high-speed caching and session state</li>
        <li>PostgreSQL with raw SQL queries for complex analytics and reporting</li>
      </ul>
      <h3>Technical Decisions</h3>
      <p>I chose Next.js App Router for the frontend to leverage server components for data-heavy dashboard views, reducing client bundle size. The backend uses Node.js with a custom event bus pattern rather than a heavy message queue — appropriate for local demo scale. Prometheus scraping is configured via a /metrics endpoint exposed by the backend service.</p>
      <h3>What I Learned</h3>
      <p>Building FraudPulse pushed my understanding of time-series data patterns, query optimization for high-cardinality datasets, and how to design dashboards that surface signal over noise. I also deepened my knowledge of PostgreSQL window functions and aggregation queries for analytics workloads.</p>
    `,
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "SQL", "Valkey/Redis", "Prometheus", "Grafana", "Docker"],
    github: "https://github.com/jahanzaibwakeel/FraudPulse--Fraud-detection-system",
    live: "https://fraudpulse-jahanzaib.duckdns.org",
    featured: true,
  },
  {
    id: "recolab",
    type: "Full-Stack · AI · Machine Learning",
    name: "RecoLab — AI Recommendation Engine",
    short: "Local-first AI recommendation platform with hybrid collaborative + content-based algorithms, local LLM explanations via Ollama, feedback tracking, canary routing, and analytics dashboards.",
    detail: `
      <h3>Overview</h3>
      <p>RecoLab is a full-stack AI recommendation platform I built to explore how recommendation systems work at an architectural level. It implements both collaborative filtering and content-based filtering, combines them in a hybrid scoring layer, and uses a locally-running Ollama LLM to generate natural language explanations for each recommendation.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Hybrid recommendation engine: collaborative filtering + content-based scoring</li>
        <li>Local LLM explanations via Ollama — "Why was this recommended?" in plain English</li>
        <li>User feedback tracking — thumbs up/down feeds back into model scoring</li>
        <li>Canary routing — A/B test different recommendation algorithms live</li>
        <li>Drift monitoring — detects when model performance degrades over time</li>
        <li>Recruiter-ready analytics dashboard with model metrics and conversion data</li>
        <li>Fully Dockerized for one-command local deployment</li>
      </ul>
      <h3>Technical Decisions</h3>
      <p>I used Express + TypeScript for the backend to keep the API layer lightweight while maintaining strong type safety across the recommendation pipeline. PostgreSQL stores user-item interaction data with Valkey caching for hot recommendation results. The Ollama integration runs asynchronously — recommendations are returned immediately, explanations are streamed in afterwards.</p>
      <h3>What I Learned</h3>
      <p>This project gave me deep exposure to recommendation system patterns, LLM API integration, and the challenges of evaluating ML model quality over time. The canary routing system taught me a lot about feature flagging and controlled rollouts.</p>
    `,
    stack: ["Next.js", "Express", "TypeScript", "PostgreSQL", "SQL", "Valkey/Redis", "Ollama", "Docker", "Python"],
    github: "https://github.com/jahanzaibwakeel/Recolab",
    featured: false,
  },
  {
    id: "fieldops",
    type: "Full-Stack · SaaS · Multi-Role",
    name: "FieldOps — Field Service Management",
    short: "Multi-role field service platform for scheduling jobs, assigning technicians, tracking progress, and giving clients real-time visibility. Role-based JWT auth, audit logging, and Prisma-backed persistence.",
    detail: `
      <h3>Overview</h3>
      <p>FieldOps was built as a job assessment project and demonstrates a complete multi-role SaaS application. It serves three distinct user types — Admin, Technician, and Client — each with their own dashboard, permissions, and feature set, all within the same application.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Three distinct role-based dashboards: Admin, Technician, Client</li>
        <li>JWT authentication with refresh token rotation</li>
        <li>Job lifecycle management: creation → assignment → in-progress → completed</li>
        <li>Real-time job status updates visible to clients</li>
        <li>Technician scheduling and availability tracking</li>
        <li>Full audit log — every state change recorded with timestamp and actor</li>
        <li>In-app notification system</li>
        <li>Prisma ORM with SQLite for zero-config local deployment</li>
        <li>Docker Compose for full stack one-command startup</li>
      </ul>
      <h3>Technical Decisions</h3>
      <p>I chose Prisma + SQLite for this assessment to demonstrate schema design and migration patterns without requiring a running database server. The permission system uses a middleware-based approach where each route checks the decoded JWT role before processing — clean, readable, and easy to extend. React with Vite gives fast HMR during development.</p>
      <h3>What I Learned</h3>
      <p>FieldOps sharpened my thinking about multi-tenant permission models, audit trail design, and the UX challenges of building for multiple user personas in one application. Working under assessment time pressure also improved my ability to prioritize and ship fast.</p>
    `,
    stack: ["React", "Vite", "TypeScript", "Express", "Prisma ORM", "SQLite", "JWT", "Docker"],
    github: "https://github.com/jahanzaibwakeel/FieldOps",
    featured: false,
  },
  {
    id: "atlas",
    type: "Full-Stack · Productivity · Modular",
    name: "Atlas Suite — Modular Productivity Platform",
    short: "Modular full-stack productivity suite for managing multiple workflow areas from a single interface. Clean navigation, reusable UI patterns, and API-integrated dashboard workflows.",
    detail: `
      <h3>Overview</h3>
      <p>Atlas Suite is a modular productivity platform I built to explore large-scale frontend architecture. The core concept is a single shell application that hosts multiple workflow modules — each self-contained, independently navigable, and connected to a shared backend API layer.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Module shell architecture — add or remove workflow modules without touching core layout</li>
        <li>Shared component library — buttons, tables, forms, cards reused across all modules</li>
        <li>Centralized API layer with consistent request/response handling and error boundaries</li>
        <li>Responsive dashboard layouts optimized for operational work</li>
        <li>TypeScript throughout — end-to-end type safety from API response to UI component</li>
        <li>Node.js backend with RESTful API design and structured error responses</li>
      </ul>
      <h3>Technical Decisions</h3>
      <p>I chose Next.js App Router to leverage layouts for the shell architecture — the sidebar and header are persistent layout components, modules render inside a slot. This maps cleanly to Next.js nested routing. TypeScript generics are used extensively for the API client layer, making response types explicit and auto-completing throughout the codebase.</p>
      <h3>What I Learned</h3>
      <p>Atlas Suite strengthened my understanding of scalable frontend architecture — specifically how to design component APIs, manage shared state across modules, and keep codebases maintainable as they grow. It also pushed my TypeScript generics knowledge significantly.</p>
    `,
    stack: ["React", "Next.js", "TypeScript", "Node.js", "REST API", "Tailwind CSS"],
    github: "https://github.com/jahanzaibwakeel/atlas-suite.",
    live: "https://atlas-suite-omega.vercel.app",
    featured: false,
  },
  {
    id: "chatbot",
    type: "Frontend · AI · Real-Time",
    name: "AI Study Chatbot",
    short: "AI-powered study assistant with real-time answers, streaming responses, dynamic state management, and a clean responsive React interface backed by a Node.js API proxy.",
    detail: `
      <h3>Overview</h3>
      <p>The AI Study Chatbot was one of my earliest AI integration projects — a real-time chat interface connected to Hugging Face model APIs through a Node.js proxy layer. It's built entirely in React with a focus on smooth UX and production-quality code patterns.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Real-time AI responses via Hugging Face model APIs</li>
        <li>Node.js proxy server handling API authentication and rate limiting</li>
        <li>Streaming response rendering — text appears character by character</li>
        <li>Full conversation history with scroll-to-bottom behavior</li>
        <li>Input validation and error boundary handling</li>
        <li>Responsive mobile-first layout</li>
        <li>Reusable message, input, and loading components</li>
      </ul>
      <h3>Technical Decisions</h3>
      <p>I built a Node.js proxy rather than calling the Hugging Face API directly from the browser to keep API keys server-side and add rate limiting. React state manages the conversation history with an immutable update pattern. The streaming effect is simulated on the client for performance — the full response arrives, then renders progressively.</p>
      <h3>What I Learned</h3>
      <p>This project introduced me to AI API integration patterns, the importance of proxy layers for security, and how to build chat UIs that feel responsive and alive. It sparked my deeper interest in AI-assisted features that I've carried into every project since.</p>
    `,
    stack: ["React", "JavaScript", "Node.js", "Express", "Hugging Face API", "CSS3"],
    github: "https://github.com/jahanzaibwakeel/AI-Study-chatbot",
    featured: false,
  },
  {
    id: "cliniq-ai",
    type: "Full-Stack · AI · Healthcare",
    name: "ClinIQ AI — Clinic Workflow Platform",
    short: "AI-powered clinic workflow platform for doctors and small clinics. Manages patients, consultations, documents, follow-ups, and clinical notes with doctor-reviewed AI summaries and SOAP note generation.",
    detail: `
      <h3>Overview</h3>
      <p>ClinIQ AI is a local-first clinic workflow platform designed for doctors and small clinics. It brings together patient management, consultation history, clinical documents, follow-up tasks, and AI-assisted note generation inside one practical workflow.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Patient and consultation management for clinic workflows</li>
        <li>AI visit summaries with doctor-review safety controls</li>
        <li>SOAP note generation and patient-friendly summaries</li>
        <li>Clinical task extraction and follow-up tracking</li>
        <li>Document handling and searchable patient history</li>
        <li>Production-style deployment with a live Vercel build</li>
      </ul>
      <h3>Technical Decisions</h3>
      <p>The project focuses on useful AI inside a real domain workflow instead of a generic chatbot. The UI is structured around clinical review, safety, and speed, keeping the doctor in control of AI-generated output before it becomes part of the patient record.</p>
      <h3>What I Learned</h3>
      <p>ClinIQ AI pushed my thinking around AI-assisted productivity, domain-specific UX, data safety, and how to make generated content useful without removing human review from important decisions.</p>
    `,
    stack: ["Next.js", "React", "TypeScript", "AI", "Clinical Notes", "Vercel", "Workflow UX"],
    github: "https://github.com/jahanzaibwakeel/CLINIQ-AI",
    live: "https://cliniq-ai-ruby.vercel.app",
    featured: true,
  },
];

/* ── SKILLS DATA ───────────────────────────────────── */
const SKILLS = [
  {
    icon: "⚛️",
    title: "Frontend",
    tags: ["React.js", "Next.js", "Angular", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "Zustand", "React Query", "Vite", "HTML5", "CSS3", "Bootstrap"],
  },
  {
    icon: "⚙️",
    title: "Backend",
    tags: ["Node.js", "Express.js", "FastAPI", "Python", "REST API Design", "JWT Authentication", "Prisma ORM", "Middleware Patterns"],
  },
  {
    icon: "🗄️",
    title: "Databases & SQL",
    tags: ["PostgreSQL", "MongoDB", "MySQL", "SQLite", "SQL (Raw Queries)", "Prisma Migrations", "Query Optimisation", "Redis/Valkey"],
  },
  {
    icon: "🐳",
    title: "DevOps & Tooling",
    tags: ["Docker", "Docker Compose", "GitHub Actions", "Vercel", "Git", "Postman", "Prometheus", "Grafana", "VS Code"],
  },
  {
    icon: "🧠",
    title: "CS Fundamentals",
    tags: ["Data Structures", "Algorithms", "OOP", "System Design", "MVC Pattern", "Component Architecture", "Agile/Scrum", "Code Review"],
  },
  {
    icon: "🤖",
    title: "AI & Integrations",
    tags: ["Hugging Face API", "Ollama (Local LLM)", "LLM API Integration", "AI Feature Design", "RAG Concepts", "Model Evaluation"],
  },
];

/* ── RENDER SKILLS ─────────────────────────────────── */
function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.innerHTML = SKILLS.map((s, i) => `
    <div class="sk-card" data-reveal data-delay="${i + 1}">
      <div class="sk-card-glow"></div>
      <span class="sk-icon">${s.icon}</span>
      <div class="sk-title">${s.title}</div>
      <div class="sk-tags">
        ${s.tags.map(t => `<span class="sk-tag">${t}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

/* ── RENDER PROJECTS ───────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  const toolbar = document.createElement("div");
  toolbar.className = "project-toolbar";
  toolbar.innerHTML = `
    <div class="project-filters" aria-label="Project filters">
      <button class="filter-pill active" data-filter="all">All</button>
      <button class="filter-pill" data-filter="ai">AI</button>
      <button class="filter-pill" data-filter="data">Data</button>
      <button class="filter-pill" data-filter="saas">SaaS</button>
      <button class="filter-pill" data-filter="healthcare">Healthcare</button>
      <button class="filter-pill" data-filter="frontend">Frontend</button>
    </div>
    <button class="spotlight-toggle" type="button">Spotlight strongest work</button>
  `;
  grid.before(toolbar);
  grid.innerHTML = PROJECTS.map((p, i) => `
    <div class="proj-card ${p.featured ? "featured" : ""}"
         data-project-tags="${projectTags(p).join(" ")}"
         data-reveal data-delay="${i + 1}"
         onclick="openProjectModal('${p.id}')">
      <div class="proj-signal"><span></span><span></span><span></span></div>
      <div>
        <div class="proj-eyebrow">${p.type}</div>
        <div class="proj-name">${p.name}</div>
        <p class="proj-desc">${p.short}</p>
        <div class="proj-stack">
          ${p.stack.map(t => `<span class="stk-tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="proj-footer">
        <div class="proj-links">
          ${p.live ? `<a href="${p.live}" target="_blank" class="proj-gh" onclick="event.stopPropagation()">Live Demo</a>` : ""}
          <a href="${p.github}" target="_blank" class="proj-gh" onclick="event.stopPropagation()">GitHub</a>
        </div>
        <button class="btn-sm" onclick="event.stopPropagation(); openProjectModal('${p.id}')">
          View Details
        </button>
      </div>
    </div>
  `).join("");
}

function projectTags(project) {
  const blob = `${project.type} ${project.name} ${project.short} ${project.stack.join(" ")}`.toLowerCase();
  const tags = [];
  if (/\bai\b/.test(blob) || blob.includes("llm") || blob.includes("recommendation") || blob.includes("machine")) tags.push("ai");
  if (blob.includes("fraud") || blob.includes("analytics") || blob.includes("postgresql") || blob.includes("grafana")) tags.push("data");
  if (blob.includes("saas") || blob.includes("field") || blob.includes("multi-role")) tags.push("saas");
  if (blob.includes("clinic") || blob.includes("clinical") || blob.includes("healthcare") || blob.includes("doctor")) tags.push("healthcare");
  if (blob.includes("frontend") || blob.includes("react") || blob.includes("angular")) tags.push("frontend");
  return tags.length ? tags : ["frontend"];
}

function initProjectFilters() {
  const toolbar = document.querySelector(".project-toolbar");
  const cards = document.querySelectorAll(".proj-card");
  if (!toolbar || !cards.length) return;

  toolbar.addEventListener("click", e => {
    const filter = e.target.closest("[data-filter]");
    const spotlight = e.target.closest(".spotlight-toggle");

    if (filter) {
      toolbar.querySelectorAll("[data-filter]").forEach(btn => btn.classList.remove("active"));
      filter.classList.add("active");
      const key = filter.dataset.filter;
      cards.forEach(card => {
        const tags = card.dataset.projectTags || "";
        card.classList.toggle("hide-card", key !== "all" && !tags.includes(key));
      });
    }

    if (spotlight) {
      spotlight.classList.toggle("active");
      cards.forEach(card => {
        const isFeatured = card.classList.contains("featured") || (card.dataset.projectTags || "").includes("ai data");
        card.classList.toggle("spotlight", spotlight.classList.contains("active") && isFeatured);
      });
    }
  });
}

/* ── PROJECT DETAIL MODAL ──────────────────────────── */
function buildProjectModal() {
  const existing = document.getElementById("project-modal");
  if (existing) return;

  const el = document.createElement("div");
  el.id = "project-modal";
  el.className = "modal-overlay";
  el.innerHTML = `
    <div class="modal" style="max-width:680px;max-height:85vh;overflow-y:auto">
      <div class="modal-top-bar"></div>
      <button class="modal-close" id="proj-modal-close">✕</button>
      <div id="proj-modal-content"></div>
    </div>
  `;
  document.body.appendChild(el);

  document.getElementById("proj-modal-close").addEventListener("click", closeProjectModal);
  el.addEventListener("click", e => { if (e.target === el) closeProjectModal(); });
}

window.openProjectModal = function (id) {
  const proj = PROJECTS.find(p => p.id === id);
  if (!proj) return;

  const modal   = document.getElementById("project-modal");
  const content = document.getElementById("proj-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="modal-eyebrow">${proj.type}</div>
    <div class="modal-title" style="font-size:1.5rem;margin-bottom:.5rem">${proj.name}</div>
    <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1.5rem">
      ${proj.stack.map(t => `<span class="stk-tag">${t}</span>`).join("")}
    </div>
    <div class="proj-detail-body" style="color:var(--tm);font-size:.9rem;line-height:1.8">
      ${proj.detail}
    </div>
    <div style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
      ${proj.live ? `<a href="${proj.live}" target="_blank" class="btn-volt" style="font-size:.8rem;padding:.6rem 1.2rem">Open Live Demo</a>` : ""}
      <a href="${proj.github}" target="_blank" class="btn-outline" style="font-size:.8rem;padding:.6rem 1.2rem">
        View on GitHub
      </a>
      <button class="btn-outline" style="font-size:.8rem;padding:.6rem 1.2rem"
              onclick="closeProjectModal()">Close</button>
    </div>
  `;

  /* Style the injected detail HTML */
  content.querySelectorAll("h3").forEach(h => {
    h.style.cssText = "font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;color:var(--tB);margin:1.2rem 0 .5rem";
  });
  content.querySelectorAll("p").forEach(p => {
    p.style.cssText = "margin-bottom:.75rem";
  });
  content.querySelectorAll("ul").forEach(ul => {
    ul.style.cssText = "padding-left:1.2rem;margin-bottom:.75rem;display:flex;flex-direction:column;gap:.35rem";
  });
  content.querySelectorAll("li").forEach(li => {
    li.style.cssText = "list-style:disc;color:var(--tm);font-size:.88rem;line-height:1.6";
  });

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
};

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}
window.closeProjectModal = closeProjectModal;

/* ── PAGE 2 PARTICLE BG ────────────────────────────── */
function initParticleBg() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W = window.innerWidth;
  let H = document.getElementById("page2-hero").offsetHeight || 500;
  canvas.width  = W;
  canvas.height = H;

  const VOLT   = "rgba(200,241,53,";
  const BLUE   = "rgba(88,166,255,";
  const PURPLE = "rgba(188,140,255,";
  const colors = [VOLT, BLUE, PURPLE];

  const particles = Array.from({ length: 70 }, () => ({
    x:   Math.random() * W,
    y:   Math.random() * H,
    r:   Math.random() * 1.5 + 0.5,
    vx:  (Math.random() - 0.5) * 0.4,
    vy:  (Math.random() - 0.5) * 0.4,
    col: colors[Math.floor(Math.random() * colors.length)],
    a:   Math.random() * 0.4 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + p.a + ")";
      ctx.fill();
    });

    /* Draw connecting lines */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.06;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(200,241,53,${alpha})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener("resize", () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = document.getElementById("page2-hero").offsetHeight || 500;
  });
}

/* ── HASH-BASED ANCHOR SCROLL ──────────────────────── */
function initHashScroll() {
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 400);
    }
  }
}

/* ── INIT ──────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  initProjectFilters();
  if (typeof initCursorHover === "function") initCursorHover();
  if (typeof initTilt === "function") initTilt();
  buildProjectModal();
  initParticleBg();
  initHashScroll();

  /* Re-init reveal after rendering */
  setTimeout(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute("data-delay") || "0");
          setTimeout(() => entry.target.classList.add("visible"), delay * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => obs.observe(el));
  }, 100);
});
