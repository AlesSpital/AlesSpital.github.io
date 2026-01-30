import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";

(() => {
  const canvas = document.getElementById("featured-canvas");
  if (!canvas) return;

  const tooltip = document.getElementById("featured-tooltip");
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
  camera.position.set(0, 1.8, 6);

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
  const tokens = [];
  const hoverState = { object: null };
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const tempVec = new THREE.Vector3();
  const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };

  const registerPickable = (mesh, id, label) => {
    mesh.userData.projectId = id;
    mesh.userData.label = label;
    mesh.userData.baseScale = mesh.scale.clone();
    if (mesh.material && mesh.material.isMeshStandardMaterial) {
      mesh.material = mesh.material.clone();
      mesh.material.emissive = new THREE.Color(0x000000);
    }
    pickables.push(mesh);
  };

  const addToken = (group, id, label) => {
    group.userData.projectId = id;
    group.userData.label = label;
    group.userData.basePosition = group.position.clone();
    group.userData.floatPhase = Math.random() * Math.PI * 2;
    group.userData.floatAmp = 0.08 + Math.random() * 0.05;
    group.userData.spin = (Math.random() * 0.25 + 0.12) * (Math.random() > 0.5 ? 1 : -1);
    tokens.push(group);

    group.traverse((child) => {
      if (child.isMesh && child.userData.pickable) {
        registerPickable(child, id, label);
      }
    });

    scene.add(group);
  };

  const createVrToken = () => {
    const group = new THREE.Group();
    const visor = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 0.6), palette.ink);
    visor.userData.pickable = true;
    const strap = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.18, 0.15), palette.cream);
    strap.position.y = 0.2;
    strap.position.z = -0.15;
    group.add(visor, strap);
    group.position.set(-1.5, 0.5, 0);
    addToken(group, "vr4ll-2", "VR4LL 2.0");
  };

  const createArToken = () => {
    const group = new THREE.Group();
    const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), palette.sky);
    node.userData.pickable = true;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.08, 12, 24), palette.mint);
    ring.rotation.x = Math.PI / 2.6;
    group.add(node, ring);
    group.position.set(0.6, 0.6, 0.5);
    addToken(group, "arnet", "ARnet");
  };

  const createConceptToken = () => {
    const group = new THREE.Group();
    const slate = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 0.12), palette.peach);
    slate.userData.pickable = true;
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.2, 0.16), palette.gold);
    top.position.y = 0.45;
    group.add(slate, top);
    group.position.set(1.8, 0.55, -0.4);
    addToken(group, "xr-concepts", "XR Concept Videos");
  };

  createVrToken();
  createArToken();
  createConceptToken();

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
  };

  const onPointerDown = (event) => {
    if (!pickables.length) return;
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickables, false);
    if (hits.length) {
      const projectId = hits[0].object.userData.projectId;
      if (projectId) {
        window.dispatchEvent(new CustomEvent("featured:select", { detail: { id: projectId } }));
      }
    }
  };

  const onPointerLeave = () => {
    setHover(null);
    parallax.targetX = 0;
    parallax.targetY = 0;
  };

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

  const clock = new THREE.Clock();
  let rafId = null;

  const renderFrame = (time) => {
    parallax.x += (parallax.targetX - parallax.x) * 0.08;
    parallax.y += (parallax.targetY - parallax.y) * 0.08;
    const parallaxX = parallax.x * 0.45 * motionFactor;
    const parallaxY = parallax.y * 0.35 * motionFactor;

    tokens.forEach((group) => {
      const base = group.userData.basePosition;
      group.position.y = base.y + Math.sin(time * 0.8 + group.userData.floatPhase) * group.userData.floatAmp * motionFactor + parallaxY * 0.12;
      group.position.x = base.x + parallaxX * 0.12;
      group.rotation.y = time * group.userData.spin * motionFactor + parallaxX * 0.18;
      group.rotation.x = parallaxY * 0.12;
    });

    camera.position.x = Math.sin(time * 0.12) * 0.25 * motionFactor + parallaxX * 0.5;
    camera.position.y = 1.8 + Math.sin(time * 0.1) * 0.08 * motionFactor + parallaxY * 0.35;
    camera.lookAt(parallaxX * 0.2, 0.45 + parallaxY * 0.15, 0);

    if (tooltip) {
      if (hoverState.object) {
        hoverState.object.getWorldPosition(tempVec);
        tempVec.y += 0.3;
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

  const start = () => {
    if (prefersReducedMotion) {
      renderFrame(0);
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
