const controlPanel = {
    panelClass: "control-panel",

    render() {
        const panel = document.createElement('div');

        panel.classList.add(this.panelClass);
        document.body.append(panel);
    }
}

export {controlPanel};