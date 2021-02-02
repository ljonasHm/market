'use script';

function modal() {
    const modalOverlay = document.querySelector('.modal__overlay');
    const modalRegistration = document.querySelector('#modal__registration');
    const modalAuthorization = document.querySelector('#modal__authorization');
    const modalCard = document.querySelector('.modal__card');
    const modalBasket = document.querySelector('.modal__basket');
    const registrationButton = document.querySelector('#header__registration');
    const authorizationButton = document.querySelector('#header__authorization');
    const basketButton = document.querySelector('#header__basket-button');
    let closeModalButtons = document.querySelectorAll('.modal__close');
    closeModalButtons = Array.prototype.slice.call(closeModalButtons);
    const modalStatus = document.querySelector('#modal__status');

    registrationButton.addEventListener('click', () => {
        openModal(modalRegistration, modalOverlay);
    });

    authorizationButton.addEventListener('click', () => {
        openModal(modalAuthorization, modalOverlay);
    });

    basketButton.addEventListener('click', () => {
        openModal(modalBasket, modalOverlay);
    })

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
        } else if ((event.target === modalOverlay
            || closeModalButtons.includes(event.target))
                && modalBasket.classList.contains('show')) {
                    closeModal(modalBasket, modalOverlay);
        }
    });

    function closeModal(modal, modalOverlay) {
        modal.classList.add('hide');
        modal.classList.remove('show');
        modalOverlay.classList.add('hide');
        modalOverlay.classList.remove('show');
    }
    
    function openModal(modal, modalOverlay) {

        const bodyHeight = window.getComputedStyle(document.body).height;

        console.log(bodyHeight);

        modalOverlay.style.height = bodyHeight;

        modal.classList.remove('hide');
        modal.classList.add('show');
        modalOverlay.classList.remove('hide');
        modalOverlay.classList.add('show');
    }
}

function showStatusModal(message, coordinateY) {
    const statusWindow = document.querySelector('#modal__status');
    const overlay = document.querySelector('.modal__overlay');

    overlay.style.height = window.getComputedStyle(document.body).height;
    statusWindow.style.top = coordinateY + 'px';

    if (overlay.classList.contains('hide')) {
        overlay.classList.remove('hide');
        overlay.classList.add('show');
    }
    
    statusWindow.classList.remove('hide');
    statusWindow.classList.add('show');
    statusWindow.innerHTML = `<p class="modal__status-p">${message}</p>`;
}

function toggleLoadingWindow() {
    const loadingWindow = document.querySelector('.modal__loading');

    loadingWindow.classList.toggle('hide');
    loadingWindow.classList.toggle('show');
}

export default modal;
export {showStatusModal};
export {toggleLoadingWindow};