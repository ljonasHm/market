'use strict';

function slider(imgForSlides) {
    const slider = document.querySelector('.modal__slider');
    const slidesBlock = document.querySelector('.modal__slider-string');
    const sliderButtonLeft = document.querySelector('#modal__slider-arrow-left');
    const sliderButtonRight = document.querySelector('#modal__slider-arrow-right');
    let slidePlace = 0;

    slidesBlock.style.width = imgForSlides.length * 500 + 'px';

    imgForSlides.forEach((img) => {
        const slideShell = document.createElement('div');
        const slide = document.createElement('div');

        slideShell.classList.add('modal__card-image-block');
        slide.classList.add('modal__card-image');

        slide.style.backgroundImage = `url(${img})`;
        slideShell.append(slide);
        slidesBlock.append(slideShell);
    });

    sliderButtonLeft.addEventListener('click', () => {
        sliderButtonLeft.style.backgroundSize = '90% auto';
        setTimeout(() => {
            sliderButtonLeft.style.backgroundSize = '100% auto';
        }, 100);
        if(slidePlace < 0) {
            slidesBlock.style.transform = `translateX(${slidePlace + 500}px)`;
            slidePlace = slidePlace + 500;
        } else {
            slidePlace = (imgForSlides.length * -500) + 500;
            slidesBlock.style.transform = `translateX(${slidePlace}px)`;
        }
    });

    sliderButtonRight.addEventListener('click', () => {
        sliderButtonRight.style.backgroundSize = '90% auto';
        setTimeout(() => {
            sliderButtonRight.style.backgroundSize = '100% auto';
        }, 100);
        if (slidePlace > (imgForSlides.length * -500) + 500) {
            slidesBlock.style.transform = `translateX(${slidePlace - 500}px)`;
            slidePlace = slidePlace - 500;
        } else {
            slidePlace = 0;
            slidesBlock.style.transform = `translateX(${slidePlace}px)`;
        }
    });
}

export default slider;