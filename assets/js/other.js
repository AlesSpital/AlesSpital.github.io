var jobs = [
{
	Title: "Web Developer Intern",
	Years: "April 2015",
	Desc: "bits & bytes, Malta",
	Points: [
		"Erasmus Student Exchange Program Participant",
		"Contributed to the design and development of an online platform for an electronic device retailer."
	]
},
{
	Title: "Freelance - Web Development",
	Years: "",
	Desc: "",
	Points: [
	"Developed a diverse array of websites, including portfolios, e-commerce platforms, and blogs."
	]
},
{
	Title: "Freelance - Video & Photo Editing",
	Years: "",
	Desc: "",
	Points: [
	"Recorded and edited advertising and introduction assets, adeptly navigating both photo and video formats."
	]
},
{
	Title: "Mobile & PC Games Development",
	Years: "",
	Desc: "",
	Points: [
	"During my leisure time, I have undertaken the challenge of developing video games and participated in several game jams."
	]
},
]

for(let i = 0; i < jobs.length; i++ ){
	let content = '<div class="resume-item">';
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