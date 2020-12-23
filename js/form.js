import {postResource} from './request';
import {getResource} from './request';
'use strict';

function form() {
    
    const registrationForm = document.querySelector('.modal__registration-form');
    const authorizationForm = document.querySelector('.modal__authorization-form');
    const registrationWindow = document.querySelector('#modal__registration');
    const authorizationWindow = document.querySelector('#modal__authorization');
    const statusWindow = document.querySelector('#modal__status');
    const loadingWindow = document.querySelector('.modal__loading');

    registrationForm.addEventListener('submit', (e) => {

        e.preventDefault();
        registrationWindow.classList.add('hide');
        registrationWindow.classList.remove('show');
        loadingWindow.classList.remove('hide');
        loadingWindow.classList.add('show');

        const registrationData = new FormData(registrationForm);
        const jsonData = JSON.stringify(Object.fromEntries(registrationData.entries()));
        let canPost = true;

        getResource('http://localhost:3000/users')
        .then((data) => {
            data.forEach((user) => {
                if (user.login === JSON.parse(jsonData).login) {
                    showStatusModal('Такой логин существует');
                    canPost = false;
                } else if (user.mail === JSON.parse(jsonData).mail) {
                    showStatusModal('Такой почтовый адрес уже зарегистрирован');
                    canPost = false;
                }
            })
        })
        .then(() => {
            if (canPost) {
                postResource('http://localhost:3000/users', jsonData)
                .then(() => {
                    showStatusModal('Регистрация прошла успешно');
                    registrationForm.reset();
                })
                .catch(() => {
                    showStatusModal('Произошла ошибка');
                });
            }
        })
    })

    function showStatusModal(message) {
        loadingWindow.classList.remove('show');
        loadingWindow.classList.add('hide');
        statusWindow.classList.remove('hide');
        statusWindow.classList.add('show');
        statusWindow.innerHTML = `<p class="modal__status-p">${message}</p>`;
    }

}

export default form;