import {postResource} from "./request";
import {showStatusModal} from './modal';

const controlPanel = {
    panelClass: "control-panel",
    panelOpenButtonIdSelector: "#header__login-controlPanel",
    

    render() {
        const panel = document.createElement('div');
        this.panel = panel;

        panel.classList.add(this.panelClass);
        panel.innerHTML = `
        <div class="panel__frame">
            <div class="panel__frame-buttons-wrapper">
                <button class="panel__frame-button" id="panel__frame-button-movement"></button>
                <button class="panel__frame-button" id="panel__frame-button-cross"></button>
            </div>
        </div>
        <div class="panel__main">
            <div class="panel__mark-list">
                <div class="panel__mark panel__mark-checked">Добавление товара</div>
                <div class="panel__mark">Добавление категории</div>
                <div class="panel__mark">Добавление администратора</div>
            </div>
            <form class="panel__control-product">
                <div class="panel__control-string">
                    <p class="panel__control-p">Имя продукта:</p>
                    <input class="panel__input" name="name" type="text">
                </div>
                <div class="panel__control-string">
                    <p class="panel__control-p">Изображения:</p>
                    <div class="panel__input-with-list">
                        <button class="panel__button-plus">+</button>
                        <div class="panel__input-list">
                            <input class="panel__input panel__input-img" type="text">
                        </div>
                    </div>
                </div>
                <div class="panel__control-string">
                    <p class="panel__control-p">Цена:</p>
                    <input class="panel__input" name="price" type="text">
                </div>
                <div class="panel__control-string">
                    <p class="panel__control-p">Категории:</p>
                    <div class="panel__input-with-list">
                        <button class="panel__button-plus">+</button>
                        <div class="panel__input-list">
                            <input class="panel__input panel__input-categories" type="text">
                        </div>
                    </div>
                </div>
                <div class="panel__control-string">
                    <p class="panel__control-p">Характеристики:</p>
                    <div class="panel__input-with-list">
                        <button class="panel__button-plus">+</button>
                        <div class="panel__input-list">
                            <input class="panel__input panel__input-characteristics" type="text">
                        </div>
                    </div>
                </div>
                <div class="panel__control-string">
                    <button class="panel__control-button" id="panel__control-submit-product">Принять</button>
                    <button class="panel__control-button panel__control-clear">Очистить</button>
                </div>
            </form>
        </div>
        `;
        document.body.append(panel);
        panel.classList.add('hide');
        
        this.clearForm();
        this.addInput();
        this.submitProduct();
        this.clickMark();
        this.closePanel();
        this.movePanel();
    },

    clearForm() {
        const clearButtons = document.querySelectorAll('.panel__control-clear');

        clearButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                button.parentElement.parentElement.reset();
            });
        });
    },

    addInput() {
        const plusButtons = document.querySelectorAll('.panel__button-plus');

        plusButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const newInput = document.createElement('input');
                button.parentElement.style.height = +window.getComputedStyle(button.parentElement).height.replace(/\D/g, '') + 25 + 'px';
                button.nextElementSibling.firstElementChild.classList.forEach(inputClass => {
                    newInput.classList.add(inputClass);
                });
                button.nextElementSibling.append(newInput);
            });
        });
    },

    submitProduct() {
        const button = document.querySelector('#panel__control-submit-product');
        const form = document.querySelector('.panel__control-product');
                


        button.addEventListener('click', (event) => {
            event.preventDefault();
            const imagesInputs = form.querySelectorAll('.panel__input-img');
            const categoriesInputs = form.querySelectorAll('.panel__input-categories');
            const characteristicsInputs = form.querySelectorAll('.panel__input-characteristics');
            
            const objFormData = Object.fromEntries(new FormData(form));

            objFormData.images = [];
            imagesInputs.forEach((input) => {
                objFormData.images.push(input.value);
            });
            objFormData.categories = [];
            categoriesInputs.forEach((input) => {
                objFormData.categories.push(input.value);
            });
            objFormData.characteristics = [];
            characteristicsInputs.forEach((input) => {
                objFormData.characteristics.push(input.value);
            });
            postResource('http://localhost:3000/products', JSON.stringify(objFormData))
            .then(() => {
                form.reset();
                showStatusModal("Товар успешно добавлен");
            })
            .catch(() => {
                showStatusModal('Произошла ошибка при загрузке товара на сервер');
            });
        });
    },

    closePanel(){
        const crossButton = this.panel.querySelector('#panel__frame-button-cross');

        crossButton.addEventListener('click', () => {
            this.toggleHide();
        });
    },

    movePanel() {
        const movementButton = this.panel.querySelector('#panel__frame-button-movement');

        movementButton.ondragstart = function () {
            return false;
        };
        movementButton.onmousedown = (event) => {

            let shiftX = event.clientX - this.panel.getBoundingClientRect().left;
            let shiftY = event.clientY - this.panel.getBoundingClientRect().top;

            const moveAt = (pageX, pageY) => {
                this.panel.style.left = pageX - shiftX + 'px';
                this.panel.style.top = pageY - shiftY + 'px';
            }

            moveAt(event.pageX, event.pageY);

            function panelMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', panelMove);
            movementButton.onmouseup = function() {
                document.removeEventListener('mousemove', panelMove);
                movementButton.onmouseup = null;
            }
        };
    },

    clickMark() {
        const marks = document.querySelectorAll('.panel__mark');

        marks.forEach((mark) => {
            mark.addEventListener('click', () => {
                marks.forEach((mark) => {
                    mark.classList.remove('panel__mark-checked');
                });
                mark.classList.add('panel__mark-checked');
            });
        });
    },

    toggleHide() {

        this.panel.classList.toggle('hide');
    },

    exit() {
        console.log('exit');
        document.querySelector(`.${this.panelClass}`).remove();
        document.querySelector(this.panelOpenButtonIdSelector).remove();
    }
}

export {controlPanel};