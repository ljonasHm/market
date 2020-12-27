function changeUser(userLogin) {
    const buttonsHeader = document.querySelectorAll('.header__button');
    const loginButton = document.querySelector('#header__login-button');

    buttonsHeader.forEach((button) => {
        button.classList.toggle('hide');
    });
    loginButton.innerHTML = userLogin;
}

export default changeUser;