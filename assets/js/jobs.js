var jobs = [
{
	Title: "Senior JavaScript Developer | Višji JavaScript Razvijalec",
	Years: "Sep 2020 - Mar 2026",
	Location: "RSLabs, Slovenia",
	Desc: [
	"Built and maintained production web features in JavaScript/jQuery, including frontend/backend integration and product-facing workflows.",
	"Handled refactoring, optimization, maintainability decisions, and full-cycle technical delivery from problem analysis through implementation and iteration.",
	"Worked with technical and non-technical stakeholders to translate product and UX requirements into practical software solutions."
	]
},
{
	Title: "Unity Developer",
	Years: "2025 - Present",
	Location: "Freelance - Slovenia",
	Desc: [
	"Developed VR4LL 2.0 modules for Meta Quest, including shared interaction and object-grab synchronization.",
	"Implemented quest-based learning flows, environment work, and interactive scenarios for immersive language practice.",
	"Worked within standalone-VR constraints where interaction reliability, usability, and performance all matter."
	]
},
{
	Title: "AI Workshop Instructor & Advisor",
	Years: "2025 - Present",
	Location: "Slovenia",
	Desc: [
	"Deliver practical AI training for schools, adult learners, and business audiences.",
	"Translate current AI tools and workflows into exercises people can apply directly in teaching and professional work.",
	"Use the same instructional experience to inform eMind, my own AI/XR learning platform."
	]
},
{
	Title: "Computer Science Teacher",
	Years: "2021 - 2024",
	Location: "School Center Velenje, Velenje, Slovenia",
	Desc: [
	"Taught computer science topics including AI, web development, multimedia, and computer networks.",
	"Designed project-based learning activities, practical assignments, and technical workshops around real software and emerging technologies.",
	"Used teaching experience to identify recurring learning problems that later informed products such as ARnet and eMind."
	]
},
{
	Title: "Technical Assistant",
	Years: "2019 - 2020",
	Location: "Ministry of Public Administration, Slovenia",
	Desc: [
	"Supported public-sector IT and modernization work across technical and administrative workflows.",
	"Built software tools with Xamarin/MySQL and contributed to improving archival and operational processes."
	]
},
{
	Title: "Software Developer Intern",
	Years: "2018 - 2019",
	Location: "Mega M d.o.o., Velenje, Slovenia",
	Desc: [
	"Built web functionality with HTML, JavaScript/jQuery, and Bootstrap.",
	"Contributed to Xamarin mobile development for retail/loyalty use cases."
	]
},
{
	Title: "Web Developer Intern (Erasmus exchange)",
	Years: "Spring 2015",
	Location: "bits & bytes, Malta",
	Desc: [
	"Contributed to web development for an online electronics retail project.",
	"Worked with HTML, CSS, PHP, and MySQL in an international internship environment."
	]
}
];

const jobItems = document.getElementById("job-items") || document.getElementById("job-list");
if (!jobItems) {
  // No target container on this page.
} else {

const VISIBLE_LIMIT = 4;
let renderedCount = 0;

for(let i = 0; i < jobs.length; i++ ){
	let content = '<div class="resume-item tilt-card">';
    content += '<h4>'+jobs[i].Title+'</h4>';
    content += '<h5>'+jobs[i].Years+'</h5>';
    content += '<p><em>'+jobs[i].Location+'</em></p>';
    content += '<ul>';
    for(let j = 0; j < jobs[i].Desc.length; j++){
    	content += '<li>'+jobs[i].Desc[j]+'</li>';
    }
    content += '</ul>';
    content += '</div>';
    renderedCount += 1;
    const $content = $(content);
    if (renderedCount > VISIBLE_LIMIT) {
      $content.addClass("is-hidden");
    }
    $(jobItems).append($content);
}

const moreButton = document.getElementById("experience-more");
if (moreButton) {
  if (jobs.length <= VISIBLE_LIMIT) {
    moreButton.classList.add("is-hidden");
  } else {
    moreButton.addEventListener("click", () => {
      jobItems.querySelectorAll(".resume-item.is-hidden").forEach((item) => {
        item.classList.remove("is-hidden");
      });
      moreButton.classList.add("is-hidden");
    });
  }
}
}
