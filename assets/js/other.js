// Portfolio profile refresh: keep public positioning aligned with current, verified work.
(() => {
  const originalFetch = window.fetch.bind(window);

  const eMindProject = {
    id: "emind",
    title: "eMind / AR Studio",
    category: ["Web Development", "XR"],
    platforms: ["Web", "WebAR", "XR"],
    thumbnail: "https://emind.si/assets/brand/emind-logo-512.png",
    summary: "Live AI/XR learning platform with a browser-based AR authoring studio for face, image, and world tracking. AR Studio is in beta / early access and already used in my teaching.",
    status: "Live · AR Studio Beta",
    statusType: "live",
    role: "Sole human product owner, designer, and technical architect · AI-assisted implementation",
    tools: ["React 19", "Node.js", "Express", "MySQL", "Three.js", "MediaPipe", "IndexedDB", "Vitest", "Playwright", "GitHub Actions"],
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
      "AR Studio: Custom Three.js authoring environment with GLB/image/audio assets, scene editing, MediaPipe face tracking, image tracking, and a WebXR/world-tracking path.",
      "Runtime: Designed a behavior system with events, ordered actions, variables, conditions, if/else, repetition, timers, thresholds, cooldowns, cancellation, and bounded execution.",
      "Ownership: I researched and selected the architecture, defined product behavior, reviewed source code, tested iterative builds, handled privacy/security-sensitive implementation, and owned deployment/operations. Codex generated much of the implementation under my direction.",
      "Verification: At a documented stage the full platform exceeded 1,200 passing automated tests with one existing skip; real-device AR qualification is tracked separately from browser/synthetic coverage."
    ]
  };

  const refreshArnet = (project) => ({
    ...project,
    platforms: ["Android", "AR"],
    summary: "Published Android AR network simulator and 2024 master's-thesis project for learning topology, IPv4 configuration, routing, and packet flow through hands-on spatial exercises.",
    role: "Sole Unity/C# developer, researcher, and educator",
    tools: ["Unity", "C#", "AR Foundation", "ARCore", "Android"],
    tags: ["Education", "Flagship", "Google Play", "Master's Thesis"],
    details: [
      "Problem: Networking concepts can stay abstract when learners only see diagrams and configuration examples.",
      "Build: Created an AR topology builder and network simulation workflow where learners place devices, connect them, configure IPv4 settings, and test communication paths.",
      "Evidence: My 2024 master's thesis evaluated the AR learning approach with students against traditional learning methods.",
      "Delivery: Published on Google Play and still maintained; the current app supports 10 languages and explicitly documents the limits of its foundational network simulation scope."
    ]
  });

  const refreshRyftRealm = (project) => ({
    ...project,
    category: "Mobile Games",
    platforms: ["Android", "iOS", "Mobile"],
    summary: "Step-driven cozy mobile game where real-world walking becomes progression in a persistent virtual realm. The rebuilt MVP is complete and demoable on Android and iOS, with UI polish still in progress.",
    status: "MVP · Internal Testing",
    statusType: "in-development",
    role: "Sole creator and developer · product design, Unity/C# systems, UX, economy, art direction, testing, and validation",
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
    role: "Sole developer · research, Unity/C#, backend/API/database, geospatial logic, and 3D reconstruction",
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
        if (project.id === "arnet") return refreshArnet(project);
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

  setText(".nav-role", "Unity/XR & Software Engineer | EdTech Product Builder");
  setText(".hero-tagline", "Unity / XR · Software Products · EdTech");
  setText(".hero-title", "I build XR and learning products from prototype to real use.");
  setText(".hero-subtitle", "M.Sc. in Computer Science with 5+ years of production JavaScript experience, Unity/XR work dating to 2020, and 1,000+ learners taught or trained across schools and professional education.");
  setText(".featured-header p", "Selected work across XR, WebAR, mobile products, and learning technology — with clear ownership, evidence, and current status.");
  setText("#about .section-title h2", "XR Engineer, Software Builder, and Technical Educator");
  setText("#about .section-title p", "I am Aleš Spital, an M.Sc. in Computer Science working across Unity/XR, software products, and technical education.");
  setText("#skills .section-title p", "A practical stack spanning Unity/XR, full-stack product engineering, testing, deployment, and learning-focused UX.");
  setText("#resume .section-title p", "Production software, XR delivery, teaching, and product work — with scope and ownership stated directly rather than inflated through titles or vanity metrics.");
  setText("#contact .section-title p", "Open to Unity/XR, immersive learning, EdTech, technical-training, and software product work. Based in Slovenia and available for international collaboration.");

  const heroButtons = document.querySelectorAll(".hero-actions a");
  if (heroButtons[0]) heroButtons[0].textContent = "View Selected Work";
  if (heroButtons[1]) heroButtons[1].textContent = "Contact";

  const heroSignals = document.querySelectorAll(".hero-list li");
  if (heroSignals[0]) heroSignals[0].textContent = "Unity/C# XR delivery across Meta Quest, mobile AR, simulations, and multiplayer interaction.";
  if (heroSignals[1]) heroSignals[1].textContent = "Full-stack/WebAR engineering with React, Node/Express, MySQL, Three.js, MediaPipe, automated testing, and CI/CD.";
  if (heroSignals[2]) heroSignals[2].textContent = "Sole product ownership on eMind and RyftRealm: architecture, implementation decisions, testing, deployment, and iteration.";
  if (heroSignals[3]) heroSignals[3].textContent = "2026 finalist with RyftRealm: Social Impact Award Slovenia and POPRI.";

  const aboutHeading = document.querySelector(".about-panel h3");
  if (aboutHeading) aboutHeading.textContent = "Engineering shaped by real teaching and product use";

  const aboutParagraphs = document.querySelectorAll(".about-panel > p");
  if (aboutParagraphs[0]) {
    aboutParagraphs[0].textContent = "I build interaction-heavy products where technical execution and usability have to work together. Recent work ranges from multiplayer Meta Quest learning experiences to eMind, a live full-stack AI/XR learning platform with a browser-based AR authoring studio.";
  }
  if (aboutParagraphs[1]) {
    aboutParagraphs[1].textContent = "Teaching and training more than 1,000 learners has given me a practical testing ground for product ideas: I see where people struggle, turn those needs into software, and iterate against real use rather than designing only from assumptions.";
  }

  const aboutItems = document.querySelectorAll(".about-item p");
  if (aboutItems[0]) aboutItems[0].textContent = "Unity/C# XR systems, WebAR authoring tools, full-stack learning products, and cross-platform mobile prototypes.";
  if (aboutItems[1]) aboutItems[1].textContent = "Research the problem, choose the architecture, build or direct implementation, inspect the code, test repeatedly, and iterate until the behavior matches the intended product.";
  if (aboutItems[2]) aboutItems[2].textContent = "Products that make complex systems easier to learn, use, demonstrate, and validate with real people.";

  const metrics = document.querySelectorAll(".hero-metric");
  if (metrics[0]) metrics[0].innerHTML = "<strong>1,000+</strong><span>Learners taught / trained</span>";
  if (metrics[1]) metrics[1].innerHTML = "<strong>5+ yrs</strong><span>Production JavaScript</span>";
  if (metrics[2]) metrics[2].innerHTML = "<strong>Since 2020</strong><span>AR / XR development</span>";
  if (metrics[3]) metrics[3].innerHTML = "<strong>2× Finalist</strong><span>SIA + POPRI 2026</span>";

  const contactCards = document.querySelectorAll("#contact .contact-card");
  const introCard = contactCards[contactCards.length - 1];
  if (introCard) {
    const heading = introCard.querySelector("h4");
    const copy = introCard.querySelector("p");
    if (heading) heading.textContent = "Request Intro Call";
    if (copy) copy.textContent = "Email to arrange a time";
  }
})();

var jobs = [
  {
    Title: "Selected Earlier Interactive Work",
    Years: "",
    Desc: "",
    Points: [
      "Built interactive Unity work beyond the flagship case studies, including the ClearSpace Unity/Kinect space-debris experience for Center Noordung and multiple Android games released on Google Play."
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
    Title: "Creative Production",
    Years: "",
    Desc: "",
    Points: [
      "Create and adapt visual, 3D, and motion assets in Cinema 4D, Photoshop, and DaVinci Resolve to support prototypes, demos, and product communication."
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
