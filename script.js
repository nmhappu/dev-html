document.addEventListener('DOMContentLoaded', () => {
  initUrlHandler();
  initTheme();
  initCopyEmail();
  initScrollSpy();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }
}

function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.js-copy-text, .js-copy-email, .js-copy-phone');
  const toast = document.getElementById('toast');
  let toastTimeout;

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-phone') || btn.getAttribute('data-email') || btn.getAttribute('data-copy') || '+91 79075 51379';
      const label = btn.getAttribute('data-phone') ? 'Phone number' : (btn.getAttribute('data-email') ? 'Email' : 'Text');

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        showToast(`${label} (${textToCopy}) copied to clipboard!`);
      } catch (err) {
        console.error('Failed to copy text:', err);
        showToast(`Copied: ${textToCopy}`);
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

function initUrlHandler() {
  const isHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';

  if (isHttp) {
    const { pathname, search, hash } = window.location;
    if (pathname.endsWith('.html')) {
      let cleanPath = pathname;
      if (cleanPath.endsWith('/index.html') || cleanPath === 'index.html') {
        cleanPath = cleanPath.slice(0, -10) || '/';
      } else {
        cleanPath = cleanPath.replace(/\.html$/, '');
      }
      window.history.replaceState(null, '', cleanPath + search + hash);
    }
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http:') || href.startsWith('https:')) {
      return;
    }

    if (window.location.protocol === 'file:') {
      if (href === '/' || href === '/index' || href === 'index') {
        e.preventDefault();
        window.location.href = 'index.html';
      } else if (href.startsWith('/#') || href.startsWith('./#')) {
        e.preventDefault();
        window.location.href = 'index.html' + href.slice(href.indexOf('#'));
      } else if (href === 'privacy' || href === '/privacy') {
        e.preventDefault();
        window.location.href = 'privacy.html';
      }
    }
  });
}
