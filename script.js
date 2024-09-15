//  JavaScript for Carousel

const slides = document.querySelectorAll('.carousel-item');
let currentSlide = 0;

document.getElementById('next').addEventListener('click', () => {
    changeSlide(1);
});

document.getElementById('prev').addEventListener('click', () => {
    changeSlide(-1);
});

function changeSlide(direction) {
    slides[currentSlide].classList.add('hidden');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.remove('hidden');
    slides[currentSlide].classList.add('active');
}