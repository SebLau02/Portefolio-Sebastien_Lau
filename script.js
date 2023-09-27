const parcourContainer = document.querySelector(".parcours-global-container");
const scholar = document.querySelector(".scholar-work");
const scholarList = document.querySelector(".scholar-list");
const workList = document.querySelector(".work-list");
const cv = document.querySelector(".cv-container");
const techLogoContainer = document.querySelectorAll(".tech-logo-container");
const techParts = document.querySelectorAll(".technos-parts");
const projectContainer = document.querySelector(".projets-section");
const project = document.querySelectorAll(".project");

//********** scrolltop = scroll depuis le top du document et clientheight = viwport du client **********

const { scrollTop, clientHeight } = document.documentElement;

function parcoursHandleScroll() {
  const topElementToTopViewport = parcourContainer.getBoundingClientRect().top;

  if (topElementToTopViewport - clientHeight * 0.3 <= 0) {
    scholarList.classList.add("active");
    workList.classList.add("active");
  }
  if (topElementToTopViewport - clientHeight * 0 <= 0) {
    cv.classList.add("active");
  }
}

function frontHandleScroll() {
  const topElementToTopViewport = techParts[0].getBoundingClientRect().top;

  if (topElementToTopViewport - clientHeight * 0.4 <= 0) {
    techLogoContainer[0].classList.add("active");
    setTimeout(() => {
      techLogoContainer[1].classList.add("active");
    }, 200);
    setTimeout(() => {
      techLogoContainer[3].classList.add("active");
    }, 400);
    setTimeout(() => {
      techLogoContainer[2].classList.add("active");
    }, 600);
    setTimeout(() => {
      techLogoContainer[4].classList.add("active");
    }, 800);
    setTimeout(() => {
      techLogoContainer[5].classList.add("active");
    }, 1000);
  }
}

function backHandleScroll() {
  const topElementToTopViewport = techParts[1].getBoundingClientRect().top;

  if (topElementToTopViewport - clientHeight * 0.4 <= 0) {
    techLogoContainer[6].classList.add("active");
    setTimeout(() => {
      techLogoContainer[7].classList.add("active");
    }, 200);
  }
}

function outilsHandleScroll() {
  const topElementToTopViewport = techParts[2].getBoundingClientRect().top;

  if (topElementToTopViewport - clientHeight * 0.5 <= 0) {
    techLogoContainer[8].classList.add("active");
    setTimeout(() => {
      techLogoContainer[9].classList.add("active");
    }, 200);
    setTimeout(() => {
      techLogoContainer[10].classList.add("active");
    }, 400);

    setTimeout(() => {
      techLogoContainer[11].classList.add("active");
    }, 600);
  }
}

function projectHandleScroll() {
  for (let i = 0; i < project.length; i++) {
    const topElementToTopViewport = project[i].getBoundingClientRect().top;

    if (topElementToTopViewport - clientHeight * 0.6 <= 0) {
      project[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", () => {
  parcoursHandleScroll();
  frontHandleScroll();
  backHandleScroll();
  outilsHandleScroll();
  projectHandleScroll();
});

//********** github api data **********

const projectLink = document.querySelectorAll(".project-link");
const projectImage = document.querySelectorAll(".project-image");
const projectName = document.querySelectorAll(".project-name");
const projectDescription = document.querySelectorAll(".project-description");

let readMe = [];
let i = 0;

const findURL = (text, i) => {
  const urlRegex = /https?:\/\/seblau02\.github\.io\/[^/]+\/?(?!\))/;
  const matchedUrl = text.match(urlRegex);
  projectLink[i].href = matchedUrl[0];
};

const findImagesPath = (text, name, i) => {
  const imagePathRegex = /src="([^"]+)" alt="/g;
  const paths = [];
  const images = [];

  for (const matchedImages of text.matchAll(imagePathRegex)) {
    paths.push(matchedImages[1]);

    fetch(
      `https://api.github.com/repos/seblau02/${name}/contents/${matchedImages[1]}`,
    )
      .then((response) => response.json())
      .then((data) => {
        //********** create new img element and put project image inside **********

        const img = document.createElement("img");
        img.classList.add("project-image");
        img.alt = "image vers projet";
        img.src = data.download_url;
        projectLink[i].appendChild(img);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

function findDescription(text) {
  const descriptionRegex = /### Description([\s\S]*?)### Détails/;

  const match = text.match(descriptionRegex);

  if (match && match[1]) {
    projectDescription[i].innerText = match[1].trim();
  }
  return "";
}

const repositoryName = [
  "Miam",
  "l-ardillon-shop",
  "Pokedex-React",
  "Memory",
  "credit-card-checkout",
  "Cocacola-Animation",
];

for (const name of repositoryName) {
  fetch(`https://raw.githubusercontent.com/SebLau02/${name}/main/README.md`)
    .then((response) => response.text())
    .then((data) => {
      // console.log(data);

      //********** push data to readme array **********
      readMe.push(data);

      //********** find project url in readme data and put image url in html **********

      findURL(data, i);

      //********** put project name in html **********
      projectName[i].innerText = name.charAt(0).toUpperCase() + name.slice(1);

      //********** find repos images and put image in html**********
      findImagesPath(data, name, i);

      //********** find description text **********
      findDescription(data, i);

      i++;
    })
    .catch((error) => {
      console.error(error);
    });
}

//********** burger menu **********

const burgerMenu = document.querySelector(".burger-menu");
const ligne = document.querySelectorAll(".ligne");
const navigationMenu = document.querySelector(".navigation-menu");

burgerMenu.addEventListener("click", () => {
  ligne[0].classList.toggle("rotate-left");
  ligne[1].classList.toggle("rotate");
  ligne[2].classList.toggle("rotate-right");
  navigationMenu.classList.toggle("active");
});
