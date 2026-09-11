// Portfolio profile refresh: keep public positioning aligned with current, verified work.
(() => {
  const originalFetch = window.fetch.bind(window);

  const eMindProject = {
    id: "emind",
    title: "eMind / AR Studio",
    category: ["Web Development", "XR"],
    platforms: ["Web", "WebAR", "XR"],
    thumbnail: "https://emind.si/assets/brand/emind-logo-512.png",
    summary: "Live AI/XR learning platform with a browser-based AR authoring studio for face, image, and world tracking; already used in my courses and currently in beta / early access.",
    status: "Live / AR Studio Beta",
    statusType: "live",
    role: "Sole human product owner, designer, and technical architect; AI-assisted implementation with Codex",
    tools: ["React 19", "Node.js", "Express", "MySQL", "Three.js", "MediaPipe", "IndexedDB", "Playwright", "GitHub Actions"],
    tags: ["Flagship", "EdTech", "WebAR", "Full Stack"],
    links: [
      { label: "Live platform", url: "https://emind.si" }
    ],
    media: [
      { type: "image", src: "https://emind.si/assets/brand/emind-logo-512.png", alt: "eMind learning platform" }
    ],
    featured: true,
    priority: 1,
    details: [
      "Purpose: Built for secondary-school and business-training learners to make AI/XR concepts easier to understand and apply in practice.",
      "AR Studio: Custom Three.js authoring environment with GLB/image/audio assets, scene editing, face tracking via MediaPipe, image tracking, and a WebXR/world-tracking path.",
      "Runtime: Designed a behavior system with events, ordered actions, variables, conditions, if/else, repetition, timers, thresholds, cooldowns, cancellation, and bounded execution.",
      "Engineering ownership: Researched and selected the architecture, defined product behavior, reviewed source code, tested iterative builds, handled privacy/security-sensitive implementation, and owned deployment/operations. Codex generated much of the implementation under my direction.",
      "Delivery: Deployed to emind.si with GitHub Actions/cPanel workflows, database migrations, health/readiness checks, and extensive automated testing. Real-device AR qualification remains intentionally separate from browser/synthetic test coverage."
    ]
  };

  const refreshRyftRealm = (project) => ({
    ...project,
    category: "Mobile Games",
    platforms: ["Android", "iOS", "Mobile"],
    summary: "Step-driven cozy mobile game where real-world walking becomes progression in a persistent virtual realm. The rebuilt MVP is complete and demoable on Android and iOS, with UI polish still in progress.",
    status: "MVP · Internal Testing",
    statusType: "in-development",
    role: "Sole creator and developer - product design, Unity/C# systems, UX, economy, art direction, testing, and validation",
    tools: ["Unity", "C#", "StepTracker Pro", "PlayerPrefs", "JSON", "ScriptableObjects", "Addressables", "AssetBundles"],
    tags: ["Flagship", "Mobile", "Founder", "MVP"],
    details: [
      "Product: Designed the core loop, progression, economy, world/tile systems, home decoration, pets, rewards, and step-based motivation model.",
      "Architecture: Offline-first mobile gameplay with local persistence via PlayerPrefs, JSON/files, and serialized ScriptableObjects; network use is limited to asset delivery through Addressables/AssetBundles.",
      "Development: I built the core/base implementation directly; Codex is now used mainly for polish and optimization.",
      "Validation: Rebuilt the March 2026 proof of concept after a 233-response international concept survey, mentor/expert feedback, competitor analysis, technical testing, user playtesting, and Social Impact Award feedback.",
      "Recognition: Social Impact Award Slovenia 2026 finalist and POPRI 2026 finalist."
    ],
    links: [
      { label: "Website", url: "https://ryftrealm.com" },
      { label: "TikTok Devlog", url: "https://www.tiktok.com/@hornbeam_studio?lang=en" },
      { label: "Instagram Devlog", url: "https://www.instagram.com/hornbeam.studio/" }
    ]
  });

  const refreshTouristGuide = (project) => ({
    ...project,
    summary: "2020 bachelor-thesis prototype: a GPS/location-based Android AR heritage guide that streamed remotely managed 3D reconstructions to their real-world locations.",
    status: "Academic Prototype (2020)",
    statusType: "archived",
    role: "Sole developer - research, Unity/C#, backend/API/database, geospatial logic, and 3D reconstruction",
    tools: ["Unity", "C#", "AR Foundation", "ARCore", "PHP", "MySQL", "JSON", "OBJ Runtime Loading"],
    tags: ["Heritage", "Geospatial AR", "Thesis"],
    details: [
      "Built an end-to-end location-aware AR content system, not only an AR scene: browser admin tools, PHP/MySQL backend, JSON interfaces, runtime OBJ/PNG delivery, and geographic placement.",
      "Personally reconstructed the Church of St. Michael in Družmirje from historical photographs/postcards and optimized it to roughly 2,540 polygons for mobile delivery.",
      "Measured GPS placement at approximately 2–5 m in good conditions and 10–20 m in poor conditions; best-case tests loaded up to 10 church-model instances in under one second.",
      "The thesis explicitly documented limitations and proposed improvements rather than presenting the prototype as a production-scale consumer platform."
    ]
  });

  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const requestedUrl = String(args[0] || "");
    if (!requestedUrl.includes("assets/data/projects.json")) return response;

    try {
      const projects = await response.clone().json();
      const refreshed = projects.map((project) => {
        if (project.id === "ryftrealm") return refreshRyftRealm(project);
        if (project.id === "ar-tourist-guide") return refreshTouristGuide(project);
        return project;
      });

      if (!refreshed.some((project) => project.id === "emind")) {
        refreshed.push(eMindProject);
      }

      return new Response(JSON.stringify(refreshed), {
        status: response.status,
        statusText: response.statusText,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.warn("Portfolio profile refresh could not transform project data", error);
      return response;
    }
  };

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };

  setText(".nav-role", "Unity/XR & Product Engineer | EdTech Builder");
  setText(".hero-tagline", "Unity / XR · Product Engineering · EdTech");
  setText(".hero-title", "I build immersive and interactive products from working prototype to real use.");
  setText(".hero-subtitle", "My work spans Unity/XR, full-stack learning products, and mobile product development — from networked Meta Quest experiences to eMind AR Studio and the cross-platform RyftRealm MVP.");
  setText(".featured-header p", "Selected work across XR, WebAR, mobile products, and learning technology — with clear ownership, implementation scope, and current status.");
  setText("#about .section-title h2", "XR Engineer, Software Builder, and Technical Educator");
  setText("#about .section-title p", "I am Aleš Spital, an M.Sc. in Computer Science working across Unity/XR, software products, and technical education.");

  const aboutHeading = document.querySelector(".about-panel h3");
  if (aboutHeading) aboutHeading.textContent = "Engineering shaped by real teaching and product use";

  const aboutParagraphs = document.querySelectorAll(".about-panel > p");
  if (aboutParagraphs[0]) {
    aboutParagraphs[0].textContent = "I build interaction-heavy products where technical execution and usability have to work together. My recent work ranges from multiplayer Meta Quest learning experiences to eMind, a live full-stack AI/XR learning platform with a browser-based AR authoring studio.";
  }
  if (aboutParagraphs[1]) {
    aboutParagraphs[1].textContent = "My teaching background gives me a practical testing ground for product ideas: I can identify where learners struggle, turn those needs into software, and iterate against real use rather than designing only from assumptions.";
  }

  const aboutItems = document.querySelectorAll(".about-item p");
  if (aboutItems[0]) aboutItems[0].textContent = "Unity/C# XR systems, WebAR authoring tools, full-stack learning products, and cross-platform mobile prototypes.";
  if (aboutItems[1]) aboutItems[1].textContent = "Research the problem, choose the architecture, build or direct implementation, inspect the code, test repeatedly, and iterate until the behavior matches the intended product.";
  if (aboutItems[2]) aboutItems[2].textContent = "Products that make complex systems easier to learn, use, demonstrate, and validate with real people.";

  const metrics = document.querySelectorAll(".hero-metric");
  if (metrics[0]) metrics[0].innerHTML = "<strong>2020</strong><span>AR/XR work since</span>";
  if (metrics[1]) metrics[1].innerHTML = "<strong>2×</strong><span>2026 finalist</span>";
  if (metrics[2]) metrics[2].innerHTML = "<strong>iOS + Android</strong><span>RyftRealm MVP</span>";
  if (metrics[3]) metrics[3].innerHTML = "<strong>Live</strong><span>eMind platform</span>";
})();

