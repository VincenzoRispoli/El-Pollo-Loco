/**
 * This class is an extension of the MovableObject class and represents the chicken object.
 */
class Chicken extends MovableObject {
    x = 300;
    y = 330;
    height = 100;
    width = 90;
    speed = 0.50 + Math.random() * 2;
    speedY = 20
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    enemyIsDead = false;

    /**
     * The constructor of the Chicken class loads the initial 
     * image and the walking image array of the chicken. It then sets a random value at dimension x
     * ranging from 500 to 2000 pixels.
     * Finally, it starts animations with the animate() function.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING)
        this.x = 500 + Math.random() * 2000;
        this.animate();
    }

    /**
     * @property {Function} animate - This function play the animations of this Object.
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.checkIfChickenIsMovingToLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.checkIfChickenIsDead();
        }, 1000 / 25)

        setInterval(() => {
            this.checkIfChickenIsWalking();
        }, 100)
    }

    /**
     * @property {Function} checkIfChickenIsMovingToLeft - This function allows the Chicken to move to the left.
     * @returns {void}
     */
    checkIfChickenIsMovingToLeft() {
        if (this.canMoveToLeft()) {
            this.moveLeft();
        }
    }

    /**
     * @property {Funtion} canMoveToLeft - This function checks whether the Chicken object can move to the left
     * @returns {Boolean} -  a boolean value of true or false
     */
    canMoveToLeft() {
        return !this.enemyIsDead && !this.theGameIsPaused
    }

    /**
     * @property {Function} checkTheStateOfChicken - This function check the status of chickens. If one of the chickens is knocked down, the moveDown() 
     * function is activated and makes the chicken move downwards. Otherwise, if no collision occurs, 
     * the chicken continues walking to the left.
     * @returns {void}
     */
    checkIfChickenIsDead() {
        if (this.enemyIsDead && !this.theGameIsPaused) {
            this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            this.moveDown()
        }
    }

    /**
     * @property {Function} checkIfChickenIsWalking - This function allows the object Chicken, to walk.
     * @returns {void}
     */
    checkIfChickenIsWalking() {
        if (!this.theGameIsPaused && !this.enemyIsDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}