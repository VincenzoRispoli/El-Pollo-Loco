/**
 * This function sets the fullscreen of the game.
 * It sets the width and height of the canvas to 100 per cent so that it fills the 
 * entire screen, and enlarges the pause and play game, pause and play music and fullscreen buttons
 */
function fullScreen() {
    fullscreen = false;
    let endscreen = document.getElementById('endscreen-container');
    canvas.style.height = '100%';
    canvas.style.width = '100%';
    openFullscreen(endscreen);
    document.getElementById('fullscreen-icon').classList.add('d-none');
    document.getElementById('compress-icon').classList.remove('d-none');
    biggerButtons();
    biggerIcons();
    biggerGameButtons();
    biggerTitlesBottlesCoinsCount();
    document.getElementById('new-bottles-advice').classList.add('fullscreen-advice')
}

/**
 * 
 * @param {object} elem - the Object / HTML element on which you wish to set the fullscreen
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    };
}

/**
 * This function enlarges the pause and play game, pause and play music and fullscrreen buttons
 */
function biggerButtons() {
    document.getElementById('pause-and-play-button').classList.add('fullScreenButton');
    document.getElementById('button-audio-container').classList.add('fullScreenButton');
    document.getElementById('button-fullscreen-container').classList.add('fullScreenButton');
}

/**
 * This function enlarges the pause and play game, pause and play music and fullscreen icons
 */
function biggerIcons() {
    document.getElementById('icon-pause').classList.add('fullScreenIcons');
    document.getElementById('icon-play').classList.add('fullScreenIcons');
    document.getElementById('audio-icon').classList.add('fullScreenIcons');
    document.getElementById('fullscreen-icon').classList.add('fullScreenIcons');
    document.getElementById('compress-icon').classList.add('fullScreenIcons');
}

/**
 * This function allows you to exit from the full screen mode
 * @param {object} event - the event whose propagation we want to stop
 */
function fullScreenEscape(event) {
    document.exitFullscreen();
    document.getElementById('fullscreen-icon').classList.remove('d-none');
    document.getElementById('compress-icon').classList.add('d-none');
    canvas.style.height = '';
    canvas.style.width = '';
    shrinkButtons();
    shrinkIcons();
    schrinkGameButton();
    shrinkTitlesBottlesCoinsCount();
    document.getElementById('new-bottles-advice').classList.remove('fullscreen-advice')
    event.stopPropagation();
}

/**
 * This function shrinks the the pause and play game, pause and play music and fullscreen buttons 
 * when the user exits full screen mode
 */
function shrinkButtons() {
    document.getElementById('pause-and-play-button').classList.remove('fullScreenButton');
    document.getElementById('button-audio-container').classList.remove('fullScreenButton');
    document.getElementById('button-fullscreen-container').classList.remove('fullScreenButton')
}

/**
 * This function shrinks the the pause and play game, pause and play music and fullscreen icons 
 * when the user exits full screen mode
 */
function shrinkIcons() {
    document.getElementById('icon-pause').classList.remove('fullScreenIcons');
    document.getElementById('icon-play').classList.remove('fullScreenIcons');
    document.getElementById('audio-icon').classList.remove('fullScreenIcons');
    document.getElementById('fullscreen-icon').classList.remove('fullScreenIcons');
    document.getElementById('compress-icon').classList.remove('fullScreenIcons');
}

/**
 * This function enlarges the game buttons when the user is in full screen mode
 */
function biggerGameButtons() {
    document.getElementById('arrow-left').classList.add('fullScreen-game-buttons');
    document.getElementById('arrow-right').classList.add('fullScreen-game-buttons');
    document.getElementById('jump').classList.add('fullScreen-game-buttons');
    document.getElementById('bottle').classList.add('fullScreen-game-buttons');
}

/**
 * This function shrinks the game buttons when the user escape from the full screen mode
 */
function schrinkGameButton() {
    document.getElementById('arrow-left').classList.remove('fullScreen-game-buttons');
    document.getElementById('arrow-right').classList.remove('fullScreen-game-buttons');
    document.getElementById('jump').classList.remove('fullScreen-game-buttons');
    document.getElementById('bottle').classList.remove('fullScreen-game-buttons');
}

/**
 * This function enlarges the font size of bottle and coin counts titles and numbers
 */
function biggerTitlesBottlesCoinsCount() {
    let countTitles = document.getElementsByClassName('count');
    let countTitlesAsArray = [...countTitles];
    countTitlesAsArray.forEach(title => {
        title.classList.add('coinsAndBottleCount-fullscreen');
    })
}

/**
 * This function shrinks the font size of bottle and coin counts titles and numbers
 */
function shrinkTitlesBottlesCoinsCount() {
    let countTitles = document.getElementsByClassName('count');
    let countTitlesAsArray = [...countTitles];
    countTitlesAsArray.forEach(title => {
        title.classList.remove('coinsAndBottleCount-fullscreen');
    })
}