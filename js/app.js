/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

// Define Global Variables
const state = {
  sections: [],
  navList: []
};

// building the nav bar and events
const startNav = () => {
  buildSections();

  buildNav();

  state.sections.forEach(item => {
    addEvents(`#${item.sectionId}`, `#${item.navLink}`);
  });
};

// This function will add the scroll event
// and the click event to the elements
const addEvents = (sectionId, navLink) => {
  const sectionElement = document.querySelector(sectionId);
  const navElement = document.querySelector(navLink);

  sectionElement.classList.add("reveal-item");
  sectionElement.isRevealed = false;

  const addFunctionsToScrollEvent = () => {
    if (sectionElement.isRevealed == false) {
      setTimeout(() => calculateIfScrolledTo(sectionElement), 500);
    }
    setTimeout(() => activateIfOnTop(sectionElement, navElement), 500);
  };

  window.addEventListener("scroll", addFunctionsToScrollEvent);
  addCLickEventToNavItems(navElement, sectionElement);
};

// calculating the elements boundaries
// to add and remove classes
const calculateIfScrolledTo = el => {
  let scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100;

  if (scrollPercent < 75) {
    el.classList.add("is-visible");
    el.isRevealed = true;
  }
};

// calculating the elements boundaries
// to add and remove classes
const activateIfOnTop = (el, navItem) => {
  let scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100;

  const inRange = scrollPercent < 50 && scrollPercent > -5;

  if (inRange) {
    navItem.classList.add("active");
  } else {
    if (navItem.classList.contains("active")) navItem.classList.remove("active");
  }
};

// build sections and nav list in global variables
const buildSections = () => {
  const sectionsList = document.querySelectorAll("section");

  sectionsList.forEach((item, i) => {
    state.sections.push({
      sectionId: item.id,
      navLink: `nav${i + 1}`
    });
    buildNavItem(item.getAttribute("data-nav"), `nav${i + 1}`);
  });
};

// build the nav items and list
const buildNavItem = (content, id) => {
  state.navList.push(`<li id=${id}>${content}</li>`);
};

const buildNav = () => {
  const navElement = document.querySelector("#navbar__list");

  navElement.innerHTML = `${state.navList.map(item => item).join(" ")}`;
};

// add click events
const addCLickEventToNavItems = (navElement, sectionElement) => {
  const scrollToFunction = () => {
    const targetPosition = sectionElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = startPosition + targetPosition - 80;

    window.scrollTo({
      top: distance,
      left: 0,
      behavior: "smooth"
    });
  };

  navElement.addEventListener("click", scrollToFunction);
};

startNav();
