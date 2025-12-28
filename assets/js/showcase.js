(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  let renderer;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1200);
  camera.position.set(0, 0, 80);

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const { clientWidth, clientHeight } = parent;
    const height = Math.max(clientHeight, 360);
    renderer.setSize(clientWidth, height, false);
    camera.aspect = clientWidth / height;
    camera.updateProjectionMatrix();
  };

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (error) {
    console.error('Three.js renderer failed to initialize', error);
    return;
  }

  const ambient = new THREE.AmbientLight(0xffffff, 0.42);
  const key = new THREE.PointLight(0xffd166, 1.3, 400, 2);
  key.position.set(-30, 30, 80);
  const rim = new THREE.PointLight(0x7ef2d1, 1.0, 380, 2);
  rim.position.set(40, -10, 70);
  scene.add(ambient, key, rim);

  const swirl = new THREE.Group();
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xffd166, metalness: 0.35, roughness: 0.42 }),
    new THREE.MeshStandardMaterial({ color: 0x7ef2d1, metalness: 0.25, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ color: 0x7bd7ff, metalness: 0.2, roughness: 0.6 })
  ];

  const seeds = [];
  for (let i = 0; i < 120; i++) {
    const material = materials[i % materials.length];
    const geometry = new THREE.IcosahedronGeometry(0.8 + Math.random() * 0.6, 0);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    mesh.userData.wave = Math.random() * Math.PI * 2;
    seeds.push(mesh);
    swirl.add(mesh);
  }
  scene.add(swirl);

  let pointerX = 0;
  let pointerY = 0;
  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.25;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18;
  };

  const animate = () => {
    requestAnimationFrame(animate);
    swirl.rotation.y += 0.0015 + pointerX * 0.03;
    swirl.rotation.x += 0.0007 + pointerY * 0.03;

    seeds.forEach((mesh, index) => {
      mesh.userData.wave += 0.006 + index * 0.00001;
      mesh.position.y = Math.sin(mesh.userData.wave) * 0.8;
      mesh.position.x *= 0.999;
      mesh.position.z *= 0.999;
    });

    renderer.render(scene, camera);
  };

  resize();
  animate();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove);
})();
