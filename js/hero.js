/* ═══════════════════════════════════════════════════════
   hero.js  —  Three.js 3D hero scene (index.html only)
   Jahanzaib Wakeel Portfolio
═══════════════════════════════════════════════════════ */
"use strict";

function initHero() {
  const canvas = document.getElementById("three-canvas");
  if (!canvas) return;

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
  renderer.toneMapping       = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  /* ── Scene ── */
  const scene = new THREE.Scene();
  scene.fog   = new THREE.FogExp2(0x07080a, 0.028);
  scene.background = new THREE.Color(0x07080a);

  /* ── Camera ── */
  const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 4, 16);
  camera.lookAt(0, 0, 0);

  /* Camera state for GSAP + mouse */
  const cam = { x: 0, y: 4, z: 16, lx: 0, ly: 0, lz: 0 };

  /* ── Lights ── */
  scene.add(new THREE.AmbientLight(0x0d1117, 4));

  const lightVolt = new THREE.PointLight(0xc8f135, 5, 35);
  lightVolt.position.set(-7, 7, 4);
  scene.add(lightVolt);

  const lightBlue = new THREE.PointLight(0x58a6ff, 4, 28);
  lightBlue.position.set(9, 3, -4);
  scene.add(lightBlue);

  const lightPurple = new THREE.PointLight(0xbc8cff, 3, 22);
  lightPurple.position.set(0, -5, 8);
  scene.add(lightPurple);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);

  /* ── Floor grid ── */
  const grid = new THREE.GridHelper(60, 35, 0x1c1f26, 0x131519);
  grid.position.y = -4;
  scene.add(grid);

  /* ── Geometry helpers ── */
  const geoPool = [
    new THREE.IcosahedronGeometry(0.42, 0),
    new THREE.OctahedronGeometry(0.38, 0),
    new THREE.TetrahedronGeometry(0.42, 0),
    new THREE.BoxGeometry(0.52, 0.52, 0.52),
    new THREE.ConeGeometry(0.3, 0.65, 6),
    new THREE.TorusGeometry(0.28, 0.08, 8, 20),
  ];
  const matVolt   = new THREE.MeshPhongMaterial({ color: 0xc8f135, wireframe: true, transparent: true, opacity: 0.55 });
  const matBlue   = new THREE.MeshPhongMaterial({ color: 0x58a6ff, wireframe: true, transparent: true, opacity: 0.50 });
  const matPurple = new THREE.MeshPhongMaterial({ color: 0xbc8cff, wireframe: true, transparent: true, opacity: 0.48 });
  const mats = [matVolt, matBlue, matPurple];

  /* ── Floaters ── */
  const floaters = [];
  for (let i = 0; i < 32; i++) {
    const mesh = new THREE.Mesh(
      geoPool[Math.floor(Math.random() * geoPool.length)].clone(),
      mats[Math.floor(Math.random() * mats.length)]
    );
    mesh.position.set(
      (Math.random() - 0.5) * 32,
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 20 - 4
    );
    mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0);
    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.009,
      ry: (Math.random() - 0.5) * 0.007,
      rz: (Math.random() - 0.5) * 0.005,
      amp: Math.random() * 0.55 + 0.2,
      spd: Math.random() * 0.65 + 0.3,
      off: Math.random() * Math.PI * 2,
      oy:  mesh.position.y,
    };
    scene.add(mesh);
    floaters.push(mesh);
  }

  /* ── Central icosahedron ── */
  const icoGeo = new THREE.IcosahedronGeometry(2.4, 2);
  const icoMat = new THREE.MeshPhongMaterial({
    color: 0xc8f135, wireframe: true, transparent: true, opacity: 0.10,
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(6, 0.5, -3);
  scene.add(ico);

  /* ── Outer ring ── */
  const ringGeo = new THREE.TorusGeometry(4, 0.045, 8, 90);
  const ringMat = new THREE.MeshPhongMaterial({ color: 0x58a6ff, transparent: true, opacity: 0.25 });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2.3;
  ringMesh.position.set(6, 0.5, -3);
  scene.add(ringMesh);

  /* ── Inner ring ── */
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, 0.03, 6, 60),
    new THREE.MeshPhongMaterial({ color: 0xbc8cff, transparent: true, opacity: 0.20 })
  );
  ring2.rotation.x = Math.PI / 1.8;
  ring2.rotation.y = Math.PI / 4;
  ring2.position.set(6, 0.5, -3);
  scene.add(ring2);

  /* ── Star field ── */
  const starCount = 800;
  const starPos   = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 80;
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0x2a2d35, size: 0.07 })
  );
  scene.add(stars);

  /* ── Line connections ── */
  const lineGroup = new THREE.Group();
  for (let i = 0; i < 18; i++) {
    const points = [
      new THREE.Vector3((Math.random()-0.5)*24, (Math.random()-0.5)*12, (Math.random()-0.5)*14),
      new THREE.Vector3((Math.random()-0.5)*24, (Math.random()-0.5)*12, (Math.random()-0.5)*14),
    ];
    const lineMat = new THREE.LineBasicMaterial({
      color: i % 3 === 0 ? 0xc8f135 : i % 3 === 1 ? 0x58a6ff : 0xbc8cff,
      transparent: true, opacity: 0.07 + Math.random() * 0.08,
    });
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMat);
    lineGroup.add(line);
  }
  scene.add(lineGroup);

  /* ── GSAP ScrollTrigger camera path ── */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    /* Fly INTO the scene on hero scroll */
    gsap.to(cam, {
      x: 3, y: 1.5, z: 6,
      lx: 2, ly: 0.5, lz: -3,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end:   "bottom top",
        scrub: 1.6,
      },
    });

    /* Pull back on about section */
    gsap.to(cam, {
      x: -5, y: 4, z: 14,
      lx: 0, ly: 0, lz: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end:   "center center",
        scrub: 1.8,
      },
    });

    /* Tilt on education */
    gsap.to(cam, {
      x: 4, y: 6, z: 12,
      ease: "none",
      scrollTrigger: {
        trigger: "#education",
        start: "top 80%",
        end:   "bottom top",
        scrub: 2,
      },
    });
  }

  /* ── Mouse parallax ── */
  let tx = 0, ty = 0;
  document.addEventListener("mousemove", e => {
    tx = (e.clientX / window.innerWidth  - 0.5) * 2.2;
    ty = (e.clientY / window.innerHeight - 0.5) * 1.4;
  });

  /* ── Resize ── */
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ── Animate loop ── */
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.012;

    /* Smooth camera */
    camera.position.x += (cam.x + tx * 0.6 - camera.position.x) * 0.045;
    camera.position.y += (cam.y - ty * 0.35 - camera.position.y) * 0.045;
    camera.position.z += (cam.z - camera.position.z) * 0.045;
    camera.lookAt(cam.lx, cam.ly, cam.lz);

    /* Floaters */
    floaters.forEach(f => {
      f.rotation.x += f.userData.rx;
      f.rotation.y += f.userData.ry;
      f.rotation.z += f.userData.rz;
      f.position.y  = f.userData.oy +
        Math.sin(t * f.userData.spd + f.userData.off) * f.userData.amp;
    });

    /* Central objects */
    ico.rotation.y     += 0.004;
    ico.rotation.x     += 0.002;
    ringMesh.rotation.z += 0.0025;
    ring2.rotation.x   += 0.003;
    ring2.rotation.z   += 0.002;

    /* Light pulse */
    lightVolt.intensity   = 4   + Math.sin(t * 1.3)        * 1.0;
    lightBlue.intensity   = 3.2 + Math.sin(t * 0.9 + 1.2)  * 0.7;
    lightPurple.intensity = 2.5 + Math.sin(t * 1.1 + 2.4)  * 0.5;

    /* Stars slow drift */
    stars.rotation.y += 0.0002;

    renderer.render(scene, camera);
  }
  animate();
}

document.addEventListener("DOMContentLoaded", initHero);
