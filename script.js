
const track = document.querySelector(".slider-track");
const slides = Array.from(track.children);

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots-container");
const sliderContainer = document.querySelector(".slider-container");

// Start with the first real image
let currentIndex = 1;
let autoSlide;

// Clone the first and last images for an infinite loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = Array.from(track.children);

// Create navigation dots
slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        currentIndex = index + 1;

        track.style.transition = "transform 0.5s ease-in-out";

        updateSlider();
        updateDots();
    });

    dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

// Update the image position
function updateSlider() {
    const slideWidth = slides[0].clientWidth;

    track.style.transform =
        `translateX(-${currentIndex * slideWidth}px)`;
}

// Update the active navigation dot
function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));

    let realIndex = currentIndex - 1;

    if (realIndex < 0) {
        realIndex = slides.length - 1;
    }

    if (realIndex >= slides.length) {
        realIndex = 0;
    }

    dots[realIndex].classList.add("active");
}

// Move to the next image
function nextSlide() {
    currentIndex++;

    track.style.transition = "transform 0.5s ease-in-out";

    updateSlider();
    updateDots();
}

// Move to the previous image
function prevSlide() {
    currentIndex--;

    track.style.transition = "transform 0.5s ease-in-out";

    updateSlider();
    updateDots();
}

// Button events
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Handle the infinite loop
track.addEventListener("transitionend", () => {
    if (track.children[currentIndex] === firstClone) {
        track.style.transition = "none";
        currentIndex = 1;
        updateSlider();
    }

    if (track.children[currentIndex] === lastClone) {
        track.style.transition = "none";
        currentIndex = slides.length;
        updateSlider();
    }

    updateDots();
});

// Set the initial position
updateSlider();
updateDots();

// Update image position when the window is resized
window.addEventListener("resize", updateSlider);

// Automatic sliding every 5 seconds
function startAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}

startAutoSlide();

// Pause automatic sliding when the mouse is over the slider
sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

// Resume automatic sliding when the mouse leaves
sliderContainer.addEventListener("mouseleave", startAutoSlide);
