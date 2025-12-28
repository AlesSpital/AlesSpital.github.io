(function () {
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const smoothScroll = (hash) => {
    const el = select(hash);
    if (!el) return;
    const top = el.offsetTop - 50;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const initNav = () => {
    const navLinks = select('.nav-links');
    const toggle = select('.nav-toggle');
    toggle?.addEventListener('click', () => {
      navLinks?.classList.toggle('open');
      toggle.innerHTML = navLinks?.classList.contains('open') ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });

    navLinks?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          smoothScroll(href);
          navLinks.classList.remove('open');
          toggle.innerHTML = '<i class="bi bi-list"></i>';
        }
      });
    });
  };

  const initChapterTracker = () => {
    const chapters = ['#hero', '#projects', '#story', '#experience', '#skills', '#contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          select('.nav-links a.active')?.classList.remove('active');
          const link = select(`.nav-links a[href="${'#' + entry.target.id}"]`);
          link?.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    chapters.forEach((id) => {
      const el = select(id);
      if (el) observer.observe(el);
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initChapterTracker();
  });
})();
