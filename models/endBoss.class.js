/**
 * This class is an extension of the MovableObject class and represents the End Boss object.
 */
class EndBoss extends MovableObject {

    x = 2000;
    y = -45;
    height = 500;
    width = 500;
    speedY = 30;
    energy = 100;
    characterIsArrived = false;
    isCollided = false;
    attack = false;
    comeBack = false
    theGameIsPaused = false;
    VICTORY_SOUND = new Audio('assets/audio/tadaa.mp3');
    offset = {
        top: 85,
        left: 20,
        right: 35,
        bottom: 85
    }
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    /**
     * The constructor of the End Boss class loads the initial image and the 
     * images of the alert, walk, wounding and death animations into the imageCache object.
     * Then the animate() function is called to start the various animations and finally 
     * the gameOver() function, which will only be activated if the end boss has been defeated.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.gameOver();
    }

    /**
    * @property {Function} animate - This function play the animation of this object
    * @returns {Boolean}
    */
    animate() {
        setInterval(() => {
            if (this.isHurt() && !this.theGameIsPaused) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isCollided && !this.theGameIsPaused) {
                this.walkToLeft();
            } else if (this.attack && !this.theGameIsPaused) {
                this.goOnTheAttack();
            } else if (this.comeBack) {
                this.walkBack();
            } else if (!this.theGameIsPaused) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);

        setInterval(() => {
            if (this.isDead() && !this.theGameIsPaused) {
                this.moveDown();
            }
        }, 150)
    }

    /**
     * @property {Function} walkToLeft This function allows the object in question to move to the left.
     * @returns {void}
     */
    walkToLeft() {
        this.speed = 5;
        this.x -= this.speed;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * @property {Function} goOnTheAttack - This function allows the object in question to move 
     * to the right, while attacking animations are activated.
     * @returns {void}
     */
    goOnTheAttack() {
        this.speed = 20;
        this.x -= this.speed;
        this.playAnimation(this.IMAGES_ATTACK)
    }

    /**
     * @property {Function} walkBack - This function returns the object in question backwards, 
     * making it move to the right.
     * @returns {void}
     */
    walkBack() {
        this.x += this.speed;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * @property {Function} moveDown This function causes the object in question to move downwards when it is knocked down. In the meantime, 
     * the animations with images of the enemy's defeat are activated and the variable with the victory sound 
     * is played.
     * @returns {void}
     */
    moveDown() {
        super.moveDown();
        this.playAnimation(this.IMAGES_DEAD);
        this.VICTORY_SOUND.play();
    }
    /**
     * @property {Function} gameOver This function displays the "Game Over" overlay when the End Boss 
     * has been knocked down.
     * @returns {void} 
     */
    gameOver() {
        document.getElementById('endscreen-game-over').classList.remove('d-none');
    }
}