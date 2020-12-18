/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/card.js":
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductCard": () => /* binding */ ProductCard
/* harmony export */ });
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
    (0,_request__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/products').
    then(data => {
        data.forEach((card) => {
            if (card.category === category || category === 'all')
            new _card__WEBPACK_IMPORTED_MODULE_1__.ProductCard(card.name, card.img, card.price, card.category).render(calcParent());
        })
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cardsRender);

/***/ }),

/***/ "./js/openUpList.js":
/*!**************************!*\
  !*** ./js/openUpList.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _cardsRender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cardsRender */ "./js/cardsRender.js");




function openUpList() {
    const allLi = document.querySelectorAll('li');
    const allUl = document.querySelectorAll('ul');

    allLi.forEach(li => {
        li.classList.add('hide');
        li.addEventListener('click', event => {
            event.stopPropagation();
            if(li.dataset.category) {
                (0,_cardsRender__WEBPACK_IMPORTED_MODULE_0__.default)(li.dataset.category);
            }
        })
    });

    allUl.forEach(ul => {
        ul.addEventListener('click', (event) => {
            event.stopPropagation();
            let childLies = ul.querySelectorAll('li');
            ul.children[0].classList.toggle('open-ul');
            childLies.forEach(li => {
                if(li.parentElement === ul) {
                    li.classList.toggle('show');
                    li.classList.toggle('hide');
                }
            })
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (openUpList);

/***/ }),

/***/ "./js/request.js":
/*!***********************!*\
  !*** ./js/request.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });


const getResource = async (url) => {
    const result = await fetch(url);
    
    if(!result.ok) {
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



(0,_openUpList__WEBPACK_IMPORTED_MODULE_0__.default)();
(0,_cardsRender__WEBPACK_IMPORTED_MODULE_1__.default)('all');

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