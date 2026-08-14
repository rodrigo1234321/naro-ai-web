/**
 * MS Refrigeración - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initContactForm();
  initActiveLink();
  initHeaderScroll();
  initScrollReveal();
  initStatsCounter();
});

/**
 * Initialize Mobile Navigation hamburger toggle
 */
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        navMenu.classList.add('open');
        navToggle.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Handles Web3Forms AJAX submission for the contact form
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Show submitting state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';

      if (formResponse) {
        formResponse.style.display = 'none';
        formResponse.className = '';
      }

      const formData = new FormData(contactForm);
      
      // Web3Forms endpoint config
      // Note: We use Web3Forms API which processes FormData directly
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (response.status === 200 && result.success) {
          showFormMessage('¡Muchas gracias! Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto a la brevedad.', 'success');
          contactForm.reset();
        } else {
          showFormMessage('Hubo un problema al enviar tu consulta: ' + (result.message || 'Error desconocido') + '. Por favor, intentalo de nuevo más tarde.', 'error');
        }
      } catch (error) {
        showFormMessage('Error de red. Por favor, verificá tu conexión a internet e intentalo de nuevo.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  function showFormMessage(message, type) {
    if (formResponse) {
      formResponse.style.display = 'block';
      formResponse.innerHTML = message;
      formResponse.style.padding = '1rem';
      formResponse.style.borderRadius = '4px';
      formResponse.style.marginTop = '1rem';
      formResponse.style.fontWeight = '500';
      formResponse.style.fontSize = '0.95rem';
      
      if (type === 'success') {
        formResponse.style.backgroundColor = '#d4edda';
        formResponse.style.color = '#155724';
        formResponse.style.border = '1px solid #c3e6cb';
      } else {
        formResponse.style.backgroundColor = '#f8d7da';
        formResponse.style.color = '#721c24';
        formResponse.style.border = '1px solid #f5c6cb';
      }
    }
  }
}

/**
 * Marks the active navigation link based on current path
 */
function initActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Simple check if path matches href (accounting for index/home)
    if (currentPath.endsWith(href) || (href === 'index.html' && (currentPath.endsWith('/') || currentPath === ''))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Handles Header styling on scroll (Glassmorphism effect)
 */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Initializes IntersectionObserver for Scroll Reveal animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length || !window.IntersectionObserver) {
    // Fallback if IntersectionObserver isn't supported or no elements exist
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animated to keep it visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/**
 * Initializes dynamic counter for statistics
 */
function initStatsCounter() {
  const statsElements = document.querySelectorAll('[data-target]');
  
  if (!statsElements.length || !window.IntersectionObserver) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% is visible
  };

  const countUp = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // ms
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        el.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        el.innerText = target;
      }
    };
    updateCounter();
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statsElements.forEach(el => {
    // Initialize text to 0
    el.innerText = '0';
    statsObserver.observe(el);
  });
}
