// import FormData from 'form-data';
import {postResource} from './request';
import {getResource} from './request';
import changeUser from './changeUser';
'use strict';

function form() {
    
    const registrationForm = document.querySelector('.modal__registration-form');
    const authorizationForm = document.querySelector('.modal__authorization-form');
    const registrationWindow = document.querySelector('#modal__registration');
    const authorizationWindow = document.querySelector('#modal__authorization');
    const statusWindow = document.querySelector('#modal__status');
    const loadingWindow = document.querySelector('.modal__loading');

    registrationForm.addEventListener('submit', (event) => {

        event.preventDefault();
        registrationWindow.classList.add('hide');
        registrationWindow.classList.remove('show');
        loadingWindow.classList.remove('hide');
        loadingWindow.classList.add('show');

        const registrationData = new FormData(registrationForm);
        const jsonData = JSON.stringify(Object.fromEntries(registrationData.entries()));

        getResource('http://localhost:3000/users')
        .then(data => {
            if (data.some((serverDataElement) => {
                return ((serverDataElement.mail == JSON.parse(jsonData).mail && serverDataElement.login == JSON.parse(jsonData).login) ? true : false);
            })) {
                showStatusModal('Такой почтовый адрес и логин уже зарегестрированы');
            } else if (data.some((serverDataElement) => {
                return ((serverDataElement.mail == JSON.parse(jsonData).mail) ? true : false);
            })) {
                showStatusModal('Такой почтовый адрес уже зарегестрирован');
            } else if (data.some((serverDataElement) => {
                return ((serverDataElement.login == JSON.parse(jsonData).login) ? true : false);
            })) {
                showStatusModal('Такой логин уже существует');
            } else {
                postResource('http://localhost:3000/users', jsonData)
                .then(() => {
                    showStatusModal('Регистрация прошла успешно');
                    registrationForm.reset();
                    localStorage.setItem('user', JSON.parse(jsonData).login);
                    changeUser(JSON.parse(jsonData).login);
                })
                .catch(() => {
                    showStatusModal('Произошла ошибка при загрузке данных на сервер');
                });
            }
        })
        .catch(() => {
            showStatusModal('Произошла ошибка при запросе с сервера');
        })
    })

    authorizationForm.addEventListener('submit', (event) => {

        event.preventDefault();

        authorizationWindow.classList.add('hide');
        authorizationWindow.classList.remove('show');
        loadingWindow.classList.remove('hide');
        loadingWindow.classList.add('show');

        const authorizationData = new FormData(authorizationForm);
        const jsonData = JSON.stringify(Object.fromEntries(authorizationData.entries()));

        getResource('http://localhost:3000/users')
        .then((data) => {
            if(data.some((serverDataElement) => {
                if (serverDataElement.login == JSON.parse(jsonData).login && serverDataElement.password == JSON.parse(jsonData).password) {
                    return true;
                } else {
                    return false;
                }
            })) {
                    showStatusModal('Вы успешно авторизованы');
                    authorizationForm.reset;
                    localStorage.setItem('user', JSON.parse(jsonData).login);
                    changeUser(JSON.parse(jsonData).login);
                } else {
                    showStatusModal('Введены неверный логин и/или пароль');
            }
        })
        .catch(() => {
            showStatusModal('Произошла ошибка при запросе с сервера');
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