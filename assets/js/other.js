const secondaryRoles = [
  {
    Title: "Web Developer Intern",
    Years: "April 2015",
    Desc: "bits & bytes, Malta",
    Points: [
      "Erasmus Student Exchange Program participant.",
      "Co-designed and developed an online platform for an electronics retailer."
    ]
  },
  {
    Title: "Freelance - Web Development",
    Years: "",
    Desc: "",
    Points: [
      "Delivered portfolios, e-commerce platforms, and blogs with modern stacks."
    ]
  },
  {
    Title: "Freelance - Video & Photo Editing",
    Years: "",
    Desc: "",
    Points: [
      "Recorded and edited advertising intros across photo and video formats."
    ]
  },
  {
    Title: "Mobile & PC Games Development",
    Years: "",
    Desc: "",
    Points: [
      "Built indie games and joined multiple game jams for rapid prototyping."
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('experience-secondary');
  if (!target) return;
  secondaryRoles.forEach((job) => {
    const item = document.createElement('div');
    item.className = 'tagged-card';
    item.innerHTML = `
      <div class="card-header">
        <p class="eyebrow">${job.Years || 'Side Project'}</p>
        <h4>${job.Title}</h4>
        ${job.Desc ? `<p class="muted">${job.Desc}</p>` : ''}
      </div>
      <ul>${job.Points.map((p) => `<li>${p}</li>`).join('')}</ul>
    `;
    target.appendChild(item);
  });
});
