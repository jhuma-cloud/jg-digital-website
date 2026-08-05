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
     Contact form → Google Apps Script (Sheet + email)
     ------------------------------------------------------------------ */
  if (!contactForm) return;

  var GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbwVzk9BUyneSRKBV1UKd3ght5ODQDr2xGp5xNuC_sl3VGcme8kH2saF8DF3UloTKMWflw/exec';

  var fields = {
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
    phone: {
      el: document.getElementById('phone'),
      error: document.getElementById('phone-error'),
      validate: function () {
        return '';
      }
    },
    company: {
      el: document.getElementById('company'),
      error: document.getElementById('company-error'),
      validate: function () {
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

  var formSuccess = document.getElementById('form-success');
  var formSubmitError = document.getElementById('form-submit-error');
  var submitBtn = document.getElementById('form-submit');
  var honeypot = document.getElementById('website');
  var isSubmitting = false;

  function setFieldState(field, message) {
    if (!field || !field.el) return;
    field.el.classList.toggle('invalid', Boolean(message));
    if (field.error) field.error.textContent = message;
  }

  function validateField(key) {
    var field = fields[key];
    if (!field || !field.el) return true;
    var message = field.validate(field.el.value);
    setFieldState(field, message);
    return !message;
  }

  function setSubmitting(loading) {
    isSubmitting = loading;
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? 'Sending...' : 'Send Message';
  }

  function showSuccess() {
    if (formSubmitError) formSubmitError.hidden = true;
    if (formSuccess) {
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function showError() {
    if (formSuccess) formSuccess.hidden = true;
    if (formSubmitError) {
      formSubmitError.hidden = false;
      formSubmitError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    if (!field.el) return;

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
    if (isSubmitting) return;

    if (formSuccess) formSuccess.hidden = true;
    if (formSubmitError) formSubmitError.hidden = true;

    var results = Object.keys(fields).map(validateField);
    var isValid = results.every(Boolean);

    if (!isValid) {
      var firstInvalid = contactForm.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* Honeypot: bots fill this — pretend success without sending */
    if (honeypot && honeypot.value.trim()) {
      contactForm.reset();
      showSuccess();
      return;
    }

    var payload = {
      name: fields.name.el.value.trim(),
      email: fields.email.el.value.trim(),
      phone: fields.phone.el ? fields.phone.el.value.trim() : '',
      company: fields.company.el ? fields.company.el.value.trim() : '',
      service: fields.service.el.value,
      message: fields.message.el.value.trim(),
      form_type: 'contact',
      submittedAt: new Date().toISOString(),
      honeypot: ''
    };

    setSubmitting(true);

    /**
     * Google Apps Script Web Apps work best from static sites with:
     * - Content-Type: text/plain (avoids CORS preflight)
     * - mode: 'no-cors' (GAS redirect responses are often opaque)
     *
     * IMPORTANT: Web App must be deployed with access = "Anyone".
     * Test the URL in Incognito — it must return JSON, not a login page.
     * See docs/GOOGLE-SHEETS-SETUP.md
     */
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    })
      .then(function () {
        contactForm.reset();
        Object.keys(fields).forEach(function (key) {
          setFieldState(fields[key], '');
        });
        showSuccess();
      })
      .catch(function () {
        showError();
      })
      .finally(function () {
        setSubmitting(false);
      });
  });
})();
