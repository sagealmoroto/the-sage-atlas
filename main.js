let index = 0; // Current slide
const slides = document.querySelectorAll(".slide");

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
