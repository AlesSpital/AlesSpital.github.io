var jobs = [
	{
	Title: "Product & Web Delivery",
	Years: "",
	Desc: "",
	Points: [
	"Delivered websites, e-commerce features, and custom workflow tools using Node.js, JavaScript, PHP, SQL, and MongoDB."
	]
},
{
	Title: "Creative Production Pipeline",
	Years: "",
	Desc: "",
	Points: [
	"Produced visual and motion assets in Cinema 4D, Photoshop, and editing suites to support product storytelling and launch content."
	]
},
{
	Title: "Rapid Prototyping Leadership",
	Years: "",
	Desc: "",
	Points: [
	"Led game jam and prototype cycles, turning ideas into testable Unity builds under tight deadlines."
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
