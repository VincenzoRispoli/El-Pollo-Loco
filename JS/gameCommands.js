/**
 * This function is checked if the screen of a mobile device has changed orientation
 * @param {string} orientationchange - event that is listened when the mobile screen is rotated.
 * @returns {void}
 */
window.addEventListener('orientationchange', () => {
    if (window.orientation == 90) {
        document.getElementById('orizontal-screen-overlay').style.display = 'none';
    } else if (window.orientation == 0) {
        document.getElementById('orizontal-screen-overlay').style.display = '';
    }
})

/**
 * This event listener checks if one of these keys is pressed.
 * @param {string} keydown - event that is listened when the user presses one of the listed keys.
 * @returns {void}
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) {
        world.keyboard.UP = true;
    } else if (e.keyCode == 32) {
        e.preventDefault();
        world.keyboard.SPACE = true;
    } else if (e.keyCode == 39) {
        world.keyboard.RIGHT = true;
    } else if (e.keyCode == 40) {
        world.keyboard.DOWN = true;
    } else if (e.keyCode == 37) {
        world.keyboard.LEFT = true;
    } else if (e.keyCode == 68) {
        world.keyboard.D = true;
    }
})

/**
 * /**
 * This event listener checks if one of these keys is released
 * @param {string} keyup - event that is listened when the user releases one of the listed keys
 * @returns {void}
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 38) {
        world.keyboard.UP = false;
    } else if (e.keyCode == 39) {
        world.keyboard.RIGHT = false;
    } else if (e.keyCode == 40) {
        world.keyboard.DOWN = false;
    } else if (e.keyCode == 37) {
        world.keyboard.LEFT = false;
    } else if (e.keyCode == 32) {
        world.keyboard.SPACE = false;
    } else if (e.keyCode == 68) {
        world.keyboard.D = false;
    }
})

/**
 * This event listener checks if one of these keys is pressed or released in the mobile screens
 * @param {string} touchstart - event that is listened when the user touch one of the listed 
 * @param {string} touchend - event that is listened when the user releases one of the listed keys
 * @returns {void}
 */
document.getElementById('arrow-left').addEventListener('touchstart', (e) => {
    e.preventDefault();
    world.keyboard.LEFT = true;
});

document.getElementById('arrow-left').addEventListener('touchend', (e) => {
    e.preventDefault();
    world.keyboard.LEFT = false;
})

document.getElementById('arrow-right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    world.keyboard.RIGHT = true;
})

document.getElementById('arrow-right').addEventListener('touchend', (e) => {
    e.preventDefault();
    world.keyboard.RIGHT = false;
})

document.getElementById('jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    world.keyboard.SPACE = true;
});

document.getElementById('jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    world.keyboard.SPACE = false;
})

document.getElementById('bottle').addEventListener('touchstart', (e) => {
    e.preventDefault();
    world.keyboard.D = true;
});

document.getElementById('bottle').addEventListener('touchend', (e) => {
    e.preventDefault();
    world.keyboard.D = false;
})