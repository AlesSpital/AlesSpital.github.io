// Portfolio profile refresh: keep public positioning aligned with current, verified work.
(() => {
  const originalFetch = window.fetch.bind(window);

  const eMindProject = {
    id: "emind",
    title: "eMind / AR Studio",
    category: ["Web Development", "XR"],
    platforms: ["Web", "WebAR", "XR"],
    thumbnail: "https://emind.si/assets/xr/ar-studio/intro-hero.webp",
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
      { type: "image", src: "https://emind.si/assets/xr/ar-studio/intro-hero.webp", alt: "eMind AR Studio introduction" },
      { type: "image", src: "https://emind.si/assets/xr/ar-studio/mode-face.webp", alt: "eMind AR Studio face-tracking mode" },
      { type: "image", src: "https://emind.si/assets/xr/ar-studio/mode-image.webp", alt: "eMind AR Studio image-tracking mode" },
      { type: "image", src: "https://emind.si/assets/xr/ar-studio/mode-space.webp", alt: "eMind AR Studio world and space tracking mode" }
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

  const multiverseProject = {
    id: "multiverse-kaitenzushi",
    title: "Multiverse Kaitenzushi",
    category: "XR",
    platforms: ["Meta Quest 3", "Mixed Reality", "XR"],
    thumbnail: "https://cdn.sidequestvr.com/file/3151009/491822723_2074996513251488_8847006516908403311_n.webp?size=1000",
    summary: "Mixed-reality Japanese-learning game for Meta Quest where I currently develop major Unity systems, tooling, optimization, and production workflows while coordinating a 10-person multidisciplinary team.",
    status: "Early Access",
    statusType: "live",
    role: "Unity/XR developer · major features, tooling, optimization, and team coordination since Mar 2026",
    tools: ["Unity", "C#", "Quest 3", "ScriptableObjects", "Custom Editors", "JSON", "Object Pooling", "Profiler"],
    tags: ["Flagship", "Client Work", "Mixed Reality", "EdTech", "Quest 3"],
    links: [
      { label: "Kore Meta", url: "https://www.koremeta.com" },
      { label: "SideQuest", url: "https://sidequestvr.com/app/47323/multiverse-kaitenzushi-learn-japanese-alphabet" },
      { label: "ShapesXR case study", url: "https://www.shapesxr.com/case-studies/how-kore-meta-used-shapesxr-to-design-spatial-gameplay-for-multiverse-kaitenzushi" }
    ],
    media: [
      { type: "image", src: "https://cdn.sidequestvr.com/file/3151009/491822723_2074996513251488_8847006516908403311_n.webp?size=1000", alt: "Multiverse Kaitenzushi mixed-reality Japanese learning game" }
    ],
    featured: true,
    priority: 2,
    details: [
      "Product context: A mixed-reality Japanese alphabet learning game in Early Access for Meta Quest. The original project predates my involvement; my work began in March 2026.",
      "Engineering scope: Implement major gameplay features and workflows, fix bugs, and improve maintainability across the Unity project.",
      "Tooling: Built data-oriented content workflows using ScriptableObjects, custom inspectors/editor windows, JSON/configuration, reusable prefabs, and custom editor tools.",
      "Gameplay systems: Worked on conveyor/customer flows, 3D characters with 2D face animation, tip windows, lists/grids, and drag-and-drop UI interactions.",
      "Performance: Optimize for Quest 3 through object pooling, shader and draw-call reduction, profiler-driven work, and runtime cleanup with a 72 FPS target.",
      "Team coordination: Coordinate a 10-person multidisciplinary team across tasks, meetings, technical direction, mentoring/reviews, cross-discipline coordination, and reporting."
    ]
  };

  const clearSpaceProject = {
    id: "clearspace-noordung",
    title: "ClearSpace — Center Noordung",
    category: "XR",
    platforms: ["Interactive Installation", "Kinect", "Dual Projection"],
    thumbnail: "https://gcdn.picsart.com/editing-temp/11c206bd-0eca-4505-9caf-aa45e6cf52b4.jpeg",
    summary: "Interactive Unity/Kinect museum installation in a deliberately dark projection room: the wall presents mission/orbital context while the floor becomes a tracked physical playfield for clearing space debris.",
    status: "Museum Installation",
    statusType: "live",
    role: "Sole Unity developer for the ClearSpace installation",
    tools: ["Unity", "C#", "Kinect", "Dual Projection", "Calibration", "Physical Interaction"],
    tags: ["Museum", "Kinect", "Installation", "Real Footage", "Physical Interaction"],
    links: [
      { label: "Center Noordung", url: "https://www.center-noordung.si/en/" }
    ],
    media: [
      {
        type: "video",
        src: "https://gcdn.picsart.com/editing-temp/74581184-26ee-4e3c-bb21-c94f9b1e5400.mp4",
        poster: "https://gcdn.picsart.com/editing-temp/11c206bd-0eca-4505-9caf-aa45e6cf52b4.jpeg"
      },
      { type: "image", src: "https://gcdn.picsart.com/editing-temp/11c206bd-0eca-4505-9caf-aa45e6cf52b4.jpeg", alt: "ClearSpace real installation footage showing wall mission projection and floor tracking" },
      { type: "image", src: "https://gcdn.picsart.com/editing-temp/f83f0d15-6a78-4130-918c-e96d03dc9a35.jpeg", alt: "ClearSpace how-it-works visual built from real installation footage" },
      { type: "image", src: "https://gcdn.picsart.com/editing-temp/6d23be62-02d9-4e62-80d1-b3b70cabdf75.jpeg", alt: "ClearSpace system architecture from visitor tracking to wall and floor projection" },
      {
        type: "video",
        src: "https://gcdn.picsart.com/editing-temp/849a812c-dc50-48b9-a90e-077f55e63dce.mp4",
        poster: "https://gcdn.picsart.com/editing-temp/f8fbb4ab-6c84-470f-bc94-f038f5843cf7.png"
      },
      { type: "image", src: "https://gcdn.picsart.com/editing-temp/f8fbb4ab-6c84-470f-bc94-f038f5843cf7.png", alt: "AI-assisted illustrative environment visualization based on the real ClearSpace installation" }
    ],
    featured: false,
    priority: 2,
    details: [
      "How it works: The room is intentionally black and the projections are the interface. The wall projection provides mission/orbital context; the floor projection is the physical playfield.",
      "Tracking: Kinect maps the visitor's physical position and movement into a tracked marker on the projected floor in real time.",
      "Interaction: Visitors move toward and into projected debris targets to clear/collect them; successful interactions trigger immediate visual feedback and updated information.",
      "Projection system: Separate wall and floor projectors required calibration and consistent mapping between the tracked physical space and Unity's game space.",
      "Implementation: Built calibration, tracking-to-game mapping, gameplay/collection logic, animations, feedback, and projection behavior in Unity/C#.",
      "Ownership: I built ClearSpace as the sole developer for this installation; two other developers created separate games for the same museum room.",
      "Evidence: The first four media items are real installation footage or visuals derived directly from it. The final video and still are explicitly AI-assisted illustrative environment visualizations based on the real installation; they clarify the intended visitor-facing room without being presented as deployment evidence."
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
    priority: 4,
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
    priority: 3,
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
    priority: 5,
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
    tags: ["Heritage", "Geospatial AR", "Thesis"],
    featured: false,
    priority: 1,
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

      if (!refreshed.some((project) => project.id === "emind")) refreshed.push(eMindProject);
      if (!refreshed.some((project) => project.id === "multiverse-kaitenzushi")) refreshed.push(multiverseProject);
      if (!refreshed.some((project) => project.id === "clearspace-noordung")) refreshed.push(clearSpaceProject);

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
  setText(".browse-header p", "Earlier releases, installations, web work, game prototypes, 3D/motion studies, and supporting projects.");
  setText("#contact .section-title p", "Open to Unity/XR, immersive learning, EdTech, technical-training, and software product work. Based in Slovenia and available for international collaboration.");
})();

var jobs = [
  {
    Title: "Selected Earlier Interactive Work",
    Years: "",
    Desc: "",
    Points: [
      "ClearSpace — Center Noordung: solo-built Unity/Kinect interactive installation using wall and floor projection for a physical space-debris collection experience.",
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
