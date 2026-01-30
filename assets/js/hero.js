import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";

(() => {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const tooltip = document.getElementById("hero-tooltip");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motionFactor = prefersReducedMotion ? 0 : 1;

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 2.2, 6.2);

  const ambient = new THREE.AmbientLight(0xffffff, 0.85);
  const sun = new THREE.DirectionalLight(0xffffff, 0.7);
  sun.position.set(4, 6, 3);
  const glow = new THREE.PointLight(0xffd7b0, 0.3, 8);
  glow.position.set(-2, 2.6, 1.5);
  scene.add(ambient, sun, glow);

  const palette = {
    ink: new THREE.MeshStandardMaterial({ color: 0x2d2a2a, roughness: 0.85, metalness: 0.1 }),
    cream: new THREE.MeshStandardMaterial({ color: 0xf4efe9, roughness: 0.9 }),
    mint: new THREE.MeshStandardMaterial({ color: 0xb8dfd2, roughness: 0.7 }),
    peach: new THREE.MeshStandardMaterial({ color: 0xf2b6a0, roughness: 0.7 }),
    sky: new THREE.MeshStandardMaterial({ color: 0xbfdcf3, roughness: 0.6 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xf0c88b, roughness: 0.6 })
  };

  const pickables = [];
  const hoverState = { object: null };
  const tokens = [];
  const tempVec = new THREE.Vector3();
  const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const parallaxStrength = prefersReducedMotion ? 0 : 1;

  const registerPickable = (mesh, label, category) => {
    mesh.userData.label = label;
    mesh.userData.category = category;
    mesh.userData.baseScale = mesh.scale.clone();
    if (mesh.material && mesh.material.isMeshStandardMaterial) {
      mesh.material = mesh.material.clone();
      mesh.material.emissive = new THREE.Color(0x000000);
    }
    pickables.push(mesh);
  };

  const addToken = (group, label, category) => {
    group.userData.label = label;
    group.userData.category = category;
    group.userData.basePosition = group.position.clone();
    group.userData.floatPhase = Math.random() * Math.PI * 2;
    group.userData.floatAmp = 0.08 + Math.random() * 0.06;
    group.userData.spin = (Math.random() * 0.3 + 0.15) * (Math.random() > 0.5 ? 1 : -1);
    tokens.push(group);

    group.traverse((child) => {
      if (child.isMesh && child.userData.pickable) {
        registerPickable(child, label, category);
      }
    });

    scene.add(group);
  };

  const createMonitorToken = () => {
    const group = new THREE.Group();
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 0.2), palette.ink);
    frame.userData.pickable = true;
    const screen = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 0.05), palette.sky);
    screen.position.z = 0.12;
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.4), palette.ink);
    base.position.y = -0.55;
    group.add(frame, screen, base);
    group.position.set(-1.6, 0.6, 0);
    addToken(group, "PC Games", "PC Games");
  };

  const createHandheldToken = () => {
    const group = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 0.35), palette.mint);
    body.userData.pickable = true;
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.25, 0.05), palette.sky);
    screen.position.z = 0.2;
    group.add(body, screen);
    group.position.set(1.5, 0.25, 0.3);
    addToken(group, "Mobile Games", "Mobile Games");
  };

  const createPhoneToken = () => {
    const group = new THREE.Group();
    const phone = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 1.1), palette.ink);
    phone.userData.pickable = true;
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.03, 0.9), palette.sky);
    screen.position.y = 0.08;
    const beam = new THREE.Mesh(
      new THREE.ConeGeometry(0.7, 1.4, 18, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x9cf5ff,
        transparent: true,
        opacity: 0.28,
        roughness: 0.4,
        metalness: 0.1
      })
    );
    beam.position.y = 0.9;
    const holo = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), palette.sky);
    holo.position.y = 1.1;
    holo.userData.holo = true;

    group.add(phone, screen, beam, holo);
    group.position.set(0, 0.2, -0.4);
    group.userData.beam = beam;
    group.userData.holo = holo;
    addToken(group, "Pocket AR", "AR/VR");
  };

  const createArtToken = () => {
    const group = new THREE.Group();
    const orb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45, 0), palette.peach);
    orb.userData.pickable = true;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.08, 12, 24), palette.cream);
    ring.rotation.x = Math.PI / 2.4;
    group.add(orb, ring);
    group.position.set(0.6, 0.5, 0.9);
    addToken(group, "Digital Art", "Digital Art");
  };

  const createMotionToken = () => {
    const group = new THREE.Group();
    const clap = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.6, 0.15), palette.ink);
    clap.userData.pickable = true;
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.18, 0.18), palette.gold);
    top.position.y = 0.4;
    group.add(clap, top);
    group.position.set(2.0, 0.7, -0.6);
    addToken(group, "Motion/Editing", "Motion/Editing");
  };

  createMonitorToken();
  createHandheldToken();
  createPhoneToken();
  createArtToken();
  createMotionToken();

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const updatePointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    parallax.targetX = pointer.x;
    parallax.targetY = pointer.y;
  };

  const setHover = (mesh) => {
    if (hoverState.object === mesh) return;

    if (hoverState.object) {
      const prev = hoverState.object;
      prev.scale.copy(prev.userData.baseScale);
      if (prev.material?.emissive) {
        prev.material.emissive.setHex(0x000000);
      }
    }

    if (mesh) {
      mesh.scale.copy(mesh.userData.baseScale).multiplyScalar(1.08);
      if (mesh.material?.emissive) {
        mesh.material.emissive.setHex(0xf2b6a0);
      }
    }

    hoverState.object = mesh;
    canvas.style.cursor = mesh ? "pointer" : "default";
  };

  const onPointerMove = (event) => {
    if (!pickables.length) return;
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickables, false);
    setHover(hits.length ? hits[0].object : null);
    if (prefersReducedMotion) {
      renderStatic();
    }
  };

  const onPointerDown = (event) => {
    if (!pickables.length) return;
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickables, false);
    if (hits.length) {
      const category = hits[0].object.userData.category;
      if (category) {
        window.dispatchEvent(new CustomEvent("portfolio:filter", { detail: { category } }));
      }
    }
    if (prefersReducedMotion) {
      renderStatic();
    }
  };

  const onPointerLeave = () => {
    setHover(null);
    parallax.targetX = 0;
    parallax.targetY = 0;
    if (prefersReducedMotion) {
      renderStatic();
    }
  };

  const hotspotButtons = document.querySelectorAll(".hero-hotspots button");
  hotspotButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      if (category) {
        window.dispatchEvent(new CustomEvent("portfolio:filter", { detail: { category } }));
      }
    });
  });

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  resize();
  window.addEventListener("resize", resize);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerleave", onPointerLeave);

  let rafId = null;
  const clock = new THREE.Clock();

  const renderFrame = (time) => {
    parallax.x += (parallax.targetX - parallax.x) * 0.08;
    parallax.y += (parallax.targetY - parallax.y) * 0.08;
    const parallaxX = parallax.x * 0.45 * parallaxStrength;
    const parallaxY = parallax.y * 0.35 * parallaxStrength;

    tokens.forEach((group) => {
      const base = group.userData.basePosition;
      group.position.y = base.y + Math.sin(time * 0.8 + group.userData.floatPhase) * group.userData.floatAmp * motionFactor + parallaxY * 0.15;
      group.position.x = base.x + parallaxX * 0.12;
      group.rotation.y = time * group.userData.spin * motionFactor + parallaxX * 0.18;
      group.rotation.x = parallaxY * 0.12;

      if (group.userData.beam) {
        group.userData.beam.material.opacity = 0.24 + Math.sin(time * 1.4) * 0.05 * motionFactor;
      }
      if (group.userData.holo) {
        group.userData.holo.rotation.y = time * 0.6 * motionFactor;
        group.userData.holo.position.y = 1.05 + Math.sin(time * 1.6) * 0.08 * motionFactor;
      }
    });

    camera.position.x = Math.sin(time * 0.15) * 0.4 * motionFactor + parallaxX * 0.6;
    camera.position.y = 2.2 + Math.sin(time * 0.12) * 0.1 * motionFactor + parallaxY * 0.4;
    camera.lookAt(parallaxX * 0.25, 0.5 + parallaxY * 0.18, 0);

    if (tooltip) {
      if (hoverState.object) {
        hoverState.object.getWorldPosition(tempVec);
        tempVec.y += 0.35;
        tempVec.project(camera);
        const rect = canvas.getBoundingClientRect();
        const x = (tempVec.x * 0.5 + 0.5) * rect.width;
        const y = (-tempVec.y * 0.5 + 0.5) * rect.height;
        tooltip.textContent = hoverState.object.userData.label || "";
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.opacity = "1";
      } else {
        tooltip.style.opacity = "0";
      }
    }

    renderer.render(scene, camera);
  };

  const render = () => {
    const t = clock.getElapsedTime();
    renderFrame(t);
    rafId = requestAnimationFrame(render);
  };

  const renderStatic = () => {
    renderFrame(0);
  };

  const start = () => {
    if (prefersReducedMotion) {
      renderStatic();
      return;
    }
    if (!rafId) {
      clock.start();
      render();
    }
  };

  const stop = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(canvas);
  } else {
    start();
  }
})();
