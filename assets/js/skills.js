var skills = [
	"Unity",
	"C#",
	"Python",
	"C++",
	"JavaScript",
	"Node.js",
	"PHP",
	"SQL",
	"MySQL",
	"MongoDB",
	"HTML",
	"CSS",
	"Bootstrap",
	"React",
	"Laravel",
	"jQuery",
	"EJS",
	"Ionic",
	"Git",
	"AR/VR/XR",
	"AR Foundation",
	"ARCore",
	"ARKit",
	"Machine Learning",
	"AI",
	"Game Development",
	"Mobile Development",
	"Computer Networks",
	"Xamarin",
	"Blender",
	"Cinema 4D",
	"Photoshop",
	"Premiere Pro",
	"After Effects",
	"3D Modeling",
	"3D Animation",
	"Video Editing",
	"Teaching & Workshops",
	"AI Tools (ChatGPT, Copilot, Gemini, Claude, Poe, LumaAI)"
]

const skillList = document.getElementById("skill-list");
if (skillList) {
  skills.forEach((skill) => {
    const pill = document.createElement("span");
    pill.className = "skill-pill";
    pill.textContent = skill;
    skillList.appendChild(pill);
  });
}
