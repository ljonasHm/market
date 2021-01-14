import cardsRender from './cardsRender';
import {removeAllUnderlines} from './openUpList';

function search(cardSliderSettings) {
    const searchInput = document.querySelector('.header__search--input');
    searchInput.addEventListener('input', () => {
        removeAllUnderlines();
        cardsRender('', cardSliderSettings, searchInput.value);
    });
}

export {search};