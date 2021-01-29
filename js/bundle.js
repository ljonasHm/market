/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/basket.js":
/*!**********************!*\
  !*** ./js/basket.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "basket": () => /* binding */ basket
/* harmony export */ });


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



/***/ }),

/***/ "./js/card.js":
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductCard": () => /* binding */ ProductCard
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./js/slider.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modal.js");



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
            (0,_slider__WEBPACK_IMPORTED_MODULE_0__.default)(this.cardSliderSettings, this.images);
        });
        
    }

    putInTheCart() {
        const basketList = document.querySelector('.basket__list');
        const basketElement = document.createElement('div');
        const basketSum = document.querySelector('.basket__payment-sum');
        const basket__overlay = document.querySelector('.basket__overlay');

        basketElement.classList.add('basket__element');
        basketElement.innerHTML = `
            <div class="basket__element-delete">Удалить</div>
            <p class="basket__element-price">${this.price} руб</p>
            <div class="basket__element-image"></div>
            <p class="basket__element-name">${this.name}</p>
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
                <button class="price__basket-button">В корзину</button>
                <p>${this.price} руб</p>
            </div>
        `;
        element.querySelector('.card__img').style.backgroundImage = `url(${this.mainImage})`;
        element.querySelector('.price__basket-button').addEventListener('click', (event) => {
            event.stopPropagation();
            this.putInTheCart();
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Товар добавлен в корзину', event.pageY-event.clientY + 200);
        });

        parent.append(element);
        this.element = element;
        this.open(element);
    }
}



/***/ }),

/***/ "./js/cardsRender.js":
/*!***************************!*\
  !*** ./js/cardsRender.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./js/request.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ "./js/card.js");



function calcParent() {
    const productStrings = document.querySelectorAll('.products__string');
    if (!productStrings[0]) {
        const firstProductString = document.createElement('div');
        firstProductString.classList.add('products__string');
        document.querySelector('.products__list').append(firstProductString);
        return firstProductString;
    }
    const lastProductString = productStrings[productStrings.length - 1];
    if (lastProductString.querySelectorAll('.products__card').length > 3) {
        const newProductString = document.createElement('div');
        newProductString.classList.add('products__string');
        document.querySelector('.products__list').append(newProductString);
        return newProductString;
    } else {
        return productStrings[productStrings.length - 1];
    }
}

function cardsRender(category, cardSliderSettings, searchInput) {
    document.querySelector('.products__list').innerHTML = '';
    (0,_request__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/products').
    then(data => {
        data.forEach((card) => {
            if (card.categories.includes(category) || category === 'all' && !searchInput) {
                new _card__WEBPACK_IMPORTED_MODULE_1__.ProductCard(card.name, card.images, card.price, card.categories, card.characteristics, cardSliderSettings).render(calcParent());
            } else if (searchInput != undefined && card.name.toLowerCase().indexOf(searchInput.toLowerCase()) != -1) {
                new _card__WEBPACK_IMPORTED_MODULE_1__.ProductCard(card.name, card.images, card.price, card.categories, card.characteristics, cardSliderSettings).render(calcParent());
            }
        })
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cardsRender);

/***/ }),

/***/ "./js/changeUser.js":
/*!**************************!*\
  !*** ./js/changeUser.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _controlPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controlPanel */ "./js/controlPanel.js");
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ "./js/request.js");



