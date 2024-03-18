class ThrowableObject extends MovableObject {

    x;
    y;
    width = 80;
    height = 80;
    speed = 20;

    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    isCollided = false;
    otherDirection = false;
    BREAKING_SOUND = new Audio('assets/audio/breaking-glass.mp3');

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_ROTATION);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.acceleration = 5
        this.throw();
    }

    /**
     * This function allows us to throw an object and then apply 
     * the force of gravity to make it fall to the ground, simulating real physics
     */
    throw() {
        this.speedY = 40;
        this.applyGravity();
        let interval = setInterval(() => {
            this.checkBottleState();
        }, 1000 / 15)

        setTimeout(() => {
            clearInterval(interval);
        }, 1200)
    }

    /**
     * This function checks the status of the launched bottle. That is, whether it is colliding with something, 
     * whether it is still in the air or, 
     * depending on the direction of the Character, whether it should be thrown to the right or left.
     */
    checkBottleState() {
        if (this.hitsSomething()) {
            this.bottleHasBroken();
        } else if (this.bottleIsFlying) {
            if (world.character.otherDirection) { // se Pepe é direzionato verso sinistra, inverti la x a - quindi la direzione di lancio delle bottiglie
                this.bottleIsThrownToLeft();
            } else {
                this.bottleIsThrownToRight();
            }
        }
    }

    /**
     * This function returns a value of true if the bottle has collided with an enemy or has reached 
     * an altitude Y of 327, that's means has collided with the floor.
     * @returns - a Boolean value of true, if one of the conditions is true
     */
    hitsSomething() {
        return this.isCollided || this.y >= 327;
    }

    /**
     * This function is activated when a collision occurs and the bottle breaks. The breaking sound is activated, 
     * the gravitational acceleration is deactivated and the splash animation is activated
     */
    bottleHasBroken() {
        this.BREAKING_SOUND.play();
        this.speed = 0;
        this.speedY = 0;
        this.playAnimation(this.BOTTLE_SPLASH);
    }

    /**
     * This function checks whether the bottle is still in the air
     * @returns a boolean value of true if the condition is true
     */
    bottleIsFlying() {
        return this.y <= 334
    }

    /**
     * This function allows bottles to be thrown to the left, if the Character's direction is to the left
     */
    bottleIsThrownToLeft() {
        this.x -= this.speed;
        this.y += this.acceleration;
        this.playAnimation(this.BOTTLE_ROTATION);
    }

    /**
     * This function allows bottles to be thrown to the right, if the Character's direction is to the right
     */
    bottleIsThrownToRight() {
        this.x += this.speed;
        this.y += this.acceleration;
        this.playAnimation(this.BOTTLE_ROTATION);
    }
}

