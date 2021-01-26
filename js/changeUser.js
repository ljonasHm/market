import {controlPanel} from './controlPanel';
import {getResource} from './request';

function changeUser(userLogin) {
    const buttonsHeader = document.querySelectorAll('.header__button');
    const loginButton = document.querySelector('#header__login-button');

    buttonsHeader.forEach((button) => {
        if (button.id != 'header__login-logout' && button.id != 'header__login-controlPanel') {
            button.classList.toggle('hide');
        }
    });
    loginButton.innerHTML = userLogin;
    getResource('http://localhost:3000/users')
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
            controlPanel.render();
            controlPanelButton.addEventListener('click', () => {
                controlPanel.toggleHide();
            });
        }
    })
}

export default changeUser;