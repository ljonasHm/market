import changeUser from './changeUser';

function login() {
    if (localStorage.getItem('user')) {
        changeUser(localStorage.getItem('user'));
    }
}

export default login;