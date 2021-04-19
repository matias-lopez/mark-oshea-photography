(function () {
  // variables
  const navList = document.querySelector(".nav-list");
  const navLogo = document.querySelector("nav img");
  const navElements = document.querySelectorAll(".nav-list li");
  const spanElements = document.querySelectorAll(".nav-list span");
  const burger = document.querySelector(".burger");
  // const lineElements = document.querySelectorAll(".burger div");
  const largeScreenMQ = window.matchMedia("(min-width: 1024px)");

  //sets home-page height to 100vh
  // window.addEventListener("resize", () => {
  //   vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // });

  //click mobile menu
  burger.addEventListener("click", () => {
    navList.classList.add("opacity-transition");
    navList.classList.toggle("open");
    burger.classList.toggle("cross");
    spanElements.forEach((span) => span.classList.toggle("span-pointer"));
  });

  let triggerHeight;
  let lastScrollY = 700;
  // when loading the website, if viewport (vp) is bigger than 1024px
  if (largeScreenMQ.matches) {
    triggerHeight = 700;
    slideImage(triggerHeight);
    window.addEventListener("scroll", changeNav);
    navElements.forEach(function (navElement) {
      if (navElement.innerText !== "ABOUT") {
        navElement.classList.add("expanded");
        if (navElement.innerText === "CONTACT") {
          navElement.classList.remove("box-shadow");
        }
      } else {
        navElement.classList.add("about-expanded");
      }
    });
  } else {
    triggerHeight = 550;
    slideImage(triggerHeight);
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
      navList.classList.remove("opacity-transition");
      navElements.forEach(function (navElement) {
        if (navElement.innerText !== "ABOUT") {
          navElement.classList.add("expanded");
          if (navElement.innerText === "CONTACT") {
            navElement.classList.remove("box-shadow");
          }
        } else {
          navElement.classList.add("about-expanded");
        }
      });
      let scrolled = window.pageYOffset;
      if (scrolled > window.innerHeight)
        navList.classList.add("nav-white-transition");
    } else {
      window.removeEventListener("scroll", changeNav);
      editClasses(
        navList,
        [
          "nav-transparent",
          "desktop-nav-transition",
          "nav-white-transition",
          "nav-white",
          "nav-short",
        ],
        false
      );
      navLogo.classList.remove("invisible");
      navElements.forEach(function (navElement) {
        editClasses(
          navElement,
          ["visible", "invisible", "desktop-nav-transition"],
          false
        );
        if (navElement.innerText !== "INSTAGRAM") {
          navElement.classList.remove("expanded");
          if (navElement.innerText === "CONTACT")
            navElement.classList.add("box-shadow");
          if (navElement.innerText === "ABOUT")
            navElement.classList.remove("about-expanded");
        } else {
          navElement.classList.remove("expanded");
          editClasses(navList, ["expanded", "about-expanded"], false);
        }
      });
    }
  }

  // navbar changes on scroll
  function changeNav() {
    let scrolled = window.pageYOffset;
    if (scrolled === 0) {
      editClasses(navList, ["nav-transparent", "nav-short"], false);
      navElements.forEach(function (navElement) {
        if (
          navElement.innerText !== "ABOUT" &&
          navElement.innerText !== "CONTACT"
        ) {
          navElement.classList.add("visible");
          navElement.classList.remove("invisible");
        } else {
          if (navElement.innerText === "ABOUT") {
            navElement.classList.add("about-expanded");
            navElement.classList.remove("expanded");
          }
        }
      });
    } else {
      navList.classList.add("nav-transparent");
      if (!navList.classList.contains("nav-white")) {
        navList.classList.add("desktop-nav-transition");
      }
      navElements.forEach(function (navElement) {
        navElement.classList.add("desktop-nav-transition");
        if (
          navElement.innerText !== "ABOUT" &&
          navElement.innerText !== "CONTACT"
        ) {
          navElement.classList.remove("visible");
          navElement.classList.add("invisible");
        } else {
          if (navElement.innerText === "ABOUT") {
            navElement.classList.remove("about-expanded");
            navElement.classList.add("expanded");
          }
        }
      });
    }
    if (scrolled > window.innerHeight) {
      editClasses(
        navList,
        ["nav-transparent", "desktop-nav-transition"],
        false
      );
      editClasses(navList, ["nav-white", "nav-short"]);
      editClasses(navLogo, ["opacity-transition", "invisible"]);
    } else {
      editClasses(navList, ["nav-white", "nav-white-transition"], false);
      editClasses(navLogo, ["invisible"], false);
    }
  }

  // images modals
  // ---------------------
  const imageButtons = document.querySelectorAll(".img-container .img-button");
  const modal = document.querySelector("#modal");
  const modalImage = document.querySelector(".modal-image");
  const modalCaption = document.querySelector(".modal-caption");
  const cross = document.querySelector("span.close");
  const weddingButton = document.getElementById("wedding-image-caption");
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");

  const imgContainers = document.querySelectorAll(
    ".gallery-images .img-container"
  );
  let containersArray = Array.prototype.slice.call(imgContainers);

  imageButtons.forEach((button) => {
    let bindedInitModal = initModal.bind(null, button);
    button.addEventListener("click", bindedInitModal);
  });
  let bindedWeddingModal = initModal.bind(null, weddingButton);
  weddingButton.addEventListener("click", bindedWeddingModal);

  function initModal(button) {
    modal.classList.add("visible");
    cross.classList.add("emerge");
    modalImage.src = button.parentNode.firstElementChild.src;
    modalImage.style.animation = "1s scale-image";
    if (button.classList.contains("img-button")) {
      modalCaption.innerText = button.previousElementSibling.innerText;
      modalCaption.style.animation = "1s scale-image";
      leftArrow.classList.add("emerge");
      rightArrow.classList.add("emerge");
      changeImage(button.parentNode);
      imgContainers.forEach((imgContainer) => {
        let img = imgContainer.firstElementChild;
        if (img.dataset.src !== "") {
          img.src = img.dataset.src;
          img.dataset.src = "";
        }
      });
    } else {
      modalCaption.innerText = button.innerText;
      modalCaption.style.animation = "1s scale-image";
    }
    cross.addEventListener("click", function modalClose() {
      modal.classList.remove("visible");
      cross.classList.remove("emerge");
      leftArrow.classList.remove("emerge", "not-allowed");
      rightArrow.classList.remove("emerge", "not-allowed");
      modalImage.style.animation = "";
      modalCaption.style.animation = "";
      // cross.removeEventListener("click", modalClose);
    });
  }

  function changeImage(container) {
    if (!container.previousElementSibling) {
      leftArrow.classList.add("not-allowed");
    } else if (!container.nextElementSibling) {
      rightArrow.classList.add("not-allowed");
    }
    leftArrow.addEventListener("click", () => {
      if (container.previousElementSibling) {
        if (!container.previousElementSibling.previousElementSibling) {
          leftArrow.classList.add("not-allowed");
        } else if (rightArrow.classList.contains("not-allowed")) {
          rightArrow.classList.remove("not-allowed");
        }
        modalImage.src = container.previousElementSibling.firstElementChild.src;
        modalCaption.innerText =
          container.previousElementSibling.children[2].innerHTML;
        container = container.previousElementSibling;
      }
    });
    rightArrow.addEventListener("click", () => {
      if (container.nextElementSibling) {
        if (!container.nextElementSibling.nextElementSibling) {
          rightArrow.classList.add("not-allowed");
        } else if (leftArrow.classList.contains("not-allowed")) {
          leftArrow.classList.remove("not-allowed");
        }
        modalImage.src = container.nextElementSibling.firstElementChild.src;
        modalCaption.innerText =
          container.nextElementSibling.children[2].innerHTML;
        container = container.nextElementSibling;
      }
    });
  }

  //JQuery for scroll animation (footer and portfolio)
  // ---------------------
  $("#footer-link").on("click", function () {
    const home = $("#home").position().top;
    // console.log(home);

    $("html, body").animate(
      {
        scrollTop: home,
      },
      1000
    );
  });

  $(".btn.contact").on("click", function () {
    const gallery = $(".gallery-header").position().top;

    $("body, html").animate(
      {
        scrollTop: gallery,
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
  window.addEventListener("scroll", update);
  let span = document.querySelector("#progress-bar");
  let timeLine = gsap.timeline({
    paused: true,
    defaults: { duration: duration },
  });
  timeLine.to(span, { width: "100%" }, sceneStart).to(span, { opacity: 0 });
  // Set timeline time to scrollTop
  function update() {
    timeLine.time(window.pageYOffset + triggerOffset);
  }

  // wedding image anim
  let weddingImg = document.querySelector("#wedding-image");
  let weddingBg = document.getElementById("wedding-bg");
  let weddingBgBack = document.getElementById("wedding-bg-2");
  weddingBg.classList.add("bg-light");
  weddingBgBack.classList.add("bg-dark");

  function slideImage(triggerOffset) {
    bindedPrepareSlide = prepareSlide.bind(null, triggerOffset);
    window.addEventListener("scroll", bindedPrepareSlide);
  }

  function prepareSlide(triggerOffset) {
    lastScrollY = window.scrollY;
    if (lastScrollY > triggerOffset) {
      window.requestAnimationFrame(animateImages);
    }
  }

  function animateImages() {
    let tl = gsap.timeline();
    tl.to(weddingImg, {
      x: "0",
      duration: 1.5,
      ease: "back",
    })
      .to(
        weddingImg,
        { opacity: "1", duration: 1.5, ease: "slow", onComplete: callback1 },
        0
      )
      .to(
        weddingBg,
        {
          x: "0",
          duration: 1.6,
          ease: "back",
          onComplete: callback2,
        },
        0
      )
      .to(
        weddingBgBack,
        {
          x: "0",
          duration: 1.675,
          ease: "back",
          onComplete: callback2,
        },
        0
      );
    window.removeEventListener("scroll", bindedPrepareSlide);
  }

  function callback1() {
    document.documentElement.style.setProperty("--opacity-inner", "40%");
    document.documentElement.style.setProperty("--opacity-outer", "55%");
    document.documentElement.style.setProperty("--opacity-button", 1);
  }

  function callback2() {
    weddingImg.parentNode.classList.remove("bg-light");
  }

  const weddingTitles = document.querySelectorAll(".wedding-text h3");
  const weddingPs = document.querySelectorAll(".wedding-text p");
  window.addEventListener("scroll", showTitles);
  window.addEventListener("scroll", showParagraphs);

  function showTitles() {
    let scrollY = window.scrollY;
    if (scrollY > triggerOffset) {
      let tl = gsap.timeline();
      weddingTitles.forEach((title) => {
        tl.fromTo(
          title,
          { scale: 0, opacity: 0, ease: "back" },
          { scale: 1, opacity: 1, ease: "back" },
          "+=0.4"
        );
      });
      window.removeEventListener("scroll", showTitles);
    }
  }

  function showParagraphs() {
    let scrollY = window.scrollY;
    if (scrollY > triggerOffset) {
      let tl = gsap.timeline({ delay: 0.5 });
      weddingPs.forEach((link) => {
        tl.to(
          link,
          1,
          { opacity: 1 }
          // "+=0.35"
        );
      });
      window.removeEventListener("scroll", showParagraphs);
    }
  }

  // gsap + scrollmagic
  const controller = new ScrollMagic.Controller();
  const tl = gsap.timeline();

  tl.to("#parallax-bg", 1, { y: "-20%", ease: Power0.easeIn }).to(
    "#parallax-content",
    0.2,
    { opacity: 1, ease: Power0.easeIn },
    0.2
  );

  let parallaxScene = new ScrollMagic.Scene({
    triggerElement: "#parallax-container",
    triggerHook: 1,
    duration: "200%",
  })
    .setTween(tl)
    .addTo(controller);

  // intersection observer API
  let observer;
  let delay = 750;
  let options = {
    root: null,
    rootMargin: "25% 0%",
    threshold: 0,
  };

  if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window
  ) {
    observer = new IntersectionObserver(callback, options);
    containersArray.forEach((container) => {
      observer.observe(container);
    });
  } else {
    lazyFallback();
    initLazyFallback();
  }

  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (typeof entry.isIntersecting !== "undefined") {
        if (entry.isIntersecting) {
          requestImages(entry.target, observer);
        }
      } else if (typeof entry.intersectionRatio !== "undefined") {
        if (entry.intersectionRatio > 0) {
          requestImages(entry.target, observer);
        }
      }
    });
  }

  function requestImages(target, observer) {
    let img = target.firstElementChild;
    if (img.attributes.src.value === "") {
      img.src = img.dataset.src;
      img.dataset.src = "";
    }
    target.style.animation = `test-anim 1000ms ease ${delay}ms forwards`;
    updateDelay();
    observer.unobserve(target);
  }

  function initLazyFallback() {
    document.addEventListener("scroll", lazyFallback);
    window.addEventListener("resize", lazyFallback);
    window.addEventListener("orientationchange", lazyFallback);
  }

  // needs to be debounced or throttled
  function lazyFallback() {
    containersArray.forEach((container) => {
      if (
        container.getBoundingClientRect().top <= window.innerHeight &&
        container.getBoundingClientRect().bottom >= 0
      ) {
        container.firstElementChild.src =
          container.firstElementChild.dataset.src;
        container.style.animation = `test-anim 1000ms ease ${delay}ms forwards`;
        updateDelay();
        containersArray = containersArray.filter((image) => {
          return image.firstElementChild !== container.firstElementChild;
        });
        if (containersArray.length === 0) {
          document.removeEventListener("scroll", lazyFallback);
          window.removeEventListener("resize", lazyFallback);
          window.removeEventListener("orientationchange", lazyFallback);
        }
      }
    });
  }

  function updateDelay() {
    delay = delay + 150;
    if (delay === 1350) {
      delay = 750;
    }
  }

  // Helper functions
  // add or remove style classes
  function editClasses(element, classes, add = true) {
    add
      ? classes.forEach((cl) => element.classList.add(`${cl}`))
      : classes.forEach((cl) => element.classList.remove(`${cl}`));
  }
})();

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

// requestanimationframe to delay scroll based calls, buttons
