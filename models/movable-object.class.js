class MovableObject extends DrawbleObject {
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
     * This function applies the gravitational force to the object in question when it is in the air.
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
     * This function checks whether the object in question is in the air
     * @returns - a boolean value truthy or falsy
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
     * This function check the collision between the Character and other movable objects within the canvas
     * @param {object} mo - the movable object with which the Character or Bottle collides
     * @returns {boolean} - a boolean value of true if the object in question collides with a movable object, vertically and horizontally
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
     * This function checks whether the object in question has been hit or collided with something. 
     * In this case the object's energy is decreased by 20% for each hit. 
     * The exact time in which the collision occurred is then saved in the lastHit variable
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
     * This variable checks whether the object in question has been knocked down
     * @returns - the numerical value of the object's energy
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This function checks whether the time elapsed since the last collision is less than one second
     * @returns - if the passed time is less than one second, the condition is true
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in milliseconds;
        timePassed = timePassed / 1000;
        return timePassed < 1
    }

    /**
     * This function controls the idle of the Character
     * @returns - true, if the passed time is between 20 and 40 seconds
     */
    isIdle() {
        let timepassed = new Date().getTime() - this.lastMovement;
        this.passedSeconds10 = timepassed / 1000;
        return (this.passedSeconds10 >= 20 && this.passedSeconds10 <= 40);
    }

    /**
     * This function controls the long idle of the Character
     * @returns - true, if the passed time is more than or equal to 41 seconds
     */
    isLongIdle() {
        let timepassed = new Date().getTime() - this.lastMovement;
        this.passedSeconds20 = timepassed / 1000;
        return this.passedSeconds20 >= 41;
    }

    /**
     * 
     * This function takes an array of images as an argument. This array of images is iterated using the modulo 
     * operator ( % ) and each iterated image is shown on the screen, giving life to an animation
     * @param {array} images - the array of images that we pass as arguments
     */
    playAnimation(images) {
        let i = this.currentImage % images.length
        let path = images[i]
        this.img = this.imageCache[path]
        this.currentImage++
    }

    /**
     * This function makes the object in question move to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }

     /**
     * This function makes the object in question move to the right
     */
    moveRight() {
        this.x += this.speed;
    }

     /**
     * This function makes the object in question move to down
     */
    moveDown() {
        this.y += this.speedY
    }

     /**
     * Tthis function allows the object in question to jump by 40 pixels if the object in question 
     * is not above ground, else by 20 pixels if it is above ground
     */
    jump() {
        if (this instanceof Character && this.isAboveGround()) {
            this.speedY = 20;
        } else if (this instanceof Character && !this.isAboveGround()) {
            this.speedY = 40;
        }
    }
}