import changeUser from './changeUser';

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
        changeUser(localStorage.getItem('user'));
    }
    
    loginButton.addEventListener('click', () => {
        toggleAdditionalButtons();
    });

    logOutButton.addEventListener('click', () => {
        changeUser('');
        localStorage.removeItem('user');
        toggleAdditionalButtons();
    })
}

export default login;