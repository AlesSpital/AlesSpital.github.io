import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";
import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RoomEnvironment } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/environments/RoomEnvironment.js";

(() => {
  const canvas = document.getElementById("featured-canvas");
  if (!canvas) return;

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
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.physicallyCorrectLights = true;

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 1.4, 6.2);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(4, 5, 3);
  const rim = new THREE.PointLight(0xf7cfa3, 0.7, 8);
  rim.position.set(-2.5, 2.2, 1.5);
  scene.add(ambient, key, rim);

  const palette = {
    wood: new THREE.MeshStandardMaterial({ color: 0xe7d0be, roughness: 0.8, metalness: 0.05 }),
    ink: new THREE.MeshStandardMaterial({ color: 0x2d2a2a, roughness: 0.75, metalness: 0.15 }),
    mint: new THREE.MeshStandardMaterial({ color: 0xb8dfd2, roughness: 0.65, metalness: 0.2 }),
    glow: new THREE.MeshStandardMaterial({ color: 0xf2b6a0, roughness: 0.3, metalness: 0.5, emissive: new THREE.Color(0xf2b6a0), emissiveIntensity: 0.35 })
  };

  const platform = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.9, 0.3, 64), palette.wood);
  platform.position.y = -0.4;
  scene.add(platform);

  const ring = new THREE.Mesh(new THREE.TorusKnotGeometry(1.2, 0.08, 140, 12), palette.glow);
  ring.position.y = 0.5;
  ring.rotation.x = Math.PI / 2.8;
  scene.add(ring);

  const crystalMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xcfddea,
    roughness: 0.2,
    metalness: 0.15,
    transmission: 0.35,
    thickness: 0.6,
    clearcoat: 0.4,
    clearcoatRoughness: 0.35
  });
  const crystalGeometry = new THREE.IcosahedronGeometry(0.22, 0);
  const crystalCount = 38;
  const crystals = new THREE.InstancedMesh(crystalGeometry, crystalMaterial, crystalCount);
  const crystalData = [];
  const dummy = new THREE.Object3D();

  for (let i = 0; i < crystalCount; i += 1) {
    const angle = (i / crystalCount) * Math.PI * 2;
    const radius = 0.8 + Math.random() * 1.4;
    const height = 0.2 + Math.random() * 1.1;
    crystalData.push({
      angle,
      radius,
      height,
      speed: 0.3 + Math.random() * 0.4,
      spin: Math.random() * 1.2
    });
  }

  scene.add(crystals);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.35, 0.6, 0.9);
  composer.addPass(bloomPass);

  const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    parallax.targetX = (x - 0.5) * 2;
    parallax.targetY = (y - 0.5) * 2;
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let rafId = null;

  const renderFrame = (time) => {
    parallax.x += (parallax.targetX - parallax.x) * 0.05;
    parallax.y += (parallax.targetY - parallax.y) * 0.05;
    const px = parallax.x * 0.35 * motionFactor;
    const py = parallax.y * 0.25 * motionFactor;

    ring.rotation.y = time * 0.25 * motionFactor;
    ring.rotation.z = time * 0.15 * motionFactor;

    crystalData.forEach((item, index) => {
      const bob = Math.sin(time * item.speed + item.angle) * 0.12 * motionFactor;
      dummy.position.set(
        Math.cos(item.angle + time * 0.15) * item.radius + px * 0.3,
        item.height + bob + py * 0.2,
        Math.sin(item.angle + time * 0.15) * item.radius * 0.6
      );
      dummy.rotation.set(time * item.spin, time * 0.2 + item.angle, time * 0.1);
      const scale = 0.7 + Math.sin(time * 0.4 + item.angle) * 0.08;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      crystals.setMatrixAt(index, dummy.matrix);
    });
    crystals.instanceMatrix.needsUpdate = true;

    camera.position.x = px * 0.8;
    camera.position.y = 1.4 + py * 0.4;
    camera.lookAt(px * 0.2, 0.4 + py * 0.15, 0);

    composer.render();
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
