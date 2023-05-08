////typeWriter function////////

function typeWriter(word, index, element) {
  if (index < word.length) {
    setTimeout(() => {
      element.innerHTML += `<span>${word[index]}<span>`;
      typeWriter(word, index + 1, element);
    }, 30);
  }
}

//////effet machine à écrire sur l'acceuil////////
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
}, "100");
setTimeout(() => {
  typeWriter(txtPart2, 0, part2);
}, "2000");
setTimeout(() => {
  typeWriter(txtPart3, 0, part3);
}, "6000");

///////parcours animation/////////////

const frise = document.querySelector(".timeline");
const firstChild = frise.querySelector(":nth-child(1)");
const secondChild = frise.querySelector(":nth-child(2)");
const thirdChild = frise.querySelector(":nth-child(3)");

const paragrapheParcours = document.querySelector(".parcours-bot");
const txtParcours = "Comme tu peux le constater, ceci est mon parcours.";

function handleScroll() {
  const { scrollTop, clientHeight } = document.documentElement;

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

    setTimeout(() => {
      typeWriter(txtParcours, 0, paragrapheParcours);
    }, 500);
    window.removeEventListener("scroll", handleScroll);
  }
}

window.addEventListener("scroll", handleScroll);
