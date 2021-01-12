import openUpList from './openUpList';
import cardsRender from './cardsRender';
import modal from './modal';
import form from './form';
import login from './login';
import {basket} from './basket';

const cardSliderSettings = {
    sliderStringSelector: '.modal__slider-string',
    sliderButtonLeftSelector: '#modal__slider-arrow-left',
    sliderButtonRightSelector: '#modal__slider-arrow-right',
    imageWrapperClassName: 'modal__card-image-block',
    imageDivClassName: 'modal__card-image',
    buttonsAnimation: true,
    widthOfImgWrapper: 500
}

openUpList();
cardsRender('all', cardSliderSettings);
modal();
form();
login();
basket();