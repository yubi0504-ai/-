document.addEventListener('DOMContentLoaded', () => {
  // 네비게이션 스크롤 효과
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 히어로 슬라이더
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

  // 자동 슬라이드
  slideInterval = setInterval(nextSlide, 5000);

  // 인디케이터 클릭
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      clearInterval(slideInterval);
      goToSlide(index);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  // 스크롤 시 통계 숫자 카운트업 애니메이션
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateStats() {
    if (animated) return;
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000; // 2초
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      
      const timer = setInterval(() => {
        current += Math.ceil(target / 50);
        if (current >= target) {
          stat.innerText = target;
          clearInterval(timer);
        } else {
          stat.innerText = current;
        }
      }, stepTime);
    });
    animated = true;
  }

  // Intersection Observer를 사용하여 통계 섹션이 화면에 보일 때 애니메이션 실행
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // 부드러운 스크롤 (네비게이션 링크)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // 네비게이션 바 높이만큼 여백
          behavior: 'smooth'
        });
      }
    });
  });
});

// 폼 제출 처리 (가짜 전송)
function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('contact-success');
  
  // 폼 숨기고 성공 메시지 표시
  form.style.display = 'none';
  successMsg.style.display = 'block';
  
  // 입력값 초기화
  form.reset();
  
  // 3초 후 원래대로 복구 (데모용)
  setTimeout(() => {
    successMsg.style.display = 'none';
    form.style.display = 'block';
  }, 5000);
}
