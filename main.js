console.log('Portfolio loaded');

// 전역 변수
let bioData = null;
let ceramicData = null;
let statementData = null;

// DOM 요소들
const menuButtons = document.querySelectorAll('.menu-btn');
const defaultContent = document.getElementById('default-section');
const contentSections = document.querySelectorAll('.content-section');
const homeButton = document.getElementById('home-button');
const threeContainer = document.getElementById('three-container');

// JSON 데이터 로드
async function loadBioData() {
  try {
    const response = await fetch('data/bio.json');
    bioData = await response.json();
    console.log('Bio data loaded successfully');
  } catch (error) {
    console.error('Error loading bio data:', error);
  }
}

// 세라믹 데이터 로드
async function loadCeramicData() {
  try {
    const response = await fetch('data/ceramics/index.json');
    ceramicData = await response.json();
    console.log('Ceramic data loaded successfully');
  } catch (error) {
    console.error('Error loading ceramic data:', error);
  }
}

// Statement 데이터 로드
async function loadStatementData() {
  try {
    const response = await fetch('data/statements/index.json?t=' + Date.now());
    statementData = await response.json();
    console.log('Statement data loaded successfully');
  } catch (error) {
    console.error('Error loading statement data:', error);
  }
}

// 바이오 섹션 렌더링
function renderBioSection() {
  if (!bioData) return;
  
  const bioContainer = document.getElementById('bio-text');
  if (!bioContainer) return;

  let html = `
    <div class="bio-main">
      <p>${bioData.bio.main}</p>
      <p>${bioData.bio.detail}</p>
      <p>${bioData.bio.conclusion}</p>
    </div>
  `;

  // Education
  if (bioData.education && bioData.education.length > 0) {
    html += '<div class="bio-section"><h3>Education</h3>';
    bioData.education.forEach(edu => {
      html += `<p><strong>${edu.period}</strong>, ${edu.degree}, ${edu.institution}, ${edu.location}</p>`;
    });
    html += '</div>';
  }

  // Group Exhibitions
  if (bioData.exhibitions && bioData.exhibitions.length > 0) {
    html += '<div class="bio-section"><h3>Group Exhibitions</h3>';
    bioData.exhibitions.forEach(exhibition => {
      html += `<p><strong>${exhibition.year}</strong>, ${exhibition.title}`;
      if (exhibition.description) html += `, ${exhibition.description}`;
      html += `, ${exhibition.location}</p>`;
    });
    html += '</div>';
  }

  // Awards, Grants, Projects, Performances
  if (bioData.awards && bioData.awards.length > 0) {
    html += '<div class="bio-section"><h3>Awards, Grants, Projects, Performances</h3>';
    bioData.awards.forEach(award => {
      html += `<p><strong>${award.year}</strong>, ${award.title}`;
      if (award.description) html += `, ${award.description}`;
      html += `, ${award.location}</p>`;
    });
    html += '</div>';
  }

  // Experiences
  if (bioData.experiences && bioData.experiences.length > 0) {
    html += '<div class="bio-section"><h3>Experiences</h3>';
    bioData.experiences.forEach(exp => {
      html += `<p><strong>${exp.year}</strong>, ${exp.title}`;
      if (exp.description) html += `, ${exp.description}`;
      html += `, ${exp.location}</p>`;
    });
    html += '</div>';
  }

  // Artistic Contributions
  if (bioData.artisticContributions && bioData.artisticContributions.length > 0) {
    html += '<div class="bio-section"><h3>Artistic Contributions</h3>';
    bioData.artisticContributions.forEach(contribution => {
      html += `<p><strong>${contribution.year}</strong>, ${contribution.title}, ${contribution.description}, ${contribution.location}</p>`;
    });
    html += '</div>';
  }

  // Work
  if (bioData.work && bioData.work.length > 0) {
    html += '<div class="bio-section"><h3>Work</h3>';
    bioData.work.forEach(work => {
      const period = work.period || work.year;
      html += `<p><strong>${period}</strong>, ${work.title}, ${work.role}`;
      if (work.location) html += `, ${work.location}`;
      html += '</p>';
    });
    html += '</div>';
  }

  bioContainer.innerHTML = html;
}

// 세라믹 그리드 렌더링
function loadCeramicGrid() {
  if (!ceramicData) {
    loadCeramicData().then(() => {
      renderCeramicGrid();
    });
    return;
  }
  renderCeramicGrid();
}

