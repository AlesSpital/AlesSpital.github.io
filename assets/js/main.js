(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) return [...document.querySelectorAll(el)];
    return document.querySelector(el);
  };

  const smoothScroll = (hash) => {
    const el = select(hash);
    if (!el) return;
    const top = el.offsetTop - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const initNav = () => {
    const navLinks = select('.nav-links');
    const toggle = select('.nav-toggle');
    toggle?.addEventListener('click', () => {
      navLinks?.classList.toggle('open');
      toggle.innerHTML = navLinks?.classList.contains('open') ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });

    select('.nav-links', true).forEach((nav) => {
      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) smoothScroll(href);
          navLinks?.classList.remove('open');
          toggle.innerHTML = '<i class="bi bi-list"></i>';
        });
      });
    });
  };

  document.addEventListener('portfolioContentReady', () => {
    if (window.AOS) AOS.refresh();
  });

  window.addEventListener('load', () => {
    initNav();
    if (window.AOS) {
      AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
      });
    }
  });
})();
