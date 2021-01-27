// import FormData from 'form-data';
import {postResource} from './request';
import {getResource} from './request';
import {showStatusModal} from './modal';
import {toggleLoadingWindow} from './modal';
import changeUser from './changeUser';
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
        toggleLoadingWindow();

        const registrationData = new FormData(registrationForm);
        const objectData = Object.fromEntries(registrationData.entries());
        objectData.admin = false;
        const jsonData = JSON.stringify(objectData);

        getResource('http://localhost:3000/users')
        .then(data => {
            if (data.some((serverDataElement) => {
                return ((serverDataElement.mail == JSON.parse(jsonData).mail && serverDataElement.login == JSON.parse(jsonData).login) ? true : false);
            })) {
                toggleLoadingWindow();
                showStatusModal('Такой почтовый адрес и логин уже зарегестрированы', event.pageY-event.clientY + 200);
            } else if (data.some((serverDataElement) => {
                return ((serverDataElement.mail == JSON.parse(jsonData).mail) ? true : false);
            })) {
                toggleLoadingWindow();
                showStatusModal('Такой почтовый адрес уже зарегестрирован', event.pageY-event.clientY + 200);
            } else if (data.some((serverDataElement) => {
                return ((serverDataElement.login == JSON.parse(jsonData).login) ? true : false);
            })) {
                toggleLoadingWindow();
                showStatusModal('Такой логин уже существует', event.pageY-event.clientY + 200);
            } else {
                postResource('http://localhost:3000/users', jsonData)
                .then(() => {
                    toggleLoadingWindow();
                    showStatusModal('Регистрация прошла успешно', event.pageY-event.clientY + 200);
                    registrationForm.reset();
                    localStorage.setItem('user', JSON.parse(jsonData).login);
                    changeUser(JSON.parse(jsonData).login);
                })
                .catch(() => {
                    toggleLoadingWindow();
                    showStatusModal('Произошла ошибка при загрузке данных на сервер', event.pageY-event.clientY + 200);
                });
            }
        })
        .catch(() => {
            toggleLoadingWindow();
            showStatusModal('Произошла ошибка при запросе с сервера', event.pageY-event.clientY + 200);
        })
    })

    authorizationForm.addEventListener('submit', (event) => {

        event.preventDefault();

        authorizationWindow.classList.add('hide');
        authorizationWindow.classList.remove('show');
        toggleLoadingWindow();

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
                    toggleLoadingWindow();
                    showStatusModal('Вы успешно авторизованы', event.pageY-event.clientY + 200);
                    authorizationForm.reset();
                    localStorage.setItem('user', JSON.parse(jsonData).login);
                    changeUser(JSON.parse(jsonData).login);
                } else {
                    toggleLoadingWindow();
                    showStatusModal('Введены неверный логин и/или пароль', event.pageY-event.clientY + 200);
            }
        })
        .catch(() => {
            toggleLoadingWindow();
            showStatusModal('Произошла ошибка при запросе с сервера', event.pageY-event.clientY + 200);
        })
    })

}

export default form;