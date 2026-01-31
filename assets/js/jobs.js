var jobs = [
{
	Title: "AI Workshop Instructor & Advisor",
	Years: "2025 - Present",
	Location: "Telemach JobLab, Slovenia",
	Desc: [
	"Delivered professional AI workshops and advised schools/companies on use-case discovery, prioritization, and responsible adoption (value, feasibility, risk).",
	"Guided participants from idea to MVP planning with practical workflows and professional usage patterns."
	]
},
{
	Title: "Unity Developer",
	Years: "2025 - Present",
	Location: "Freelance · Slovenia",
	Desc: [
	"Developed VR4LL 2.0, a Unity-based VR platform for language learning with immersive scenarios.",
	"Built interactive flows that help learners practice in realistic, supportive environments."
	]
},
{
	Title: "High School Professor of Computer Science",
	Years: "2021 - 2024",
	Location: "School Center Velenje, Velenje, Slovenia",
	Desc: [
	"Taught 200+ students across AI, Web Development, Multimedia, and Computer Networks with a 95% pass rate.",
	"Collaborated on EU initiatives to train educators and expand digital competencies in education.",
	"Organized 5+ Game Jam events and supervised an RPG game plus an AI grading assistant in Python, reducing grading time by ~20%."
	]
},
{
	Title: "Technical Assistant",
	Years: "2019 - 2020",
	Location: "Ministry of Public Administration, Slovenia",
	Desc: [
	"Supported modernization of IT infrastructure across 100+ government facilities, enabling up to 20% cost savings and faster service resolution.",
	"Built Xamarin and MySQL solutions that improved archival workflows and organizational efficiency."
	]
},
{
	Title: "Software Developer Intern",
	Years: "2018 - 2019",
	Location: "Mega M d.o.o., Velenje, Slovenia",
	Desc: [
	"Built an online shopping platform with HTML, jQuery, and Bootstrap.",
	"Developed a Xamarin mobile app for a national grocery chain; loyalty-point integration and discount alerts boosted engagement by ~30%."
	]
},
{
	Title: "Web Developer Intern (Erasmus exchange)",
	Years: "Spring 2015",
	Location: "bits & bytes, Malta",
	Desc: [
	"Contributed to an online retail platform for an electronics store.",
	"Strengthened foundations in HTML, CSS, PHP, and MySQL."
	]
}];
//alert(jobs[0].Desc[0]);
const jobItems = document.getElementById("job-items") || document.getElementById("job-list");
if (!jobItems) {
  // No target container on this page.
} else {

const VISIBLE_LIMIT = 3;
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
