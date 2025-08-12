import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

class CircularGallery {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.projects = [];
    this.currentRotation = 0;
    this.targetRotation = 0;
    this.isAnimating = false;
    this.currentProject = null;
    this.currentImageIndex = 0;
    
    this.init();
  }

  async init() {
    // 씬 설정
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // 카메라 설정 - 위에서 바라보는 각도
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 8, 0); // 위에서 바라보는 각도
    this.camera.lookAt(0, 0, 0);

    // 렌더러 설정
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    this.scene.add(directionalLight);

    // 프로젝트 데이터 로드
    await this.loadProjects();
    
    // 갤러리 생성
    this.createGallery();
    
    // 이벤트 리스너 설정
    this.setupEventListeners();
    
    // 애니메이션 시작
    this.animate();
  }

  async loadProjects() {
    try {
      console.log('Starting to load projects...');
      
      // 프로젝트 인덱스 로드
      const indexResponse = await fetch('data/projects/index.json');
      const indexData = await indexResponse.json();
      console.log('Project index found:', indexData);
      console.log('Index data type:', typeof indexData);
      console.log('Index data keys:', Object.keys(indexData));
      console.log('Projects array:', indexData.projects);
      
      // 각 프로젝트 데이터 로드
      for (const projectInfo of indexData.projects) {
        console.log(`Loading project file: ${projectInfo.file}`);
        const response = await fetch(projectInfo.file);
        console.log(`Response status:`, response.status);
        console.log(`Response ok:`, response.ok);
        
        const responseText = await response.text();
        console.log(`Response text:`, responseText);
        
        const project = JSON.parse(responseText);
        console.log(`Project data loaded:`, project);
        
        // 이미지 경로 확인
        console.log(`Project object:`, project);
        console.log(`Project.images:`, project.images);
        console.log(`Project.images type:`, typeof project.images);
        console.log(`Project.images length:`, project.images ? project.images.length : 'undefined');
        
        if (project.images && project.images.length > 0) {
          console.log(`Images found for project: ${project.title}`, project.images);
        } else {
          console.warn(`No images found for project: ${project.title}`);
          console.warn(`Full project data:`, JSON.stringify(project, null, 2));
        }
        
        this.projects.push(project);
      }
      
      console.log('All projects loaded:', this.projects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  createGallery() {
    const radius = 4.5;
    const totalProjects = this.projects.length;
    
    this.projects.forEach((project, index) => {
      if (project.images && project.images.length > 0) {
        // 원형 배치를 위한 각도 계산 - 안정적인 원형
        const angle = (index / totalProjects) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0; // 모든 이미지를 같은 높이에 배치
        
        console.log(`Project ${index}: angle=${angle}, x=${x}, z=${z}`);
        this.createProjectFrame(project, x, y, z, index);
      }
    });
  }

  createProjectFrame(project, x, y, z, index) {
    // 텍스처 로더
    const textureLoader = new THREE.TextureLoader();
    
    // 이미지 로드 - 상대 경로로 수정
    let imagePath = project.images[0];
    if (imagePath.startsWith('soobeen-portfolio/')) {
      imagePath = imagePath.replace('soobeen-portfolio/', '');
    }
    // 상대 경로로 설정 (절대 경로 제거)
    console.log(`Loading image: ${imagePath} for project: ${project.title}`);
    
    textureLoader.load(imagePath, (texture) => {
      console.log(`Image loaded successfully: ${imagePath}`);
      console.log(`Texture object:`, texture);
      
      // 프레임 지오메트리 - 더 작게
      const aspectRatio = texture.image.width / texture.image.height;
      const frameWidth = 1.2;
      const frameHeight = frameWidth / aspectRatio;
      
      console.log(`Image dimensions: ${texture.image.width} x ${texture.image.height}, aspect ratio: ${aspectRatio}`);
      
      const geometry = new THREE.PlaneGeometry(frameWidth, frameHeight);
      
      // 재질
      const material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9
      });
      
      // 메시 생성
      const frame = new THREE.Mesh(geometry, material);
      frame.position.set(x, y, z);
      
      // 위에서 바라보는 각도에 맞게 회전 - 수직으로 세우기
      frame.rotation.x = -Math.PI / 2; // 수평으로 눕히기
      
      // 프로젝트 정보를 메시에 저장
      frame.userData = { project, index };
      
      this.scene.add(frame);
      
      console.log(`Frame added at position: (${x}, ${y}, ${z})`);
      
      // 그림자 효과 제거 (회색 바 제거)
      // this.addShadow(x, y - frameHeight/2 - 0.1, z);
    }, (progress) => {
      console.log(`Loading progress for ${imagePath}: ${(progress.loaded / progress.total * 100)}%`);
    }, (error) => {
      console.error('Error loading texture:', imagePath, error);
      console.error('Error details:', error);
    });
  }

  addShadow(x, y, z) {
    // 그림자 효과 - 위에서 바라보는 각도에 맞게
    const shadowGeometry = new THREE.PlaneGeometry(1.2, 0.1);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.1
    });
    
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.position.set(x, y - 0.1, z); // 약간 아래로
    shadow.rotation.x = -Math.PI / 2; // 바닥에 평행하게
    
    this.scene.add(shadow);
  }

  setupEventListeners() {
    // 버튼 제거 - 마우스/터치 드래그만 사용
    
    // 이미지 클릭 이벤트 - 더 간단하게
    this.renderer.domElement.style.cursor = 'pointer';
    
    this.renderer.domElement.addEventListener('click', (e) => {
      console.log('Click detected at:', e.clientX, e.clientY);
      
      // 마우스 위치를 정규화된 좌표로 변환
      const rect = this.renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      console.log('Normalized mouse position:', mouse.x, mouse.y);
      
      // Raycaster 생성
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);
      
      // 모든 메시 객체 가져오기
      const meshes = this.scene.children.filter(child => child.type === 'Mesh' && child.userData.project);
      console.log('Meshes to check:', meshes.length);
      
      const intersects = raycaster.intersectObjects(meshes);
      console.log('Intersects found:', intersects.length);
      
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        console.log('Clicked object data:', clickedObject.userData);
        
        if (clickedObject.userData.project) {
          console.log('Showing project detail for:', clickedObject.userData.project.title);
          this.showProjectDetail(clickedObject.userData.project);
        }
      } else {
        console.log('No objects clicked');
      }
    });
    
    // 뒤로 가기 버튼
    const backBtn = document.getElementById('back-to-gallery');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.hideProjectDetail();
      });
    }
    
    // 갤러리 네비게이션 버튼
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.navigateGallery(-1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.navigateGallery(1);
      });
    }
    
    // 마우스 드래그 비활성화 - 고정된 원형 배열 유지
    
    // 윈도우 리사이즈
    window.addEventListener('resize', () => {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });
  }

  rotateGallery(direction) {
    // 원형 회전 애니메이션
    const rotationStep = (Math.PI * 2) / this.projects.length;
    this.targetRotation += rotationStep * direction;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    // 고정된 원형 배열 유지 - 회전 애니메이션 제거
    this.scene.children.forEach(child => {
      if (child.type === 'Mesh' && child.userData.project) {
        // 원래 위치 유지
        const originalX = child.userData.originalX || child.position.x;
        const originalZ = child.userData.originalZ || child.position.z;
        
        if (!child.userData.originalX) {
          child.userData.originalX = originalX;
          child.userData.originalZ = originalZ;
        }
        
        // 고정된 위치 유지
        child.position.x = child.userData.originalX;
        child.position.z = child.userData.originalZ;
      }
    });
    
    this.renderer.render(this.scene, this.camera);
  }

  showProjectDetail(project) {
    console.log('showProjectDetail called with:', project);
    
    // 현재 프로젝트 설정
    this.currentProject = project;
    this.currentImageIndex = 0;
    
    // 갤러리 숨기기
    const gallerySection = document.getElementById('project-section');
    const detailSection = document.getElementById('project-detail-section');
    
    console.log('Gallery section:', gallerySection);
    console.log('Detail section:', detailSection);
    
    if (gallerySection && detailSection) {
      gallerySection.style.display = 'none';
      detailSection.style.display = 'block';
      
      // 프로젝트 정보 업데이트
      const nameElement = document.getElementById('project-detail-name');
      const descriptionElement = document.getElementById('project-detail-description');
      const imageElement = document.getElementById('project-detail-img');
      
      console.log('Elements found:', { nameElement, descriptionElement, imageElement });
      
      if (nameElement) nameElement.textContent = project.title;
      if (descriptionElement) {
        // 두 컬럼 구조로 HTML 생성
        let descriptionHTML = '<div class="project-detail-grid">';
        
        // 왼쪽 컬럼: 기본 정보
        descriptionHTML += '<div class="project-info-left">';
        descriptionHTML += '<div class="project-basic-info">';
        if (project.dimensions && project.dimensions.toLowerCase().includes('team')) {
          descriptionHTML += '<p><strong>Group Project</strong></p>';
        } else {
          descriptionHTML += '<p><strong>Individual Project</strong></p>';
        }
        descriptionHTML += '<p><strong>Interactive installation</strong></p>';
        descriptionHTML += `<p>${project.medium || 'N/A'}</p>`;
        descriptionHTML += `<p><strong>${project.year || 'N/A'} / ${project.location || 'N/A'}</strong></p>`;
        if (project.exhibition) {
          descriptionHTML += '<p><strong>Exhibited at</strong></p>';
          descriptionHTML += `<p><strong>${project.exhibition}</strong></p>`;
        }
        descriptionHTML += '</div>';
        descriptionHTML += '</div>';
        
        // 오른쪽 컬럼: 상세 설명
        descriptionHTML += '<div class="project-info-right">';
        
        if (project.detail) {
          descriptionHTML += `<p>${project.detail}</p>`;
        }
        
        if (project.technical_detail) {
          descriptionHTML += `<p>${project.technical_detail}</p>`;
        }
        
        if (project.conceptual_detail) {
          descriptionHTML += `<p>${project.conceptual_detail}</p>`;
        }
        
        if (project.conclusion) {
          descriptionHTML += `<p>${project.conclusion}</p>`;
        }
        
        if (project.photography) {
          descriptionHTML += `<p><strong>Photography:</strong> ${project.photography}</p>`;
        }
        
        if (project.videography) {
          descriptionHTML += `<p><strong>Videography:</strong> ${project.videography}</p>`;
        }
        
        if (project.collaboration) {
          descriptionHTML += `<p><strong>Collaboration:</strong> ${project.collaboration}</p>`;
        }
        
        descriptionHTML += '</div>';
        descriptionHTML += '</div>';
        
        descriptionElement.innerHTML = descriptionHTML;
      }
      if (imageElement) imageElement.src = project.images[0];
      
      // 네비게이션 버튼 상태 업데이트
      this.updateNavigationButtons();
      
      console.log('Project detail page should be visible now');
    } else {
      console.error('Gallery or detail section not found');
    }
  }

  hideProjectDetail() {
    // 갤러리 다시 보이기
    const gallerySection = document.getElementById('project-section');
    const detailSection = document.getElementById('project-detail-section');
    
    if (gallerySection && detailSection) {
      detailSection.style.display = 'none';
      gallerySection.style.display = 'block';
    }
  }

  navigateGallery(direction) {
    if (!this.currentProject || !this.currentProject.images) return;
    
    const totalImages = this.currentProject.images.length;
    this.currentImageIndex += direction;
    
    // 순환 네비게이션
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = totalImages - 1;
    } else if (this.currentImageIndex >= totalImages) {
      this.currentImageIndex = 0;
    }
    
    // 이미지 업데이트
    const imageElement = document.getElementById('project-detail-img');
    if (imageElement) {
      imageElement.src = this.currentProject.images[this.currentImageIndex];
    }
    
    // 네비게이션 버튼 상태 업데이트
    this.updateNavigationButtons();
  }

  updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!this.currentProject || !this.currentProject.images) return;
    
    const totalImages = this.currentProject.images.length;
    
    if (prevBtn) {
      prevBtn.disabled = totalImages <= 1;
    }
    
    if (nextBtn) {
      nextBtn.disabled = totalImages <= 1;
    }
  }
}

// 갤러리 초기화
export function initCircularGallery() {
  return new CircularGallery('circular-gallery');
} 