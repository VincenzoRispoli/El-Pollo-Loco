
let canvas;
let world;
let keyboard = new Keyboard();
let MUSIC = new Audio('assets/audio/music.mp3');
let music = true;
let restart = false;
let savedCharSpeedY;
let savedSmallChikSpeedY;
let fullscreen;

/**
 * Game initialisation function. When the page loads, we create an instance of the World class 
 * and pass the canvas and keyword class for keyboard commands as a parameter
 */
async function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    if (!restart) {
        pauseGame();
    }
}

/**
 * This function starts the game when the user clicks on the Start Game button
 */
function startGame() {
    setHTML()
    resumeGame();
    world.character.lastMovement = new Date().getTime();
}

/**
 * This function restarts the game when the customer clicks on the Restart Button. 
 * The properties of the objects are restored and the variable 'Music' is assigned a value of 0 to restart the music from scratch
 */
async function restartGame() {
    document.getElementById('endscreen-game-over').classList.add('d-none');
    restart = true;
    resetChickenProperties();
    resetSmallChickenProperties();
    resetEndbossProperties();
    resetCloudsProperties();
    await init();
    world.character.lastMovement = new Date().getTime();
    MUSIC.currentTime = 0;
    MUSIC.play();
    setHTML();
}

/**
 * When starting the game, this function removes the Startscreen container and displays the canvas with the game pause and play, music pause and play, and fullscreen buttons
 */
function setHTML() {
    document.getElementById('startscreen').style.display = "none"
    document.getElementById('endscreen-container').classList.remove('d-none');
    document.getElementById('icon-pause').classList.remove('d-none');
    document.getElementById('icon-play').classList.add('d-none');
    document.getElementById('endscreen-you-lost').classList.add('d-none');
    document.getElementById('endscreen-game-over').classList.add('d-none');
}

/**
 * This function resets the properties of the Chicken object
 */
function resetChickenProperties() {
    world.level.enemies.forEach((enemy) => {
        if (enemy instanceof Chicken) {  // dato che world.level.enemies ha diversi nemici, tra cui chicken 
            enemy.enemyIsDead = false;   // e smallchicken devo specificare su quale instanza specifica dell'oggetto voglio ripristinare le variabile al restart game
            enemy.isCollided = false;
            enemy.x = 500 + Math.random() * 2000;
            enemy.y = 330;
            enemy.animate();
        }
    });
}

/**
 * This function resets the properties of the Small Chicken object
 */
function resetSmallChickenProperties() {
    world.level.enemies.forEach((enemy) => {
        if (enemy instanceof SmallChicken) {
            enemy.enemyIsDead = false;
            enemy.isCollided = false;
            enemy.x = 500 + Math.random() * 2000;
            enemy.speedY = 0;
            enemy.y = 360;
            enemy.animate();
        }
        enemy.theGameIsPaused = false;
    });
}

/**
 * This function resets the properties of the EndBoss object
 */
function resetEndbossProperties() {
    world.endBoss.energy = 100;
    world.endBoss.enemyIsDead = false;
    world.endBoss.x = 2000;
    world.endBoss.y = -45;
    world.endBoss.attack = false;
    world.endBoss.isCollided = false;
    world.endBoss.theGameIsPaused = false
}

/**
 * This function resets the properties of the Clouds objects
 */
function resetCloudsProperties() {
    world.level.clouds.forEach((cloud) => {
        cloud.theGameIsPaused = false;
        cloud.x = 0 + Math.random() * 4000;
        cloud.animate(); // richiamare sempre la funzione animate o funzione che attiva le animazioni di un oggetto
        // dopo aver ripristinato le varaiabili dell'oggetto stesso, altrimenti non riparte con le animazioni
    })
}

/**
 * This function restarts the game and the music after the stop
 */
function resumeGame() {
    document.getElementById('icon-play').classList.add('d-none');
    document.getElementById('icon-pause').classList.remove('d-none');
    world.character.speedY = savedCharSpeedY;
    world.character.acceleration = 3.5;
    resumeSmallChicken();
    resumeCharacterAndEndboss();
    resumeEnemiesCloudBottleCoin();
    MUSIC.play();
    document.getElementById('button-audio-container').disabled = false;
}

/**
 * This function restarts Character and End Boss animations when the game restarts
 */
function resumeCharacterAndEndboss() {
    world.character.theGameIsPaused = false;
    world.endBoss.theGameIsPaused = false;
    world.character.lastMovement = new Date().getTime();
}

