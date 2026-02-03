(() => {
  const PROJECTS_URL = "assets/data/projects.json";

  const portfolioSection = document.querySelector("#portfolio");
  const projectList = document.querySelector("#project-list");
  const featuredList = document.querySelector("#featured-projects");
  const featuredSwiperRoot = document.querySelector("#featured-swiper");
  const categoryList = document.querySelector("#portfolio-flters");
  const summaryEl = document.querySelector("#portfolio-summary");
  const loadMoreButton = document.querySelector("#portfolio-load-more");

  if (!projectList || !categoryList) {
    return;
  }

  const PAGE_SIZE = 6;

  const state = {
    category: "All",
    visibleLimit: PAGE_SIZE
  };

  let projects = [];
  let drawerSwiper = null;
  let featuredSwiper = null;
  let drawerResizeAttached = false;

  const getDrawerMaxHeight = () => {
    const ratio = window.innerWidth <= 992 ? 0.6 : 0.7;
    return Math.max(240, Math.round(window.innerHeight * ratio));
  };

  const fitDrawerFrame = (frame, width, height) => {
    if (!frame || !width || !height) return;
    const drawer = document.getElementById("project-drawer");
    if (!drawer) return;
    const mediaColumn = drawer.querySelector(".drawer-media");
    if (!mediaColumn) return;
    const maxWidth = mediaColumn.clientWidth || frame.parentElement?.clientWidth || width;
    const maxHeight = getDrawerMaxHeight();
    const scale = Math.min(maxWidth / width, maxHeight / height, 1);
    frame.style.width = `${Math.max(1, Math.floor(width * scale))}px`;
    frame.style.height = `${Math.max(1, Math.floor(height * scale))}px`;
  };

  const resizeDrawerMedia = () => {
    const drawer = document.getElementById("project-drawer");
    if (!drawer || drawer.getAttribute("aria-hidden") !== "false") return;
    const frames = drawer.querySelectorAll(".drawer-media-frame[data-media-width]");
    frames.forEach((frame) => {
      const width = Number(frame.dataset.mediaWidth);
      const height = Number(frame.dataset.mediaHeight);
      if (width && height) {
        fitDrawerFrame(frame, width, height);
      }
    });
    if (drawerSwiper && typeof drawerSwiper.updateAutoHeight === "function") {
      drawerSwiper.updateAutoHeight(200);
    }
  };

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
    const categories = uniqueSorted(projects.flatMap((project) => (
      Array.isArray(project.category) ? project.category : [project.category]
    )));
    categoryList.innerHTML = "";
    ["All", ...categories].forEach((category) => {
      const item = document.createElement("li");
      item.className = category === state.category ? "filter-active" : "";
      item.setAttribute("data-value", category);
      item.textContent = category;
      categoryList.appendChild(item);
    });
  };

  const createProjectCard = (project, { compact = false } = {}) => {
    const item = document.createElement("div");
    item.className = compact ? "featured-item swiper-slide" : "col-lg-4 col-md-6 portfolio-item";

    item.dataset.projectId = project.id;
    const categoryValues = Array.isArray(project.category) ? project.category : [project.category];
    item.dataset.category = categoryValues.join("|");
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
    categoryBadge.textContent = categoryValues.join(" • ");
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
    body.appendChild(actions);

    card.appendChild(media);
    card.appendChild(body);
    item.appendChild(card);
    return item;
  };

  const renderProjects = () => {
    projectList.innerHTML = "";

    const sortedProjects = sortProjects(projects);
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

    if (featuredSwiper) {
      featuredSwiper.destroy(true, true);
      featuredSwiper = null;
    }

    if (typeof Swiper !== "undefined" && featuredSwiperRoot) {
      featuredSwiper = new Swiper(featuredSwiperRoot, {
        speed: 700,
        loop: featuredProjects.length > 2,
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 18,
        autoplay: {
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        grabCursor: true,
        breakpoints: {
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          768: { slidesPerView: 2, slidesPerGroup: 1 }
        },
        pagination: {
          el: featuredSwiperRoot.querySelector(".swiper-pagination"),
          clickable: true
        },
        navigation: {
          nextEl: featuredSwiperRoot.querySelector(".swiper-button-next"),
          prevEl: featuredSwiperRoot.querySelector(".swiper-button-prev")
        }
      });
    }
  };

  const updateSummary = (visibleCount, filteredCount) => {
    if (!summaryEl) return;
    summaryEl.textContent = `Showing ${visibleCount} of ${filteredCount} projects`;
  };

  const applyFilters = () => {
    const items = Array.from(projectList.querySelectorAll("[data-project-id]"));
    const matching = items.filter((item) => {
      const categories = (item.dataset.category || "").split("|");
      return state.category === "All" || categories.includes(state.category);
    });
    const filteredCount = matching.length;
    let visibleCount = 0;

    items.forEach((item) => {
      item.classList.add("is-hidden");
    });

    matching.forEach((item, index) => {
      const show = index < state.visibleLimit;
      item.classList.toggle("is-hidden", !show);
      if (show) {
        visibleCount += 1;
      }
    });

    updateSummary(visibleCount, filteredCount);

    if (loadMoreButton) {
      loadMoreButton.classList.toggle("is-hidden", visibleCount >= filteredCount);
    }
  };

  const setCategory = (category) => {
    state.category = category;
    state.visibleLimit = PAGE_SIZE;
    categoryList.querySelectorAll("li").forEach((item) => {
      item.classList.toggle("filter-active", item.dataset.value === category);
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

    const detailsEl = drawer.querySelector("#drawer-details");
    if (detailsEl) {
      detailsEl.innerHTML = "";
      if (project.details && project.details.length) {
        const list = document.createElement("ul");
        list.className = "drawer-list";
        project.details.forEach((detail) => {
          const item = document.createElement("li");
          item.textContent = detail;
          list.appendChild(item);
        });
        detailsEl.appendChild(list);
      }
    }

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

    const updateDrawerHeight = () => {
      resizeDrawerMedia();
    };

    const mediaItems = project.media?.length ? project.media : [
      { type: "image", src: project.thumbnail, alt: project.title }
    ];

    mediaItems.forEach((media) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      const frame = document.createElement("div");
      frame.className = "drawer-media-frame";

      if (media.type === "video") {
        const video = document.createElement("video");
        video.src = media.src;
        video.controls = true;
        video.preload = "metadata";
        video.playsInline = true;
        if (project.id === "xr-concepts") {
          video.muted = true;
          video.autoplay = true;
        }
        if (media.poster) {
          video.poster = media.poster;
        }
        const registerVideoFrame = () => {
          const width = video.videoWidth || video.clientWidth;
          const height = video.videoHeight || video.clientHeight;
          if (width && height) {
            frame.dataset.mediaWidth = width;
            frame.dataset.mediaHeight = height;
            fitDrawerFrame(frame, width, height);
            updateDrawerHeight();
          }
        };
        video.addEventListener("loadedmetadata", registerVideoFrame);
        video.addEventListener("loadeddata", updateDrawerHeight);
        if (video.readyState >= 1) {
          registerVideoFrame();
        }
        video.load();

        frame.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = media.src;
        img.alt = media.alt || project.title;
        img.loading = "eager";
        img.decoding = "async";
        const registerImageFrame = () => {
          const width = img.naturalWidth || img.width;
          const height = img.naturalHeight || img.height;
          if (width && height) {
            frame.dataset.mediaWidth = width;
            frame.dataset.mediaHeight = height;
            fitDrawerFrame(frame, width, height);
            updateDrawerHeight();
          }
        };
        img.addEventListener("load", registerImageFrame);
        if (img.complete) {
          registerImageFrame();
        }
        frame.appendChild(img);
      }

      slide.appendChild(frame);
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
        autoHeight: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: drawer.querySelector(".swiper-pagination"),
          clickable: true
        },
        navigation: {
          nextEl: drawer.querySelector(".swiper-button-next"),
          prevEl: drawer.querySelector(".swiper-button-prev")
        }
      });
      drawerSwiper.on("slideChangeTransitionEnd", updateDrawerHeight);
      drawerSwiper.on("slideChange", resizeDrawerMedia);
      requestAnimationFrame(resizeDrawerMedia);
    }

    if (project.id === "xr-concepts") {
      const videos = Array.from(swiperRoot.querySelectorAll("video"));
      const playActiveVideo = () => {
        videos.forEach((video) => video.pause());
        const activeSlide = swiperRoot.querySelector(".swiper-slide-active");
        const activeVideo = activeSlide ? activeSlide.querySelector("video") : null;
        if (activeVideo) {
          activeVideo.play().catch(() => {});
        }
      };

      if (drawerSwiper) {
        drawerSwiper.on("slideChange", playActiveVideo);
        requestAnimationFrame(playActiveVideo);
      } else {
        playActiveVideo();
      }
    }

    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
    if (!drawerResizeAttached) {
      window.addEventListener("resize", resizeDrawerMedia);
      drawerResizeAttached = true;
    }
    requestAnimationFrame(resizeDrawerMedia);
  };

  const closeDrawer = () => {
    const drawer = document.getElementById("project-drawer");
    if (!drawer) return;

    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");

    drawer.querySelectorAll("video").forEach((video) => {
      video.pause();
    });

    if (window.location.hash.startsWith("#project-")) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
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

    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", () => {
        state.visibleLimit += PAGE_SIZE;
        applyFilters();
      });
    }

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
