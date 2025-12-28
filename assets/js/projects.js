(function () {
  const projectData = {
    categories: [
      { id: 'xr-app', label: 'XR Apps', color: '#7ef2d1' },
      { id: 'vr-app', label: 'VR Apps', color: '#9eb5ff' },
      { id: 'mobile-games', label: 'Mobile Games', color: '#f5c06a' },
      { id: 'pc-games', label: 'PC Games', color: '#ff9ad9' },
      { id: 'art-3d', label: '3D Art', color: '#7bd7ff' },
      { id: 'art-2d', label: '2D / Motion', color: '#f38fbf' },
      { id: 'teaching', label: 'Teaching', color: '#9ff08f' }
    ],
    projects: [
      {
        title: 'ARnet',
        slug: 'arnet',
        category: 'xr-app',
        summary: 'AR networking trainer that visualizes topology, routing, and addressing concepts.',
        cover: 'assets/img/portfolio/arnet.jpg',
        featured: true,
        status: 'active',
        links: [
          { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.CriticalGlitch.ARnet', icon: 'bx-link-external' }
        ],
        tags: ['AR', 'Education', 'Unity']
      },
      {
        title: 'AR Tourist Guide',
        slug: 'ar-tourist-guide',
        category: 'xr-app',
        summary: 'Rebuilds the submerged village of Družmirje through location-based AR storytelling.',
        cover: 'assets/img/portfolio/artouristguide.png',
        status: 'archived',
        links: [
          { label: 'Thesis', url: 'https://dk.um.si/Dokument.php?id=145960', icon: 'bx-book' }
        ],
        tags: ['AR', 'Heritage', 'Mobile']
      },
      {
        title: 'XR Interaction Labs',
        slug: 'xr-labs',
        category: 'vr-app',
        summary: 'Prototypes exploring tactile interactions across VR and AR platforms.',
        cover: 'assets/img/portfolio/pot_img.jpg',
        status: 'active',
        links: [],
        tags: ['Prototype', 'Interaction Design']
      },
      {
        title: 'Echoes of Etra',
        slug: 'echoes-of-etra',
        category: 'pc-games',
        summary: 'Student-led RPG where mortals face mythic powers; built end-to-end with a team.',
        cover: 'assets/img/portfolio/eoe.jpg',
        status: 'archived',
        links: [
          { label: 'Trailer', url: 'https://youtu.be/byq_hVzCsZA?si=p9StZG92jRCq2R1Q', icon: 'bxl-youtube' },
          { label: 'Demo', url: 'https://drive.google.com/file/d/1NezLAz30O-LDiyqCaF3XH9QalngPJ1uI/view?usp=sharing', icon: 'bx-download' }
        ],
        tags: ['RPG', 'Unity', 'Team Lead']
      },
      {
        title: 'The Arena',
        slug: 'the-arena',
        category: 'mobile-games',
        summary: 'Fast-loop mobile arena battles with tactile combat and punchy VFX.',
        cover: 'assets/img/portfolio/thearena.jpg',
        status: 'active',
        links: [
          { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.CriticalGlitch.TheArena', icon: 'bx-link-external' }
        ],
        tags: ['Action', 'Unity', 'Mobile']
      },
      {
        title: 'Void',
        slug: 'void',
        category: 'mobile-games',
        summary: 'Minimalist survival tapper about resisting gravitational pull.',
        cover: 'assets/img/portfolio/thevoid.jpg',
        status: 'archived',
        links: [
          { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.CriticalGlitch.Void', icon: 'bx-link-external' }
        ],
        tags: ['Arcade', 'Android']
      },
      {
        title: 'Spez Shooter',
        slug: 'spez-shooter',
        category: 'mobile-games',
        summary: 'Reflex-driven shooter built for quick sessions and leaderboard chases.',
        cover: 'assets/img/portfolio/spezshooter.jpg',
        status: 'archived',
        links: [
          { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.CriticalGlitch.SpezShooter', icon: 'bx-link-external' }
        ],
        tags: ['Shooter', 'Mobile']
      },
      {
        title: 'Digital Art Gallery',
        slug: 'digital-art',
        category: 'art-3d',
        summary: 'Gallery of 3D renders, lighting explorations, and color studies.',
        cover: 'assets/img/portfolio/digart.jpg',
        status: 'active',
        links: [
          { label: 'Instagram', url: 'https://www.instagram.com/alesspital/', icon: 'bxl-instagram' }
        ],
        tags: ['3D', 'Lighting']
      },
      {
        title: 'Cinematic Reel',
        slug: 'cinematic-reel',
        category: 'art-2d',
        summary: 'Motion edits and VFX-driven shorts crafted for social campaigns.',
        cover: 'assets/img/portfolio/photoart.jpg',
        status: 'active',
        links: [
          { label: 'Watch', url: 'https://www.instagram.com/alesspital/', icon: 'bxl-instagram' }
        ],
        tags: ['Video', 'VFX']
      },
      {
        title: 'Teaching Tracks',
        slug: 'teaching-tracks',
        category: 'teaching',
        summary: 'Curriculum and AR labs for AI, networking, and multimedia courses.',
        cover: 'assets/img/portfolio/pot_img.jpg',
        status: 'active',
        links: [],
        tags: ['Teaching', 'AR Labs', 'AI']
      }
    ]
  };

  const categoriesById = new Map();
  projectData.categories.forEach((cat) => categoriesById.set(cat.id, cat));

  const projectGrid = document.getElementById('projects-grid');
  const filterList = document.getElementById('project-filters');
  const featuredArea = document.getElementById('project-featured');
  const loadMoreBtn = document.getElementById('projects-load-more');
  let visibleCount = 6;
  const step = 4;

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
    if (project.status === 'archived') {
      wrap.appendChild(createEl('span', 'badge badge-archived', 'Archived'));
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
    const card = createEl('div', `project-card filter-${project.category} ${project.status === 'archived' ? 'is-legacy' : ''}`);
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

  const updateLoadMore = () => {
    if (!loadMoreBtn) return;
    loadMoreBtn.style.display = visibleCount >= projectData.projects.length ? 'none' : 'inline-flex';
  };

  const renderProjects = () => {
    if (!projectGrid) return;
    projectGrid.innerHTML = '';
    projectData.projects.slice(0, visibleCount).forEach((project, idx) => {
      projectGrid.appendChild(buildCard(project, idx));
    });
    updateLoadMore();
    document.dispatchEvent(new CustomEvent('projectsRendered'));
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
      const target = e.target.closest('button');
      if (!target) return;
      filterList.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
      target.classList.add('active');
      const filterValue = target.dataset.filter;
      document.querySelectorAll('#projects-grid .project-card').forEach((card) => {
        if (filterValue === '*' || card.matches(filterValue)) card.classList.remove('hidden');
        else card.classList.add('hidden');
      });
    });
  };

  const renderFeatured = () => {
    if (!featuredArea) return;
    const featured = projectData.projects.find((p) => p.featured) || projectData.projects[0];
    if (!featured) return;
    const category = categoriesById.get(featured.category);
    featuredArea.innerHTML = `
      <div class="featured-card">
        <div class="featured-meta">
          <p class="eyebrow">${category ? category.label : 'Spotlight'} • Hero Project</p>
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

  loadMoreBtn?.addEventListener('click', () => {
    visibleCount = Math.min(projectData.projects.length, visibleCount + step);
    renderProjects();
  });

  document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderProjects();
    renderFeatured();
  });
})();
