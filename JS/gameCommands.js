/**
 * This function is checked if the screen of a mobile device has changed orientation
 */
window.addEventListener('orientationchange', () => {
    if (window.orientation == 90) {
        document.getElementById('orizontal-screen-overlay').style.display = 'none';
    } else if (window.orientation == 0) {
        document.getElementById('orizontal-screen-overlay').style.display = '';
    }
})

/**
 * This event listener shrinks the the pause and play game, pause and play music and fullscreen icons 
 * when the user exits full screen mode with the "Esc" Key
 */
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.getElementById('fullscreen-icon').classList.remove('d-none');
        document.getElementById('compress-icon').classList.add('d-none');
        shrinkButtons();
        shrinkIcons();
    }
})

/**
 * This event listener checks if one of these keys is pressed
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