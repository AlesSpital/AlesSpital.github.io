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
    tags: ["Flagship", "EdTech", "WebAR", "Full Stack", "Private Repo"],
    links: [
      { label: "Live platform", url: "https://emind.si" }
    ],
    media: [
      { type: "image", src: "https://emind.si/assets/brand/emind-logo-512.png", alt: "eMind learning platform" }
    ],
    featured: true,
    priority: 1,
    details: [
      "Problem: I wanted learners in secondary-school and business-training settings to understand AI/XR concepts faster and apply them through practical tools rather than passive explanations.",
      "Build: Designed a full learning platform plus a custom Three.js AR authoring environment with GLB/image/audio assets, scene editing, MediaPipe face tracking, image tracking, and a WebXR/world-tracking path.",
      "Runtime architecture: Created a behavior system with events, ordered actions, variables, conditions, if/else, repetition, timers, thresholds, cooldowns, cancellation, and bounded execution.",
      "Ownership: I researched and selected the architecture, defined product behavior, reviewed source code, tested iterative builds, handled privacy/security-sensitive implementation, and owned deployment/operations. Codex generated much of the implementation under my direction.",
      "Evidence: Deployed at emind.si and already used with learners in my Practical AI course and AR Studio. At a documented stage the full platform exceeded 1,200 passing automated tests with one existing skip; real-device AR qualification is tracked separately from browser/synthetic coverage.",
      "Source note: The production repository is private, so this case study intentionally exposes architecture, ownership, and verification without publishing private code."
    ]
  };

  const refreshArnet = (project) => ({
    ...project,
    platforms: ["Android", "AR"],
    summary: "Published Android AR network simulator and 2024 master's-thesis project for learning topology, IPv4 configuration, routing, and packet flow through hands-on spatial exercises.",
    role: "Sole Unity/C# developer, researcher, and educator",
    tools: ["Unity", "C#", "AR Foundation", "ARCore", "Android"],
    tags: ["Education", "Flagship", "Google Play", "Master's Thesis"],
    featured: true,
    priority: 3,
    details: [
      "Problem: Networking concepts can remain abstract when learners only see diagrams and configuration examples.",
      "Build: Created an AR topology builder and network simulation workflow where learners place devices, connect them, configure IPv4 settings, and test communication paths.",
      "Evidence: My 2024 master's thesis evaluated the AR learning approach with students against traditional learning methods.",
      "Delivery: Published on Google Play and maintained as a real Android application rather than only a thesis demo."
    ]
  });

  const refreshVr4ll = (project) => ({
    ...project,
    featured: true,
    priority: 2,
    summary: "Multiplayer Meta Quest language-learning experience where I delivered synchronized interaction, grab networking, environment work, and quest-based practice for real immersive sessions.",
    role: "Unity XR developer · multiplayer interaction, grab sync, environments, and quest development",
    details: [
      "Context: VR4LL 2.0 is an externally delivered language-learning XR project for Meta Quest.",
      "My contribution: Implemented multi-user interaction synchronization, object-grab synchronization, environment work, and quest-based lesson progression in Unity/C#.",
      "Engineering focus: Worked within standalone-VR constraints where interaction reliability, usability, and performance all affect the learning session.",
      "Why it matters: Provides third-party evidence that my XR work extends beyond self-directed prototypes into collaborative delivery."
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
    tags: ["Flagship", "Mobile", "Founder", "MVP", "SIA Finalist", "POPRI Finalist"],
    featured: true,
    priority: 4,
    details: [
      "Problem: Activity trackers often record behavior without creating a strong reason to come back; RyftRealm tests whether walking can feel like meaningful game progression.",
      "Build: Designed the core loop, progression, economy, world/tile systems, home decoration, pets, rewards, and step-based motivation model.",
      "Architecture: Offline-first mobile gameplay with local persistence via PlayerPrefs, JSON/files, and serialized ScriptableObjects; network use is limited to asset delivery through Addressables/AssetBundles.",
      "Development: I built the core/base implementation directly; Codex is now used mainly for polish and optimization.",
      "Validation: Rebuilt the March 2026 proof of concept after a 233-response international concept survey, mentor/expert feedback, competitor analysis, technical testing, user playtesting, and Social Impact Award feedback.",
      "Current status: Complete and demoable MVP on Android and iOS, both in internal testing; current external testing of the rebuilt version is still early.",
      "Recognition: Social Impact Award Slovenia 2026 finalist and POPRI 2026 finalist."
    ],
    links: [
      { label: "Website", url: "https://ryftrealm.com" },
      { label: "SIA Slovenia", url: "https://slovenia.socialimpactaward.net/" },
      { label: "POPRI finalist showcase", url: "https://popri.si/naj-poslovni-model/" },
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
    tags: ["Heritage", "Geospatial AR", "Thesis", "Flagship"],
    featured: true,
    priority: 5,
    details: [
      "Problem: Cultural-heritage sites that disappeared or changed are difficult to experience in context once the physical object is gone.",
      "Build: Created an end-to-end location-aware AR content system: browser admin tools, PHP/MySQL backend, JSON interfaces, runtime OBJ/PNG delivery, and geographic placement on Android.",
      "3D pipeline: Personally reconstructed the Church of St. Michael in Družmirje from historical photographs/postcards and optimized it to roughly 2,540 polygons for mobile delivery.",
      "Measured results: GPS placement was approximately 2–5 m in good conditions and 10–20 m in poor conditions; best-case tests loaded up to 10 church-model instances in under one second.",
      "Scope: A substantial working academic prototype with platform-like architecture, not a production-scale consumer platform."
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
        if (project.id === "vr4ll-2") return refreshVr4ll(project);
        if (project.id === "ryftrealm") return refreshRyftRealm(project);
        if (project.id === "ar-tourist-guide") return refreshTouristGuide(project);
        if (project.id === "xr-concepts") return { ...project, featured: false };
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

  setText(".browse-header h3", "More Work");
  setText(".browse-header p", "Earlier releases, web work, game prototypes, 3D/motion studies, and supporting projects.");
  setText("#contact .section-title p", "Open to Unity/XR, immersive learning, EdTech, technical-training, and software product work. Based in Slovenia and available for international collaboration.");
})();

var jobs = [
  {
    Title: "Selected Earlier Interactive Work",
    Years: "",
    Desc: "",
    Points: [
      "ClearSpace — Center Noordung: Unity + Kinect interactive experience focused on space debris.",
      "Multiverse Kaitenzushi — Canada: immersive Japanese-language learning through passthrough play.",
      "Earlier Android game work includes multiple Unity/C# releases published on Google Play."
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
