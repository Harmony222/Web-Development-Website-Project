let slideNum = 1;
let pauseStatus = false;
let slides = Array.from(document.getElementsByClassName("slides"));
let dots = Array.from(document.querySelectorAll(".dot"));
let pause = document.getElementById("pause");
let prev = document.querySelector(".prev i");
let next = document.querySelector(".next i");

function carousel_auto() {
    if (!pauseStatus) {
        let prev = slideNum;
        slideNum++;
        if (slideNum > slides.length) {
            slideNum = 1;
        }
        setSlide(slideNum, prev);
        setTimeout(carousel_auto, 4000);
    }
}

document.addEventListener("DOMContentLoaded", startCarousel);

function startCarousel() {
    setTimeout(carousel_auto, 4000);
}

prev.addEventListener('click', () => carousel_manual(-1));
next.addEventListener('click', () => carousel_manual(1));

function carousel_manual(n) {
    let prev = slideNum;
    slideNum += n;
    if (slideNum < 1) {
        slideNum = slides.length;
    }
    if (slideNum > slides.length) {
        slideNum = 1
    }
    setSlide(slideNum, prev);
}

pause.addEventListener('click', function() {
    if (!pauseStatus) {
        pauseStatus = true;
        pause.setAttribute("class", "inverted large play icon");
    } else {
        pauseStatus = false;
        pause.setAttribute("class", "inverted large pause icon");
        setTimeout(carousel_auto, 3000);
    }
})

for (let dot of dots) {
    dot.addEventListener('click', () => dotSelect(dot))
}

function dotSelect(dot) {
    let prev = slideNum;
    slideNum = dots.indexOf(dot) + 1;
    setSlide(slideNum, prev);
}

function setSlide(newnum, prev) {
    let currentslide = slides[prev - 1];
    let newslide = slides[newnum - 1];

    currentslide.classList.remove("fadeIn");
    newslide.classList.add('fadeIn');

    for (i = 0; i < slides.length; i++) {
        dots[i].classList.remove("selected");
    }
    dots[slideNum - 1].classList.toggle("selected");
}