var jobs = [
  {
    Title: "Product & Web Delivery",
    Years: "",
    Desc: "",
    Points: [
      "Delivered websites, e-commerce features, custom workflow tools, and learning products across JavaScript/Node, PHP, SQL, and related web stacks."
    ]
  },
  {
    Title: "AI-Assisted Engineering Workflow",
    Years: "",
    Desc: "",
    Points: [
      "Use AI coding tools as implementation accelerators while retaining responsibility for architecture, specifications, source-level review, testing, privacy-sensitive work, deployment, and final acceptance."
    ]
  },
  {
    Title: "Creative Production Pipeline",
    Years: "",
    Desc: "",
    Points: [
      "Produce visual and motion assets in Cinema 4D, Photoshop, and DaVinci Resolve to support product prototyping and communication."
    ]
  }
];

for (let i = 0; i < jobs.length; i++) {
  let content = '<div class="resume-item tilt-card">';
  content += '<h4>' + jobs[i].Title + '</h4>';
  if (jobs[i].Years !== "") content += '<h5>' + jobs[i].Years + '</h5>';
  if (jobs[i].Desc !== "") content += '<p><em>' + jobs[i].Desc + '</em></p>';
  content += '<ul>';
  for (let j = 0; j < jobs[i].Points.length; j++) {
    if (jobs[i].Points[j] !== "") content += '<li>' + jobs[i].Points[j] + '</li>';
  }
  content += '</ul></div>';
  $("#other-list").append(content);
}
