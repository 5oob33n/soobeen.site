import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';

let scene, camera, renderer;
let waveObject;
let essenceParticles = [];
let outerParticles = [];
let time = 0;
let mouseX = 0, mouseY = 0;
let essenceMode = false;
let temperature = 0.5; // 0: 차가움, 1: 따뜻함

export function loadClusterViewer(container) {
  console.log("Loading Wave Essence Through Disappearance...");
  
  initScene(container);
  createWaveEssence();
  createEssenceParticles();
  createOuterElements();
  addEventListeners();
  animate();
}

function initScene(container) {
  // 씬 설정
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff); // 흰색 배경으로
  
  // 카메라 설정
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 8, 15);
  
  // 렌더러 설정
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);
  
  console.log('Renderer canvas added to container');
  console.log('Container dimensions:', container.clientWidth, 'x', container.clientHeight);
  console.log('Canvas dimensions:', renderer.domElement.width, 'x', renderer.domElement.height);
  
  // 조명 설정
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  // 포인트 라이트 (온도 변화에 따라 색상 변화)
  const pointLight = new THREE.PointLight(0xffffff, 0.8, 20);
  pointLight.position.set(0, 0, 10);
  scene.add(pointLight);
  
  // 윈도우 리사이즈 이벤트
  window.addEventListener('resize', onWindowResize);
}

function createWaveEssence() {
  // 파도 모양의 본질 오브젝트
  const geometry = new THREE.PlaneGeometry(8, 8, 50, 50);
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color(0x002244), // 매우 어두운 파란색 파도 (흰 배경용)
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide
  });
  
  waveObject = new THREE.Mesh(geometry, material);
  waveObject.rotation.x = -Math.PI / 2; // 수평으로 배치
  waveObject.position.y = 0; // 명시적으로 위치 설정
  waveObject.castShadow = true;
  waveObject.receiveShadow = true;
  
  // 파도 애니메이션을 위한 데이터
  waveObject.userData = {
    originalPositions: geometry.attributes.position.array.slice(),
    waveSpeed: 0.02,
    waveAmplitude: 1.0
  };
  
  scene.add(waveObject);
  console.log('Wave object created and added to scene at position:', waveObject.position);
}

function createEssenceParticles() {
  // 본질 입자들 (파도 주변을 흐르는)
  const particleCount = 150;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const opacities = new Float32Array(particleCount);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    // 파도 주변을 따라 분포
    const angle = (i / particleCount) * Math.PI * 4; // 여러 바퀴
    const radius = 4 + Math.random() * 2;
    const height = (Math.random() - 0.5) * 3;
    
    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = height;
    positions[i3 + 2] = Math.sin(angle) * radius;
    
    opacities[i] = 0.6 + Math.random() * 0.4;
    
    // 따뜻한 색상
    const color = new THREE.Color().setHSL(0.6, 0.8, 0.2 + Math.random() * 0.15); // 매우 어두운 파란색 계열 (흰 배경용)
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.12,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  
  const particleSystem = new THREE.Points(geometry, material);
  particleSystem.userData = {
    originalPositions: positions.slice(),
    opacities: opacities.slice(),
    colors: colors.slice(),
    flowSpeed: 0.5 + Math.random() * 0.5
  };
  
  essenceParticles.push(particleSystem);
  scene.add(particleSystem);
}

function createOuterElements() {
  // 외부 요소들 (더 넓은 파도 영역)
  const outerCount = 250;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(outerCount * 3);
  const opacities = new Float32Array(outerCount);
  const colors = new Float32Array(outerCount * 3);
  
  for (let i = 0; i < outerCount; i++) {
    const i3 = i * 3;
    
    // 더 넓은 파도 분포
    const angle = (i / outerCount) * Math.PI * 6; // 더 많은 바퀴
    const radius = 8 + Math.random() * 6;
    const height = (Math.random() - 0.5) * 4;
    
    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = height;
    positions[i3 + 2] = Math.sin(angle) * radius;
    
    opacities[i] = 0.3 + Math.random() * 0.4;
    
    // 차가운 색상
    const color = new THREE.Color().setHSL(0.6, 0.3, 0.4 + Math.random() * 0.3);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.08,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  
  const particleSystem = new THREE.Points(geometry, material);
  particleSystem.userData = {
    originalPositions: positions.slice(),
    opacities: opacities.slice(),
    colors: colors.slice(),
    flowSpeed: 0.3 + Math.random() * 0.4
  };
  
  outerParticles.push(particleSystem);
  scene.add(particleSystem);
}

function addEventListeners() {
  // 마우스 인터랙션
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });
  
  // 터치 이벤트
  document.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
  });
  
  // 클릭: 본질 추출 모드
  document.addEventListener('click', () => {
    essenceMode = !essenceMode;
    console.log('Wave essence mode:', essenceMode ? 'ON' : 'OFF');
  });
  
  // 스페이스바: 파도 가속/감속
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      waveObject.userData.waveSpeed *= 2;
      setTimeout(() => {
        waveObject.userData.waveSpeed /= 2;
      }, 1000);
    }
  });
}

