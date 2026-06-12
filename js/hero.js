/*
   hero.js - cinematic Three.js laptop scene for index.html
   The hero scroll now behaves like a camera push into a glowing portfolio screen.
*/
"use strict";

function initHero() {
  const canvas = document.getElementById("three-canvas");
  const hero = document.getElementById("hero");
  if (!canvas || !hero || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05020d, 0.024);

  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 180);
  camera.position.set(-2.8, 3.1, 13.5);

  const cam = {
    x: -2.8, y: 3.1, z: 13.5,
    lx: 2.2, ly: 0.7, lz: -1.2,
    progress: 0,
  };

  const laptop = createLaptop();
  laptop.group.position.set(3.05, -1.52, -1.2);
  laptop.group.rotation.y = -0.28;
  scene.add(laptop.group);

  const grid = new THREE.GridHelper(70, 56, 0x273047, 0x111827);
  grid.position.y = -1.68;
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  scene.add(grid);

  const tunnel = createLightTunnel();
  scene.add(tunnel);

  const floaters = createFloatingBadges();
  floaters.forEach(item => scene.add(item));

  scene.add(new THREE.AmbientLight(0x21304f, 2.7));
  const key = new THREE.PointLight(0x00f5ff, 5.8, 38);
  key.position.set(-4, 6, 7);
  scene.add(key);
  const pink = new THREE.PointLight(0xff2bd6, 4.6, 34);
  pink.position.set(7, 3, 4);
  scene.add(pink);
  const acid = new THREE.PointLight(0xf8ff4a, 3.2, 24);
  acid.position.set(1.5, 1.8, 3.8);
  scene.add(acid);

  const stars = createStarField();
  scene.add(stars);

  let mouseX = 0;
  let mouseY = 0;
  let scrollProgress = 0;

  document.addEventListener("mousemove", e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=180%",
        scrub: 1.4,
        pin: true,
        onUpdate: self => {
          scrollProgress = self.progress;
          cam.progress = self.progress;
        },
      },
    })
      .to(cam, {
        x: 2.82, y: 1.1, z: 4.42,
        lx: 3.02, ly: 0.52, lz: -1.78,
        ease: "power2.inOut",
      }, 0)
      .to(laptop.group.rotation, { y: -0.02, x: 0.02, ease: "power2.inOut" }, 0)
      .to(laptop.group.position, { x: 2.15, y: -1.32, z: -1.72, ease: "power2.inOut" }, 0)
      .to(".hero-content", { y: -90, opacity: 0.2, filter: "blur(2px)", ease: "power2.inOut" }, 0.34)
      .to(".hero-scroll", { opacity: 0, ease: "power1.out" }, 0.05);

    gsap.fromTo("#about", { "--section-glow": 0 }, {
      "--section-glow": 1,
      scrollTrigger: {
        trigger: "#about",
        start: "top 85%",
        end: "top 35%",
        scrub: true,
      },
    });
  } else {
    window.addEventListener("scroll", () => {
      const pct = Math.min(1, window.scrollY / Math.max(1, hero.offsetHeight));
      scrollProgress = pct;
      cam.progress = pct;
      cam.x = -2.8 + (2.82 + 2.8) * pct;
      cam.y = 3.1 + (1.1 - 3.1) * pct;
      cam.z = 13.5 + (4.42 - 13.5) * pct;
    }, { passive: true });
  }

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.016;

    laptop.update(t, scrollProgress);
    tunnel.rotation.z += 0.0014 + scrollProgress * 0.002;
    tunnel.children.forEach((ring, i) => {
      ring.material.opacity = 0.05 + Math.sin(t * 1.6 + i) * 0.018 + scrollProgress * 0.06;
      ring.scale.setScalar(1 + Math.sin(t + i) * 0.025);
    });

    floaters.forEach((item, i) => {
      item.position.y = item.userData.baseY + Math.sin(t * item.userData.speed + i) * 0.18;
      item.rotation.y += item.userData.spin;
      item.material.opacity = 0.45 + scrollProgress * 0.32;
    });

    stars.rotation.y += 0.00028 + scrollProgress * 0.0007;
    key.intensity = 4.8 + Math.sin(t * 1.7) * 0.8 + scrollProgress * 2;
    pink.intensity = 3.8 + Math.sin(t * 1.3 + 1.5) * 0.6;
    acid.intensity = 2.6 + scrollProgress * 3.5;

    camera.position.x += (cam.x + mouseX * (0.28 - scrollProgress * 0.18) - camera.position.x) * 0.055;
    camera.position.y += (cam.y - mouseY * 0.16 - camera.position.y) * 0.055;
    camera.position.z += (cam.z - camera.position.z) * 0.055;
    camera.lookAt(cam.lx, cam.ly, cam.lz);

    renderer.render(scene, camera);
  }
  animate();
}

