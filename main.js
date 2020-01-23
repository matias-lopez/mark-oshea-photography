// variables
const navList = document.querySelector(".nav-list");
const burger = document.querySelector(".burger");
const navbar = document.querySelector(".home-nav");
const navElements = document.querySelectorAll(".nav-list li");
const spanElements = document.querySelectorAll(".nav-list span");
const lineElements = document.querySelectorAll(".burger .line");

//sets home-page height to 100vh
window.addEventListener("resize", () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

//click mobile menu
burger.addEventListener("click", () => {
  if (!navList.classList.contains("mobile-nav-transition")) {
    navList.classList.toggle("mobile-nav-transition");
  }
  navList.classList.toggle("close");
  navList.classList.toggle("open");
  if (navList.classList.contains("open")) {
    // lineElements[0].classList.add("line-transition");
    lineElements[0].classList.add("line-up-rotation");
    lineElements[1].classList.add("line-invisible");
    lineElements[2].classList.add("line-down-rotation");

    spanElements.forEach(spanElement =>
      spanElement.classList.add("span-pointer")
    );
  } else {
    lineElements[0].classList.remove("line-up-rotation");
    lineElements[1].classList.remove("line-invisible");
    lineElements[2].classList.remove("line-down-rotation");
    // lineElements[0].classList.remove("line-transition");
    spanElements.forEach(spanElement =>
      spanElement.classList.remove("span-pointer")
    );
  }
});

// when linding to the site, if viewport (vp) is bigger than 1024px
let largeScreenMQ = window.matchMedia("(min-width: 1024px)");
if (largeScreenMQ.matches) {
  window.addEventListener("scroll", changeNav);
  navList.classList.remove("close");
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
    navList.classList.remove("close");
    navList.classList.remove("open");
    navList.classList.remove("mobile-nav-transition");
    navElements.forEach(function(navElement) {
      // navElement.classList.remove("transition");
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
    navList.classList.add("close");
    navList.classList.remove("nav-transparent");
    navList.classList.remove("nav-white");
    navList.classList.remove("nav-short");
    navList.classList.remove("desktop-nav-transition");
    navList.classList.remove("nav-white-transition");
    lineElements[0].classList.remove("line-up-rotation");
    lineElements[1].classList.remove("line-invisible");
    lineElements[2].classList.remove("line-down-rotation");
    navElements.forEach(function(navElement) {
      navElement.classList.remove("visible");
      navElement.classList.remove("invisible");
      navElement.classList.remove("desktop-nav-transition");
      if (navElement.innerText !== "INSTAGRAM") {
        navElement.classList.remove("expanded");
        if (navElement.innerText === "CONTACT") {
          navElement.classList.add("box-shadow");
        }
      } else {
        navElement.classList.remove("instagram-expanded");
        navElement.classList.remove("expanded");
      }
    });
  }
}

// navbar changes onscroll
function changeNav() {
  let scrolled = window.pageYOffset;
  if (scrolled === 0) {
    navList.classList.add("desktop-nav-transition");
    navList.classList.remove("nav-transparent");
    navList.classList.remove("nav-white-transition");
    navList.classList.remove("nav-short");
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
        // navElement.style.textShadow = "none";
      }
    });
  } else {
    navList.classList.add("nav-transparent");
    if (!navList.classList.contains("nav-white-transition")) {
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
        // navElement.style.textShadow = "1.8px 1.8px 2px white";
      }
    });
  }
  // console.log("scrolled", scrolled);
  if (scrolled > window.innerHeight) {
    // console.log(window.innerHeight);
    navList.classList.remove("nav-transparent");
    navList.classList.remove("desktop-nav-transition");
    navList.classList.add("nav-white-transition");
    navList.classList.add("nav-white");
    navList.classList.add("nav-short");
    // navList.style.float = "right";
    // navList.style.right = "0";
    // navList.style.backgroundColor = "white";
    // navList.style.width = "350px";
  } else {
    // navList.classList.remove("nav-white-transition");
    navList.classList.remove("nav-white");
  }
  // if (scrolled >= vh) {
  //   console.log("aca");
  // }
}

//JQuery for scroll animation (footer and portfolio)
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
