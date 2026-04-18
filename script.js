document.addEventListener('DOMContentLoaded', () => {
  // --- 테마 토글 (다크/라이트 모드) ---
  const themeToggle = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // 로컬 스토리지에서 테마 불러오기
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeIcon.innerText = theme === 'light' ? '🌙' : '☀️';
  }

  // --- 네비게이션 스크롤 효과 ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 스크롤 리빌 애니메이션 (Reveal) ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- 히어로 슬라이더 ---
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  slideInterval = setInterval(nextSlide, 5000);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      clearInterval(slideInterval);
      goToSlide(index);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  // --- 스마트 대시보드 시뮬레이션 ---
  const dashBtns = document.querySelectorAll('.ctrl-btn');
  dashBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dashBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // 가짜 알림
      const label = btn.querySelector('span:last-child').innerText;
      console.log(`Command sent: ${label}`);
    });
  });

  // 배터리 & 면적 랜덤 변화 시뮬레이션
  const batteryEl = document.getElementById('dash-battery');
  const areaEl = document.getElementById('dash-area');
  let battery = 85;
  let area = 42;

  setInterval(() => {
    if (Math.random() > 0.7) {
      battery = Math.max(0, battery - 1);
      area += 1;
      batteryEl.innerText = `${battery}%`;
      areaEl.innerText = `${area}㎡`;
    }
  }, 3000);

  // --- 스펙 카운터 섹션 ---
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.getElementById('stats');
  let animated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        let current = 0;
        const timer = setInterval(() => {
          current += Math.ceil(target / 50);
          if (current >= target) {
            stat.innerText = target;
            clearInterval(timer);
          } else {
            stat.innerText = current;
          }
        }, 40);
      });
      animated = true;
    }
  }, { threshold: 0.5 });
  
  if (statsSection) statsObserver.observe(statsSection);

  // --- 부드러운 스크롤 ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});

function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('contact-success');
  form.style.display = 'none';
  successMsg.style.display = 'block';
  form.reset();
  setTimeout(() => {
    successMsg.style.display = 'none';
    form.style.display = 'block';
  }, 5000);
}
