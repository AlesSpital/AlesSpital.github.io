const skills = [
  "Unity", "C#", "VR/AR", "Python", "Machine Learning", "JavaScript", "Node.js", "Express.js",
  "CSS / SCSS", "Bootstrap", "Blender", "Cinema4D", "Photoshop", "Premiere Pro", "HTML",
  "Xamarin", "SQL", "MongoDB", "Mobile Development", "C++", "AI", "Game Development",
  "UI/UX Design", "Agile", "Computer Networking", "TensorFlow", "PyTorch", "Data Science",
  "Git", "REST APIs", "Video Editing", "3D Modeling", "3D Animation", "Laravel", "Teaching"
];

document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('skill-cloud');
  if (!target) return;
  skills.forEach((skill) => {
    const chip = document.createElement('span');
    chip.className = 'skill-chip';
    chip.textContent = skill;
    target.appendChild(chip);
  });
});
