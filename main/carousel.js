const carousel = document.querySelector('.carouselOfImage');
const dot = document.querySelectorAll('.dot');
const nextButton = document.getElementById('nextButton');
const previousButton = document.getElementById('previousButton');
const imageLink = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5fc9e7a7f342b6a6.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/bd4cf86703c6399a.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5a2311ff9e965a96.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/2a531c5058aa50b3.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ae9a1349fe262071.png?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d05c680ac784bef4.png?q=20"
]

let currSlide = -1;

function createCarousel() {

    imageLink.forEach((e) => {

        const carouselImage = document.createElement('img');
        carouselImage.setAttribute('class', 'carouselImage');

        carouselImage.setAttribute('src', e);
        carouselImage.setAttribute('alt', 'carousel Image');

        carousel.appendChild(carouselImage);
    })
}

let currentIndex = 0;
let previousDot = dot[0];


createCarousel();

const carouselImage = document.querySelectorAll(".carouselImage");


function carouselSlider() {
    currSlide = (currSlide + 1) % carouselImage.length;
    carouselImage.forEach((item) => {
        item.style.transform = "unset";
    });
    carouselImage[currSlide].style.transform = `translateX(-${(currSlide) * 100}%)`
    previousDot.style.backgroundColor = 'grey';
    previousDot.style.borderRadius = "50%";
    previousDot.style.width = "6px";
    dot[currSlide].style.backgroundColor = '#012a4a';
    dot[currSlide].style.borderRadius = "5px";
    dot[currSlide].style.width = "10px";
    previousDot = dot[currSlide];
}


nextButton.addEventListener("click", () => {
    carouselSlider();
})

previousButton.addEventListener("click", () => {
    currSlide = currSlide === 0 ? carouselImage.length - 1 : (currSlide - 1) % carouselImage.length;
    carouselImage.forEach((item) => {
        item.style.transform = "unset";
    });
    carouselImage[currSlide].style.transform = `translateX(-${(currSlide) * 100}%)`
    previousDot.style.backgroundColor = 'grey';
    previousDot.style.borderRadius = "50%";
    previousDot.style.width = "6px";
    dot[currSlide].style.backgroundColor = '#012a4a';
    dot[currSlide].style.borderRadius = "5px";
    dot[currSlide].style.width = "10px";
    previousDot = dot[currSlide];
})

setInterval(carouselSlider , 3000)

carouselSlider();
