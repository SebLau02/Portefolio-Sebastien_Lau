//********** éléments du dom **********

const parcourContainer = document.querySelector(".parcours-global-container");
const scholar = document.querySelector(".scholar-work");
const scholarList = document.querySelector(".scholar-list");
const workList = document.querySelector(".work-list");
const cv = document.querySelector(".cv-container");
const techLogoContainer = document.querySelectorAll(".tech-logo-container");
const techParts = document.querySelectorAll(".technos-parts");
const project = document.querySelectorAll(".project");
const annecdoteContainer = document.querySelector(".annecdote-container");
const annecdoteImg = document.querySelector(".annecdote-img");
const annecdoteSpans = document.querySelectorAll(".annecdote-description span");

//********** scrolltop = scroll depuis le top du document et clientheight = viwport du client **********

const { clientHeight } = document.documentElement;

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
    setTimeout(() => {
      techLogoContainer[8].classList.add("active");
    }, 400);
  }
}

//********** callback sur écoute au scroll sur la partie stack outils pour appliquer des animations **********

function outilsHandleScroll() {
  const topElementToTopViewport = techParts[2].getBoundingClientRect().top;

  if (topElementToTopViewport - clientHeight * 0.8 <= 0) {
    techLogoContainer[9].classList.add("active");
    setTimeout(() => {
      techLogoContainer[10].classList.add("active");
    }, 200);
    setTimeout(() => {
      techLogoContainer[11].classList.add("active");
    }, 400);

    setTimeout(() => {
      techLogoContainer[12].classList.add("active");
    }, 600);
  }
}

//********** callback sur écoute au scroll sur la partie travaux pour appliquer des animations **********

function projectHandleScroll() {
  for (let i = 0; i < project.length; i++) {
    const topElementToTopViewport = project[i].getBoundingClientRect().top;

    if (topElementToTopViewport - clientHeight * 0.6 <= 0) {
      project[i].classList.add("active");

      if (i === 0) {
        project[i].classList.add("hover-me");
      }
    }
  }
}

// Pour ajouter des fonctionnalités supplémentaires sans supprimer handleScroll
window.addEventListener("scroll", () => {
  parallaxScroll();

  parcoursHandleScroll();

  frontHandleScroll();
  backHandleScroll();
  outilsHandleScroll();

  if (window.innerWidth > 425) {
    hiddenNavFunc();
  }
});

window.addEventListener("scroll", projectHandleScroll);

//---------------------------------------------

//********** récupération de données sur mon github **********

//le but ici est de récupérer des projets que j'ai réalisé, depuis mon github
//je récupère le readme de chaque projet qui contienent une description, des images, le nom du projet, le lien pour accéder au site.

const frontendProjectContainer =
  document.querySelectorAll(".front-end-project");
const backendProjectContainer = document.querySelectorAll(".back-end-project");

let frondEndIndex = 0;

const findURL = (text, i) => {
  const urlRegex = /laisse le découvrir \[ici\]\((https:\/\/[^\s)]+)\)/;
  const matchedUrl = text.match(urlRegex);

  const link = frontendProjectContainer[i].children[0];

  if (matchedUrl && matchedUrl[1]) {
    link.href = matchedUrl[1];
  }
};

