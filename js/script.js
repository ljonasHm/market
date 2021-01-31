import cardsRender from './cardsRender';
import modal from './modal';
import form from './form';
import login from './login';
import {basket} from './basket';
import {search} from './search';
import {meetingSlider} from './meetingSlider';
import {renderCategories} from './renderCategories';

const cardSliderSettings = {
    sliderStringSelector: '.modal__slider-string',
    sliderButtonLeftSelector: '#modal__slider-arrow-left',
    sliderButtonRightSelector: '#modal__slider-arrow-right',
    imageWrapperClassName: 'modal__card-image-block',
    imageDivClassName: 'modal__card-image',
    buttonsAnimation: true,
    fullHeightSize: true,
    widthOfImgWrapper: 500
}

const meetingSliderSettings = {
    sliderStringSelector: '.meeting-slider__string',
    sliderButtonLeftSelector: '#meeting-slider__arrow-left',
    sliderButtonRightSelector: '#meeting-slider__arrow-right',
    imageDivClassName: 'meeting-slider__slide',
    buttonsAnimation: false,
    fullHeightSize: false,
    widthOfImgWrapper: 1020,
    insertText: true,
    text: [
        "Dolore commodo nisi eiusmod quis",
        "Est sint pariatur est adipisicing",
        "Cupidatat nisi cupidatat aliqua elit culpa"
    ],
    textClassName: [
        "meeting-slider__slide-text",
        "meeting-slider__slide-text",
        "meeting-slider__slide-text"
    ]
}

renderCategories(cardSliderSettings);
cardsRender('all', cardSliderSettings);
modal();
form();
login();
basket();
search(cardSliderSettings);
meetingSlider(meetingSliderSettings);