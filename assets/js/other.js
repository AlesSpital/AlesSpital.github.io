var jobs = [
	{
	Title: "Web Development Projects",
	Years: "",
	Desc: "",
	Points: [
	"Created websites, portfolios, e-commerce platforms, and blogs using Git, Node.js, EJS, Ionic, JavaScript, Bootstrap, PHP, SQL, and MongoDB."
	]
},
{
	Title: "Video & Photo Editing",
	Years: "",
	Desc: "",
	Points: [
	"Edited promotional materials across photo and video formats with Photoshop, Premiere Pro, After Effects, Blender, and Cinema 4D."
	]
},
{
	Title: "Mobile Games & Game Jams",
	Years: "",
	Desc: "",
	Points: [
	"Built and published mobile games and RPG prototypes in Unity and C#, focusing on graphics optimization and polish."
	]
},
]

for(let i = 0; i < jobs.length; i++ ){
	let content = '<div class="resume-item tilt-card">';
    content += '<h4>'+jobs[i].Title+'</h4>';
	if(jobs[i].Years!="")
    	content += '<h5>'+jobs[i].Years+'</h5>';
    if(jobs[i].Desc!="")
    	content += '<p><em>'+jobs[i].Desc+'</em></p>';
    content += '<ul>';
    for(let j = 0; j < jobs[i].Points.length; j++){
    	if(jobs[i].Points[j]!="")
    		content += '<li>'+jobs[i].Points[j]+'</li>';
    }
    content += '</ul>';
    content += '</div>';
    $("#other-list").append(content);
}
