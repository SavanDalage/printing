"use strict";

// array dla klawiszy oraz zbiór stron
var buttonsArray = Array.from(document.getElementsByClassName("button"));
var pages = document.getElementsByClassName("section");

console.log(buttonsArray);
console.log(pages);

// funkcja podświetlająca klawisze
function highlight(event) {
  buttonsArray.forEach((button) => {
    button.classList.remove("highlighted");
  });
  event.target.classList.add("highlighted");
}

// dla array klawiszy listener kliknięcia. Podświetla klawisze i na podstawie klikniętego klawisza przywołuję odpowiednią stronę
buttonsArray.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    highlight(event);
    document.getElementById(`p${index + 1}`).scrollIntoView();
  });
});

// Intersection Observer callback
function intersectionCallback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      var index = Array.from(pages).indexOf(entry.target);
      buttonsArray.forEach((button) => {
        button.classList.remove("highlighted");
      });
      buttonsArray[index].classList.add("highlighted");
    }
  });
}

function createObservers() {
  let threshold;
  if (matchMedia("only screen and (max-height: 500px)").matches) {
    threshold = 0.1; // Trigger kiedy 10% jest widoczne
  } else if (matchMedia("only screen and (max-width: 800px)").matches) {
    threshold = 0.05; // Trigger kiedy 5% jest widoczne; dla wąskich ekranów
  } else {
    threshold = 0.5; // Trigger kiedy 50% jest widoczne
  }

  // Create Intersection Observer dla ustalonego treshold
  const observer = new IntersectionObserver(intersectionCallback, {
    threshold: threshold,
  });

  // Observe for each page
  Array.from(pages).forEach((page) => {
    observer.observe(page);
  });
}

// Initial observer creation
createObservers();
// sprawdzanie zmiany wysokości strony
window.addEventListener("resize", createObservers);

// NAPIS GŁÓWNY - pojawianie się tylko raz na początku

document.addEventListener("DOMContentLoaded", function () {
  const headline = document.querySelector(".headline");

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function onScroll() {
    if (isInViewport(headline)) {
      headline.classList.add("visible");
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
});

// Chowanie headera

const wrapper = document.querySelector(".wrapper");
const nav = document.getElementById("header");
let lastScrollY = wrapper.scrollTop;
let headerHidden = false;

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const handleScroll = debounce(() => {
  const currentScrollY = wrapper.scrollTop;

  if (!headerHidden && currentScrollY > 999 && currentScrollY > lastScrollY) {
    nav.classList.add("hidden");
    headerHidden = true;
  }

  if (headerHidden && lastScrollY - currentScrollY > 20) {
    nav.classList.remove("hidden");
    headerHidden = false;
  }

  lastScrollY = currentScrollY;
}, 50);

wrapper.addEventListener("scroll", handleScroll);
