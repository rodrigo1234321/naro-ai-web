/* ============================================
   PORTFOLIO — Scripts
   Animations · Scroll Reveal · Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Cursor Glow ---------- */
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
  });

  function animateCursorGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursorGlow);
  }
  animateCursorGlow();


  /* ---------- Navbar Scroll ---------- */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  const navToggle = document.querySelector('.nav-toggle');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();


  /* ---------- Mobile Navigation ---------- */
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });


  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });


  /* ---------- Scroll Reveal ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children if present
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ---------- Active Nav Link Highlight ---------- */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLink.style.color = 'var(--text-primary)';
        } else {
          navLink.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });


  /* ---------- Animated Counters ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(element) {
    const target = parseInt(element.dataset.count, 10);
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      element.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => counterObserver.observe(stat));


  /* ---------- Tech Stack Tilt Effect ---------- */
  const techItems = document.querySelectorAll('.tech-item');

  techItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      item.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });


  /* ---------- Project Cards Parallax ---------- */
  const projectCards = document.querySelectorAll('.project-card');

  function handleProjectParallax() {
    projectCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const visual = card.querySelector('.project-visual');
        if (visual) {
          const translate = (progress - 0.5) * 20;
          visual.style.transform = `translateY(${translate}px)`;
        }
      }
    });
  }

  window.addEventListener('scroll', handleProjectParallax, { passive: true });


  /* ---------- Typing Effect for Hero Badge ---------- */
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const phrases = [
      'Construyendo con IA',
      'Next.js + Gemini + Claude',
      'Full Stack Developer',
      'SaaS con IA integrada',
      'Automatizando procesos',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1000);
  }


  /* ---------- Magnetic Button Effect ---------- */
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });


  /* ---------- Particle Background in Hero ---------- */
  const heroSection = document.querySelector('.hero');
  const particleContainer = document.createElement('div');
  particleContainer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;';
  heroSection.prepend(particleContainer);

  function createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const startX = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.3 + 0.05;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: var(--accent-blue);
      border-radius: 50%;
      left: ${startX}%;
      bottom: -10px;
      opacity: ${opacity};
      animation: particleRise ${duration}s ${delay}s linear infinite;
    `;

    particleContainer.appendChild(particle);
  }

  // Inject particle animation
  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes particleRise {
      0%   { transform: translateY(0) translateX(0); opacity: 0; }
      10%  { opacity: var(--particle-opacity, 0.15); }
      90%  { opacity: var(--particle-opacity, 0.15); }
      100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 80}px); opacity: 0; }
    }
  `;
  document.head.appendChild(particleStyle);

  for (let i = 0; i < 30; i++) {
    createParticle();
  }


  /* ---------- Glassmorphism Card Shine ---------- */
  const glassCards = document.querySelectorAll('.project-card, .about-card, .contact-card');

  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--shine-x', x + '%');
      card.style.setProperty('--shine-y', y + '%');
      card.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.06) 0%, transparent 50%),
        var(--bg-glass)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });


  /* ---------- Scroll Progress Bar ---------- */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--gradient-hero);
    z-index: 10000;
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(progressBar);

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });


  /* ---------- Easter Egg: Konami Code ---------- */
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        document.body.style.transition = 'filter 1s';
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
          document.body.style.filter = '';
        }, 3000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });


  /* ---------- Performance: Throttle scroll handlers ---------- */
  let scrollTicking = false;
  const scrollHandlers = [handleNavbarScroll, highlightActiveNav, handleProjectParallax, updateScrollProgress];

  function onOptimizedScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        scrollHandlers.forEach(fn => fn());
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  // Replace individual scroll listeners with one optimized handler
  window.removeEventListener('scroll', handleNavbarScroll);
  window.removeEventListener('scroll', highlightActiveNav);
  window.removeEventListener('scroll', handleProjectParallax);
  window.removeEventListener('scroll', updateScrollProgress);
  window.addEventListener('scroll', onOptimizedScroll, { passive: true });


  /* ---------- Console Branding ---------- */
  console.log(
    '%c Rodrigo | Portfolio ',
    'background: linear-gradient(135deg, #6366f1, #a855f7); color: white; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: bold;'
  );
  console.log('%c Desarrollado con IA y tecnologias modernas ', 'color: #22d3ee; font-size: 12px;');

});
