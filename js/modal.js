'use script';

function modal() {

    const modalOverlay = document.querySelector('.modal__overlay');
    const modalRegistration = document.querySelector('#modal__registration');
    const modalAuthorization = document.querySelector('#modal__authorization');
    const modalCard = document.querySelector('.modal__card');
    const registrationButton = document.querySelector('#header__registration');
    const authorizationButton = document.querySelector('#header__authorization');
    let closeModalButtons = document.querySelectorAll('.modal__close');
    closeModalButtons = Array.prototype.slice.call(closeModalButtons);
    const modalStatus = document.querySelector('#modal__status');

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
        } else if ((event.target === modalOverlay
                || closeModalButtons.includes(event.target))
                    && modalCard.classList.contains('show')) {
                        closeModal(modalCard, modalOverlay);
        } else if ((event.target === modalOverlay
            || closeModalButtons.includes(event.target))
                && modalStatus.classList.contains('show')) {
                    closeModal(modalStatus, modalOverlay);
        }
    });

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
}

export default modal;