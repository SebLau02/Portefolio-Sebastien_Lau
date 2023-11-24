//********** selection des éléments du dom **********

const parcourContainer = document.querySelector(".parcours-global-container");
const scholar = document.querySelector(".scholar-work");
const scholarList = document.querySelector(".scholar-list");
const workList = document.querySelector(".work-list");
const cv = document.querySelector(".cv-container");
const techLogoContainer = document.querySelectorAll(".tech-logo-container");
const techParts = document.querySelectorAll(".technos-parts");
const projectContainer = document.querySelector(".projets-section");
const project = document.querySelectorAll(".project");
const annecdoteContainer = document.querySelector(".annecdote-container");
const annecdoteImg = document.querySelector(".annecdote-img");
const annecdoteSpans = document.querySelectorAll(".annecdote-description span");

//********** scrolltop = scroll depuis le top du document et clientheight = viwport du client **********

const { scrollTop, clientHeight } = document.documentElement;

//********** callback sur écoute au scroll sur la partie parcours pour appliquer des animations **********

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

//********** callback sur écoute au scroll sur la partie stack frontend pour appliquer des animations **********

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

//********** callback sur écoute au scroll sur la partie stack backend pour appliquer des animations **********

function backHandleScroll() {
  const topElementToTopViewport = techParts[1].getBoundingClientRect().top;

  if (topElementToTopViewport - clientHeight * 0.8 <= 0) {
    techLogoContainer[6].classList.add("active");
    setTimeout(() => {
      techLogoContainer[7].classList.add("active");
    }, 200);
  }
}

//********** callback sur écoute au scroll sur la partie stack outils pour appliquer des animations **********

function outilsHandleScroll() {
  const topElementToTopViewport = techParts[2].getBoundingClientRect().top;

  if (topElementToTopViewport - clientHeight * 0.8 <= 0) {
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

//********** callback sur écoute au scroll sur la partie travaux pour appliquer des animations **********

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
  projectHandleScroll();
  frontHandleScroll();
  backHandleScroll();
  outilsHandleScroll();
  parallaxScroll();
});

//********** récupération de données sur mon github **********

//le but ici est de récupérer des projets que j'ai réalisé, depuis mon github
//je récupère le readme de chaque projet qui contienent une description, des images, le nom du projet, le lien pour accéder au site.

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

//********** trouver la description du projet dans le readme **********

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

//********** récupérer les readme de mes projets sur mon github **********

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

      findStack(data);

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

//********** annecdote section animation **********

let foundedStack = [];
const keys = [
  "react.png",
  "nodejs.png",
  "gsap.svg",
  "tailwind.png",
  "café.png",
  "clavier.png",
];
let index = 0;
let reducedFoundedStack = {};
let updatedFoundedStack = {};

const findStack = (text) => {
  // je récupère les différentes technos que j'ai utilisé depuis mon GH

  const regex = /(?<=Technologies:)(.*?)(?=\n\n###|\nImages)/gs;

  const matchedStack = text.match(regex);

  const stacks = matchedStack[0].split(",");

  // je l'ajoute dans un tableau temporaire puis je réduis tous les éléments du tableau en minuscule

  foundedStack = [...foundedStack, ...stacks];

  for (let i = 0; i < foundedStack.length; i++) {
    foundedStack[i] = foundedStack[i].toLowerCase();
  }

  // je réduit le tableau en rassemblant les éléments qui se répètent

  reducedFoundedStack = foundedStack.reduce((compteur, element) => {
    if (compteur[element]) {
      compteur[element]++;
    } else {
      compteur[element] = 1;
    }
    return compteur;
  }, {});

  const keywordsToRemove = ["html", "css", "javascript", "javascript vanilla"];

  updatedFoundedStack = filterKeys(reducedFoundedStack, keywordsToRemove);
};

//function permettant de faire défiler les différent éléments

const inOut = (resultat) => {
  const keySpan = annecdoteSpans[0];
  const annecdoteSpan = annecdoteSpans[1];

  if (keys[index] !== "café.png" && keys[index] !== "clavier.png") {
    annecdoteImg.src = `assets/technos/${keys[index]}`;
    annecdoteSpan.innerText = Object.values(resultat)[index];

    if (Object.values(keys[index], resultat)[index] > 1) {
      annecdoteSpan.innerText = "x";
    } else {
      keySpan.innerText = "x";
    }
  } else if (keys[index] === "café.png") {
    annecdoteImg.src = `assets/technos/${keys[index]}`;
    keySpan.innerText = "too ";
    annecdoteSpan.innerText = "much";
  } else {
    annecdoteImg.src = `assets/technos/${keys[index]}`;
    keySpan.innerText = "52.2mpm";
    annecdoteSpan.innerText = "94.2%";
  }

  index++;

  if (index >= keys.length) {
    index = 0;
  }
};

setTimeout(() => {
  annecdoteContainer.classList.add("active");
  inOut(updatedFoundedStack);

  setInterval(() => {
    inOut(updatedFoundedStack);
  }, 4000);
}, 2000);

const filterKeys = (obj, keywords) => {
  const filteredObj = {};
  for (const key in obj) {
    if (!keywords.includes(key.trim())) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
};

//-----------------------------------------------------------------------------------------------
//-- parallax animations

const profileImage = document.querySelector(".profile-image");
const parcoursTitle = document.querySelector("#parcours > h2");

const parallaxScroll = () => {
  const scrolled = window.pageYOffset;

  profileImage.style.transform = `translateY(${scrolled * 0.1}px)`;
};

/* Lenis Smooth scroll */

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
