import { EventEmitter } from "events";

const controlPanel = {
    panelClass: "control-panel",
    panelOpenButtonIdSelector: "#header__login-controlPanel",
    

    render() {
        const panel = document.createElement('div');
        this.panel = panel;

        panel.classList.add(this.panelClass);
        panel.innerHTML = `
        <div class="panel__frame">
            <div class="panel__frame-buttons-wrapper">
                <button class="panel__frame-button" id="panel__frame-button-movement"></button>
                <button class="panel__frame-button" id="panel__frame-button-cross"></button>
            </div>
        </div>
        <div class="panel__main">
            <div class="panel__mark-list">
                <div class="panel__mark">Добавление товара</div>
                <div class="panel__mark">Добавление категории</div>
                <div class="panel__mark">Добавление администратора</div>
            </div>
        </div>
        `;
        document.body.append(panel);
        panel.classList.add('hide');
        
        this.clickMark();
        this.closePanel();
        this.movePanel();
    },

    closePanel(){
        const crossButton = this.panel.querySelector('#panel__frame-button-cross');

        crossButton.addEventListener('click', () => {
            this.toggleHide();
        });
    },

    movePanel() {
        const movementButton = this.panel.querySelector('#panel__frame-button-movement');

        movementButton.ondragstart = function () {
            return false;
        };
        movementButton.onmousedown = (event) => {

            let shiftX = event.clientX - this.panel.getBoundingClientRect().left;
            let shiftY = event.clientY - this.panel.getBoundingClientRect().top;

            const moveAt = (pageX, pageY) => {
                this.panel.style.left = pageX - shiftX + 'px';
                this.panel.style.top = pageY - shiftY + 'px';
            }

            moveAt(event.pageX, event.pageY);

            function panelMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', panelMove);
            movementButton.onmouseup = function() {
                document.removeEventListener('mousemove', panelMove);
                movementButton.onmouseup = null;
            }
        };
    },

    clickMark() {
        const marks = document.querySelectorAll('.panel__mark');

        marks.forEach((mark) => {
            mark.addEventListener('click', () => {
                marks.forEach((mark) => {
                    mark.classList.remove('panel__mark-checked');
                });
                mark.classList.add('panel__mark-checked');
            });
        });
    },

    toggleHide() {

        this.panel.classList.toggle('hide');
    },

    exit() {
        console.log('exit');
        document.querySelector(`.${this.panelClass}`).remove();
        document.querySelector(this.panelOpenButtonIdSelector).remove();
    }
}

export {controlPanel};