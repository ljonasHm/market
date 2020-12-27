'use strict';

function slider(settings, images) {
    
    const sliderString = document.querySelector(settings.sliderStringSelector);
    const sliderButtonLeft = document.querySelector(settings.sliderButtonLeftSelector);
    const sliderButtonRight = document.querySelector(settings.sliderButtonRightSelector);
    let slidePlace = 0;

    sliderString.style.width = images.length * settings.widthOfImgWrapper + 'px';

    images.forEach((img) => {
        const imageWrapper = document.createElement('div');
        const imageDiv = document.createElement('div');

        imageWrapper.classList.add(settings.imageWrapperClassName);
        imageDiv.classList.add(settings.imageDivClassName);

        imageDiv.style.backgroundImage = `url(${img})`;
        imageWrapper.append(imageDiv);
        sliderString.append(imageWrapper);
    });

    sliderButtonLeft.addEventListener('click', () => {
        
        if (settings.buttonsAnimation) {
            sliderButtonLeft.style.backgroundSize = '90% auto';
            setTimeout(() => {
                sliderButtonLeft.style.backgroundSize = '100% auto';
            }, 100);
        }
        
        if(slidePlace < 0) {
            sliderString.style.transform = `translateX(${slidePlace + settings.widthOfImgWrapper}px)`;
            slidePlace = slidePlace + settings.widthOfImgWrapper;
        } else {
            slidePlace = (images.length * -settings.widthOfImgWrapper) + settings.widthOfImgWrapper;
            sliderString.style.transform = `translateX(${slidePlace}px)`;
        }
    });

    sliderButtonRight.addEventListener('click', () => {
        if (settings.buttonsAnimation) {
            sliderButtonRight.style.backgroundSize = '90% auto';
            setTimeout(() => {
                sliderButtonRight.style.backgroundSize = '100% auto';
            }, 100);            
        }
        
        if (slidePlace > (images.length * -settings.widthOfImgWrapper) + settings.widthOfImgWrapper) {
            sliderString.style.transform = `translateX(${slidePlace - settings.widthOfImgWrapper}px)`;
            slidePlace = slidePlace - settings.widthOfImgWrapper;
        } else {
            slidePlace = 0;
            sliderString.style.transform = `translateX(${slidePlace}px)`;
        }
    });
}

export default slider;