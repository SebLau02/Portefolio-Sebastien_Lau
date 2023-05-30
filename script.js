//////queryselectors/////////

const globalSectionsContainer = document.querySelector(
  ".global-sections-container"
);

////typeWriter function////////

function typeWriter(word, index, element) {
  if (index < word.length) {
    setTimeout(() => {
      element.innerHTML += `<span>${word[index]}<span>`;
      typeWriter(word, index + 1, element);
    }, 30);
  }
}

//////acceuil section////////

const part1 = document.querySelector(".part-1");
const part2 = document.querySelector(".part-2");
const part3 = document.querySelector(".part-3");

const txt =
  "Bonjour à toi, je suis Sébastien et te souhaite la bienvenue sur mon portfolio. Et maintenant je t’invite à naviguer vers le bas pour en savoir plus sur moi.";

const txtPart1 = "Bonjour à toi,";
const txtPart2 =
  "je suis Sébastien et te souhaite la bienvenue sur mon portfolio.";
const txtPart3 =
  "Maintenant je t’invite à naviguer vers le bas pour en savoir plus sur moi.";

setTimeout(() => {
  typeWriter(txtPart1, 0, part1);
}, "1300");
setTimeout(() => {
  typeWriter(txtPart2, 0, part2);
}, "2500");
setTimeout(() => {
  typeWriter(txtPart3, 0, part3);
}, "5300");

///////parcours animation/////////////

const frise = document.querySelector(".timeline");
const firstChild = frise.querySelector(":nth-child(1)");
const secondChild = frise.querySelector(":nth-child(2)");
const thirdChild = frise.querySelector(":nth-child(3)");

const paragrapheParcours = document.querySelector(".parcours-bot");
const txtParcours = "Tu peux retrouver tout mon parcours dans cette partie.";
const { scrollTop, clientHeight } = document.documentElement;

function parcoursHandleScroll() {
  const topElementToTopViewport = frise.getBoundingClientRect().top;

  if (
    scrollTop >
    (scrollTop + topElementToTopViewport).toFixed() - clientHeight * 0.9
  ) {
    frise.style = "width:80%";

    setTimeout(() => {
      firstChild.classList.add("active-date");
    }, 300);

    setTimeout(() => {
      secondChild.classList.add("active-date");
    }, 500);

    setTimeout(() => {
      thirdChild.classList.add("active-date");
    }, 800);

    typeWriter(txtParcours, 0, paragrapheParcours);

    retourBtn.classList.add("opacity");
    retourBtn.classList.add("transform");

    globalSectionsContainer.removeEventListener("scroll", parcoursHandleScroll);
  }
}

globalSectionsContainer.addEventListener("scroll", parcoursHandleScroll);

// // /////////////projet section animation/////////////

const projetContainer = document.querySelector(".projet-container");
const projet = document.querySelectorAll(".projet");
const projetNom = document.querySelectorAll(".projet-nom");
const gitHub = document.querySelector(".mes-projets-plus");

const projetBot = document.querySelector(".projet-bot");
const projetTextePart1 =
  "Dans cette partie tu peux visionner mes différents projets, ";
const projetTextePart2 = "n'hésites pas à cliquer dessus.";

function projetHandleScroll() {
  const topElementToTopViewport = projetContainer.getBoundingClientRect().top;

  if (
    scrollTop >
    (scrollTop + topElementToTopViewport).toFixed() - clientHeight * 0.9
  ) {
    typeWriter(projetTextePart1, 0, projetBot);

    setTimeout(() => {
      typeWriter(projetTextePart2, 0, projetBot);
    }, 2300);

    for (let i = 0; i < projet.length; i++) {
      projet.forEach((el) => {
        setTimeout(() => {
          el.style = "height: 15vmax;";
          el.classList.add("active-project");
        }, 500);
      });

      projetNom.forEach((el) => {
        setTimeout(() => {
          el.classList.add("active-projet-plus");
          gitHub.classList.add("active-projet-plus");
        }, 1500);
      });
    }

    globalSectionsContainer.removeEventListener("scroll", projetHandleScroll);
  }
}

globalSectionsContainer.addEventListener("scroll", projetHandleScroll);

// // ///////////contact section animation///////////////

const contactContainer = document.querySelector(".contact-container");
const contactBot = document.querySelector(".contact-bot");

const contactTextePart1 = "Et si tu veux me contacter, ";
const contactTextePart2 =
  "tu trouveras tout ce qu'il faut dans cette section !";

function contactHandleScroll() {
  const topElementToTopViewport = contactContainer.getBoundingClientRect().top;

  if (
    scrollTop >
    (scrollTop + topElementToTopViewport).toFixed() - clientHeight * 0.5
  ) {
    typeWriter(contactTextePart1, 0, contactBot);

    setTimeout(() => {
      typeWriter(contactTextePart2, 0, contactBot);
    }, 1800);

    globalSectionsContainer.removeEventListener("scroll", contactHandleScroll);
  }
}

globalSectionsContainer.addEventListener("scroll", contactHandleScroll);

///////////////techno annimation section///////////////////////

const technosContainer = document.querySelector(".techno-container");
const technosBot = document.querySelector(".technos-bot");
const technosText = "Voici les différentes technos que j'utilise.";
const technosImgNameContainer = document.querySelectorAll(
  ".techno-image-container"
);

function technosHandleScroll() {
  const topElementToTopViewport = technosContainer.getBoundingClientRect().top;

  if (
    scrollTop >
    (scrollTop + topElementToTopViewport).toFixed() - clientHeight * 0.9
  ) {
    typeWriter(technosText, 0, technosBot);

    globalSectionsContainer.removeEventListener("scroll", technosHandleScroll);

    // for (let i = 0; i < technosImgNameContainer.length; i++) {
    technosImgNameContainer.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("active-techno");
        el.style.transition = `transform 0.7s ease-in-out ${
          i * 0.2
        }s, opacity 0.7s ease-in-out ${i * 0.2}s`;
      }, 500);
    });
  }
}

globalSectionsContainer.addEventListener("scroll", technosHandleScroll);

// retour section////////////

const retourBtn = document.querySelector(".retour");

retourBtn.addEventListener("click", () => {
  globalSectionsContainer.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

/////////////////appear section///////////////

const imageProfile = document.querySelector(".profile-image");
const presentationBot = document.querySelector(".presentation-bot");

setTimeout(() => {
  imageProfile.classList.add("opacity");
  presentationBot.classList.add("opacity");
}, 800);