function createLaptop() {
  const group = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({
    color: 0x0a0e19,
    roughness: 0.34,
    metalness: 0.72,
  });
  const edge = new THREE.MeshStandardMaterial({
    color: 0x1d2840,
    roughness: 0.28,
    metalness: 0.8,
  });
  const black = new THREE.MeshStandardMaterial({
    color: 0x03050b,
    roughness: 0.44,
    metalness: 0.3,
  });

  const base = new THREE.Mesh(new THREE.BoxGeometry(6.35, 0.18, 3.72), metal);
  base.position.set(0, 0, 0.82);
  base.castShadow = true;
  group.add(base);

  const bevel = new THREE.Mesh(new THREE.BoxGeometry(6.55, 0.08, 3.92), edge);
  bevel.position.set(0, -0.06, 0.82);
  group.add(bevel);

  const trackpad = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.025, 0.82), black);
  trackpad.position.set(0, 0.13, 1.78);
  group.add(trackpad);

  const keyMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    roughness: 0.5,
    metalness: 0.25,
    emissive: 0x001a2a,
    emissiveIntensity: 0.2,
  });
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 13; col++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.028, 0.18), keyMat);
      key.position.set(-2.35 + col * 0.39 + (row % 2) * 0.08, 0.15, 0.2 + row * 0.28);
      group.add(key);
    }
  }

  const screenGroup = new THREE.Group();
  screenGroup.position.set(0, 1.72, -1.08);
  screenGroup.rotation.x = -0.12;
  group.add(screenGroup);

  const frame = new THREE.Mesh(new THREE.BoxGeometry(6.18, 3.72, 0.22), black);
  screenGroup.add(frame);

  const screenTexture = createScreenTexture();
  const screenMat = new THREE.MeshBasicMaterial({
    map: screenTexture.texture,
    transparent: true,
    opacity: 0.98,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(5.62, 3.16), screenMat);
  screen.position.z = 0.121;
  screenGroup.add(screen);

  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(6.4, 3.9),
    new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  glow.position.z = 0.105;
  screenGroup.add(glow);

  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 5.5, 24), edge);
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, 0.28, -1.12);
  group.add(hinge);

  return {
    group,
    update(time, progress) {
      screenTexture.draw(time, progress);
      glow.material.opacity = 0.07 + progress * 0.2 + Math.sin(time * 3) * 0.018;
      screenGroup.rotation.x = -0.12 + progress * 0.045;
      keyMat.emissiveIntensity = 0.18 + progress * 0.7;
    },
  };
}

function createScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  function draw(time, progress) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#060716");
    bg.addColorStop(0.45, "#10102b");
    bg.addColorStop(1, "#05121d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = `rgba(0,245,255,${0.08 + progress * 0.14})`;
    ctx.lineWidth = 1;
    for (let x = -80; x < w + 80; x += 58) {
      ctx.beginPath();
      ctx.moveTo(x + Math.sin(time + x) * 14, 0);
      ctx.lineTo(x - 180 + progress * 220, h);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    roundRect(ctx, 56, 48, 912, 64, 18);
    ctx.fill();
    ctx.fillStyle = "#f8ff4a";
    ctx.font = "700 25px Syne, Arial";
    ctx.fillText("Jahanzaib Wakeel / Full-Stack Engineer", 92, 90);

    const pulse = Math.sin(time * 3) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(0,245,255,${0.16 + pulse * 0.12})`;
    roundRect(ctx, 60, 136, 420 + progress * 180, 150, 22);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 56px Syne, Arial";
    ctx.fillText("Build", 96, 204);
    ctx.fillStyle = "#ff2bd6";
    ctx.fillText("Systems", 96, 262);

    const cards = [
      ["React", "#00f5ff"], ["Node", "#f8ff4a"], ["FastAPI", "#ff2bd6"],
      ["Postgres", "#bc8cff"], ["Docker", "#00f5ff"], ["AI", "#f8ff4a"],
    ];
    cards.forEach((card, i) => {
      const x = 562 + (i % 2) * 190;
      const y = 142 + Math.floor(i / 2) * 92;
      ctx.fillStyle = "rgba(255,255,255,0.075)";
      roundRect(ctx, x, y, 158, 58, 16);
      ctx.fill();
      ctx.fillStyle = card[1];
      ctx.font = "600 24px JetBrains Mono, monospace";
      ctx.fillText(card[0], x + 18, y + 38);
    });

    ctx.fillStyle = "rgba(0,0,0,0.28)";
    roundRect(ctx, 62, 340, 900, 230, 22);
    ctx.fill();
    ctx.font = "500 22px JetBrains Mono, monospace";
    const lines = [
      ["$ npm run ship", "#f8ff4a"],
      ["> compiling dashboards, APIs, auth, databases", "#cdd5e0"],
      ["> camera.flyTo(laptop.screen) // scroll linked", "#00f5ff"],
      ["> recruiterResponse: 'wow, this feels senior'", "#ff2bd6"],
    ];
    lines.forEach((line, i) => {
      ctx.fillStyle = line[1];
      ctx.fillText(line[0], 94, 388 + i * 43);
    });

    const scanY = 110 + ((time * 90) % 440);
    const scan = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
    scan.addColorStop(0, "rgba(0,245,255,0)");
    scan.addColorStop(0.5, "rgba(0,245,255,0.22)");
    scan.addColorStop(1, "rgba(0,245,255,0)");
    ctx.fillStyle = scan;
    ctx.fillRect(0, scanY - 30, w, 60);

    texture.needsUpdate = true;
  }

  draw(0, 0);
  return { texture, draw };
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function createLightTunnel() {
  const group = new THREE.Group();
  const colors = [0x00f5ff, 0xff2bd6, 0xf8ff4a, 0xbc8cff];
  for (let i = 0; i < 18; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.4 + i * 0.48, 0.012, 8, 92),
      new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.055,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    ring.position.set(2.2, 0.45, -2.2 - i * 0.45);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
  }
  return group;
}

function createFloatingBadges() {
  const labels = ["API", "SQL", "AI", "UX", "AUTH", "CACHE", "OBS"];
  const items = [];
  labels.forEach((label, i) => {
    const texture = makeBadgeTexture(label);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(-5 + i * 1.75, 1.1 + (i % 3) * 0.85, -2.8 - (i % 4) * 1.5);
    sprite.scale.set(1.05, 0.38, 1);
    sprite.userData = {
      baseY: sprite.position.y,
      speed: 0.7 + i * 0.08,
      spin: (i % 2 ? -1 : 1) * 0.001,
    };
    items.push(sprite);
  });
  return items;
}

function makeBadgeTexture(label) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(5, 2, 13, 0.72)";
  roundRect(ctx, 8, 12, 240, 72, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,245,255,0.42)";
  ctx.lineWidth = 3;
  roundRect(ctx, 8, 12, 240, 72, 26);
  ctx.stroke();
  ctx.fillStyle = "#f8ff4a";
  ctx.font = "700 34px JetBrains Mono, monospace";
  ctx.textAlign = "center";
  ctx.fillText(label, 128, 60);
  return new THREE.CanvasTexture(canvas);
}

function createStarField() {
  const count = 950;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 90;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 38;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 90;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      color: 0x6af5ff,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
    })
  );
}

document.addEventListener("DOMContentLoaded", initHero);
