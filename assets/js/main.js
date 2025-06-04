// Mobile menu toggle & theme switcher

document.addEventListener('DOMContentLoaded', function () {
  const headerHolder = document.getElementById('ms-header-placeholder');
  const footerHolder = document.getElementById('ms-footer-placeholder');
  const basePath = location.pathname.includes('/pages/') ? '..' : '.';

  Promise.all([
    headerHolder
      ? fetch(`${basePath}/partials/header.html`)
          .then((r) => r.text())
          .then((html) => {
            headerHolder.innerHTML = html;
          })
      : Promise.resolve(),
    footerHolder
      ? fetch(`${basePath}/partials/footer.html`)
          .then((r) => r.text())
          .then((html) => {
            footerHolder.innerHTML = html;
          })
      : Promise.resolve(),
  ]).then(initUI);

  function initUI() {
    const menuBtn = document.getElementById('msMenuBtn');
    const menu = document.getElementById('msMobileMenu');
    const overlay = document.getElementById('msMobileMenuOverlay');
    const closeBtn = document.getElementById('msMenuCloseBtn');

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  menuBtn && menuBtn.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  overlay && overlay.addEventListener('click', closeMenu);

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle ? themeToggle.querySelector('i') : null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('ms-theme');
  const enableDark = savedTheme === 'dark' || (prefersDark && savedTheme !== 'light');
  if (enableDark) {
    document.body.classList.add('dark-mode');
    if (icon) icon.classList.replace('bi-moon', 'bi-sun');
  }
    themeToggle && themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      if (icon) {
        if (isDark) {
          icon.classList.replace('bi-moon', 'bi-sun');
        } else {
          icon.classList.replace('bi-sun', 'bi-moon');
        }
      }
      localStorage.setItem('ms-theme', isDark ? 'dark' : 'light');
    });
  }
});
