var jobs = [
{
	Title: "AI Workshop Instructor & Advisor",
	Years: "2025 - Present",
	Location: "Telemach JobLab, Slovenia",
	Desc: [
	"Led AI adoption workshops for schools and companies from use-case discovery to MVP planning.",
	"Helped teams prioritize value, feasibility, and risk for responsible rollout.",
	"Built practical implementation workflows for non-technical and mixed-seniority teams."
	]
},
{
	Title: "Unity Developer",
	Years: "2025 - Present",
	Location: "Freelance - Slovenia",
	Desc: [
	"Developed VR4LL 2.0 modules for Meta Quest, including shared interaction and object-grab synchronization.",
	"Implemented quest-based learning flows and interactive scenarios for immersive language practice.",
	"Optimized experiences for standalone VR constraints and session reliability."
	]
},
{
	Title: "High School Professor of Computer Science",
	Years: "2021 - 2024",
	Location: "School Center Velenje, Velenje, Slovenia",
	Desc: [
	"Taught 300+ students in AI, web development, multimedia, and networking with a 95% pass rate.",
	"Designed project-based curricula that turned theory into shipped prototypes.",
	"Organized 5+ game jams and supervised an AI grading assistant in Python that reduced grading time by ~20%.",
	"Contributed to EU initiatives expanding educator digital competencies."
	]
},
{
	Title: "Technical Assistant",
	Years: "2019 - 2020",
	Location: "Ministry of Public Administration, Slovenia",
	Desc: [
	"Supported IT modernization across 100+ government facilities.",
	"Contributed to process and cost optimization with reported savings up to ~20%.",
	"Built Xamarin/MySQL tools that improved archival workflows and response efficiency."
	]
},
{
	Title: "Software Developer Intern",
	Years: "2018 - 2019",
	Location: "Mega M d.o.o., Velenje, Slovenia",
	Desc: [
	"Built an online shopping platform with HTML, jQuery, and Bootstrap.",
	"Developed a Xamarin mobile app for a national grocery chain with loyalty-point integration and discount alerts.",
	"Helped deliver engagement improvements reported around ~30%."
	]
},
{
	Title: "Web Developer Intern (Erasmus exchange)",
	Years: "Spring 2015",
	Location: "bits & bytes, Malta",
	Desc: [
	"Contributed to online retail platform development for an electronics store.",
	"Strengthened production foundations in HTML, CSS, PHP, and MySQL."
	]
}];

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
