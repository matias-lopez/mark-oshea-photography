// variables
const navList = document.querySelector(".nav-list");
const navLogo = document.querySelector("nav img");
const navElements = document.querySelectorAll(".nav-list li");
const spanElements = document.querySelectorAll(".nav-list span");
const burger = document.querySelector(".burger");
const lineElements = document.querySelectorAll(".burger div");
const largeScreenMQ = window.matchMedia("(min-width: 1024px)");

//sets home-page height to 100vh
window.addEventListener("resize", () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

//click mobile menu
burger.addEventListener("click", () => {
  navList.classList.add("opacity-transition");
  navList.classList.toggle("open");
  burger.classList.toggle("cross");
  spanElements.forEach(span => span.classList.toggle("span-pointer"));
});

// when landing to the site, if viewport (vp) is bigger than 1024px
if (largeScreenMQ.matches) {
  window.addEventListener("scroll", changeNav);
  navElements.forEach(function(navElement) {
    if (navElement.innerText !== "INSTAGRAM") {
      navElement.classList.add("expanded");
      if (navElement.innerText === "CONTACT") {
        navElement.classList.remove("box-shadow");
      }
    } else {
      navElement.classList.add("instagram-expanded");
    }
  });
}

//listener to the width change (1024px)
largeScreenMQ.addListener(() => {
  widthChange(largeScreenMQ);
});

// depending on if vp width is bigger or smaller than 1024,
//widthChange apply classes to several elements for animation, styling,
// and also remove them, along with scroll listener on mobile.
function widthChange(largeScreenMQ) {
  if (largeScreenMQ.matches) {
    window.addEventListener("scroll", changeNav);
    navList.classList.remove("mobile-nav-transition");
    navElements.forEach(function(navElement) {
      if (navElement.innerText !== "INSTAGRAM") {
        navElement.classList.add("expanded");
        if (navElement.innerText === "CONTACT") {
          navElement.classList.remove("box-shadow");
        }
      } else {
        navElement.classList.add("instagram-expanded");
      }
    });
  } else {
    window.removeEventListener("scroll", changeNav);
    editClasses(
      navList,
      ["nav-transparent", "desktop-nav-transition", "nav-white", "nav-short"],
      false
    );
    navLogo.classList.remove("invisible");
    navElements.forEach(function(navElement) {
      editClasses(
        navElement,
        ["visible", "invisible", "desktop-nav-transition"],
        false
      );
      if (navElement.innerText !== "INSTAGRAM") {
        navElement.classList.remove("expanded");
        if (navElement.innerText === "CONTACT") {
          navElement.classList.add("box-shadow");
        }
      } else {
        navElement.classList.remove("instagram-expanded");
        navElement.classList.remove("expanded");
        editClasses(navList, ["expanded", "instagram-expanded"], false);
      }
    });
  }
}

// navbar changes on scroll
function changeNav() {
  let scrolled = window.pageYOffset;
  if (scrolled === 0) {
    editClasses(navList, ["nav-transparent", "nav-short"], false);
    navLogo.classList.remove("invisible");
    navElements.forEach(function(navElement) {
      if (
        navElement.innerText !== "ABOUT" &&
        navElement.innerText !== "INSTAGRAM" &&
        navElement.innerText !== "CONTACT"
      ) {
        navElement.classList.add("visible");
        navElement.classList.remove("invisible");
      } else {
        if (navElement.innerText === "INSTAGRAM") {
          navElement.classList.add("instagram-expanded");
          navElement.classList.remove("expanded");
        }
      }
    });
  } else {
    navList.classList.add("nav-transparent");
    if (!navList.classList.contains("nav-white")) {
      navList.classList.add("desktop-nav-transition");
    }
    navElements.forEach(function(navElement) {
      navElement.classList.add("desktop-nav-transition");
      if (
        navElement.innerText !== "ABOUT" &&
        navElement.innerText !== "INSTAGRAM" &&
        navElement.innerText !== "CONTACT"
      ) {
        navElement.classList.remove("visible");
        navElement.classList.add("invisible");
      } else {
        if (navElement.innerText === "INSTAGRAM") {
          navElement.classList.remove("instagram-expanded");
          navElement.classList.add("expanded");
        }
      }
    });
  }
  if (scrolled > window.innerHeight) {
    editClasses(navList, ["nav-transparent", "desktop-nav-transition"], false);
    editClasses(navList, ["nav-white", "nav-short"]);
    editClasses(navLogo, ["opacity-transition", "invisible"]);
  } else {
    navList.classList.remove("nav-white");
    editClasses(navLogo, ["invisible"], false);
  }
}

//JQuery for scroll animation (footer and portfolio)
// ---------------------
$(".footer-link").on("click", function() {
  const home = $("#home").position().top;
  // console.log(home);

  $("html, body").animate(
    {
      scrollTop: home
    },
    1000
  );
});

$(".btn.portfolio").on("click", function() {
  const gallery = $("#gallery").position().top;

  $("body, html").animate(
    {
      scrollTop: gallery
    },
    1000
  );
});

// gsap!
// ---------------------

let triggerOffset = document.documentElement.clientHeight;
let sceneStart = triggerOffset;
let duration = sceneStart;

// gsap.set(".timeline-trigger", {
//   top: triggerOffset
// });

// gsap.set(".start-trigger", {
//   top: sceneStart
// });

// gsap.set(".end-trigger", {
//   top: 2389
// });

let span = document.querySelector("#progress-bar");

let timeLine = gsap.timeline({
  paused: true,
  defaults: { duration: duration }
});

const startScrollPos = document.documentElement.scrollTop;
document.documentElement.scrollTop = 0;

timeLine.to(span, { width: "100%" }, sceneStart).to(span, { opacity: 0 });

document.documentElement.scrollTop = startScrollPos;

// Set timeline time to scrollTop
function update() {
  timeLine.time(window.pageYOffset + triggerOffset);
}

window.addEventListener("scroll", update);
update();

// wedding image anim
// ---------------------

let weddingImg = document.querySelector("#wedding-image-container");
let offsetY = document.documentElement.clientHeight;
window.addEventListener("scroll", showWeddingImg);
function showWeddingImg() {
  let scrolledY = window.pageYOffset;
  // console.log(scrolledY);
  gsap.from(weddingImg, { x: "800", opacity: "0" });
  if (scrolledY > 750) {
    gsap.to(weddingImg, {
      x: "0",
      opacity: "1",
      duration: 1
    });
    // gsap.to(weddingImg, { x: "0", opacity: 1 });
    window.removeEventListener("scroll", showWeddingImg);
  }
}

// images modals
// ---------------------
// let images = document.querySelectorAll(".img-container img");
let imageButtons = document.querySelectorAll(".img-container .img-button");
let imageText = document.querySelector(".img-container .img-text");
let modal = document.querySelector("#modal");
let modalImage = document.querySelector(".modal-image");
let modalCaption = document.querySelector(".modal-caption");
let cross = document.querySelector("span.close");

imageButtons.forEach(button => {
  button.addEventListener("click", function() {
    modal.classList.add("visible");
    modalImage.src = button.parentNode.firstElementChild.src;
    modalImage.style.animation = "1s scale-image";
    modalCaption.innerText = button.previousElementSibling.innerText;
    modalCaption.style.animation = "1s scale-image";
    cross.addEventListener("click", function modalClose() {
      modal.classList.remove("visible");
      modalImage.style.animation = "";
      modalCaption.style.animation = "";
      cross.removeEventListener("click", modalClose);
    });
  });
});

// Auxiliar functions
// add on remove style classes
function editClasses(element, classes, add = true) {
  add
    ? classes.forEach(cl => element.classList.add(`${cl}`))
    : classes.forEach(cl => element.classList.remove(`${cl}`));
}

//----------------------/////////----------------------//
// ---------------------// END //---------------------//
//---------------------/////////---------------------//

// ---------------------
// gsap!
// ---------------------
// var tl = new TimelineMax({ onUpdate: updatePercentage });

// let tween = gsap.to("#progress-bar", { scaleX: 100, duration: 1 });

// function updatePercentage() {
// tl.progress();
// console.log(tl.progress);
// }
//
//

// ---------------------
// wedding image on scroll
// ---------------------

// let weddingImg = document.querySelector(".wedding-image img");

// let triggerOffset2 = document.documentElement.clientHeight;
// let sceneStart2 = triggerOffset2;
// let duration2 = sceneStart2;

// gsap.set(".timeline-trigger", {
//   top: triggerOffset2 - 2
// });

// gsap.set(".start-trigger", {
//   top: sceneStart2
// });

// gsap.set(".end-trigger", {
//   top: 2 * sceneStart2
// });

// let timeLine2 = gsap.timeline({
//   paused: true,
//   defaults: { duration: duration2 }
// });

// // const startScrollPos2 = document.documentElement.scrollTop;
// // document.documentElement.scrollTop = 0;

// timeLine
//   .from(weddingImg, { x: "800", opacity: "0" }, sceneStart2 + 300)
//   .to(weddingImg, { x: "0", opacity: 1 });
// // .to(weddingImg, { height: "30%" });

// // document.documentElement.scrollTop = startScrollPos2;

// // Set timeline time to scrollTop
// function update2() {
//   timeLine2.time(window.pageYOffset + triggerOffset2);
// }

// window.addEventListener("scroll", update2);
// update2();