function renderCeramicGrid() {
  const ceramicContainer = document.getElementById('ceramic-list');
  if (!ceramicContainer || !ceramicData) return;

  let html = '';
  ceramicData.forEach((ceramic, index) => {
    // 단일 이미지인지 여러 이미지인지 확인
    const images = ceramic.images || [ceramic.image];
    const hasMultipleImages = images.length > 1;
    
    html += `
      <div class="ceramic-item" data-ceramic-index="${index}">
        <div class="ceramic-gallery">
          <img src="${images[0]}" alt="${ceramic.title}" class="ceramic-image active">
          ${hasMultipleImages ? `
            <button class="ceramic-nav-btn prev" onclick="changeCeramicImage(${index}, -1)">‹</button>
            <button class="ceramic-nav-btn next" onclick="changeCeramicImage(${index}, 1)">›</button>
          ` : ''}
        </div>
        <div class="ceramic-info">
          <h3>${ceramic.title}</h3>
        </div>
      </div>
    `;
  });

  ceramicContainer.innerHTML = html;
  
  // 이미지 변경 함수를 전역으로 등록
  window.changeCeramicImage = function(ceramicIndex, direction) {
    const ceramic = ceramicData[ceramicIndex];
    const images = ceramic.images || [ceramic.image];
    const ceramicItem = document.querySelector(`[data-ceramic-index="${ceramicIndex}"]`);
    const currentImg = ceramicItem.querySelector('.ceramic-image');
    const currentIndex = parseInt(currentImg.dataset.imageIndex || 0);
    
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    currentImg.src = images[newIndex];
    currentImg.dataset.imageIndex = newIndex;
  };
}

// Statement 섹션 렌더링
function loadStatementSection() {
  if (!statementData) {
    loadStatementData().then(() => {
      renderStatementSection();
    });
    return;
  }
  renderStatementSection();
}

function renderStatementSection() {
  const statementContainer = document.getElementById('statement-text');
  if (!statementContainer || !statementData) return;

  let html = '';
  
  // 타이틀 목록만 표시
  statementData.statements.forEach(statement => {
    // 숫자가 포함된 제목인지 확인
    const hasNumber = /\d/.test(statement.title);
    const numberClass = hasNumber ? 'number-fix' : '';
    
    // 숫자를 포함한 제목의 경우 특별한 스타일 적용
    let titleHtml = statement.title;
    if (hasNumber) {
      // 숫자 부분을 span으로 감싸서 다른 폰트 적용
      titleHtml = statement.title.replace(/(\d+)/g, '<span class="number-span">$1</span>');
    }
    
    html += `<div class="statement-item" data-statement-id="${statement.id}">`;
    html += `<h3 class="${numberClass}">${titleHtml}</h3>`;
    html += `</div>`;
  });

  statementContainer.innerHTML = html;
  
  // 클릭 이벤트 추가 (제목 텍스트만 클릭 가능)
  const statementItems = statementContainer.querySelectorAll('.statement-item h3');
  statementItems.forEach(item => {
    item.addEventListener('click', () => {
      const statementId = item.parentElement.dataset.statementId;
      loadStatementDetail(statementId);
    });
  });
}

async function loadStatementDetail(statementId) {
  try {
    const response = await fetch(`data/statements/${statementId}-statement.json?t=${Date.now()}`);
    const detailData = await response.json();
    
    const statementContainer = document.getElementById('statement-text');
    if (!statementContainer) return;

    // 숫자를 span으로 감싸는 함수
    function wrapNumbers(text) {
      return text.replace(/(\d+)/g, '<span class="number-span">$1</span>');
    }

    let html = '';
    html += `<div class="statement-detail">`;
    html += `<button class="back-to-statements">← Back to Statements</button>`;
    html += `<h2>${wrapNumbers(detailData.title)}</h2>`;
    detailData.content.forEach(paragraph => {
      html += `<p>${wrapNumbers(paragraph)}</p>`;
    });
    html += `</div>`;

    statementContainer.innerHTML = html;
    
    // 뒤로가기 버튼 이벤트
    const backBtn = statementContainer.querySelector('.back-to-statements');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        renderStatementSection();
      });
    }
  } catch (error) {
    console.error('Error loading statement detail:', error);
  }
}

