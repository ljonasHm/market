import slider from './slider';
import {showStatusModal} from './modal';

class ProductCard {
    constructor(name, images, price, categories, characteristics, cardSliderSettings) {
        this.name = name;
        this.mainImage = images[0];
        this.images = images;
        this.price = price;
        this.categories = categories;
        this.characteristics = characteristics;
        this.cardSliderSettings = cardSliderSettings;
    }

    renderCharacteristics() {

        const parent = document.querySelector('.modal__characteristics-list');
        parent.innerHTML = '';

        if(this.characteristics) {
            this.characteristics.forEach((characteristic) => {
                const newCharecteristic = document.createElement('p');
                newCharecteristic.classList.add('modal__characteristics-p');
                newCharecteristic.innerHTML = ` - ${characteristic}`;
                parent.append(newCharecteristic);
            });
        }
    }

    openCard() {
        const overlay = document.querySelector('.modal__overlay');
        const cardWindow = document.querySelector('.modal__card');
        const sliderString = document.querySelector('.modal__slider-string');

        cardWindow.classList.add('show');
        cardWindow.classList.remove('hide');
        overlay.classList.add('show');
        overlay.classList.remove('hide');
        cardWindow.querySelector('h1').innerHTML = this.name;
        cardWindow.querySelector('.modal__card-price').innerHTML = `${this.price} руб`;
        this.renderCharacteristics();
        sliderString.innerHTML = '';
        sliderString.style.transform = 'translateX(0)';
        slider(this.cardSliderSettings, this.images);
    }

    putInTheCart() {
        const basketList = document.querySelector('.basket__list');
        const basketElement = document.createElement('div');
        basketElement.classList.add('basket__element');
        basketElement.innerHTML = `
            <div class="basket__element-delete"><p>Удалить</p></div>
            <p class="basket__element-price">${this.price} руб</p>
            <div class="basket__element-image"></div>
            <p class="basket__element-name">${this.name}</p>
        `;
        basketElement.querySelector('.basket__element-image').style.backgroundImage = `url(${this.mainImage})`;
        basketList.append(basketElement);
    }

    render(parent) {
        let element = document.createElement('div');
        element.classList.add('products__card');
        element.innerHTML = `
            <div class="card__img"></div>
            <p class="card__name">${this.name}</p>
            <div class="card__price">
                <button class="price__basket-button">В корзину</button>
                <p>${this.price} руб</p>
            </div>
        `;
        element.querySelector('.card__img').style.backgroundImage = `url(${this.mainImage})`;
        element.querySelector('.price__basket-button').addEventListener('click', (event) => {
            event.stopPropagation();
            this.putInTheCart();
            showStatusModal('Товар добавлен в корзину');
        });
        parent.append(element);
        this.element = element;
        element.addEventListener('click', () => {
            this.openCard();
        })
    }
}

export {ProductCard};