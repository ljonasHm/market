'use strict';

function slider(settings, images) {
    
    const sliderString = document.querySelector(settings.sliderStringSelector);
    const sliderButtonLeft = document.querySelector(settings.sliderButtonLeftSelector);
    const sliderButtonRight = document.querySelector(settings.sliderButtonRightSelector);
    let timer;
    let slidePlace = 0;
    settings.widthOfImgWrapper = +window.getComputedStyle(document.querySelector(settings.sliderWrapperSelector)).width.replace(/px/g, '');
    console.log(window.getComputedStyle(document.querySelector(settings.sliderWrapperSelector)).width);
    console.log(settings.widthOfImgWrapper);

    sliderString.style.width = images.length * settings.widthOfImgWrapper + 'px';

    if (settings.timeout) {
        timer = setInterval(() => {
            moveRight();
        }, settings.timeout);
    }


    images.forEach((img, index) => {
        const imageWrapper = document.createElement('div');
        const imageDiv = document.createElement('div');
    
        imageDiv.classList.add(settings.imageDivClassName);

        imageDiv.style.backgroundImage = `url(${img})`;
        
        if(settings.insertText) {
            const text = document.createElement('div');
            text.innerHTML = settings.text[index];
            text.classList.add(settings.textClassName[index]);
            imageDiv.append(text);
        }

        if(settings.fullHeightSize) {
            imageWrapper.classList.add(settings.imageWrapperClassName);
            imageWrapper.append(imageDiv);
            sliderString.append(imageWrapper);
        } else {
            sliderString.append(imageDiv);
        }

    });

    sliderButtonLeft.addEventListener('click', () => {
        
        if (settings.buttonsAnimation) {
            sliderButtonLeft.style.backgroundSize = '90% auto';
            setTimeout(() => {
                sliderButtonLeft.style.backgroundSize = '100% auto';
            }, 100);
        }
        moveLeft();
        if (settings.timeout) {
            clearInterval(timer);
        }
    });

    sliderButtonRight.addEventListener('click', () => {
        if (settings.buttonsAnimation) {
            sliderButtonRight.style.backgroundSize = '90% auto';
            setTimeout(() => {
                sliderButtonRight.style.backgroundSize = '100% auto';
            }, 100);            
        }
        moveRight();
        if (settings.timeout) {
            clearInterval(timer);
        }
    });

    function moveRight() {
        if (slidePlace > (images.length * -settings.widthOfImgWrapper) + settings.widthOfImgWrapper) {
            sliderString.style.transform = `translateX(${slidePlace - settings.widthOfImgWrapper}px)`;
            slidePlace = slidePlace - settings.widthOfImgWrapper;
        } else {
            slidePlace = 0;
            sliderString.style.transform = `translateX(${slidePlace}px)`;
        }
        
    }

    function moveLeft() {
        if(slidePlace < 0) {
            sliderString.style.transform = `translateX(${slidePlace + settings.widthOfImgWrapper}px)`;
            slidePlace = slidePlace + settings.widthOfImgWrapper;
        } else {
            slidePlace = (images.length * -settings.widthOfImgWrapper) + settings.widthOfImgWrapper;
            sliderString.style.transform = `translateX(${slidePlace}px)`;
        }
    }
}

export default slider;