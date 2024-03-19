/**
 * This class is an instance of the DrawableObject class, from which it inherits 
 * the properties and methods for drawing graphics in the canvas context. 
 * This class will serve as a model for the creation of movable objects, 
 * such as the character, clouds, enemies and the final boss
 */
class MovableObject extends DrawableObject {
    speed;
    speedY = 0;
    acceleration = 3.5;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    lastMovement = 0;
    isAboveEnemy = false;
    HIT_SOUND = new Audio('assets/audio/chickenHit.mp3');

    passedSeconds10;
    passedSeconds20;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    /**
     * @property {Function} applyGravity - 
     * This function applies the gravitational force to the object 
     * in question when it is in the air.
     * @returns {void}
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0 && !this.theGameisPaused) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * @property {Function} isAboveGround - This function checks whether the object in question is in the air
     * @returns {Boolean} - a boolean value truthy or falsy
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else if (this instanceof SmallChicken) {
            return this.y <= 340
        } else {
            return this.y <= 120
        }
    }

    /**
     * @property {Function} isColliding - This function check the collision between the Character 
     * and other movable objects within the canvas
     * @param {object} mo - the movable object with which the Character or Bottle collides
     * @returns {Boolean} - a boolean value of true if the object in question collides with a movable object, vertically and horizontally
     */
    isColliding(mo) {
        return this.checkCollisionInBothDimensions(mo);
    }

    checkCollisionInBothDimensions(mo) {
        const moLeft = mo.x;
        const moRight = mo.x + mo.width;
        const moTop = mo.y;
        const moBottom = mo.y + mo.height;

        const thisLeft = this.x;
        const thisRight = this.x + this.width;
        const thisTop = this.y;
        const thisBottom = this.y + this.height;

        const horizontalCollision = thisLeft + this.offset.left < moRight - mo.offset.right && thisRight - this.offset.right > moLeft + mo.offset.left;
        const verticalCollision = thisTop + this.offset.top < moBottom - mo.offset.bottom && thisBottom - this.offset.bottom > moTop + mo.offset.top;

        return horizontalCollision && verticalCollision;
    }

    /**
     * @property {Function} hit - This function checks whether the object in question has been hit or collided with something. 
     * In this case the object's energy is decreased by 20% for each hit. 
     * The exact time in which the collision occurred is then saved in the lastHit variable.
     * @returns {void}
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * @property {Function} hit - This variable checks whether the object in question has been knocked down
     * @returns {Boolean} - the numerical value of the object's energy
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * @property {Function} isHurt - This function checks whether the time elapsed since the last collision is less than one second
     * @returns {Boolean} - if the passed time is less than one second, the condition is true
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in milliseconds;
        timePassed = timePassed / 1000;
        return timePassed < 1
    }

    /**
     * @property {Function} isIdle This function controls the idle of the Character
     * @returns {Boolean} - true, if the passed time is between 20 and 40 seconds
     */
    isIdle() {
        let timepassed = new Date().getTime() - this.lastMovement;
        this.passedSeconds10 = timepassed / 1000;
        return (this.passedSeconds10 >= 20 && this.passedSeconds10 <= 40);
    }

    /**
     * @property {Function} isLongIdle - This function controls the long idle of the Character
     * @returns {Boolean} - true, if the passed time is more than or equal to 41 seconds
     */
    isLongIdle() {
        let timepassed = new Date().getTime() - this.lastMovement;
        this.passedSeconds20 = timepassed / 1000;
        return this.passedSeconds20 >= 41;
    }

    /**
     * @property {Function} playAnimation - This function takes an array of images as an argument. 
     * This array of images is iterated using the modulo operator ( % ) and each iterated 
     * image is shown on the screen, giving life to an animation.
     * @param {array} images - the array of images that we pass as arguments
     * @returns {void}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    /**
     * @property {Function} moveLeft - This function makes the object in question move to the left
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

     /**
     * @property {Function} moveRight - This function makes the object in question move to the right
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

     /**
     * @property {Function} moveDown - This function makes the object in question move to down
     * @returns {void}
     */
    moveDown() {
        this.y += this.speedY
    }

     /**
     * @property {Function} jump - This function allows the object in question to jump by 40 pixels if the object in question 
     * is not above ground, else by 20 pixels if it is above ground.
     * @returns {void}
     */
    jump() {
        if (this instanceof Character && this.isAboveGround()) {
            this.speedY = 20;
        } else if (this instanceof Character && !this.isAboveGround()) {
            this.speedY = 40;
        }
    }
}