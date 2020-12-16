'use strict';

const allLi = document.querySelectorAll('li');
const allUl = document.querySelectorAll('ul');

allLi.forEach(li => {
    li.classList.add('hide');
    li.addEventListener('click', event => {
        event.stopPropagation();
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