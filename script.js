document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navList = document.querySelector('header ul');
  const navLinks = document.querySelectorAll('header ul li a');
  const sections = document.querySelectorAll('section');
  
  const mobileBtn = document.createElement('div');
  mobileBtn.className = 'mobile-menu-btn';
  mobileBtn.innerHTML = `
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  `;
  header.insertBefore(mobileBtn, header.firstChild);

  mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
  });

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight / 3) &&
      rect.bottom >= (window.innerHeight / 3)
    );
  }

  function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
      if (isInViewport(section)) {
        currentSection = section.id;
      }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
      currentSection = 'contact';
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    updateActiveLink();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        navList.classList.remove('active');
        mobileBtn.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  const backToTop = document.createElement('a');
  backToTop.href = '#home';
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  updateActiveLink();
});