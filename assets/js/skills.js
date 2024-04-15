var skills = [
	"Unity",
	"C#",
	"VR/AR",
	"PHP",
	"SQL",
	"Python",
	"Machine Learning",
	"JavaScript",
	"jQuery",
	"NodeJS",
	"Express.js",
	"CSS",
	"Bootstrap",
	"Blender",
	"Cinema4D", 
	"Photoshop",
	"Premiere Pro",
	"HTML",
	"Xamarin",
	"MongoDB",
	"Mobile Development",
	"C++",
	"AI",
	"Game Development",
	"UI/UX Designing",
	"Agile Development",
	"Computer Networking",
    "React Native",
    "TensorFlow",
    "PyTorch",
    "Data Science",
    "Data Analysis",
    "Git",
    "RESTful APIs",
    "Cross-platform Development",
    "Video Editing",
    "3D Modeling",
    "3D Animation",
    "Photo Editing"
]

let cols = Math.floor(skills.length / 6)+1;
for(let i = 0; i < skills.length; ){
	let content = '<div class="col-sm-2">';
    content += '<ul>';
    for (let j = 0; j < cols && i < skills.length; j++) {
    	content += '<li><i class="bi bi-chevron-right"></i>'+skills[i++]+'</li>';
    }
    content += '</ul>';
    content += '</div>';
    $("#skill-list").append(content);
}