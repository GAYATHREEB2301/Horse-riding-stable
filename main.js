// ============================================
// PURAVI - Main JavaScript
// ============================================

// ── Theme Management ──
const THEME_KEY = 'puravi-theme';

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeUI(theme);
}

function updateThemeUI(theme) {
  const isDark = theme === 'dark';
  // Main toggle icon container
  const themeIcon = document.getElementById('themeIcon');

  const horseshoeSvg = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 3 C4 3, 4 10, 4 14 C4 18, 8 21, 12 21 C16 21, 20 18, 20 14 C20 10, 20 3, 17 3" />
      <path d="M7 6 L9 6 M15 6 L17 6 M5 12 L7 12 M17 12 L19 12" opacity="0.6" />
    </svg>
  `;

  if (themeIcon) {
    themeIcon.innerHTML = horseshoeSvg;
    themeIcon.style.transform = isDark ? 'rotate(0deg)' : 'rotate(180deg)';
  }

  // Mobile toggle icons
  document.querySelectorAll('.mobile-theme-icon').forEach(el => {
    el.innerHTML = horseshoeSvg;
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.transform = isDark ? 'rotate(0deg)' : 'rotate(180deg)';
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Navbar Scroll Effect ──
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Hamburger / Mobile Menu ──
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburgerBtn || !mobileMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburgerBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── Hero Background Parallax & Load Animation ──
function initHero() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;

  // Load animation
  setTimeout(() => heroBg.classList.add('loaded'), 100);

  // Subtle parallax
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

// ── Password Toggle ──
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  const svg = btn.querySelector('svg');
  if (svg) {
    svg.innerHTML = isPassword
      ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
      : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
  }
}

// ── Scroll Animation Observer ──
function initScrollAnimations() {
  const animatedEls = document.querySelectorAll('.animate-up');
  if (!animatedEls.length) return;

  // Set initial state
  animatedEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.classList.contains('animate-up-delay-1') ? '0.1s'
          : el.classList.contains('animate-up-delay-2') ? '0.2s'
            : el.classList.contains('animate-up-delay-3') ? '0.3s' : '0s';
        el.style.transitionDelay = delay;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => observer.observe(el));
}

// ── Active nav link highlight ──
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

// ── Counter Animation ──
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.textContent.replace(/[0-9.]+/, '');
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = (target >= 1000 ? (current / 1000).toFixed(1) + 'K' : Math.floor(current)) + (suffix.includes('+') ? '+' : '');
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ── Smooth anchor scrolling ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Scroll to Top (Swipe Arrow) ──
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Initialize All ──
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme first to avoid flash
  applyTheme(getStoredTheme());

  initNavbar();
  initMobileMenu();
  initHero();
  initScrollAnimations();
  animateCounters();
  initSmoothScroll();
  initImageFallbacks();
  initScrollToTop();
});

// Expose to global scope for inline onclick handlers
window.toggleTheme = toggleTheme;
window.togglePassword = togglePassword;
