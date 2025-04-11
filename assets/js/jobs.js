var jobs = [
{
	Title: "High School Professor of Computer Science",
	Years: "2021 - 2024",
	Location: "School Center Velenje, Velenje, Slovenia",
	Desc: [
	"Taught a diverse array of subjects, encompassing Artificial Intelligence, Web Development, Multimedia, and Computer Networks.",
	"Developed an augmented reality (AR) mobile application aimed at enhancing students' comprehension of IP addressing and routing within computer networks.",
	"Engaged in collaborative efforts with European Union initiatives aimed at modernising educational systems. Facilitated the creation and delivery of specialised training sessions for educators, focusing on the integration of contemporary digital tools and technologies.",
	"Strategically planned and executed diverse projects catering to student engagement and development, including initiatives such as Game Jam events, the creation of an RPG computer game, and the implementation of AI-assisted exam correction systems."
	]
},
{
	Title: "Technical Assistant",
	Years: "2019 - 2020",
	Location: "Ministry of Public Administration Slovenia",
	Desc: [
	"Contributed to the modernization of IT infrastructure within Slovenian government facilities by providing strategic support and implementing innovative solutions.",
	"Designed and developed software solutions tailored to enhance archival processes and streamline organisational efficiency."
	]
},
{
	Title: "Software Developer Intern",
	Years: "2019 - 2019",
	Location: "Mega M d.o.o., Velenje, Slovenia",
	Desc: [
	"Designed and developed an online shopping platform that made it easier to order products.",
	"Created a mobile application for the well-known grocery chain that provides users with up-to-date information on loyalty points and discount prices, increasing user happiness and engagement."
	]
}];
//alert(jobs[0].Desc[0]);
for(let i = 0; i < jobs.length; i++ ){
	let content = '<div class="resume-item">';
    content += '<h4>'+jobs[i].Title+'</h4>';
    content += '<h5>'+jobs[i].Years+'</h5>';
    content += '<p><em>'+jobs[i].Location+'</em></p>';
    content += '<ul>';
    for(let j = 0; j < jobs[i].Desc.length; j++){
    	content += '<li>'+jobs[i].Desc[j]+'</li>';
    }
    content += '</ul>';
    content += '</div>';
    $("#job-list").append(content);
}