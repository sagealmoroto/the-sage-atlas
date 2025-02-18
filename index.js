let index = 0; // Current slide
const slides = document.querySelectorAll(".slide");

//Function to display the current slide
function showSlide(n) {
    slides.forEach((slide, i) => {
        slide.style.display = i === n ? "block" : "none";
    });
}

// Next/previous controls
function changeSlides(n) {
    index += n;
    if (index >=slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    showSlide(index);
}

// Initial display
showSlide(index);

// Timer for automatic cycling
let slideTimer = setInterval(() => {
    changeSlides(1); // Automatically move to the next slide
}, 10000);

// Pause/resume timer on user interaction
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", () => clearInterval(slideTimer));
carousel.addEventListener("mouseleave", () => {
    slideTimer = setInterval(() => {
        changeSlides(1);
    }, 10000);
});