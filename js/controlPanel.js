import { EventEmitter } from "events";

const controlPanel = {
    panelClass: "control-panel",

    render() {
        const panel = document.createElement('div');

        panel.classList.add(this.panelClass);
        panel.innerHTML = `
        <div class="panel__frame">
            <div class="panel__frame-buttons-wrapper">
                <button class="panel__frame-button" id="panel__frame-button-movement"></button>
                <button class="panel__frame-button" id="panel__frame-button-cross"></button>
            </div>
        </div>
        `;
        document.body.append(panel);
        panel.classList.add('hide');
        const crossButton = panel.querySelector('#panel__frame-button-cross');
        const movementButton = panel.querySelector('#panel__frame-button-movement')
        crossButton.addEventListener('click', () => {
            this.toggleHide();
        });
        movementButton.ondragstart = function () {
            return false;
        };
        movementButton.onmousedown = function(event) {

            let shiftX = event.clientX - panel.getBoundingClientRect().left;
            let shiftY = event.clientY - panel.getBoundingClientRect().top;

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                panel.style.left = pageX - shiftX + 'px';
                panel.style.top = pageY - shiftY + 'px';
            }

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

    toggleHide() {
        const panel = document.querySelector('.' + this.panelClass);

        panel.classList.toggle('hide');
    }
}

export {controlPanel};