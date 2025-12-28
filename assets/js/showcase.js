(function () {
  const canvas = document.getElementById('showcase-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  let renderer;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
  camera.position.set(0, 0, 70);

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const { clientWidth, clientHeight } = parent;
    const height = Math.max(clientHeight, 260);
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

  const ambient = new THREE.AmbientLight(0xffffff, 0.45);
  const point = new THREE.PointLight(0xf9a946, 1.1);
  point.position.set(-20, 30, 60);
  scene.add(ambient);
  scene.add(point);

  const swirl = new THREE.Group();
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xf9a946, metalness: 0.35, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0x1f3b65, metalness: 0.25, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.8 })
  ];

  const seeds = [];
  for (let i = 0; i < 90; i++) {
    const material = materials[i % materials.length];
    const geometry = new THREE.IcosahedronGeometry(0.8 + Math.random() * 0.4, 0);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((Math.random() - 0.5) * 70, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    mesh.userData.wave = Math.random() * Math.PI * 2;
    seeds.push(mesh);
    swirl.add(mesh);
  }

  scene.add(swirl);

  const animate = () => {
    requestAnimationFrame(animate);
    swirl.rotation.y += 0.0009;
    swirl.rotation.x += 0.0004;

    seeds.forEach((mesh, index) => {
      mesh.userData.wave += 0.005 + index * 0.00001;
      mesh.position.y += Math.sin(mesh.userData.wave) * 0.02;
    });

    renderer.render(scene, camera);
  };

  resize();
  animate();
  window.addEventListener('resize', resize);
})();
