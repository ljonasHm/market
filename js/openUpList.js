'use strict';

import cardsRender from './cardsRender';

function removeAllUnderlines() {
    const parent = document.querySelector('.products__categories');
    const allLi = parent.querySelectorAll('li');
    const allUl = parent.querySelectorAll('ul');

    allLi.forEach(li => {
        li.classList.remove('underline');
    })

    allUl.forEach(ul => {
        ul.children[0].classList.remove('underline');
    })
}

function openCategory(ul, cardSliderSettings) {
    const searchInput = document.querySelector('.header__search--input');
    
    if (!ul.children[0].children[0].classList.contains('open-ul')) {
        toggleMarker(ul);
    }
    if(ul.dataset.category) {
        searchInput.value = '';
        cardsRender(ul.dataset.category, cardSliderSettings);
    }
    removeAllUnderlines();
    ul.children[0].classList.toggle('underline');
}

function toggleMarker(ul) {
    let childLies = ul.querySelectorAll('li');
    ul.children[0].children[0].classList.toggle('open-ul');
    childLies.forEach(li => {
        if(li.parentElement === ul) {
            li.classList.toggle('show');
            li.classList.toggle('hide');
        }
    });
}

function openUpList(cardSliderSettings) {
    const openUpListDiv = document.querySelector('.products__categories');
    const allLi = openUpListDiv.querySelectorAll('li');
    const allUl = openUpListDiv.querySelectorAll('ul');
    const allMarkers = openUpListDiv.querySelectorAll('img');
    const searchInput = document.querySelector('.header__search--input');
    const showCategoriesButton = document.querySelector('.products__categories--show-button');

    showCategoriesButton.addEventListener('click', () => {
        if (!(openUpListDiv.style.display == "inline")){
            openUpListDiv.style.display = "inline";
        } else {
            openUpListDiv.style.display = "none";
        }
    });

    allLi.forEach(li => {
        li.classList.add('hide');
        li.addEventListener('click', event => {
            event.stopPropagation();
            if(li.dataset.category) {
                searchInput.value = '';
                cardsRender(li.dataset.category, cardSliderSettings);
            }
            removeAllUnderlines();
            li.classList.toggle('underline');
        })
    });

    allUl.forEach(ul => {
        ul.addEventListener('click', event => {
            event.stopPropagation();
            openCategory(ul, cardSliderSettings);
        });
    });

    allMarkers.forEach(marker => {
        marker.addEventListener('click', event => {
            event.stopPropagation();
            toggleMarker(marker.parentElement.parentElement);
        })
    })
}

export {openUpList};
export {removeAllUnderlines};