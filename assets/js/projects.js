(function () {
  const DATA_URL = (() => {
    if (document.currentScript && document.currentScript.src) {
      return new URL('../data/projects.json', document.currentScript.src).href;
    }
    return 'assets/data/projects.json';
  })();
  const projectList = document.getElementById('project-list');
  const filterList = document.getElementById('portfolio-flters');
  const statsList = document.getElementById('portfolio-stats');
  const spotlightContainer = document.getElementById('project-spotlight');
  const categoryMap = new Map();
  let projects = [];
  let categories = [];

  const createElement = (tag, className, textContent) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
  };

  const renderFilters = () => {
    if (!filterList) return;
    filterList.innerHTML = '';

    const allFilter = createElement('li', 'filter-active');
    allFilter.dataset.filter = '*';
    allFilter.textContent = 'All';
    filterList.appendChild(allFilter);

    categories.forEach((category) => {
      const item = createElement('li');
      item.dataset.filter = `.filter-${category.id}`;
      item.dataset.category = category.id;
      item.style.setProperty('--chip-color', category.color || '#f9a946');
      item.innerHTML = `<span class="dot"></span>${category.label}`;
      filterList.appendChild(item);
    });
  };

  const renderStats = () => {
    if (!statsList) return;
    statsList.innerHTML = '';

    const totals = categories.map((category) => {
      return {
        ...category,
        count: projects.filter((project) => project.category === category.id).length
      };
    });

    const allCount = createElement('span', 'stat-chip');
    allCount.innerHTML = `<span class="dot" style="--dot-color:#f9a946"></span>All <small>${projects.length}</small>`;
    statsList.appendChild(allCount);

    totals.forEach((category) => {
      const chip = createElement('span', 'stat-chip');
      chip.style.setProperty('--dot-color', category.color || '#f9a946');
      chip.innerHTML = `<span class="dot"></span>${category.label} <small>${category.count}</small>`;
      statsList.appendChild(chip);
    });
  };

  const buildLinks = (links) => {
    if (!links || !links.length) return null;

    const container = createElement('div', 'project-links');
    links.forEach((link) => {
      const anchor = createElement('a');
      anchor.href = link.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      anchor.innerHTML = `<i class="bx ${link.icon || 'bx-link-external'}"></i><span>${link.label}</span>`;
      container.appendChild(anchor);
    });
    return container;
  };

  const buildBadges = (project) => {
    const badgeRow = createElement('div', 'project-badges');
    const category = categoryMap.get(project.category);
    if (category) {
      const chip = createElement('span', 'badge badge-category', category.label);
      chip.style.setProperty('--badge-accent', category.color || '#f9a946');
      badgeRow.appendChild(chip);
    }

    (project.tags || []).slice(0, 3).forEach((tag) => {
      const chip = createElement('span', 'badge', tag);
      badgeRow.appendChild(chip);
    });

    return badgeRow;
  };

  const buildProjectCard = (project, index) => {
    const column = createElement('div', `col-lg-4 col-md-6 portfolio-item filter-${project.category}`);
    column.dataset.project = project.slug || project.title;
    column.dataset.aos = 'fade-up';
    column.dataset.aosDelay = 100 + index * 30;

    const wrap = createElement('div', 'portfolio-wrap enhanced');
    const media = createElement('div', 'portfolio-media');
    const img = createElement('img', 'img-fluid');
    img.src = project.cover;
    img.alt = project.title;
    media.appendChild(img);
    media.appendChild(buildBadges(project));

    const content = createElement('div', 'portfolio-meta');
    const title = createElement('h4', null, project.title);
    const summary = createElement('p', null, project.summary);
    content.appendChild(title);
    content.appendChild(summary);

    const links = createElement('div', 'portfolio-links');
    const lightboxLink = createElement('a');
    lightboxLink.href = project.cover;
    lightboxLink.dataset.gallery = 'portfolioGallery';
    lightboxLink.className = 'portfolio-lightbox';
    lightboxLink.title = project.summary || project.title;
    lightboxLink.innerHTML = '<i class="bx bx-plus"></i>';
    links.appendChild(lightboxLink);

    const externalLinks = buildLinks(project.links);
    if (externalLinks) {
      externalLinks.querySelectorAll('a').forEach((anchor) => {
        const action = anchor.cloneNode(true);
        action.classList.add('project-action');
        links.appendChild(action);
      });
    }

    wrap.appendChild(media);
    wrap.appendChild(content);
    wrap.appendChild(links);
    column.appendChild(wrap);
    return column;
  };

  const renderProjects = () => {
    if (!projectList) return;
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
      projectList.appendChild(buildProjectCard(project, index));
    });
  };

  const renderSpotlight = () => {
    if (!spotlightContainer || !projects.length) return;

    const spotlight = projects.find((project) => project.featured) || projects[0];
    const category = categoryMap.get(spotlight.category);

    spotlightContainer.innerHTML = '';

    const textColumn = createElement('div', 'col-lg-6 col-md-6 spotlight-copy');
    const kicker = createElement('p', 'eyebrow', `${category ? category.label : 'Spotlight'} • Signature Work`);
    const title = createElement('h3', null, spotlight.title);
    const summary = createElement('p', 'lead', spotlight.summary);
    const badges = buildBadges(spotlight);
    const links = buildLinks(spotlight.links);

    textColumn.appendChild(kicker);
    textColumn.appendChild(title);
    textColumn.appendChild(summary);
    textColumn.appendChild(badges);
    if (links) {
      links.classList.add('spotlight-links');
      textColumn.appendChild(links);
    }

    const mediaColumn = createElement('div', 'col-lg-6 col-md-6 spotlight-visual');
    const frame = createElement('div', 'spotlight-frame');
    const img = createElement('img');
    img.src = spotlight.cover;
    img.alt = `${spotlight.title} cover art`;
    frame.appendChild(img);
    mediaColumn.appendChild(frame);

    spotlightContainer.appendChild(textColumn);
    spotlightContainer.appendChild(mediaColumn);
  };

  const loadProjects = async () => {
    try {
      const response = await fetch(DATA_URL);
      const payload = await response.json();
      categories = payload.categories || [];
      projects = payload.projects || [];
      categories.forEach((category) => categoryMap.set(category.id, category));

      renderFilters();
      renderProjects();
      renderSpotlight();
      renderStats();

      document.dispatchEvent(new CustomEvent('portfolioContentReady'));
    } catch (error) {
      console.error('Unable to load projects.json', error);
      if (projectList) {
        const alert = createElement('p', 'text-danger');
        alert.textContent = 'Projects failed to load. Please refresh the page.';
        projectList.appendChild(alert);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', loadProjects);
})();