function updateWaveEssence() {
  if (!waveObject) return;
  
  const time = Date.now() * 0.001;
  const positions = waveObject.geometry.attributes.position.array;
  const originalPositions = waveObject.userData.originalPositions;
  const waveSpeed = waveObject.userData.waveSpeed;
  const waveAmplitude = waveObject.userData.waveAmplitude;
  
  // 파도 효과 생성
  for (let i = 0; i < positions.length; i += 3) {
    const x = originalPositions[i];
    const y = originalPositions[i + 1];
    const z = originalPositions[i + 2];
    
    // 여러 파도 패턴의 조합
    const wave1 = Math.sin(time * 2 + x * 0.5) * Math.cos(time * 1.5 + z * 0.5) * waveAmplitude;
    const wave2 = Math.sin(time * 1.5 + x * 0.3) * Math.cos(time * 2.5 + z * 0.3) * waveAmplitude * 0.7;
    const wave3 = Math.sin(time * 3 + x * 0.8) * Math.cos(time * 1 + z * 0.8) * waveAmplitude * 0.5;
    
    // 마우스 위치에 따른 파도 반응
    const distanceToMouse = Math.sqrt(
      Math.pow(x - mouseX * 4, 2) +
      Math.pow(z - mouseY * 4, 2)
    );
    
    const mouseWave = Math.max(0, 1 - distanceToMouse / 3) * Math.sin(time * 4) * 0.5;
    
    // Y 위치에 파도 높이 적용
    positions[i + 1] = wave1 + wave2 + wave3 + mouseWave;
  }
  
  waveObject.geometry.attributes.position.needsUpdate = true;
  waveObject.geometry.computeVertexNormals();
  
  // 온도 변화에 따른 색상 변화
      const warmColor = new THREE.Color().setHSL(0.6, 0.8, 0.3); // 매우 어두운 파란색 (흰 배경용)
  const coldColor = new THREE.Color().setHSL(0.6, 0.3, 0.4); // 차가운 색
  const currentColor = warmColor.clone().lerp(coldColor, 1 - temperature);
  
  waveObject.material.color.copy(currentColor);
  
  // 본질 모드일 때 더 강한 파도
  if (essenceMode) {
    waveObject.userData.waveAmplitude = 1.5;
    waveObject.material.opacity = 1.0;
  } else {
    waveObject.userData.waveAmplitude = 1.0;
    waveObject.material.opacity = 0.8;
  }
}

function updateEssenceParticles() {
  essenceParticles.forEach(particleSystem => {
    const positions = particleSystem.geometry.attributes.position.array;
    const opacities = particleSystem.geometry.attributes.opacity.array;
    const colors = particleSystem.geometry.attributes.color.array;
    const originalPositions = particleSystem.userData.originalPositions;
    const originalOpacities = particleSystem.userData.originalOpacities;
    const originalColors = particleSystem.userData.originalColors;
    const flowSpeed = particleSystem.userData.flowSpeed;
    
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < positions.length; i += 3) {
      const particleIndex = i / 3;
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      // 마우스 거리에 따른 가시성
      const distanceToMouse = Math.sqrt(
        Math.pow(x - mouseX * 10, 2) +
        Math.pow(y - mouseY * 10, 2) +
        Math.pow(z, 2)
      );
      
      // 거리에 따른 투명도 변화
      const visibility = Math.max(0, 1 - distanceToMouse / 15);
      const baseOpacity = originalOpacities && originalOpacities[particleIndex] ? originalOpacities[particleIndex] : 0.8;
      const targetOpacity = essenceMode ? 1.0 : baseOpacity * visibility;
      opacities[particleIndex] += (targetOpacity - opacities[particleIndex]) * 0.05;
      
      // 온도 변화에 따른 색상 변화
      const warmColor = new THREE.Color().setHSL(0.1, 0.4, 0.5);
      const coldColor = new THREE.Color().setHSL(0.6, 0.3, 0.4);
      const currentColor = warmColor.clone().lerp(coldColor, 1 - temperature);
      
      colors[i] = currentColor.r;
      colors[i + 1] = currentColor.g;
      colors[i + 2] = currentColor.b;
      
      // 파도처럼 흐르는 움직임
      const angle = Math.atan2(z, x);
      const radius = Math.sqrt(x * x + z * z);
      const newAngle = angle + time * flowSpeed * 0.5;
      
      positions[i] = Math.cos(newAngle) * radius;
      positions[i + 1] = originalPositions[i + 1] + Math.sin(time * 2 + particleIndex) * 0.1;
      positions[i + 2] = Math.sin(newAngle) * radius;
    }
    
    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.geometry.attributes.opacity.needsUpdate = true;
    particleSystem.geometry.attributes.color.needsUpdate = true;
  });
}

