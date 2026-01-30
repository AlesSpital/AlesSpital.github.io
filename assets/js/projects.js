(() => {
  const PROJECTS_URL = "assets/data/projects.json";

  const portfolioSection = document.querySelector("#portfolio");
  const projectList = document.querySelector("#project-list");
  const featuredList = document.querySelector("#featured-projects");
  const featuredBlock = document.querySelector(".featured-block");
  const categoryList = document.querySelector("#portfolio-flters");
  const tagList = document.querySelector("#portfolio-tags");
  const summaryEl = document.querySelector("#portfolio-summary");

  if (!projectList || !categoryList || !tagList) {
    return;
  }

  const state = {
    category: "All",
    tags: new Set()
  };

  let projects = [];
  let drawerSwiper = null;

  const normalize = (value) => String(value || "").trim();
  const getAnchorId = (project) => `project-${project.id}`;

  const sortProjects = (list) => {
    return [...list].sort((a, b) => {
      const featuredDelta = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (featuredDelta !== 0) return featuredDelta;
      const priorityDelta = (a.priority || 0) - (b.priority || 0);
      if (priorityDelta !== 0) return priorityDelta;
      return a.title.localeCompare(b.title);
    });
  };

  const uniqueSorted = (items) => {
    return [...new Set(items.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  };

  const buildFilters = () => {
    const categories = uniqueSorted(projects.map((project) => project.category));
    categoryList.innerHTML = "";
    ["All", ...categories].forEach((category) => {
      const item = document.createElement("li");
      item.className = category === state.category ? "filter-active" : "";
      item.setAttribute("data-value", category);
      item.textContent = category;
      categoryList.appendChild(item);
    });

    const tags = uniqueSorted(projects.flatMap((project) => project.tags || []));
    tagList.innerHTML = "";
    tags.forEach((tag) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-chip";
      button.textContent = tag;
      button.dataset.value = tag;
      button.setAttribute("aria-pressed", "false");
      tagList.appendChild(button);
    });
  };

  const createProjectCard = (project, { compact = false } = {}) => {
    const item = document.createElement("div");
    item.className = compact ? "featured-item" : "col-lg-4 col-md-6 portfolio-item";

    item.dataset.projectId = project.id;
    item.dataset.category = project.category;
    item.dataset.tags = (project.tags || []).join("|");
    item.dataset.featured = project.featured ? "true" : "false";

    if (!compact) {
      item.id = getAnchorId(project);
    }

    const card = document.createElement("div");
    card.className = "portfolio-card";

    const media = document.createElement("div");
    media.className = "portfolio-media";

    const img = document.createElement("img");
    img.src = project.thumbnail;
    img.alt = `${normalize(project.title)} thumbnail`;
    img.loading = "lazy";
    media.appendChild(img);

    const categoryBadge = document.createElement("span");
    categoryBadge.className = "portfolio-badge";
    categoryBadge.textContent = project.category;
    media.appendChild(categoryBadge);

    if (project.status) {
      const statusBadge = document.createElement("span");
      const statusClass = project.statusType ? project.statusType.toLowerCase().replace(/\\s+/g, "-") : "";
      statusBadge.className = `portfolio-badge status ${statusClass}`.trim();
      statusBadge.textContent = project.status;
      media.appendChild(statusBadge);
    }

    const body = document.createElement("div");
    body.className = "portfolio-body";

    const titleRow = document.createElement("div");
    titleRow.className = "portfolio-title-row";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const anchor = document.createElement("a");
    anchor.className = "portfolio-anchor";
    anchor.href = `#${getAnchorId(project)}`;
    anchor.textContent = "#";
    anchor.title = "Direct link to this project";
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      openDrawer(project.id, true);
    });

    titleRow.appendChild(title);
    titleRow.appendChild(anchor);

    const summary = document.createElement("p");
    summary.textContent = project.summary;

    const meta = document.createElement("div");
    meta.className = "portfolio-meta";
    meta.textContent = project.role ? `${project.role} · ${project.tools?.join(" / ") || ""}` : project.tools?.join(" / ") || "";

    const tags = document.createElement("div");
    tags.className = "portfolio-tags";
    (project.tags || []).forEach((tag) => {
      const chip = document.createElement("span");
      chip.className = "tag-chip";
      chip.textContent = tag;
      tags.appendChild(chip);
    });

    const actions = document.createElement("div");
    actions.className = "portfolio-actions";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "portfolio-cta";
    button.textContent = "View project";
    button.addEventListener("click", () => openDrawer(project.id, true));
    actions.appendChild(button);

    body.appendChild(titleRow);
    body.appendChild(summary);
    if (meta.textContent.trim()) {
      body.appendChild(meta);
    }
    if (tags.children.length) {
      body.appendChild(tags);
    }
    body.appendChild(actions);

    card.appendChild(media);
    card.appendChild(body);
    item.appendChild(card);
    return item;
  };

  const renderProjects = () => {
    projectList.innerHTML = "";

    const sortedProjects = sortProjects(projects.filter((project) => !project.featured));
    sortedProjects.forEach((project) => {
      const item = createProjectCard(project);
      projectList.appendChild(item);
    });

    renderFeatured();
    applyFilters();
    handleHash();
  };

  const renderFeatured = () => {
    if (!featuredList) return;
    featuredList.innerHTML = "";
    const featuredProjects = sortProjects(projects).filter((project) => project.featured);
    featuredProjects.forEach((project) => {
      const item = createProjectCard(project, { compact: true });
      featuredList.appendChild(item);
    });
  };

  const updateSummary = (visibleCount) => {
    if (!summaryEl) return;
    summaryEl.textContent = `Showing ${visibleCount} of ${projects.length} projects`;
  };

  const applyFilters = () => {
    const items = projectList.querySelectorAll("[data-project-id]");
    const featuredItems = featuredList ? featuredList.querySelectorAll("[data-project-id]") : [];
    let visibleCount = 0;
    let featuredVisible = 0;

    const applyToItem = (item) => {
      const categoryMatch = state.category === "All" || item.dataset.category === state.category;
      const tags = (item.dataset.tags || "").split("|").filter(Boolean);
      const tagMatch = state.tags.size === 0 || tags.some((tag) => state.tags.has(tag));
      const show = categoryMatch && tagMatch;
      item.classList.toggle("is-hidden", !show);
      return show;
    };

    items.forEach((item) => {
      if (applyToItem(item)) {
        visibleCount += 1;
      }
    });

    featuredItems.forEach((item) => {
      if (applyToItem(item)) {
        visibleCount += 1;
        featuredVisible += 1;
      }
    });

    if (featuredBlock) {
      featuredBlock.classList.toggle("is-hidden", featuredItems.length > 0 && featuredVisible === 0);
    }

    updateSummary(visibleCount);
  };

  const setCategory = (category) => {
    state.category = category;
    categoryList.querySelectorAll("li").forEach((item) => {
      item.classList.toggle("filter-active", item.dataset.value === category);
    });
    applyFilters();
  };

  const toggleTag = (tag) => {
    if (state.tags.has(tag)) {
      state.tags.delete(tag);
    } else {
      state.tags.add(tag);
    }
    tagList.querySelectorAll("button").forEach((button) => {
      const isActive = state.tags.has(button.dataset.value);
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    applyFilters();
  };

  const setHashForProject = (projectId) => {
    const anchor = `#${getAnchorId({ id: projectId })}`;
    if (window.location.hash !== anchor) {
      window.history.replaceState(null, "", anchor);
    }
  };

  const openDrawer = (projectId, updateHash = false) => {
    const drawer = document.getElementById("project-drawer");
    if (!drawer) return;

    const project = projects.find((entry) => entry.id === projectId);
    if (!project) return;

    if (updateHash) {
      setHashForProject(projectId);
    }

    drawer.querySelector("#drawer-title").textContent = project.title;
    drawer.querySelector("#drawer-summary").textContent = project.summary;

    const metaEl = drawer.querySelector("#drawer-meta");
    metaEl.innerHTML = "";
    if (project.status) {
      const status = document.createElement("div");
      status.textContent = `Status: ${project.status}`;
      metaEl.appendChild(status);
    }
    if (project.role) {
      const role = document.createElement("div");
      role.textContent = `Role: ${project.role}`;
      metaEl.appendChild(role);
    }
    if (project.tools?.length) {
      const tools = document.createElement("div");
      tools.textContent = `Tools: ${project.tools.join(", ")}`;
      metaEl.appendChild(tools);
    }
    if (project.platforms?.length) {
      const platforms = document.createElement("div");
      platforms.textContent = `Platforms: ${project.platforms.join(", ")}`;
      metaEl.appendChild(platforms);
    }

    const tagsEl = drawer.querySelector("#drawer-tags");
    tagsEl.innerHTML = "";
    (project.tags || []).forEach((tag) => {
      const chip = document.createElement("span");
      chip.className = "tag-chip";
      chip.textContent = tag;
      tagsEl.appendChild(chip);
    });

    const linksEl = drawer.querySelector("#drawer-links");
    linksEl.innerHTML = "";
    (project.links || []).forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.className = "drawer-link";
      anchor.textContent = link.label;
      linksEl.appendChild(anchor);
    });

    const swiperRoot = drawer.querySelector("#drawer-swiper");
    const swiperWrapper = drawer.querySelector("#drawer-swiper .swiper-wrapper");
    swiperWrapper.innerHTML = "";

    const mediaItems = project.media?.length ? project.media : [
      { type: "image", src: project.thumbnail, alt: project.title }
    ];

    mediaItems.forEach((media) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      if (media.type === "video") {
        const video = document.createElement("video");
        video.src = media.src;
        video.controls = true;
        video.preload = "metadata";
        video.playsInline = true;
        video.muted = true;
        if (media.poster) {
          video.poster = media.poster;
        }
        slide.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = media.src;
        img.alt = media.alt || project.title;
        img.loading = "lazy";
        slide.appendChild(img);
      }

      swiperWrapper.appendChild(slide);
    });

    if (drawerSwiper) {
      drawerSwiper.destroy(true, true);
    }

    if (typeof Swiper !== "undefined") {
      drawerSwiper = new Swiper(swiperRoot, {
        speed: 600,
        loop: mediaItems.length > 1,
        slidesPerView: 1,
        pagination: {
          el: drawer.querySelector(".swiper-pagination"),
          clickable: true
        },
        navigation: {
          nextEl: drawer.querySelector(".swiper-button-next"),
          prevEl: drawer.querySelector(".swiper-button-prev")
        }
      });
    }

    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
  };

  const closeDrawer = () => {
    const drawer = document.getElementById("project-drawer");
    if (!drawer) return;

    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");

    drawer.querySelectorAll("video").forEach((video) => {
      video.pause();
    });
  };

  const handleHash = () => {
    const rawHash = window.location.hash.replace("#", "").trim();
    if (!rawHash) return;
    const id = rawHash.startsWith("project-") ? rawHash.replace("project-", "") : rawHash;
    const project = projects.find((entry) => entry.id === id);
    if (!project) return;
    openDrawer(project.id, false);
    const anchor = document.getElementById(getAnchorId(project));
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const bindEvents = () => {
    categoryList.addEventListener("click", (event) => {
      const target = event.target.closest("li");
      if (!target) return;
      setCategory(target.dataset.value);
    });

    tagList.addEventListener("click", (event) => {
      const target = event.target.closest("button");
      if (!target) return;
      toggleTag(target.dataset.value);
    });

    const drawer = document.getElementById("project-drawer");
    if (drawer) {
      drawer.addEventListener("click", (event) => {
        if (event.target.matches("[data-close]")) {
          closeDrawer();
        }
      });
    }

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    });

    window.addEventListener("hashchange", handleHash);

    window.addEventListener("portfolio:filter", (event) => {
      if (!event.detail || !event.detail.category) return;
      setCategory(event.detail.category);
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  const init = async () => {
    try {
      const response = await fetch(PROJECTS_URL, { cache: "no-store" });
      projects = await response.json();
    } catch (error) {
      console.error("Failed to load projects.json", error);
      projects = [];
    }

    buildFilters();
    renderProjects();
    bindEvents();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
