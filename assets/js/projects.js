var projects = [
{ 
	Filter: "filter-arvr",
	Title: "<b>ARnet:</b> ARnet offers a variety of features that users can take advantage of to simulate and learn about computer networks in augmented reality. The application provides users with basic information about the structure of the network, including topology, device types and their functions. <b>*Only in Slovenian!*</b><br><b>Link:</b><a href='https://play.google.com/store/apps/details?id=com.CriticalGlitch.ARnet'> Google Play</a>",
	Image: "assets/img/portfolio/arnet.jpg"
},
{ 
	Filter: "filter-arvr",
	Title: "<b>AR Tourist Guide:</b> The AR Tourist Guide created as a Bachelor's Degree Thesis for the Slovenian municipality of Šoštanj is a cutting-edge application designed to enhance tourists' understanding of local history and culture by visualizing the former appearance of the submerged village of Družmirje. <b>*Only in Slovenian!*</b><br><b>Link:</b><a href='https://dk.um.si/Dokument.php?id=145960'> DKUM (Bachelor's Degree Thesis)</a></br>This product is not accessible to the public.",
	Image: "assets/img/portfolio/artouristguide.png"
},
{ 
	Filter: "filter-games",
	Title: "<b>Echoes of Etra:</b> Witness the birth of an epic tale in Echoes of Etra, a riveting RPG game developed by the talented students of Electrical and Computer School, School Center Velenje, Slovenia. Immerse yourself in a world torn between mortals and Gods, where the fate of humanity hangs in the balance.<br><b>Trailer:</b><a href='https://youtu.be/byq_hVzCsZA?si=p9StZG92jRCq2R1Q'> YouTube </a><br><b>DEMO:</b><a href='https://drive.google.com/file/d/1NezLAz30O-LDiyqCaF3XH9QalngPJ1uI/view?usp=sharing'> Google Drive </a>",
	Image: "assets/img/portfolio/eoe.jpg"
},
{ 
	Filter: "filter-games",
	Title: "<b>The Arena:</b> Immerse yourself in the adrenaline-fueled world of Arena Clash, a mobile game that pits you against formidable adversaries in intense battles. Engage in thrilling arena combat where your objective is simple yet challenging: obliterate all enemies standing in your path. <br><b>Link:</b><a href='https://play.google.com/store/apps/details?id=com.CriticalGlitch.TheArena'> Google Play</a>",
	Image: "assets/img/portfolio/thearena.jpg"
},
{ 
	Filter: "filter-games",
	Title: "<b>Void:</b> Prepare your fingers for an quite simple and interesting game, where you need to use your brain and tapping skills to stay alive as long as you can! You are set in to the situation where you as a player (a circle) are being drawned into the Void. <br><b>Link:</b><a href='https://play.google.com/store/apps/details?id=com.CriticalGlitch.Void'> Google Play</a>",
	Image: "assets/img/portfolio/thevoid.jpg"
},
{ 
	Filter: "filter-games",
	Title: "<b>Spez Shooter:</b> Prepare your fingers for an quite simple and interesting game, where you need to use your brain and tapping skills to stay alive as long as you can! You are set in to the situation where you as a player (a circle) are being drawned into the Void. <br><b>Link:</b><a href='https://play.google.com/store/apps/details?id=com.CriticalGlitch.SpezShooter'> Google Play</a>",
	Image: "assets/img/portfolio/spezshooter.jpg"
},
{ 
	Filter: "filter-3Dart",
	Title: "A wide range of digital art, encompassing 3D renders and video edits, is accessible on my <b>Instagram:</b><a href='https://www.instagram.com/alesspital/'>@alesspital</a>",
	Image: "assets/img/portfolio/digart.jpg"
},
{ 
	Filter: "filter-3Dart",
	Title: "A wide range of digital art, encompassing 3D renders and video edits, is accessible on my <b>Instagram:</b><a href='https://www.instagram.com/alesspital/'>@alesspital</a>",
	Image: "assets/img/portfolio/pot.GIF"
},
{ 
	Filter: "filter-3Dart",
	Title: "A wide range of digital art, encompassing 3D renders and video edits, is accessible on my <b>Instagram:</b><a href='https://www.instagram.com/alesspital/'>@alesspital</a>",
	Image: "assets/img/portfolio/photoart.jpg"
}
/*
{ 
	Filter: "filter-arvr",
	Title: "VR/AR app",
	Image: "assets/img/portfolio/portfolio-1.jpg"
},
*/
]

for(let i = 0; i < projects.length; i++ ){
	let content = '<div class="col-lg-4 col-md-6 portfolio-item '+projects[i].Filter+'">';
	content += '<div class="portfolio-wrap">'
	content += '<img src="'+projects[i].Image+'" class="img-fluid" alt="">'
	content += '<div class="portfolio-links">'
	content += '<a href="'+projects[i].Image+'" data-gallery="portfolioGallery" class="portfolio-lightbox" title="'+projects[i].Title+'"><i class="bx bx-plus"></i></a>'
        //content += '<a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>'
    content += '</div>'
    content += '</div>'
    content += '</div>';
    $("#project-list").append(content);
}