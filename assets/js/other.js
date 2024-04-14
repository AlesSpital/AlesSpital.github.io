var jobs = [
{
	Title: "Freelance - Web Development",
	Desc: "",
	Points: [
	""
	]
},
{
	Title: "Mobile Games Development",
	Desc: "",
	Points: [
	""
	]
},
]

for(let i = 0; i < jobs.length; i++ ){
	let content = '<div class="resume-item">';
    content += '<h4>'+jobs[i].Title+'</h4>';
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