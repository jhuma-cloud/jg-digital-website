/**
 * JG Digital — site behavior
 * Mobile nav, smooth scroll, scroll animations, form validation
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     DOM references
     ------------------------------------------------------------------ */
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  const navLinks = document.querySelectorAll('.primary-nav a, .footer-nav a');
  const contactForm = document.getElementById('contact-form');
  const yearEl = document.getElementById('year');
  const animatedEls = document.querySelectorAll('[data-animate]');

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------
     Header scroll state
     ------------------------------------------------------------------ */
  function updateHeaderScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  /* ------------------------------------------------------------------
     Mobile navigation toggle
     ------------------------------------------------------------------ */
  function closeNav() {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    primaryNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openNav() {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    primaryNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });
  }

  /* ------------------------------------------------------------------
     Smooth scroll & close mobile nav on link click
     ------------------------------------------------------------------ */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');

      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      closeNav();
    });
  });

  /* Close nav on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNav();
    }
  });

  /* Close nav when resizing to desktop */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeNav();
    }
  });

  /* ------------------------------------------------------------------
     Scroll-triggered animations (Intersection Observer)
     ------------------------------------------------------------------ */
  if ('IntersectionObserver' in window && animatedEls.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ------------------------------------------------------------------
     Contact form validation (front-end only)
     ------------------------------------------------------------------ */
  if (!contactForm) return;

  const fields = {
    name: {
      el: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: function (value) {
        if (!value.trim()) return 'Please enter your full name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      }
    },
    email: {
      el: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: function (value) {
        if (!value.trim()) return 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      }
    },
    service: {
      el: document.getElementById('service'),
      error: document.getElementById('service-error'),
      validate: function (value) {
        if (!value) return 'Please select a service.';
        return '';
      }
    },
    message: {
      el: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate: function (value) {
        if (!value.trim()) return 'Please tell us about your project.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return '';
      }
    }
  };

  const formSuccess = document.getElementById('form-success');

  function setFieldState(field, message) {
    field.el.classList.toggle('invalid', Boolean(message));
    field.error.textContent = message;
  }

  function validateField(key) {
    const field = fields[key];
    const message = field.validate(field.el.value);
    setFieldState(field, message);
    return !message;
  }

  Object.keys(fields).forEach(function (key) {
    const field = fields[key];
    field.el.addEventListener('blur', function () {
      validateField(key);
    });

    field.el.addEventListener('input', function () {
      if (field.el.classList.contains('invalid')) {
        validateField(key);
      }
    });
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (formSuccess) {
      formSuccess.hidden = true;
    }

    const results = Object.keys(fields).map(validateField);
    const isValid = results.every(Boolean);

    if (!isValid) {
      const firstInvalid = contactForm.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    /* Simulate successful submission (no backend) */
    contactForm.reset();
    Object.keys(fields).forEach(function (key) {
      setFieldState(fields[key], '');
    });

    if (formSuccess) {
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();
