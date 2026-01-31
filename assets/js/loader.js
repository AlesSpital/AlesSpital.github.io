import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";

(() => {
  const loader = document.getElementById("page-loader");
  const canvas = document.getElementById("loader-canvas");
  const percentEl = document.getElementById("loader-percent");
  const bar = document.querySelector(".loader-bar span");
  if (!loader || !canvas || !bar) return;

  document.body.classList.add("is-loading");

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

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 1.2, 6);

  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(4, 5, 3);
  const rim = new THREE.PointLight(0xf7cfa3, 0.6, 10);
  rim.position.set(-2.5, 2.2, 1.5);
  scene.add(ambient, key, rim);

  const palette = {
    ink: new THREE.MeshStandardMaterial({ color: 0x2d2a2a, roughness: 0.8, metalness: 0.1 }),
    mint: new THREE.MeshStandardMaterial({ color: 0xb8dfd2, roughness: 0.7, metalness: 0.2 }),
    glow: new THREE.MeshStandardMaterial({
      color: 0xf2b6a0,
      roughness: 0.4,
      metalness: 0.3,
      emissive: new THREE.Color(0xf2b6a0),
      emissiveIntensity: 0.3
    })
  };

  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.08, 16, 120), palette.glow);
  ring.position.y = 0.2;
  ring.rotation.x = Math.PI / 2.6;
  scene.add(ring);

  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 0), palette.mint);
  orb.position.y = 0.4;
  scene.add(orb);

  const orbiters = [];
  for (let i = 0; i < 6; i += 1) {
    const pebble = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), palette.ink);
    scene.add(pebble);
    orbiters.push({ mesh: pebble, angle: (i / 6) * Math.PI * 2, radius: 1.5 + i * 0.08 });
  }

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let rafId = null;

  const renderFrame = (time) => {
    ring.rotation.y = time * 0.6 * motionFactor;
    ring.rotation.z = time * 0.2 * motionFactor;
    orb.rotation.y = time * 0.4 * motionFactor;
    orb.position.y = 0.4 + Math.sin(time * 1.4) * 0.08 * motionFactor;

    orbiters.forEach((item) => {
      const angle = item.angle + time * 0.35 * motionFactor;
      item.mesh.position.set(
        Math.cos(angle) * item.radius,
        0.25 + Math.sin(angle * 1.4) * 0.2,
        Math.sin(angle) * item.radius * 0.5
      );
    });

    renderer.render(scene, camera);
  };

  const animate = () => {
    const t = clock.getElapsedTime();
    renderFrame(t);
    rafId = requestAnimationFrame(animate);
  };

  if (!prefersReducedMotion) {
    animate();
  } else {
    renderFrame(0);
  }

  let total = 0;
  let loaded = 0;
  let done = false;

  const updateProgress = () => {
    if (done) return;
    const percent = total ? Math.min(100, Math.round((loaded / total) * 100)) : 100;
    bar.style.transform = `scaleX(${percent / 100})`;
    if (percentEl) {
      percentEl.textContent = `${percent}%`;
    }
    if (percent >= 100) {
      finish();
    }
  };

  const track = (promise) => {
    total += 1;
    promise.finally(() => {
      loaded += 1;
      updateProgress();
    });
  };

  const preloadImage = (url) => new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = url;
  });

  const preloadVideoMetadata = (url) => new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    const finish = () => {
      video.remove();
      resolve();
    };
    video.addEventListener("loadedmetadata", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    video.src = url;
  });

  const collectAssets = async () => {
    const imageUrls = new Set();
    const videoUrls = new Set();

    document.querySelectorAll("img").forEach((img) => {
      if (img.currentSrc || img.src) {
        imageUrls.add(img.currentSrc || img.src);
      }
    });

    try {
      const response = await fetch("assets/data/projects.json", { cache: "no-store" });
      const data = await response.json();
      data.forEach((project) => {
        if (project.thumbnail) imageUrls.add(project.thumbnail);
        (project.media || []).forEach((media) => {
          if (media.type === "image" && media.src) {
            imageUrls.add(media.src);
          }
          if (media.type === "video" && media.src) {
            videoUrls.add(media.src);
          }
        });
      });
    } catch (error) {
      // Ignore and continue with whatever we already have.
    }

    if (!imageUrls.size && !videoUrls.size) {
      total = 1;
      loaded = 1;
      updateProgress();
      return;
    }

    imageUrls.forEach((url) => track(preloadImage(url)));
    videoUrls.forEach((url) => track(preloadVideoMetadata(url)));
  };

  const finish = () => {
    if (done) return;
    done = true;
    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    if (rafId) cancelAnimationFrame(rafId);
    setTimeout(() => {
      loader.remove();
    }, 600);
  };

  const fallback = setTimeout(() => {
    finish();
  }, 9000);

  collectAssets().finally(() => {
    updateProgress();
    clearTimeout(fallback);
    if (total === 0) {
      finish();
    }
  });

  window.addEventListener("load", () => {
    if (loaded >= total) {
      finish();
    }
  });
})();
