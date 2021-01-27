import cardSlider from './cardSlider';

function meetingSlider(sliderSettings) {
    sliderSettings.insertText = true;
    sliderSettings.text = [
        "Dolore commodo nisi eiusmod quis",
        "Est sint pariatur est adipisicing",
        "Cupidatat nisi cupidatat aliqua elit culpa"
    ];
    sliderSettings.textClassName = [
        "meeting-slider__slide-text",
        "meeting-slider__slide-text",
        "meeting-slider__slide-text"
    ];
    cardSlider(sliderSettings, ['img/meeting1.jpg', 'img/meeting2.jpg', 'img/meeting3.jpg']);
}

export {meetingSlider};