// 홈 버튼 클릭 이벤트
function initHomeButton() {
  homeButton.addEventListener('click', () => {
    // 모든 메뉴 버튼에서 active 클래스 제거
    menuButtons.forEach(btn => btn.classList.remove('active'));
    
    // 기본 콘텐츠 보이기
    defaultContent.style.display = 'block';
    threeContainer.style.display = 'block';
    
    // 모든 콘텐츠 섹션 숨기기
    contentSections.forEach(section => {
      section.style.display = 'none';
    });
    
    console.log('Home button clicked - returned to default view');
  });
}

// 메뉴 버튼 클릭 이벤트
function initMenuButtons() {
  menuButtons.forEach(button => {
    button.addEventListener('click', () => {
      const sectionName = button.dataset.section;
      
      // 모든 메뉴 버튼에서 active 클래스 제거
      menuButtons.forEach(btn => btn.classList.remove('active'));
      
      // 클릭된 버튼에 active 클래스 추가
      button.classList.add('active');
      
      // 기본 콘텐츠와 Three.js 뷰어 숨기기
      defaultContent.style.display = 'none';
      threeContainer.style.display = 'none';
      
      // 모든 콘텐츠 섹션 숨기기
      contentSections.forEach(section => {
        section.style.display = 'none';
      });
      
      // 해당 섹션 보이기
      const targetSection = document.getElementById(`${sectionName}-section`);
      if (targetSection) {
        targetSection.style.display = 'block';
        
        // 바이오 섹션인 경우 데이터 렌더링
        if (sectionName === 'bio') {
          renderBioSection();
        }
        
        // 프로젝트 섹션인 경우 원형 갤러리 초기화
        if (sectionName === 'project') {
          initCircularGallery();
        }
        
        // 세라믹 섹션인 경우 세라믹 그리드 로드
        if (sectionName === 'ceramic') {
          loadCeramicGrid();
        }
        
        // Statement 섹션인 경우 statement 로드
        if (sectionName === 'statement') {
          loadStatementSection();
        }
      }
      
      console.log(`${sectionName} section opened`);
    });
  });
}

// Three.js 뷰어 초기화
async function initThreeViewer() {
  try {
    const { loadClusterViewer } = await import('./three-viewer.js');
    const container = document.getElementById('three-container');
    if (container) {
      loadClusterViewer(container);
      console.log('Three.js viewer initialized');
    }
  } catch (error) {
    console.error('Error initializing Three.js viewer:', error);
  }
}

// 원형 갤러리 초기화
let circularGallery = null;
async function initCircularGallery() {
  try {
    const { initCircularGallery: initGallery } = await import('./circular-gallery.js');
    circularGallery = await initGallery();
    console.log('Circular gallery initialized');
  } catch (error) {
    console.error('Error initializing circular gallery:', error);
  }
}

// Contact 폼 초기화
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
}

// Contact 폼 제출 처리
function handleContactSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // 이메일 내용 생성
  const emailContent = `To: youxarthur@gmail.com
Subject: ${subject}

From: ${name} (${email})

Message:
${message}`;
  
  // 클립보드에 복사
  navigator.clipboard.writeText(emailContent).then(() => {
    // 폼 초기화
    e.target.reset();
    
    // 성공 메시지 표시
    alert('Your message has been copied to clipboard! Please paste it into your email app and send it to youxarthur@gmail.com');
    
    // 이메일 앱 열기 (선택사항)
    const mailtoLink = `mailto:youxarthur@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
    window.open(mailtoLink);
  }).catch(() => {
    // 클립보드 복사 실패 시 대체 방법
    const mailtoLink = `mailto:youxarthur@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
    
    // 폼 초기화
    e.target.reset();
    
    alert('Your email client will open automatically. Please send the message to youxarthur@gmail.com');
  });
}

// 초기화
document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM loaded');
  
  // JSON 데이터 로드
  await loadBioData();
  await loadCeramicData();
  await loadStatementData();
  
  // Three.js 뷰어 초기화
  await initThreeViewer();
  
  initHomeButton();
  initMenuButtons();
  initContactForm();
  
  // 기본 상태에서는 모든 콘텐츠 섹션 숨기기
  contentSections.forEach(section => {
    section.style.display = 'none';
  });
});