function updateOuterElements() {
  outerParticles.forEach(particleSystem => {
    const positions = particleSystem.geometry.attributes.position.array;
    const opacities = particleSystem.geometry.attributes.opacity.array;
    const colors = particleSystem.geometry.attributes.color.array;
    const originalPositions = particleSystem.userData.originalPositions;
    const originalOpacities = particleSystem.userData.originalOpacities;
    const originalColors = particleSystem.userData.originalColors;
    const flowSpeed = particleSystem.userData.flowSpeed;
    
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < positions.length; i += 3) {
      const particleIndex = i / 3;
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      // 마우스 거리에 따른 가시성 (더 민감하게)
      const distanceToMouse = Math.sqrt(
        Math.pow(x - mouseX * 10, 2) +
        Math.pow(y - mouseY * 10, 2) +
        Math.pow(z, 2)
      );
      
      // 본질 모드일 때 외부 요소들이 더 빨리 사라짐
      const fadeDistance = essenceMode ? 8 : 12;
      const visibility = Math.max(0, 1 - distanceToMouse / fadeDistance);
      const baseOpacity = originalOpacities && originalOpacities[particleIndex] ? originalOpacities[particleIndex] : 0.5;
      const targetOpacity = baseOpacity * visibility * (essenceMode ? 0.3 : 1.0);
      opacities[particleIndex] += (targetOpacity - opacities[particleIndex]) * 0.08;
      
      // 온도 변화에 따른 색상 변화
      const warmColor = new THREE.Color().setHSL(0.6, 0.8, 0.2); // 매우 어두운 파란색 (흰 배경용)
      const coldColor = new THREE.Color().setHSL(0.6, 0.3, 0.4);
      const currentColor = warmColor.clone().lerp(coldColor, 1 - temperature);
      
      colors[i] = currentColor.r;
      colors[i + 1] = currentColor.g;
      colors[i + 2] = currentColor.b;
      
      // 파도처럼 흐르는 움직임 (더 느리게)
      const angle = Math.atan2(z, x);
      const radius = Math.sqrt(x * x + z * z);
      const newAngle = angle + time * flowSpeed * 0.3;
      
      positions[i] = Math.cos(newAngle) * radius;
      positions[i + 1] = originalPositions[i + 1] + Math.sin(time * 1.5 + particleIndex) * 0.15;
      positions[i + 2] = Math.sin(newAngle) * radius;
    }
    
    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.geometry.attributes.opacity.needsUpdate = true;
    particleSystem.geometry.attributes.color.needsUpdate = true;
  });
}

function updateTemperature() {
  // 시간에 따른 온도 변화
  const time = Date.now() * 0.001;
  const targetTemperature = (Math.sin(time * 0.1) + 1) * 0.5;
  temperature += (targetTemperature - temperature) * 0.01;
}

function animate() {
  requestAnimationFrame(animate);
  
  time += 0.01;
  
  // 온도 업데이트
  updateTemperature();
  
  // 파도 본질 업데이트
  updateWaveEssence();
  
  // 본질 입자들 업데이트
  updateEssenceParticles();
  
  // 외부 요소들 업데이트
  updateOuterElements();
  
  // 카메라 부드러운 움직임
  camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
  camera.position.y += (mouseY * 2 + 8 - camera.position.y) * 0.02;
  camera.lookAt(0, 0, 0);
  
  renderer.render(scene, camera);
  
  // 디버깅용 로그 (처음 몇 프레임만)
  if (time < 0.1) {
    console.log('Animation frame:', time, 'Camera position:', camera.position.x, camera.position.y, camera.position.z);
    console.log('Scene children count:', scene.children.length);
  }
}

function onWindowResize() {
  const container = renderer.domElement.parentElement;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}
