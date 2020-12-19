'use script';

function closeModal(modal, modalOverlay) {
    modal.classList.add('hide');
    modal.classList.remove('show');
    modalOverlay.classList.add('hide');
    modalOverlay.classList.remove('show');
}

function openModal(modal, modalOverlay) {
    modal.classList.remove('hide');
    modal.classList.add('show');
    modalOverlay.classList.remove('hide');
    modalOverlay.classList.add('show');
}

function modal() {

    const modalOverlay = document.querySelector('.modal');
    const modalRegistration = document.querySelector('#modal__registration');
    const modalAuthorization = document.querySelector('#modal__authorization');
    const registrationButton = document.querySelector('#header__registration');
    const authorizationButton = document.querySelector('#header__authorization');
    let closeModalButtons = document.querySelectorAll('.modal__close');
    closeModalButtons = Array.prototype.slice.call(closeModalButtons);
    const modalButton = document.querySelector('.modal__button');

    registrationButton.addEventListener('click', () => {
        openModal(modalRegistration, modalOverlay);
    });

    authorizationButton.addEventListener('click', () => {
        openModal(modalAuthorization, modalOverlay);
    });

    modalOverlay.addEventListener('click', (event) => {
        event.stopPropagation();
        if ((event.target === modalOverlay
                || closeModalButtons.includes(event.target))
                    && modalRegistration.classList.contains('show')) {
                        closeModal(modalRegistration, modalOverlay);
        } else if ((event.target === modalOverlay
                    || closeModalButtons.includes(event.target))
                        && modalAuthorization.classList.contains('show')) {
                            closeModal(modalAuthorization, modalOverlay);
        }
    })
}

export default modal;