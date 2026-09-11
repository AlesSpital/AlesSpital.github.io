const skillGroups = [
  {
    title: "XR & Interactive Engineering",
    skills: [
      "Unity",
      "C#",
      "Meta Quest / Quest 3",
      "Mixed Reality",
      "AR Foundation",
      "ARCore",
      "Multiplayer Interaction Sync",
      "Unity Editor Tooling",
      "ScriptableObject Pipelines",
      "Profiling & Quest Optimization",
      "Object Pooling",
      "Kinect / Physical Interaction",
      "Three.js",
      "WebAR / WebXR",
      "MediaPipe"
    ]
  },
  {
    title: "Full-Stack Product Engineering",
    skills: [
      "JavaScript",
      "React / Vite",
      "Node.js / Express",
      "MySQL / SQL",
      "Knex",
      "PHP",
      "IndexedDB",
      "Authentication & Sessions",
      "REST / JSON APIs",
      "Persistence Architecture",
      "CI/CD",
      "GitHub Actions"
    ]
  },
  {
    title: "Product Delivery & Quality",
    skills: [
      "Product Architecture",
      "Technical Research",
      "Rapid Prototyping",
      "UX for Learning",
      "Simulation Design",
      "Mobile Development",
      "Performance Tuning",
      "Source-Level Review",
      "Vitest",
      "Playwright",
      "Deployment & Release Management"
    ]
  },
  {
    title: "Leadership, Education & AI",
    skills: [
      "Multidisciplinary Team Coordination",
      "Technical Direction & Reviews",
      "Technical Teaching",
      "Workshop Facilitation",
      "Instructional Design",
      "AI-Assisted Development",
      "AI Adoption Strategy",
      "Stakeholder Communication",
      "MVP Planning",
      "Computer Networks",
      "Cinema 4D",
      "DaVinci Resolve"
    ]
  }
];

const skillList = document.getElementById("skill-list");
if (skillList) {
  skillGroups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "skill-group tilt-card";

    const heading = document.createElement("h3");
    heading.textContent = group.title;
    section.appendChild(heading);

    const cloud = document.createElement("div");
    cloud.className = "skill-cloud";
    group.skills.forEach((skill) => {
      const pill = document.createElement("span");
      pill.className = "skill-pill";
      pill.textContent = skill;
      cloud.appendChild(pill);
    });

    section.appendChild(cloud);
    skillList.appendChild(section);
  });
}