/**
 * This function restarts the animations of Clouds Bottles and Coins when the game restarts
 */
function resumeEnemiesCloudBottleCoin() {
    world.level.enemies.forEach((enemy) => {
        enemy.theGameIsPaused = false;
    })
    world.level.clouds.forEach((cloud) => {
        cloud.theGameIsPaused = false;
    })
    world.bottles.forEach((bottle) => {
        bottle.theGameIsPaused = false;
    })
    world.coins.forEach((coin) => {
        coin.theGameIsPaused = false;
    })
}

/**
 * This funtion stop the game and the music
 */
function pauseGame() {
    document.getElementById('icon-pause').classList.add('d-none');
    document.getElementById('icon-play').classList.remove('d-none');
    document.getElementById('button-audio-container').disabled = true;
    MUSIC.pause();
    stopCharacter();
    stopSmallChicken();
    stopEnemyBossCoinBottle()
}

/**
 * This function stop the animations of Character
 */
function stopCharacter() {
    world.character.theGameIsPaused = true;
    world.character.acceleration = 0;   // per feramare Pepe durante il salto ho dovto azzerare l'accellerazione in modo da fermare la forza di gravitá
    savedCharSpeedY = world.character.speedY; // azzerando la speedY quindi la velocitá di salto, avevo il problema che quando riprendevo il gioco, Pepe cominciava a precipitare giá dal punto y in cui avevo fermato il gioco. Quindi invece di continuare ad andare verso l'alto a ripresa gioco per completare il salto, precipitava precocemente verso il basso
    // Per evitare questo, ho salvato la speedY attuale al momento della pausa gioco nella variabile saveSpeedY, e al resumeGame ho assegnato questa variabile alla variabile world.character.speedY per farle completare il salto;
    world.character.speedY = 0; // inoltre ho dovuto azzerare anche la velocitá di salto, per evitare che continuasse a salire 
}

/**
 * This function stop the jump and gravity animation of Small Chicken when the game is in pause
 */
function stopSmallChicken() {
    world.level.enemies.forEach((enemy) => {
        enemy.theGameIsPaused = true;
        enemy.acceleration = 0;
        savedSmallChikSpeedY = enemy.speedY;
        enemy.speedY = 0;

    })
}

/**
 * This function resume the jump and gravity animation of Small Chicken when the game is resumed
 */
function resumeSmallChicken(){
    world.level.enemies.forEach((enemy) => {
        enemy.theGameIsPaused = false;
        enemy.acceleration = 3;
        enemy.speedY = savedSmallChikSpeedY;
    })
}

/**
 * This function stop the animations of End Boss, Chickens, Small Chickens, Coins and Bottles when the game is stopped
 */
function stopEnemyBossCoinBottle() {
    world.level.enemies.forEach((enemy) => {
        enemy.theGameIsPaused = true
    });
    world.endBoss.theGameIsPaused = true;
    world.level.clouds.forEach((cloud) => {
        cloud.theGameIsPaused = true;
    })
    world.bottles.forEach((bottle) => {
        bottle.theGameIsPaused = true;
    })
    world.coins.forEach((coin) => {
        coin.theGameIsPaused = true;
    })
}

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
    document.getElementById('new-bottles-advice').classList.add('fullscreen-advice')
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
 * This function mute the music when the user clicks on the music button
 */
function muteMusic() {
    document.getElementById('button-audio-container').classList.toggle('opacity-audio-btn');
    MUSIC.muted = !MUSIC.muted;
}

/**
 * This event listener restarts the music when it is over
 */
MUSIC.addEventListener('ended', () => {
    restartSong()
})

/**
 * restarts the music when it is over
 */
function restartSong() {
    MUSIC.currentTime = 0;
    MUSIC.play();
}

/**
 * This funtion show the Game Explanation Pop-Up
 */
function gameExplanationPopUp() {
    document.getElementById('game-explanation-container').classList.remove('translate-explanation-pop-up');
}

/**
 * This funtion hide the Game Explanation Pop-Up
 */
function hideGameExplanationPopUp() {
    document.getElementById('game-explanation-container').classList.add('translate-explanation-pop-up')
}

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

/**
 * This funtion stop the propagation of a click event
 * @param {object} event - the event whose propagation we want to stop
 */
function doNotPause(event) {
    event.stopPropagation();
}
