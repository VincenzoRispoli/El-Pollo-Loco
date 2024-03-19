/**
 * This class is an extension of the MovableObject class and represents the small chicken object.
 */
class SmallChicken extends MovableObject {
    
    width = 50;
    height = 70;
    y = 360;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    TWEET = new Audio('assets/audio/tweet.mp3');
    enemyIsDead = false;

    /**
     * The constructor of the SmallChicken class loads the initial 
     * image and the walking image array of the small chicken. It then sets a random value at dimension x
     * ranging from 500 to 2000 pixels and a random velocity ranging from 0.50 pixels to 1 pixel.
     * Finally, it starts animations with the animate() function.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.50 + Math.random() * 1;
        this.animate();
    }

    /**
     * @property {Function} animate -This function play the animation of this object
     * @returns {void}
     */
    animate() {
        if (!this.enemyIsDead) {
            this.applyGravity();
        }
        setInterval(() => {
            if (this.canMoveLeft()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.wasKnockedDown()) {
                this.moveDown();
            }
        }, 1000 / 45)

        setInterval(() => {
            if (this.canWalk()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100)

        setInterval(() => {
            if (this.canJump()) {
                this.jump();
            }
        }, 3000)
    }

    /**
     * @property {Function} canMoveLeft- This function checks whether the object in question can move to the left
     * @returns {Boolean} - a boolean value true or false
     */
    canMoveLeft() {
        return !this.theGameIsPaused && !this.enemyIsDead;
    }

    /**
     * @property {Function} wasKnockedDown - This function checks whether the object in question has been knocked down
     * @returns {Boolean} - a boolean value true or false
     */
    wasKnockedDown() {
        return this.enemyIsDead && !this.theGameIsPaused && !world.character.isDead();
    }

    /**
     * @property {Function} canWalk - This function checks whether the object in question can walk
     * @returns {Boolean} - a boolean value true or false
     */
    canWalk() {
        return !this.enemyIsDead && !this.theGameIsPaused;
    }

    /**
    * @property {Function} canJump This function checks whether the object in question can jump
    * @returns {Boolean} - a boolean value true or false
    */
    canJump() {
        return !this.enemyIsDead && !this.theGameIsPaused;
    }

    /**
     * @property {Function} moveDown - This function displays the image depicting the death of the object in question, 
     * and via the function moveDown() inherited from the super class, 
     * moves downwards to be removed from the canvas
     * @returns {Boolean}
     */
    moveDown() {
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.speedY += 5
        super.moveDown();
    }

    /**
     * @property {Function} jump  This function allows the object in question to jump thanks to the jump() 
     * function inherited from the super class.
     * Finally, the variable TWEEW containing the chirping sound is played
     * @returns {void}
     */
    jump() {
        this.speedY = 10 + Math.random() * 25
        super.jump();
        this.TWEET.play();
    }
}