'use strict';

import { remove } from 'lodash';
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

function openCategory(ul) {
    if (!ul.children[0].children[0].classList.contains('open-ul')) {
        toggleMarker(ul);
    }
    if(ul.dataset.category) {
        cardsRender(ul.dataset.category);
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
        }
    });
}

function openUpList() {
    const allLi = document.querySelectorAll('li');
    const allUl = document.querySelectorAll('ul');
    const allMarkers = document.querySelectorAll('.products__marker');

    allLi.forEach(li => {
        li.classList.add('hide');
        li.addEventListener('click', event => {
            event.stopPropagation();
            if(li.dataset.category) {
                cardsRender(li.dataset.category);
            }
            removeAllUnderlines();
            li.classList.toggle('underline');
        })
    });

    allUl.forEach(ul => {
        ul.addEventListener('click', event => {
            event.stopPropagation();
            openCategory(ul);
        });
    });

    allMarkers.forEach(marker => {
        marker.addEventListener('click', event => {
            event.stopPropagation();
            toggleMarker(marker.parentElement.parentElement);
        })
    })
}

export default openUpList;