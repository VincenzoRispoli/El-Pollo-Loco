
let canvas;
let world;
let keyboard = new Keyboard();
let MUSIC = new Audio('assets/audio/music.mp3');
let music = true;
let restart = false;
let savedCharSpeedY;
let savedSmallChikSpeedY;
let fullscreen;
let mobileFullscreen = false;
let screenType;

/**
 * @property {Function} init - Game initialisation function. When the page loads, we create an instance of the World class 
 * and pass the canvas and keyword class for keyboard commands as a parameter.
 * @returns {void}
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    if (!restart) {
        pauseGame();
    }
}

/**
 * @property {Function} startGame - This function starts the game when the user clicks on the Start Game button
 * @returns {void}
 */
function startGame() {
    setHTML()
    resumeGame();
    world.character.lastMovement = new Date().getTime();
    if(window.innerHeight < 480){
        setTimeout(()=> {
            fullScreen('endscreen-container');
        }, 100)
    }
}

/**
 * @property {Function} restartGame - This function restarts the game when the customer clicks 
 * on the Restart Button. 
 * The properties of the objects are restored and the variable 'Music' is assigned a value 
 * of 0 to restart the music from scratch
 * @returns {void}
 */
async function restartGame() {
    document.getElementById('endscreen-game-over').classList.add('d-none');
    restart = true;
    resetChickenProperties();
    resetSmallChickenProperties();
    resetEndbossProperties();
    resetCloudsProperties();
    resetBottlesAndCoinsCount();
    await init();
    world.character.lastMovement = new Date().getTime();
    MUSIC.currentTime = 0;
    MUSIC.play();
    setHTML();
}

function resetBottlesAndCoinsCount() {
    document.getElementById('bottles-count').innerHTML = 0;
    document.getElementById('coins-count').innerHTML = 0;
}

/**
 * @property {Function} setHTML - When starting the game, this function removes the Startscreen container and 
 * displays the canvas with the game pause and play, music pause and play, and fullscreen buttons.
 * @returns {void}
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
 * @property {Function} resetChickenProperties - This function resets the properties of the Chicken object.
 * @returns {void}
 */
function resetChickenProperties() {
    world.level.enemies.forEach((enemy) => {
        if (enemy instanceof Chicken) {
            enemy.enemyIsDead = false;
            enemy.isCollided = false;
            enemy.x = 500 + Math.random() * 2000;
            enemy.y = 330;
            enemy.animate();
        }
    });
}

/**
 * @property {Function} resetSmallChickenProperties This function resets the properties of the Small Chicken
 * object.
 * @returns {void}
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
 * @property {Function} resetEndbossProperties - This function resets the properties of the EndBoss object.
 * @returns {void}
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
 * @property {Function} resetCloudsProperties - This function resets the properties of the Clouds objects
 * @returns {void}
 */
function resetCloudsProperties() {
    world.level.clouds.forEach((cloud) => {
        cloud.theGameIsPaused = false;
        cloud.x = 0 + Math.random() * 4000;
        cloud.animate();
    })
}

/**
 * @property {Function} resumeGame - This function restarts the game and the music after the stop
 * @returns {void}
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
 * @property {Function} resumeCharacterAndEndboss - This function restarts Character and End Boss 
 * animations when the game restarts.
 * @returns {void}
 */
function resumeCharacterAndEndboss() {
    world.character.theGameIsPaused = false;
    world.endBoss.theGameIsPaused = false;
    world.character.lastMovement = new Date().getTime();
}

/**
 * @property {Function} resumeEnemiesCloudBottleCoin This function restarts the animations of Clouds Bottles 
 * and Coins when the game restarts.
 * @returns {void}
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
 * @property {Function} pauseGame - This funtion stop the game and the music.
 * @returns {void}
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
 * @property {Function} stopCharacter This function stop the animations of Character.
 * @returns {void}
 */
function stopCharacter() {
    world.character.theGameIsPaused = true;
    world.character.acceleration = 0;   // per feramare Pepe durante il salto ho dovto azzerare l'accellerazione in modo da fermare la forza di gravitá
    savedCharSpeedY = world.character.speedY; // azzerando la speedY quindi la velocitá di salto, avevo il problema che quando riprendevo il gioco, Pepe cominciava a precipitare giá dal punto y in cui avevo fermato il gioco. Quindi invece di continuare ad andare verso l'alto a ripresa gioco per completare il salto, precipitava precocemente verso il basso
    // Per evitare questo, ho salvato la speedY attuale al momento della pausa gioco nella variabile saveSpeedY, e al resumeGame ho assegnato questa variabile alla variabile world.character.speedY per farle completare il salto;
    world.character.speedY = 0; // inoltre ho dovuto azzerare anche la velocitá di salto, per evitare che continuasse a salire 
}

/**
 * @property {Function} stopSmallChicken - This function stop the jump and gravity animation of Small Chicken 
 * when the game is in pause.
 * @returns {void}
 */
function stopSmallChicken() {
    world.level.enemies.forEach((enemy) => {
        if (enemy instanceof SmallChicken) {
            enemy.theGameIsPaused = true;
            enemy.acceleration = 0;
            savedSmallChikSpeedY = enemy.speedY;
            enemy.speedY = 0;
        }
    });
}

/**
 * @property {Function} resumeSmallChicken - This function resume the jump and gravity animation of Small Chicken
 * when the game is resumed.
 * @returns {void}
 */
function resumeSmallChicken() {
    world.level.enemies.forEach((enemy) => {
        if (enemy instanceof SmallChicken) {
            enemy.theGameIsPaused = false;
            enemy.acceleration = 3;
            enemy.speedY = savedSmallChikSpeedY;
        }
    })
}

/**
 * @property {Function} stopEnemyBossCoinBottle - This function stop the animations of End Boss, Chickens, 
 * Small Chickens, Coins and Bottles when the game is stopped.
 * @returns {void}
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
 * @property {Function} muteMusic - This function mute the music when the user clicks on the music 
 * button.
 * @returns {void}
 */
function muteMusic() {
    document.getElementById('button-audio-container').classList.toggle('opacity-audio-btn');
    MUSIC.muted = !MUSIC.muted;
}

/**
 * @property {EventListener} restartSongEventListener - This event listener restarts the music when it is over.
 * @returns {void}
 */
MUSIC.addEventListener('ended', () => {
    restartSong()
})

/**
 * @property {Function} restartSong - This function restarts the music when it is over.
 * @returns {void}
 */
function restartSong() {
    MUSIC.currentTime = 0;
    MUSIC.play();
}

/**
 *  @property {Function} gameExplanationPopUp - This funtion show the Game Explanation Pop-Up.
 *  @returns {void}
 */
function gameExplanationPopUp() {
    document.getElementById('game-explanation-container').classList.remove('translate-explanation-pop-up');
}

/**
 * @property {Function} hideGameExplanationPopUp This funtion hide the Game Explanation Pop-Up.
 * @returns {void}
 */
function hideGameExplanationPopUp() {
    document.getElementById('game-explanation-container').classList.add('translate-explanation-pop-up')
}

/**
 * @property {Function} doNotPause - This funtcion stop the propagation of a click event.
 * @param {object} event - the event whose propagation we want to stop.
 * @returns {void}
 */
function doNotPause(event) {
    event.stopPropagation();
}
