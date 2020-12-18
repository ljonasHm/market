import {getResource} from './request';
import {ProductCard} from './card';

function calcParent() {
    const productStrings = document.querySelectorAll('.products__string');
    if (!productStrings[0]) {
        console.log(1);
        const firstProductString = document.createElement('div');
        firstProductString.classList.add('products__string');
        document.querySelector('.products__list').append(firstProductString);
        return firstProductString;
    }
    const lastProductString = productStrings[productStrings.length - 1];
    console.log(lastProductString.querySelectorAll('.products__card').length);
    if (lastProductString.querySelectorAll('.products__card').length > 3) {
        const newProductString = document.createElement('div');
        newProductString.classList.add('products__string');
        document.querySelector('.products__list').append(newProductString);
        return newProductString;
    } else {
        return productStrings[productStrings.length - 1];
    }
}

function cardsRender(category) {
    document.querySelector('.products__list').innerHTML = '';
    getResource('http://localhost:3000/products').
    then(data => {
        data.forEach((card) => {
            if (card.category === category || category === 'all')
            new ProductCard(card.name, card.img, card.price, card.category).render(calcParent());
        })
    });
}

export default cardsRender;