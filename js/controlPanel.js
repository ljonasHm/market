import { EventEmitter } from "events";

const controlPanel = {
    panelClass: "control-panel",

    render() {
        const panel = document.createElement('div');

        panel.classList.add(this.panelClass);
        panel.innerHTML = `
        <div class="panel__frame">
            <div class="panel__frame-buttons-wrapper">
                <button class="panel__frame-button"></button>
                <button class="panel__frame-button" id="panel__frame-button-cross"></button>
            </div>
        </div>
        `;
        document.body.append(panel);
        panel.classList.add('hide');
        const crossButton = panel.querySelector('#panel__frame-button-cross');
        crossButton.addEventListener('click', () => {
            this.toggleHide();
        });
        panel.onmousedown = function(event) {

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                panel.style.left = pageX - panel.offsetWidth / 2 + 'px';
                panel.style.top = pageY - panel.offsetHeight / 2 + 'px';
            }

            function panelMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', panelMove);

        };
    },

    toggleHide() {
        const panel = document.querySelector('.' + this.panelClass);

        panel.classList.toggle('hide');
    }
}

export {controlPanel};