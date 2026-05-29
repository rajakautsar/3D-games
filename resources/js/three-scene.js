export function initStoryScene(canvasId) {
  const THREE = window.THREE;
  if (!THREE) return null;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x03040A, 0.02);

  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 2, 12);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x03040A, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambient);

  const goldLight = new THREE.PointLight(0xC8960C, 1.4, 40, 2);
  goldLight.position.set(5, 4, 8);
  scene.add(goldLight);

  const blueLight = new THREE.PointLight(0x48C9F0, 1.1, 40, 2);
  blueLight.position.set(-5, 2, 7);
  scene.add(blueLight);

  const starLayers = [];
  function createStarLayer(count, radius, zOffset, size, opacity) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.7 + Math.random() * 0.3);
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = zOffset + (Math.random() - 0.5) * 5;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ size, color: 0xF0EBE1, transparent: true, opacity, depthWrite: false });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    starLayers.push(points);
  }

  createStarLayer(220, 25, -20, 0.08, 0.12);
  createStarLayer(160, 18, -12, 0.12, 0.32);
  createStarLayer(110, 12, -6, 0.18, 0.55);

  const logoGroup = new THREE.Group();
  const ringGeo = new THREE.TorusGeometry(2.6, 0.16, 16, 100);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xC8960C, emissive: 0xC8960C, emissiveIntensity: 0.32, metalness: 0.6, roughness: 0.2 });
  const logoRing = new THREE.Mesh(ringGeo, ringMat);
  logoRing.rotation.x = Math.PI / 2;
  logoGroup.add(logoRing);

  const logoCoreGeo = new THREE.IcosahedronGeometry(0.9, 1);
  const logoCoreMat = new THREE.MeshStandardMaterial({ color: 0x8B0000, emissive: 0xFF4B1F, emissiveIntensity: 0.35, roughness: 0.4, metalness: 0.15 });
  const logoCore = new THREE.Mesh(logoCoreGeo, logoCoreMat);
  logoGroup.add(logoCore);
  logoGroup.position.set(0, 0.5, 0);
  scene.add(logoGroup);

  const terrainGeo = new THREE.PlaneGeometry(60, 30, 80, 40);
  const terrainPos = terrainGeo.attributes.position;
  for (let i = 0; i < terrainPos.count; i++) {
    terrainPos.setZ(i, (Math.random() - 0.5) * 1.4);
  }
  terrainGeo.computeVertexNormals();
  const terrainMat = new THREE.MeshStandardMaterial({ color: 0x07090F, wireframe: true, opacity: 0.48, transparent: true });
  const terrain = new THREE.Mesh(terrainGeo, terrainMat);
  terrain.rotation.x = -Math.PI / 2;
  terrain.position.y = -3.8;
  scene.add(terrain);

  const runeGroup = new THREE.Group();
  const runeColors = [0xC8960C, 0x8B0000, 0x48C9F0];
  for (let i = 0; i < 6; i++) {
    const ringGeo2 = new THREE.TorusGeometry(0.6 + i * 0.12, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({ color: runeColors[i % runeColors.length], emissive: runeColors[i % runeColors.length], emissiveIntensity: 0.2, opacity: 0.78, transparent: true });
    const ringMesh = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.15;
    ringMesh.position.x = Math.sin(i / 6 * Math.PI * 2) * 1.3;
    ringMesh.position.z = Math.cos(i / 6 * Math.PI * 2) * 1.3;
    runeGroup.add(ringMesh);
  }
  scene.add(runeGroup);

  const shardGroup = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshStandardMaterial({ color: runeColors[i % runeColors.length], emissive: runeColors[i % runeColors.length], emissiveIntensity: 0.22, roughness: 0.25 }));
    sphere.userData = { radius: 2 + Math.random() * 2, phase: Math.random() * Math.PI * 2, speed: 0.28 + Math.random() * 0.25 };
    shardGroup.add(sphere);
  }
  scene.add(shardGroup);

  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (event.clientX - rect.left) / rect.width - 0.5;
    mouse.y = (event.clientY - rect.top) / rect.height - 0.5;
  });

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  let lastTime = 0;
  function animate(time) {
    const delta = time - lastTime;
    lastTime = time;
    const t = time * 0.0006;

    starLayers[0].rotation.y = t * 0.02;
    starLayers[1].rotation.y = t * -0.03;
    starLayers[2].rotation.y = t * 0.06;

    logoGroup.rotation.z = Math.sin(t * 0.8) * 0.05;
    logoGroup.rotation.y += 0.0025;
    terrain.position.y = -3.8 + Math.sin(t * 0.25) * 0.08;
    terrain.rotation.z = Math.sin(t * 0.12) * 0.01;
    runeGroup.rotation.y -= 0.0022;

    shardGroup.children.forEach((shard, index) => {
      const u = shard.userData;
      shard.position.x = Math.cos(time * u.speed * 0.0007 + u.phase) * u.radius;
      shard.position.y = 0.4 + Math.sin(time * u.speed * 0.0009 + u.phase * 1.2) * 0.4;
      shard.position.z = Math.sin(time * u.speed * 0.0008 + u.phase * 0.9) * u.radius * 0.35;
    });

    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 1.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  return {
    scene,
    camera,
    renderer,
    logoGroup,
    terrain,
    runeGroup,
    starLayers,
    shardGroup,
    goldLight,
    blueLight,
    ambient
  };
}
