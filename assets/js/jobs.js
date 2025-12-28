const primaryRoles = [
  {
    Title: "High School Professor of Computer Science",
    Years: "2021 - 2024",
    Location: "School Center Velenje, Velenje, Slovenia",
    Desc: [
      "Taught AI, Web Development, Multimedia, and Computer Networks with project-focused curriculum.",
      "Built an AR mobile app to help students grasp IP addressing and routing.",
      "Co-led EU initiatives to modernize education and trained educators on digital tools.",
      "Designed Game Jam events, RPG capstone projects, and AI-assisted exam correction workflows."
    ]
  },
  {
    Title: "Technical Assistant",
    Years: "2019 - 2020",
    Location: "Ministry of Public Administration Slovenia",
    Desc: [
      "Supported modernization of IT infrastructure in government facilities.",
      "Developed software to enhance archival processes and operational efficiency."
    ]
  },
  {
    Title: "Software Developer Intern",
    Years: "2019",
    Location: "Mega M d.o.o., Velenje, Slovenia",
    Desc: [
      "Created an online shopping platform to streamline product ordering.",
      "Built a loyalty and discounts mobile app for a major grocery chain."
    ]
  }
];

const renderTimeline = (data, targetId) => {
  const target = document.getElementById(targetId);
  if (!target) return;
  data.forEach((job) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <p class="eyebrow">${job.Years}</p>
        <h3>${job.Title}</h3>
        <p class="muted">${job.Location}</p>
        <ul>
          ${job.Desc.map((d) => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    `;
    target.appendChild(item);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline(primaryRoles, 'experience-primary');
});
