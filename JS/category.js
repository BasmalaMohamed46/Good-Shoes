// Clear the console
console.clear();

// Destructure the gsap and imagesLoaded objects from the window object
const { gsap, imagesLoaded } = window;

// Select relevant DOM elements
const buttons = {
  prev: document.querySelector(".btn--left"),
  next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");
const cardInfosContainerEl = document.querySelector(".info__wrapper");

// Add event listeners for the navigation buttons
buttons.next.addEventListener("click", () => swapCards("right"));
buttons.prev.addEventListener("click", () => swapCards("left"));

// Function to swap cards
function swapCards(direction) {
  const currentCardEl = cardsContainerEl.querySelector(".current--card");
  const previousCardEl = cardsContainerEl.querySelector(".previous--card");
  const nextCardEl = cardsContainerEl.querySelector(".next--card");

  const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
  const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
  const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

  // Change the card information
  changeInfo(direction);
  // Swap the classes for the cards
  swapCardsClass();

  // Remove pointermove event listener from the current card
  removeCardEvents(currentCardEl);

  // Function to swap the classes for the cards
  function swapCardsClass() {
    // Remove current, previous, and next card classes
    currentCardEl.classList.remove("current--card");
    previousCardEl.classList.remove("previous--card");
    nextCardEl.classList.remove("next--card");

    // Remove current, previous, and next background image classes
    currentBgImageEl.classList.remove("current--image");
    previousBgImageEl.classList.remove("previous--image");
    nextBgImageEl.classList.remove("next--image");

    // Set z-index for current card and background image
    currentCardEl.style.zIndex = "50";
    currentBgImageEl.style.zIndex = "-2";

    // Check the direction to determine the new classes and z-index values
    if (direction === "right") {
      previousCardEl.style.zIndex = "20";
      nextCardEl.style.zIndex = "30";

      nextBgImageEl.style.zIndex = "-1";

      currentCardEl.classList.add("previous--card");
      previousCardEl.classList.add("next--card");
      nextCardEl.classList.add("current--card");

      currentBgImageEl.classList.add("previous--image");
      previousBgImageEl.classList.add("next--image");
      nextBgImageEl.classList.add("current--image");
    } else if (direction === "left") {
      previousCardEl.style.zIndex = "30";
      nextCardEl.style.zIndex = "20";

      previousBgImageEl.style.zIndex = "-1";

      currentCardEl.classList.add("next--card");
      previousCardEl.classList.add("current--card");
      nextCardEl.classList.add("previous--card");

      currentBgImageEl.classList.add("next--image");
      previousBgImageEl.classList.add("current--image");
      nextBgImageEl.classList.add("previous--image");
    }
  }
}

// Function to change the card information
function changeInfo(direction) {
  let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
  let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
  let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

  // Animate the change in information
  gsap.timeline()
    .to([buttons.prev, buttons.next], {
      duration: 0.2,
      opacity: 0.5,
      pointerEvents: "none",
    })
    .to(
      currentInfoEl.querySelectorAll(".text"),
      {
        duration: 0.4,
        stagger: 0.1,
        translateY: "-120px",
        opacity: 0,
      },
      "-="
    )
    .call(() => {
      // Swap the classes for the info elements
      swapInfosClass(direction);
    })
    .call(() => {
      // Re-enable pointer events for the buttons and re-initialize card events
      initCardEvents();
    })
    .fromTo(
      direction === "right"
        ? nextInfoEl.querySelectorAll(".text")
        : previousInfoEl.querySelectorAll(".text"),
      {
        opacity: 0,
        translateY: "40px",
      },
      {
        duration: 0.4,
        stagger: 0.1,
        translateY: "0px",
        opacity: 1,
      }
    )
    .to([buttons.prev, buttons.next], {
      duration: 0.2,
      opacity: 1,
      pointerEvents: "all",
    });

  // Function to swap the classes for the info elements
  function swapInfosClass() {
    currentInfoEl.classList.remove("current--info");
    previousInfoEl.classList.remove("previous--info");
    nextInfoEl.classList.remove("next--info");

    if (direction === "right") {
      currentInfoEl.classList.add("previous--info");
      nextInfoEl.classList.add("current--info");
      previousInfoEl.classList.add("next--info");
    } else if (direction === "left") {
      currentInfoEl.classList.add("next--info");
      nextInfoEl.classList.add("previous--info");
      previousInfoEl.classList.add("current--info");
    }
  }
}

// Function to update card position based on mouse position
function updateCard(e) {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const centerPosition = {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
  };
  let angle =
    Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
  gsap.set(card, {
    "--current-card-rotation-offset": `${angle}deg`,
  });
  const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
  gsap.set(currentInfoEl, {
    rotateY: `${angle}deg`,
  });
}

// Function to reset card transforms
function resetCardTransforms(e) {
  const card = e.currentTarget;
  const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
  gsap.set(card, {
    "--current-card-rotation-offset": 0,
  });
  gsap.set(currentInfoEl, {
    rotateY: 0,
  });
}

// Function to initialize card events
function initCardEvents() {
  const currentCardEl = cardsContainerEl.querySelector(".current--card");
  currentCardEl.addEventListener("pointermove", updateCard);
  currentCardEl.addEventListener("pointerout", (e) => {
    resetCardTransforms(e);
  });
}

// Function to remove card events
function removeCardEvents(card) {
  card.removeEventListener("pointermove", updateCard);
}

// Function to initialize the animation
function init() {
  let tl = gsap.timeline();

  tl.to(cardsContainerEl.children, {
      delay: 0.15,
      duration: 0.5,
      stagger: {
        ease: "power4.inOut",
        from: "right",
        amount: 0.1,
      },
      "--card-translateY-offset": "0%",
    })
    .to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
      delay: 0.5,
      duration: 0.4,
      stagger: 0.1,
      opacity: 1,
      translateY: 0,
    })
    .to(
      [buttons.prev, buttons.next], {
        duration: 0.4,
        opacity: 1,
        pointerEvents: "all",
      },
      "-=0.4"
    );
}

// Function to wait for images to load
const waitForImages = () => {
  const images = [...document.querySelectorAll("img")];
  const totalImages = images.length;
  let loadedImages = 0;
  const loaderEl = document.querySelector(".loader span");

  gsap.set(cardsContainerEl.children, {
    "--card-translateY-offset": "100vh",
  });
  gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
    translateY: "40px",
    opacity: 0,
  });
  gsap.set([buttons.prev, buttons.next], {
    pointerEvents: "none",
    opacity: "0",
  });

  images.forEach((image) => {
    imagesLoaded(image, (instance) => {
      if (instance.isComplete) {
        loadedImages++;
        let loadProgress = loadedImages / totalImages;

        gsap.to(loaderEl, {
          duration: 1,
          scaleX: loadProgress,
          backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
        });

        if (totalImages == loadedImages) {
          gsap.timeline()
            .to(".loading__wrapper", {
              duration: 0.8,
              opacity: 0,
              pointerEvents: "none",
            })
            .call(() => init());
        }
      }
    });
  });
};

// Call the function to wait for images to load
waitForImages();