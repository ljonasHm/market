'use strict';

function slider(settings, images) {
    
    const sliderString = document.querySelector(settings.sliderStringSelector);
    const sliderButtonLeft = document.querySelector(settings.sliderButtonLeftSelector);
    const sliderButtonRight = document.querySelector(settings.sliderButtonRightSelector);
    let slidePlace = 0;

    sliderString.style.width = images.length * settings.widthOfImgWrapper + 'px';

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