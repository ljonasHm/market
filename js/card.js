class ProductCard {
    constructor(name, img, price, category) {
        this.name = name;
        this.img = img;
        this.price = price;
        this.category = category;
    }

    render(parent) {
        let element = document.createElement('div');
        element.classList.add('products__card');
        element.innerHTML = `
            <img class="card__img" src=${this.img}>
            <p class="card__name">${this.name}</p>
            <div class="card__price"><p> руб</p></div>
        `;
        parent.append(element);
    }
}

export {ProductCard};