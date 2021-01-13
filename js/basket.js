'use strict';

function basket() {
    const basketWindow = document.querySelector('.modal__basket');
    const basketSum = document.querySelector('.basket__payment-sum');
    const basket__overlay = document.querySelector('.basket__overlay');

    basketWindow.addEventListener('click', (event) => {
        if (event.target.classList.contains('basket__element-delete')) {
            const parent = event.target.parentElement;
            console.log(basketSum.innerHTML.replace(/\D/g, ''));
            basketSum.innerHTML = `Сумма к оплате: ${+basketSum.innerHTML.replace(/\D/g, '') - +parent.querySelector('.basket__element-price').innerHTML.replace(/\D/g, '')} руб`;
            parent.remove();
            if (basketSum.innerHTML == 'Сумма к оплате: 0 руб') {
                basketSum.classList.add('hide');
                basket__overlay.classList.remove('hide');
            }
        }
    });
}

export {basket};