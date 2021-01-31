'use strict'
import {getResource} from './request';
import {showStatusModal} from './modal';
import {openUpList} from './openUpList';

function renderChildren(parent, parentName, categories) {
    const childrenCategories = categories.filter((item) => {
        if (item.parent == parentName) {
            return true;
        }
    });
    childrenCategories.forEach((item) => {
        const newCategory = document.createElement('li');

        if(!item.children) {
            newCategory.dataset.category = item.name;
            newCategory.innerHTML = `<p>${item.name}</p>`;
            parent.append(newCategory);
        } else {
            const newCategoryUl = document.createElement('ul');
            
            newCategory.classList.add('with-small-marker');
            newCategoryUl.dataset.category = item.name;
            newCategoryUl.innerHTML = `
                <p><img class="products__marker" src="img/marker.png">${item.name}</p>
            `;
            parent.append(newCategory);
            newCategory.append(newCategoryUl);
            renderChildren(newCategoryUl, item.name, categories);
        }
    });
}

function render(categories) {
    const categoriesDiv = document.querySelector('.products__categories');

    const mainCategories = categories.filter((item) => {
        if (item.parent === '') {
            return true;
        }
    });
    mainCategories.forEach(category => {
        const newCategory = document.createElement('ul');

        newCategory.classList.add('products__categories--ul');
        newCategory.dataset.category = category.name;
        newCategory.innerHTML = `
        <p><img class="category__marker" src="img/marker.png">${category.name}</p>
        `;
        categoriesDiv.append(newCategory);
        renderChildren(newCategory, category.name, categories);
    });
}

function renderCategories(cardSliderSettings) {
    getResource('http://localhost:3000/categories')
    .then((categories) => {
        render(categories);
        openUpList(cardSliderSettings);
    })
    .catch(() => {
        showStatusModal("Произошла ошибка на сервере");
    })
}

export {renderCategories};