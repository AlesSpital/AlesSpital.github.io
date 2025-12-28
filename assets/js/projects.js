(function () {
  const projectData = {
    categories: [
      { id: 'arvr', label: 'AR / VR', color: '#7af0c5' },
      { id: 'games', label: 'Games', color: '#8ea2ff' },
      { id: 'digital-art', label: 'Digital Art', color: '#ffd890' },
      { id: 'video', label: 'Video', color: '#7cc7ff' },
      { id: 'experiments', label: 'Labs', color: '#ff9ad9' }
    ],
    projects: [
      {
        title: 'Echoes of Etra',
        slug: 'echoes-of-etra',
        category: 'games',
        summary: 'Original RPG built with students that pits mortals against mythic powers.',
        cover: 'assets/img/portfolio/eoe.jpg',
        featured: true,
        links: [
          { label: 'Trailer', url: 'https://youtu.be/byq_hVzCsZA?si=p9StZG92jRCq2R1Q', icon: 'bxl-youtube' },
          { label: 'Download', url: 'https://drive.google.com/file/d/1NezLAz30O-LDiyqCaF3XH9QalngPJ1uI/view?usp=sharing', icon: 'bx-download' }
        ],
        tags: ['RPG', 'Unity', 'Team Lead']
      },
      {
        title: 'ARnet',
        slug: 'arnet',
        category: 'arvr',
        summary: 'An AR networking trainer that lets students explore topology, routing, and addressing.',
        cover: 'assets/img/portfolio/arnet.jpg',
        deprecated: true,
        links: [
          { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.CriticalGlitch.ARnet', icon: 'bx-link-external' }
        ],
        tags: ['Augmented Reality', 'Education', 'Unity']
      },
      {
        title: 'AR Tourist Guide',
        slug: 'ar-tourist-guide',
        category: 'arvr',
        summary: 'Immersive guide that reconstructs the submerged village of Družmirje for visitors.',
        cover: 'assets/img/portfolio/artouristguide.png',
        deprecated: true,
        links: [
          { label: 'Read Thesis', url: 'https://dk.um.si/Dokument.php?id=145960', icon: 'bx-book' }
        ],
        tags: ['AR', 'Cultural Heritage', 'Mobile']
      },
      {
        title: 'The Arena',
        slug: 'the-arena',
        category: 'games',
        summary: 'Mobile arena battles with fast combat loops and punchy effects.',
        cover: 'assets/img/portfolio/thearena.jpg',
        links: [
          { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.CriticalGlitch.TheArena', icon: 'bx-link-external' }
        ],
        tags: ['Mobile', 'Action', 'Unity']
      },
      {
        title: 'Void',
        slug: 'void',
        category: 'games',
        summary: 'Minimalist survival game about avoiding the pull of the void.',
        cover: 'assets/img/portfolio/thevoid.jpg',
        links: [
          { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.CriticalGlitch.Void', icon: 'bx-link-external' }
        ],
        tags: ['Arcade', 'Android', 'Quick Play']
      },
      {
        title: 'Spez Shooter',
        slug: 'spez-shooter',
        category: 'games',
        summary: 'Reflex-focused tap shooter built for pick-up-and-play sessions.',
        cover: 'assets/img/portfolio/spezshooter.jpg',
        links: [
          { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.CriticalGlitch.SpezShooter', icon: 'bx-link-external' }
        ],
        tags: ['Shooter', 'Mobile', 'Fast Loop']
      },
      {
        title: 'Digital Art Gallery',
        slug: 'digital-art',
        category: 'digital-art',
        summary: 'A rotating collection of 3D renders, digital paintings, and motion edits.',
        cover: 'assets/img/portfolio/digart.jpg',
        links: [
          { label: 'Instagram', url: 'https://www.instagram.com/alesspital/', icon: 'bxl-instagram' }
        ],
        tags: ['3D', 'Color', 'Compositing']
      },
      {
        title: 'Cinematic Reel',
        slug: 'cinematic-reel',
        category: 'video',
        summary: 'Selected video edits and VFX-driven cuts crafted for social campaigns.',
        cover: 'assets/img/portfolio/photoart.jpg',
        links: [
          { label: 'Watch', url: 'https://www.instagram.com/alesspital/', icon: 'bxl-instagram' }
        ],
        tags: ['Video', 'Editing', 'Sound Design']
      },
      {
        title: 'XR Interaction Labs',
        slug: 'xr-labs',
        category: 'experiments',
        summary: 'Playable prototypes exploring tactile interactions across VR and AR platforms.',
        cover: 'assets/img/portfolio/pot_img.jpg',
        links: [],
        tags: ['Prototype', 'Interaction Design', 'Rapid Iteration']
      }
    ]
  };

  const categoriesById = new Map();
  projectData.categories.forEach((cat) => categoriesById.set(cat.id, cat));

  const projectGrid = document.getElementById('projects-grid');
  const filterList = document.getElementById('project-filters');
  const featuredArea = document.getElementById('project-featured');
  const loadMoreBtn = document.getElementById('projects-load-more');
  let iso;
  let visibleCount = 6;
  const step = 6;

  const createEl = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };

  const buildBadges = (project) => {
    const wrap = createEl('div', 'project-badges');
    const category = categoriesById.get(project.category);
    if (category) {
      const badge = createEl('span', 'badge badge-category', category.label);
      badge.style.setProperty('--badge-accent', category.color || '#f9a946');
      wrap.appendChild(badge);
    }
    if (project.deprecated) {
      const badge = createEl('span', 'badge badge-deprecated', 'Legacy');
      wrap.appendChild(badge);
    }
    (project.tags || []).forEach((tag) => wrap.appendChild(createEl('span', 'badge', tag)));
    return wrap;
  };

  const buildLinks = (links, className = 'project-links') => {
    if (!links || !links.length) return null;
    const wrap = createEl('div', className);
    links.forEach((link) => {
      const anchor = createEl('a');
      anchor.href = link.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      anchor.innerHTML = `<i class="bx ${link.icon || 'bx-link-external'}"></i><span>${link.label}</span>`;
      wrap.appendChild(anchor);
    });
    return wrap;
  };

  const buildCard = (project, index) => {
    const card = createEl('div', `project-card filter-${project.category} ${project.deprecated ? 'is-legacy' : ''}`);
    card.dataset.aos = 'fade-up';
    card.dataset.aosDelay = 80 + (index % 6) * 20;

    const media = createEl('div', 'project-media');
    const img = createEl('img');
    img.src = project.cover;
    img.alt = project.title;
    media.appendChild(img);

    const body = createEl('div', 'project-body');
    body.appendChild(buildBadges(project));
    body.appendChild(createEl('h3', null, project.title));
    body.appendChild(createEl('p', 'muted', project.summary));
    const links = buildLinks(project.links);
    if (links) body.appendChild(links);

    card.appendChild(media);
    card.appendChild(body);
    return card;
  };

  const renderProjects = () => {
    if (!projectGrid) return;
    if (iso) {
      iso.destroy();
      iso = undefined;
    }
    projectGrid.innerHTML = '';
    projectData.projects.slice(0, visibleCount).forEach((project, idx) => {
      projectGrid.appendChild(buildCard(project, idx));
    });

    if (typeof Isotope !== 'undefined' && projectGrid.children.length) {
      iso = new Isotope(projectGrid, {
        itemSelector: '.project-card',
        layoutMode: 'fitRows'
      });
    }

    updateLoadMore();
    if (window.AOS) AOS.refresh();
  };

  const renderFilters = () => {
    if (!filterList) return;
    filterList.innerHTML = '';
    const all = createEl('button', 'active');
    all.dataset.filter = '*';
    all.innerHTML = '<span class="dot" style="--dot-color:#f9a946"></span>All';
    filterList.appendChild(all);

    projectData.categories.forEach((category) => {
      const btn = createEl('button');
      btn.dataset.filter = `.filter-${category.id}`;
      btn.style.setProperty('--dot-color', category.color || '#f9a946');
      btn.innerHTML = `<span class="dot"></span>${category.label}`;
      filterList.appendChild(btn);
    });

    filterList.addEventListener('click', (e) => {
      if (e.target.closest('button')) {
        const target = e.target.closest('button');
        filterList.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
        target.classList.add('active');
        const filterValue = target.dataset.filter;
        if (iso) {
          iso.arrange({ filter: filterValue });
        } else {
          document.querySelectorAll('#projects-grid .project-card').forEach((card) => {
            if (filterValue === '*' || card.matches(filterValue)) card.style.display = '';
            else card.style.display = 'none';
          });
        }
        if (window.AOS) AOS.refresh();
      }
    });
  };

  const renderFeatured = () => {
    if (!featuredArea) return;
    const featured = projectData.projects.find((p) => p.featured) || projectData.projects[0];
    if (!featured) return;
    const category = categoriesById.get(featured.category);
    featuredArea.innerHTML = `
      <div class="featured-card" data-aos="fade-up">
        <div class="featured-meta">
          <p class="eyebrow">${category ? category.label : 'Signature'} • Spotlight</p>
          <h2>${featured.title}</h2>
          <p class="lead">${featured.summary}</p>
          ${buildBadges(featured).outerHTML}
          ${(buildLinks(featured.links, 'featured-links') || { outerHTML: '' }).outerHTML}
        </div>
        <div class="featured-visual">
          <div class="glow"></div>
          <img src="${featured.cover}" alt="${featured.title} cover art" />
        </div>
      </div>
    `;
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderProjects();
    renderFeatured();
    document.dispatchEvent(new CustomEvent('portfolioContentReady'));
  });

  const updateLoadMore = () => {
    if (!loadMoreBtn) return;
    if (visibleCount >= projectData.projects.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-flex';
    }
  };

  loadMoreBtn?.addEventListener('click', () => {
    visibleCount = Math.min(projectData.projects.length, visibleCount + step);
    renderProjects();
    if (iso) iso.arrange();
    if (window.AOS) AOS.refresh();
  });
})();