const findImagesPath = (text, name, i, side) => {
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
        img.alt = `projet ${name}`;
        img.src = data.download_url;

        const link =
          side === "frontend"
            ? frontendProjectContainer[i].children[0]
            : backendProjectContainer[i].children[0];

        link.appendChild(img);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

//---------------------------------------------

//********** trouver la description du projet dans le readme **********

function findDescription(text, i, side) {
  const descriptionRegex = /### Description([\s\S]*?)### Détails/;

  const match = text.match(descriptionRegex);

  const descriptionSection =
    side === "frontend"
      ? frontendProjectContainer[i].children[2]
      : backendProjectContainer[i].children[2];

  if (match && match[1]) {
    descriptionSection.innerText = match[1].trim();
  }
  return "";
}

// pour ajouter une nouveau projet:
// - ajouter le nom du repos dans la catégorie correspondante
// - ajouter une nouvelle section project dans index.html dans la section correspondante
// - ne pas oublier de bien écrire le readme et d'ajouter des images  d'illustratuion

// Ce projet est en attente :

const backEndProjectName = ["l-ardillon-shop-back", "miam-server"];

const frontEndProjectName = [
  "l-ardillon-shop",
  "Pokedex-React",
  "Miam",
  "Check-weather",
  "Travel-Agency",
  "scrolltrigger",
  "credit-card-checkout",
];
//---------------------------------------------

//********** récupérer les readme depuis mon GH, trouver les infos souhaité puis les afficher dans le DOM **********

// les projets frontend dans la partie dédié

frontEndProjectName.forEach((name, index) => {
  fetch(`https://raw.githubusercontent.com/SebLau02/${name}/main/README.md`)
    .then((response) => response.text())
    .then((data) => {
      // console.log(data);

      //---------------------------------------------
      //********** trouver l'url du projet **********

      findURL(data, index);

      //---------------------------------------------

      //********** ajoute le nom du projet dans les projets frontend **********

      const title = frontendProjectContainer[index].children[1];

      title.innerText = name.charAt(0).toUpperCase() + name.slice(1);

      //---------------------------------------------

      //********** trouver les images d'illustration **********

      findImagesPath(data, name, index, "frontend");

      //---------------------------------------------

      //********** trouver la description de chaque projet **********

      findDescription(data, index, "frontend");

      //********** trouver les technos utilisées dans les projets ci-dessus **********

      findStack(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// et les projets backend dans sa partie

backEndProjectName.forEach((name, index) => {
  fetch(`https://raw.githubusercontent.com/SebLau02/${name}/main/README.md`)
    .then((response) => response.text())
    .then((data) => {
      // console.log(data);

      //---------------------------------------------
      //********** trouver l'url du projet **********

      const link = backendProjectContainer[index].children[0];

      link.href = `https://github.com/SebLau02/${name}`;

      //---------------------------------------------

      //********** ajoute le nom du projet les projets backend **********

      const title = backendProjectContainer[index].children[1];

      title.innerText = name.charAt(0).toUpperCase() + name.slice(1);

      //---------------------------------------------

      //********** trouver les images d'illustration **********

      findImagesPath(data, name, index, "backend");

      //---------------------------------------------

      //********** trouver les technos utilisées dans les projets ci-dessus **********

      findDescription(data, index, "backend");

      findStack(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

//---------------------------------------------

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

//---------------------------------------------

//********** annecdote section animation **********

// pour ajouter une nouvelle animation pour la stac
// il faut ajouter le nom de son image dans la liste ci-dessous

const stackImages = [
  "react.png",
  "nodejs.png",
  "express.png",
  "mongodb.png",
  "gsap.svg",
  "tailwind.png",
  "café.png",
  "clavier.png",
]; //nom de mes images d'illustrations

let stackIndex = 0;
let foundedStack = []; // toutes les technos utilisées dans les projets (temporaire)
let reducedFoundedStack = {}; // toutes les technos utilisées dans les projets (temporaire)
let updatedFoundedStack = {}; // toutes les technos utilisées dans les projets (définitif)

const findStack = (text) => {
  // je récupère les différentes technos que j'ai utilisé depuis mon GH

  const regex = /(?<=Technologies:)(.*?)(?=\n\n###|\nImages|$)/gs;

  const matchedStack = text.match(regex);

  const stacks = matchedStack[0].split(",");

  // je l'ajoute dans un tableau temporaire puis je réduis tous les éléments du tableau en minuscule
  foundedStack = [...foundedStack, ...stacks];

  for (let i = 0; i < foundedStack.length; i++) {
    foundedStack[i] = foundedStack[i].toLowerCase();
  }

  // je réduit le tableau en rassemblant les éléments qui se répètent
  // et je rajoute un compteur pour savoir combient ils se répètent

  reducedFoundedStack = foundedStack.reduce((compteur, element) => {
    if (compteur[element]) {
      compteur[element]++;
    } else {
      compteur[element] = 1;
    }
    return compteur;
  }, {});

  const keywordsToRemove = [
    "html",
    "css",
    "javascript",
    "javascript vanilla",
    "html5",
    "js",
    "css3",
  ];

  updatedFoundedStack = filterKeys(reducedFoundedStack, keywordsToRemove);

  // ici important, en fonction de ce qui est écris dans le readme,
  // des termes nouveaux peuvent s'y retrouver et fausser les compteurs
  // bien vérifier avec un
  // console.log(updatedFoundedStack);
  // pour voir si les compteurs correspondent
};

//function permettant de faire défiler les différent éléments

const inOut = (foundedStack) => {
  const firstSpan = annecdoteSpans[0];
  const secondSpan = annecdoteSpans[1];

  if (
    stackImages[stackIndex] !== "café.png" &&
    stackImages[stackIndex] !== "clavier.png"
  ) {
    // on exclu café et clavier car leurs contenu firstSpan est différent

    annecdoteImg.src = `assets/technos/${Object.keys(foundedStack)[
      stackIndex
    ].trim()}.png`;

    secondSpan.innerText = Object.values(foundedStack)[stackIndex];

    if (Object.values(stackImages[stackIndex], foundedStack)[stackIndex] > 0) {
      secondSpan.innerText = "x";
    } else {
      firstSpan.innerText = "x";
    }
  } else if (stackImages[stackIndex] === "café.png") {
    // too vient remplacer * pour le café

    annecdoteImg.src = `assets/technos/${stackImages[stackIndex]}`;
    firstSpan.innerText = "too ";
    secondSpan.innerText = "much";
  } else {
    // idem ici, du texte remplace *
    annecdoteImg.src = `assets/technos/${stackImages[stackIndex]}`;
    firstSpan.innerText = "52.2mpm";
    secondSpan.innerText = "94.2%";
  }

  stackIndex++;

  if (stackIndex >= stackImages.length) {
    stackIndex = 0;
  }
};

const filterKeys = (stackToKeep, stackToRemove) => {
  const filteredObj = {};

  for (const key in stackToKeep) {
    if (!stackToRemove.includes(key.trim())) {
      // si la stack ne fait pas partie de la liste des mots
      // à retirer alors je la garde
      filteredObj[key] = stackToKeep[key];
    }
  }
  return filteredObj;
};

setTimeout(() => {
  inOut(updatedFoundedStack); // permet d'avoir du contenu pendant son apparition

  setInterval(() => {
    inOut(updatedFoundedStack); // permet de faire défiler le contenu après son apparition
  }, 4000);
}, 2000);

//---------------------------------------------

//-- parallax animations

const profileImage = document.querySelector(".profile-image");

const parallaxScroll = () => {
  const scrolled = window.pageYOffset;

  profileImage.style.transform = `translateY(${scrolled * 0.1}px)`;
};

//---------------------------------------------

/* Lenis Smooth scroll */

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//---------------------------------------------

//********** détecter si je scroll vers le haut ou bas pour cacher/afficher la nav bar **********

let scrollY = window.scrollY;

const hiddenNavFunc = () => {
  if (window.scrollY <= scrollY) {
    navigationMenu.classList.remove("hidden");

    scrollY = window.scrollY;
  } else {
    navigationMenu.classList.add("hidden");

    scrollY = window.scrollY;
  }
};
