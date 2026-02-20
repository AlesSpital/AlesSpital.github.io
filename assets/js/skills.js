const skillGroups = [
  {
    title: "Core Engineering",
    skills: [
      "Unity",
      "C#",
      "XR",
      "AR Foundation",
      "ARCore",
      "ARKit",
      "AI Feature Integration",
      "Multiplayer Interaction Sync",
      "Meta Quest Optimization"
    ]
  },
  {
    title: "Product Delivery",
    skills: [
      "Rapid Prototyping",
      "UX for Learning",
      "Simulation Design",
      "LLM-Powered UX Flows",
      "Mobile Development",
      "Computer Networks",
      "Performance Tuning",
      "Release Management"
    ]
  },
  {
    title: "Leadership & AI Enablement",
    skills: [
      "Technical Teaching",
      "Workshop Facilitation",
      "AI Adoption Strategy",
      "GPT Wrapper Development",
      "Agent Workflow Design",
      "Custom Model Prototyping",
      "Stakeholder Communication",
      "MVP Planning",
      "Responsible AI Framing"
    ]
  },
  {
    title: "Creative Production",
    skills: [
      "Cinema 4D",
      "DaVinci Resolve",
      "Photoshop",
      "3D Modeling",
      "3D Animation",
      "Video Editing"
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