function changeUser(userLogin) {
    const buttonsHeader = document.querySelectorAll('.header__button');
    const loginButton = document.querySelector('#header__login-button');

    buttonsHeader.forEach((button) => {
        if (button.id != 'header__login-logout' && button.id != 'header__login-controlPanel') {
            button.classList.toggle('hide');
        }
    });
    loginButton.innerHTML = userLogin;
    (0,_request__WEBPACK_IMPORTED_MODULE_1__.getResource)('http://localhost:3000/users')
    .then(data => {
        if(data.find(user => user.admin === true && user.login === userLogin)) {
            const userButtonList = document.querySelector('.header__login-buttons-list');
            const controlPanelButton = document.createElement('button');

            controlPanelButton.classList.add('header__button');
            controlPanelButton.classList.add('header__button-additional');
            controlPanelButton.classList.add('hide');
            controlPanelButton.id = 'header__login-controlPanel';
            controlPanelButton.innerHTML = 'Панель управления';
            userButtonList.append(controlPanelButton);
            _controlPanel__WEBPACK_IMPORTED_MODULE_0__.controlPanel.render();
            controlPanelButton.addEventListener('click', () => {
                _controlPanel__WEBPACK_IMPORTED_MODULE_0__.controlPanel.toggleHide();
            });
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changeUser);

/***/ }),

/***/ "./js/controlPanel.js":
/*!****************************!*\
  !*** ./js/controlPanel.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "controlPanel": () => /* binding */ controlPanel
/* harmony export */ });
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./js/request.js");


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
                    <button class="panel__control-button">Очистить</button>
                </div>
            </form>
        </div>
        `;
        document.body.append(panel);
        panel.classList.add('hide');
        
        this.addInput();
        this.submitProduct();
        this.clickMark();
        this.closePanel();
        this.movePanel();
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
            const formData = new FormData(form);

            console.log(Object.fromEntries(formData));
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



/***/ }),

/***/ "./js/form.js":
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./js/request.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modal.js");
/* harmony import */ var _changeUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./changeUser */ "./js/changeUser.js");
// import FormData from 'form-data';





'use strict';

function form() {
    
    const registrationForm = document.querySelector('.modal__registration-form');
    const authorizationForm = document.querySelector('.modal__authorization-form');
    const registrationWindow = document.querySelector('#modal__registration');
    const authorizationWindow = document.querySelector('#modal__authorization');

    registrationForm.addEventListener('submit', (event) => {

        event.preventDefault();
        registrationWindow.classList.add('hide');
        registrationWindow.classList.remove('show');
        (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();

        const registrationData = new FormData(registrationForm);
        const objectData = Object.fromEntries(registrationData.entries());
        objectData.admin = false;
        const jsonData = JSON.stringify(objectData);

        (0,_request__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/users')
        .then(data => {
            if (data.some((serverDataElement) => {
                return ((serverDataElement.mail == JSON.parse(jsonData).mail && serverDataElement.login == JSON.parse(jsonData).login) ? true : false);
            })) {
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Такой почтовый адрес и логин уже зарегестрированы', event.pageY-event.clientY + 200);
            } else if (data.some((serverDataElement) => {
                return ((serverDataElement.mail == JSON.parse(jsonData).mail) ? true : false);
            })) {
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Такой почтовый адрес уже зарегестрирован', event.pageY-event.clientY + 200);
            } else if (data.some((serverDataElement) => {
                return ((serverDataElement.login == JSON.parse(jsonData).login) ? true : false);
            })) {
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Такой логин уже существует', event.pageY-event.clientY + 200);
            } else {
                (0,_request__WEBPACK_IMPORTED_MODULE_0__.postResource)('http://localhost:3000/users', jsonData)
                .then(() => {
                    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();
                    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Регистрация прошла успешно', event.pageY-event.clientY + 200);
                    registrationForm.reset();
                    localStorage.setItem('user', JSON.parse(jsonData).login);
                    (0,_changeUser__WEBPACK_IMPORTED_MODULE_2__.default)(JSON.parse(jsonData).login);
                })
                .catch(() => {
                    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();
                    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Произошла ошибка при загрузке данных на сервер', event.pageY-event.clientY + 200);
                });
            }
        })
        .catch(() => {
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Произошла ошибка при запросе с сервера', event.pageY-event.clientY + 200);
        })
    })

    authorizationForm.addEventListener('submit', (event) => {

        event.preventDefault();

        authorizationWindow.classList.add('hide');
        authorizationWindow.classList.remove('show');
        (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();

        const authorizationData = new FormData(authorizationForm);
        const jsonData = JSON.stringify(Object.fromEntries(authorizationData.entries()));

        (0,_request__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/users')
        .then((data) => {
            if(data.some((serverDataElement) => {
                if (serverDataElement.login == JSON.parse(jsonData).login && serverDataElement.password == JSON.parse(jsonData).password) {
                    return true;
                } else {
                    return false;
                }
            })) {
                    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();
                    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Вы успешно авторизованы', event.pageY-event.clientY + 200);
                    authorizationForm.reset();
                    localStorage.setItem('user', JSON.parse(jsonData).login);
                    (0,_changeUser__WEBPACK_IMPORTED_MODULE_2__.default)(JSON.parse(jsonData).login);
                } else {
                    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();
                    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Введены неверный логин и/или пароль', event.pageY-event.clientY + 200);
            }
        })
        .catch(() => {
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleLoadingWindow)();
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showStatusModal)('Произошла ошибка при запросе с сервера', event.pageY-event.clientY + 200);
        })
    })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/login.js":
/*!*********************!*\
  !*** ./js/login.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _changeUser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changeUser */ "./js/changeUser.js");
/* harmony import */ var _controlPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controlPanel */ "./js/controlPanel.js");



function toggleAdditionalButtons() {
    const loginButton = document.querySelector('#header__login-button');
    const loginButtonsList = document.querySelector('.header__login-buttons-list');
    const listButtons = loginButtonsList.querySelectorAll('.header__button');

    listButtons.forEach(button => {
        if (button != loginButton) {
            button.classList.toggle('hide');
        }
    });
}

function login() {
    const loginButton = document.querySelector('#header__login-button');
    const logOutButton = document.querySelector('#header__login-logout');

    if (localStorage.getItem('user')) {
        (0,_changeUser__WEBPACK_IMPORTED_MODULE_0__.default)(localStorage.getItem('user'));
    }
    
    loginButton.addEventListener('click', () => {
        toggleAdditionalButtons();
    });

    logOutButton.addEventListener('click', () => {
        (0,_changeUser__WEBPACK_IMPORTED_MODULE_0__.default)('');
        localStorage.removeItem('user');
        toggleAdditionalButtons();
        _controlPanel__WEBPACK_IMPORTED_MODULE_1__.controlPanel.exit();
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (login);

/***/ }),

/***/ "./js/meetingSlider.js":
/*!*****************************!*\
  !*** ./js/meetingSlider.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "meetingSlider": () => /* binding */ meetingSlider
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./js/slider.js");


function meetingSlider(sliderSettings) {
    
    (0,_slider__WEBPACK_IMPORTED_MODULE_0__.default)(sliderSettings, ['img/meeting1.jpg', 'img/meeting2.jpg', 'img/meeting3.jpg']);
}



/***/ }),

/***/ "./js/modal.js":
/*!*********************!*\
  !*** ./js/modal.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "showStatusModal": () => /* binding */ showStatusModal,
/* harmony export */   "toggleLoadingWindow": () => /* binding */ toggleLoadingWindow
/* harmony export */ });
'use script';

function modal() {
    const modalOverlay = document.querySelector('.modal__overlay');
    const modalRegistration = document.querySelector('#modal__registration');
    const modalAuthorization = document.querySelector('#modal__authorization');
    const modalCard = document.querySelector('.modal__card');
    const modalBasket = document.querySelector('.modal__basket');
    const registrationButton = document.querySelector('#header__registration');
    const authorizationButton = document.querySelector('#header__authorization');
    const basketButton = document.querySelector('#header__basket-button');
    let closeModalButtons = document.querySelectorAll('.modal__close');
    closeModalButtons = Array.prototype.slice.call(closeModalButtons);
    const modalStatus = document.querySelector('#modal__status');

    registrationButton.addEventListener('click', () => {
        openModal(modalRegistration, modalOverlay);
    });

    authorizationButton.addEventListener('click', () => {
        openModal(modalAuthorization, modalOverlay);
    });

    basketButton.addEventListener('click', () => {
        openModal(modalBasket, modalOverlay);
    })

    modalOverlay.addEventListener('click', (event) => {
        event.stopPropagation();
        if ((event.target === modalOverlay
                || closeModalButtons.includes(event.target))
                    && modalRegistration.classList.contains('show')) {
                        closeModal(modalRegistration, modalOverlay);
        } else if ((event.target === modalOverlay
                || closeModalButtons.includes(event.target))
                    && modalAuthorization.classList.contains('show')) {
                        closeModal(modalAuthorization, modalOverlay);
        } else if ((event.target === modalOverlay
                || closeModalButtons.includes(event.target))
                    && modalCard.classList.contains('show')) {
                        closeModal(modalCard, modalOverlay);
        } else if ((event.target === modalOverlay
            || closeModalButtons.includes(event.target))
                && modalStatus.classList.contains('show')) {
                    closeModal(modalStatus, modalOverlay);
        } else if ((event.target === modalOverlay
            || closeModalButtons.includes(event.target))
                && modalBasket.classList.contains('show')) {
                    closeModal(modalBasket, modalOverlay);
        }
    });

    function closeModal(modal, modalOverlay) {
        modal.classList.add('hide');
        modal.classList.remove('show');
        modalOverlay.classList.add('hide');
        modalOverlay.classList.remove('show');
    }
    
    function openModal(modal, modalOverlay) {
        modal.classList.remove('hide');
        modal.classList.add('show');
        modalOverlay.classList.remove('hide');
        modalOverlay.classList.add('show');
    }
}

function showStatusModal(message, coordinateY) {
    const statusWindow = document.querySelector('#modal__status');
    const overlay = document.querySelector('.modal__overlay');

    statusWindow.style.top = coordinateY + 'px';

    if (overlay.classList.contains('hide')) {
        overlay.classList.remove('hide');
        overlay.classList.add('show');
    }
    
    statusWindow.classList.remove('hide');
    statusWindow.classList.add('show');
    statusWindow.innerHTML = `<p class="modal__status-p">${message}</p>`;
}

function toggleLoadingWindow() {
    const loadingWindow = document.querySelector('.modal__loading');

    loadingWindow.classList.toggle('hide');
    loadingWindow.classList.toggle('show');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/openUpList.js":
/*!**************************!*\
  !*** ./js/openUpList.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openUpList": () => /* binding */ openUpList,
/* harmony export */   "removeAllUnderlines": () => /* binding */ removeAllUnderlines
/* harmony export */ });
/* harmony import */ var _cardsRender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cardsRender */ "./js/cardsRender.js");




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
        (0,_cardsRender__WEBPACK_IMPORTED_MODULE_0__.default)(ul.dataset.category, cardSliderSettings);
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

function openUpList(cardSliderSettings) {
    const openUpListDiv = document.querySelector('.products__categories');
    const allLi = openUpListDiv.querySelectorAll('li');
    const allUl = openUpListDiv.querySelectorAll('ul');
    const allMarkers = openUpListDiv.querySelectorAll('img');
    const searchInput = document.querySelector('.header__search--input');

    

    allLi.forEach(li => {
        li.classList.add('hide');
        li.addEventListener('click', event => {
            event.stopPropagation();
            if(li.dataset.category) {
                searchInput.value = '';
                (0,_cardsRender__WEBPACK_IMPORTED_MODULE_0__.default)(li.dataset.category, cardSliderSettings);
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




/***/ }),

/***/ "./js/request.js":
/*!***********************!*\
  !*** ./js/request.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => /* binding */ getResource,
/* harmony export */   "postResource": () => /* binding */ postResource
/* harmony export */ });



const getResource = async (url) => {
    const result = await fetch(url);
    
    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
};

const postResource = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};




/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _openUpList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./openUpList */ "./js/openUpList.js");
/* harmony import */ var _cardsRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cardsRender */ "./js/cardsRender.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ "./js/modal.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form */ "./js/form.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login */ "./js/login.js");
/* harmony import */ var _basket__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./basket */ "./js/basket.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search */ "./js/search.js");
/* harmony import */ var _meetingSlider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./meetingSlider */ "./js/meetingSlider.js");









const cardSliderSettings = {
    sliderStringSelector: '.modal__slider-string',
    sliderButtonLeftSelector: '#modal__slider-arrow-left',
    sliderButtonRightSelector: '#modal__slider-arrow-right',
    imageWrapperClassName: 'modal__card-image-block',
    imageDivClassName: 'modal__card-image',
    buttonsAnimation: true,
    fullHeightSize: true,
    widthOfImgWrapper: 500
}

const meetingSliderSettings = {
    sliderStringSelector: '.meeting-slider__string',
    sliderButtonLeftSelector: '#meeting-slider__arrow-left',
    sliderButtonRightSelector: '#meeting-slider__arrow-right',
    imageDivClassName: 'meeting-slider__slide',
    buttonsAnimation: false,
    fullHeightSize: false,
    widthOfImgWrapper: 1020,
    insertText: true,
    text: [
        "Dolore commodo nisi eiusmod quis",
        "Est sint pariatur est adipisicing",
        "Cupidatat nisi cupidatat aliqua elit culpa"
    ],
    textClassName: [
        "meeting-slider__slide-text",
        "meeting-slider__slide-text",
        "meeting-slider__slide-text"
    ]
}

;(0,_openUpList__WEBPACK_IMPORTED_MODULE_0__.openUpList)(cardSliderSettings);
(0,_cardsRender__WEBPACK_IMPORTED_MODULE_1__.default)('all', cardSliderSettings);
(0,_modal__WEBPACK_IMPORTED_MODULE_2__.default)();
(0,_form__WEBPACK_IMPORTED_MODULE_3__.default)();
(0,_login__WEBPACK_IMPORTED_MODULE_4__.default)();
(0,_basket__WEBPACK_IMPORTED_MODULE_5__.basket)();
(0,_search__WEBPACK_IMPORTED_MODULE_6__.search)(cardSliderSettings);
(0,_meetingSlider__WEBPACK_IMPORTED_MODULE_7__.meetingSlider)(meetingSliderSettings);

/***/ }),

/***/ "./js/search.js":
/*!**********************!*\
  !*** ./js/search.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "search": () => /* binding */ search
/* harmony export */ });
/* harmony import */ var _cardsRender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cardsRender */ "./js/cardsRender.js");
/* harmony import */ var _openUpList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./openUpList */ "./js/openUpList.js");



function search(cardSliderSettings) {
    const searchInput = document.querySelector('.header__search--input');
    searchInput.addEventListener('input', () => {
        (0,_openUpList__WEBPACK_IMPORTED_MODULE_1__.removeAllUnderlines)();
        (0,_cardsRender__WEBPACK_IMPORTED_MODULE_0__.default)('', cardSliderSettings, searchInput.value);
    });
}



/***/ }),

/***/ "./js/slider.js":
/*!**********************!*\
  !*** ./js/slider.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function slider(settings, images) {
    
    const sliderString = document.querySelector(settings.sliderStringSelector);
    const sliderButtonLeft = document.querySelector(settings.sliderButtonLeftSelector);
    const sliderButtonRight = document.querySelector(settings.sliderButtonRightSelector);
    let slidePlace = 0;

    sliderString.style.width = images.length * settings.widthOfImgWrapper + 'px';

    images.forEach((img, index) => {
        const imageWrapper = document.createElement('div');
        const imageDiv = document.createElement('div');
    
        imageDiv.classList.add(settings.imageDivClassName);

        imageDiv.style.backgroundImage = `url(${img})`;
        
        if(settings.insertText) {
            const text = document.createElement('div');
            text.innerHTML = settings.text[index];
            text.classList.add(settings.textClassName[index]);
            imageDiv.append(text);
        }

        if(settings.fullHeightSize) {
            imageWrapper.classList.add(settings.imageWrapperClassName);
            imageWrapper.append(imageDiv);
            sliderString.append(imageWrapper);
        } else {
            sliderString.append(imageDiv);
        }

    });

    sliderButtonLeft.addEventListener('click', () => {
        
        if (settings.buttonsAnimation) {
            sliderButtonLeft.style.backgroundSize = '90% auto';
            setTimeout(() => {
                sliderButtonLeft.style.backgroundSize = '100% auto';
            }, 100);
        }
        
        if(slidePlace < 0) {
            sliderString.style.transform = `translateX(${slidePlace + settings.widthOfImgWrapper}px)`;
            slidePlace = slidePlace + settings.widthOfImgWrapper;
        } else {
            slidePlace = (images.length * -settings.widthOfImgWrapper) + settings.widthOfImgWrapper;
            sliderString.style.transform = `translateX(${slidePlace}px)`;
        }
    });

    sliderButtonRight.addEventListener('click', () => {
        if (settings.buttonsAnimation) {
            sliderButtonRight.style.backgroundSize = '90% auto';
            setTimeout(() => {
                sliderButtonRight.style.backgroundSize = '100% auto';
            }, 100);            
        }
        
        if (slidePlace > (images.length * -settings.widthOfImgWrapper) + settings.widthOfImgWrapper) {
            sliderString.style.transform = `translateX(${slidePlace - settings.widthOfImgWrapper}px)`;
            slidePlace = slidePlace - settings.widthOfImgWrapper;
        } else {
            slidePlace = 0;
            sliderString.style.transform = `translateX(${slidePlace}px)`;
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map