/**
 * @property {Function} fullScreen - This function sets the fullscreen of the game.
 * It sets the width and height of the canvas to 100 per cent so that it fills the 
 * entire screen, and enlarges the pause and play game, pause and play music and fullscreen buttons
 * @returns {void}
 */
function fullScreen() {
    fullscreen = false;
    let screen = document.getElementById('endscreen-container');
    canvas.style.height = '100%';
    canvas.style.width = '100%';
    openFullscreen(screen);
    document.getElementById('fullscreen-icon').classList.add('d-none');
    document.getElementById('compress-icon').classList.remove('d-none');
    biggerButtons();
    biggerIcons();
    biggerGameButtons();
    biggerTitlesBottlesCoinsCount();
    biggerRestartButtons();
    document.getElementById('new-bottles-advice').classList.add('fullscreen-advice');
}

/**
 * @property {Function} openFullscreen
 * @param {object} elem - the Object / HTML element on which you wish to set the fullscreen.
 * @returns {void}
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
 * @property {Function} biggerButtons This function enlarges the pause and play game, pause and play music 
 * and fullscrreen buttons
 * @returns {void}
 */
function biggerButtons() {
    document.getElementById('pause-and-play-button').classList.add('fullScreenButton');
    document.getElementById('button-audio-container').classList.add('fullScreenButton');
    document.getElementById('button-fullscreen-container').classList.add('fullScreenButton');
}

/**
 * @property {Function} biggerIcons This function enlarges the pause and play game, pause and play music
 * and fullscreen icons
 * @returns {void}
 */
function biggerIcons() {
    document.getElementById('icon-pause').classList.add('fullScreenIcons');
    document.getElementById('icon-play').classList.add('fullScreenIcons');
    document.getElementById('audio-icon').classList.add('fullScreenIcons');
    document.getElementById('fullscreen-icon').classList.add('fullScreenIcons');
    document.getElementById('compress-icon').classList.add('fullScreenIcons');
}

/**
 * @property {Function} fullScreenEscape - This function allows you to exit from the full screen mode
 * @param {object} event - the event whose propagation we want to stop.
 * @returns {void}
 */
function fullScreenEscape() {
    document.exitFullscreen();
    document.getElementById('fullscreen-icon').classList.remove('d-none');
    document.getElementById('compress-icon').classList.add('d-none');
    canvas.style.height = '';
    canvas.style.width = '';
    shrinkButtons();
    shrinkIcons();
    schrinkGameButton();
    shrinkTitlesBottlesCoinsCount();
    shrinkRestartButtons();
    document.getElementById('new-bottles-advice').classList.remove('fullscreen-advice')
}

/**
 * @property {Function} shrinkButtons This function shrinks the the pause and play game, pause and play music and fullscreen buttons 
 * when the user exits full screen mode
 * @returns {void}
 */
function shrinkButtons() {
    document.getElementById('pause-and-play-button').classList.remove('fullScreenButton');
    document.getElementById('button-audio-container').classList.remove('fullScreenButton');
    document.getElementById('button-fullscreen-container').classList.remove('fullScreenButton')
}

/**
 * @property {Function} shrinkIcons This function shrinks the the pause and play game, 
 * pause and play music and fullscreen icons when the user exits full screen mode.
 * @returns {void}
 */
function shrinkIcons() {
    document.getElementById('icon-pause').classList.remove('fullScreenIcons');
    document.getElementById('icon-play').classList.remove('fullScreenIcons');
    document.getElementById('audio-icon').classList.remove('fullScreenIcons');
    document.getElementById('fullscreen-icon').classList.remove('fullScreenIcons');
    document.getElementById('compress-icon').classList.remove('fullScreenIcons');
}

/**
 * @property {Function} biggerGameButtons - This function enlarges the game buttons when the user 
 * is in full screen mode.
 * @returns {void}
 */
function biggerGameButtons() {
    document.getElementById('arrow-left').classList.add('fullScreen-game-buttons');
    document.getElementById('arrow-right').classList.add('fullScreen-game-buttons');
    document.getElementById('jump').classList.add('fullScreen-game-buttons');
    document.getElementById('bottle').classList.add('fullScreen-game-buttons');
}

/**
 * @property {Function} schrinkGameButton - This function shrinks the game buttons when the user escape 
 * from the full screen mode.
 * @returns {void}
 */
function schrinkGameButton() {
    document.getElementById('arrow-left').classList.remove('fullScreen-game-buttons');
    document.getElementById('arrow-right').classList.remove('fullScreen-game-buttons');
    document.getElementById('jump').classList.remove('fullScreen-game-buttons');
    document.getElementById('bottle').classList.remove('fullScreen-game-buttons');
}

/**
 * @property {Function} biggerTitlesBottlesCoinsCount - This function enlarges the font size of 
 * bottle and coin counts titles and numbers.
 * @returns {void}
 */
function biggerTitlesBottlesCoinsCount() {
    let countTitles = document.getElementsByClassName('count');
    let countTitlesAsArray = [...countTitles];
    countTitlesAsArray.forEach(title => {
        title.classList.add('coinsAndBottleCount-fullscreen');
    })
}

/**
 * @property {Function} shrinkTitlesBottlesCoinsCount - This function shrinks the font size of bottle and 
 * coin counts titles and numbers.
 * @returns {void}
 */
function shrinkTitlesBottlesCoinsCount() {
    let countTitles = document.getElementsByClassName('count');
    let countTitlesAsArray = [...countTitles];
    countTitlesAsArray.forEach(title => {
        title.classList.remove('coinsAndBottleCount-fullscreen');
    });
}

function biggerRestartButtons() {
    let restartButtons = document.getElementsByClassName('restart-game');
    let restartButtonsAsArray = [...restartButtons];
    restartButtonsAsArray.forEach(btn => {
        btn.classList.add('fullScreen-restart-game');
    });
}

function shrinkRestartButtons() {
    let restartButtons = document.getElementsByClassName('restart-game');
    let restartButtonsAsArray = [...restartButtons];
    restartButtonsAsArray.forEach(btn => {
        btn.classList.remove('fullScreen-restart-game');
    });
}

/**
 * This event listener shrinks the the pause and play game, pause and play music and fullscreen icons 
 * when the user exits full screen mode with the "Esc" Key.
 * @param {string} fullscreenchange - event that is listened when the user escape from the fullscreen mode.
 * @returns {void}
 */
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.getElementById('fullscreen-icon').classList.remove('d-none');
        document.getElementById('compress-icon').classList.add('d-none');
        canvas.style.height = '';
        canvas.style.width = '';
        shrinkButtons();
        shrinkIcons();
        schrinkGameButton();
        shrinkTitlesBottlesCoinsCount();
        shrinkRestartButtons();
        document.getElementById('new-bottles-advice').classList.remove('fullscreen-advice');
    }
})
