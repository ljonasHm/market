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

    open(card) {

        const overlay = document.querySelector('.modal__overlay');
        const cardWindow = document.querySelector('.modal__card');
        const sliderString = document.querySelector('.modal__slider-string');

        card.addEventListener('click', (event) => {

            overlay.style.height = window.getComputedStyle(document.body).height;

            cardWindow.style.top = `${event.pageY - event.clientY + 100}px`

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
        });
        
    }

    putInTheCart() {
        const basketList = document.querySelector('.basket__list');
        const basketElement = document.createElement('div');
        const basketSum = document.querySelector('.basket__payment-sum');
        const basket__overlay = document.querySelector('.basket__overlay');

        basketElement.classList.add('basket__element');
        basketElement.innerHTML = `
            <div class="basket__element-info">
                <div class="basket__element-delete">Удалить</div>
                <p class="basket__element-price">${this.price} руб</p>
                <p class="basket__element-name">${this.name}</p>
            </div>
            <div class="basket__element-image"></div>
        `;
        basketElement.querySelector('.basket__element-image').style.backgroundImage = `url(${this.mainImage})`;
        basketList.append(basketElement);
        if (basketSum.classList.contains('hide')) {
            basketSum.classList.remove('hide');
            basket__overlay.classList.add('hide');
            basketSum.innerHTML = `Сумма к оплате: ${+this.price.replace(/\D/, '')} руб`;
        } else {
            basketSum.innerHTML = `Сумма к оплате: ${+basketSum.innerHTML.replace(/\D/g, '') + +this.price.replace(/\D/, '')} руб`;
        }
    }

    render(parent) {
        let element = document.createElement('div');
        element.classList.add('products__card');
        element.innerHTML = `
            <div class="card__img"></div>
            <p class="card__name">${this.name}</p>
            <div class="card__price">
                <p class="card__price-p">${this.price} руб</p>
                <button class="price__basket-button">В корзину</button>
            </div>
        `;
        element.querySelector('.card__img').style.backgroundImage = `url(${this.mainImage})`;
        element.querySelector('.price__basket-button').addEventListener('click', (event) => {
            event.stopPropagation();
            this.putInTheCart();
            showStatusModal('Товар добавлен в корзину', event.pageY-event.clientY + 200);
        });

        parent.append(element);
        this.element = element;
        this.open(element);
    }
}

export {ProductCard};