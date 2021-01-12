'use strict';

function basket() {
    const basketWindow = document.querySelector('.modal__basket');

    basketWindow.addEventListener('click', (event) => {
        if (event.target.classList.contains('basket__element-delete')) {
            event.target.parentElement.remove();
        }
    });
}

export {basket};