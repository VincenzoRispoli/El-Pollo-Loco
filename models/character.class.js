/**
 * This class is an extension of the MovableObject class and represents the Character object.
 */
class Character extends MovableObject {
    x = 100;
    y = 40;
    height = 300;
    width = 160;
    speed = 15

    offset = {
        top: 70,
        left: 25,
        right: 55,
        bottom: 0
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    world;
    gameIsFinish = false;
    theGameIsPaused = false;
    WALKING_AUDIO = new Audio('assets/audio/walking.mp3');
    JUMPING_AUDIO = new Audio('assets/audio/voice_jumping.mp3');
    SOUND_FAILURE = new Audio('assets/audio/wahwah.mp3');

    /**
    * The constructor of the Charcter class loads the initial image and the 
    * images of the alert, walk, wounding and death animations.
    * Next, the applyGravity() function is called to simulate the force of gravity when the Character jumps.
    * Then the animate() function is called to start the various animations and finally 
    * the youLost() function, which will only be activated if the Character has been defeated.
    */
    constructor() {
        super();
        this.loadImage(this.IMAGES_JUMPING[0]);
        this.loadImage(this.IMAGES_HURT[0]);
        this.loadImage(this.IMAGES_DEAD[0]);
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.youLost();
    }

    /**
     * @property {Function} animate - This function play the animation of the Character
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.checkCharacterMovements();
        }, 1000 / 25);
        setInterval(() => {
            this.checkThePositioAndStateCharacter();
        }, 1000 / 25);
        setInterval(() => {
            this.checkTheCharacterIdle();
        }, 200);
        setInterval(() => {
            this.playJumpImagesAnimations();
        }, 100);
    }

    /**
     * @property {Function} checkCharacterMovements - This function check the Character's movement.
     * @returns {void}
     */
    checkCharacterMovements() {
        if (this.canMoveToLeftAndJump()) {
            this.moveToLeftAndJump();
        } else if (this.canMoveToRightAndJump()) {
            this.moveToRightAndJump();
        } else if (this.canMoveRight()) {
            this.moveRight()
        } else if (this.canMoveLeft()) {
            this.moveLeft()
        } else if (this.canJump()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100
    }

    /**
     * @property {Function} checkThePositioAndStateCharacter - This function check the position and the state of 
     * the Character. 
     * @returns {void}
     */
    checkThePositioAndStateCharacter() {
        if (this.isDead() && !this.theGameIsPaused) {
            this.gameOver();
        } else {
            if (this.canWalk()) {
                this.playAnimation(this.IMAGES_WALKING);
                if (!MUSIC.muted) {
                    this.WALKING_AUDIO.play();
                }
            } else if (this.isHurt() && !this.theGameIsPaused) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }
    }

    /**
     * @property {Function} playJumpImagesAnimations - This function activates the jump animation images 
     * when the Character is in the air.
     * @returns {void}
     */
    playJumpImagesAnimations() {
        if (this.isAboveGround() && !this.theGameIsPaused) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    /**
     * @property {Function} checkTheCharacterIdle - This function check the Character idle;
     * If the Character's inactivity lasts between 20 and 40 seconds, the idle animations function will be called.
     * If the Character's inactivity is longer than 40 seconds, the long idle animations function will be called.
     * @returns {void}
     */
    checkTheCharacterIdle() {
        if (this.isIdle() && !this.theGameIsPaused) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (this.isLongIdle() && !this.theGameIsPaused) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
    }

    /**
     * @property {Function} youLost - This function shows the "You Lost" endscreen overlay.
     * @returns {void}
     */
    youLost() {
        document.getElementById('endscreen-you-lost').classList.remove('d-none');
    }

    /**
     * @property {Function} canMoveToLeftAndJump - This function controls if the character can jump and 
     * move to the left at the same time.
     * @returns {Boolean} - a boolean value of true or false
     */
    canMoveToLeftAndJump() {
        return this.world.keyboard.SPACE && this.world.keyboard.LEFT && !this.theGameIsPaused && !this.isAboveGround()
    }

    /**
     * @property {Function} moveToLeftAndJump - This function allows the Character to move to the left and 
     * jump at the same time.
     * @returns {void}
     */
    moveToLeftAndJump() {
        this.jump();
        this.moveLeft();
    }

    /**
     * @property {Function} canMoveToRightAndJump -  This function controls if the character can jump and 
     * move to the right at the same time.
     * @returns {Boolean} - a boolean value of true or false
     */
    canMoveToRightAndJump() {
        return this.world.keyboard.SPACE && this.world.keyboard.RIGHT && !this.theGameIsPaused && !this.isAboveGround()
    }

    /**
     * @property {Function} moveToRightAndJump - This function allows the Character to move to the right and 
     * jump at the same time.
     * @returns {void}
     */
    moveToRightAndJump() {
        this.jump();
        this.moveRight();
    }

    /**
     * @property {Function} canMoveRight - This function allows the character to move to the right if the 
     * condition is true. 
     * That is, if the game is not paused, if the key Arrow-Right of the keyboard is pressed and if the x 
     * position of the character does not exceed the value of the level_end_x variable
     * @returns {Boolean} - a boolean value of true or false
     */
    canMoveRight() {
        return !this.theGameIsPaused && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
    }

    /**
     * @property {Function} moveRight  - This function makes the character move to the right.
     * @returns {void}
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.lastMovement = new Date().getTime();
    }

    /**
     * @property {Function} canMoveLeft - This function returns a true value if the Arrow-Left key of the keyboard is pressed, 
     * if the character has not exceeded the maximum limit of pixels to the left and
     * the game is not paused
     * @returns {Boolean} - a boolean value of true or false
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0 && !this.theGameIsPaused
    }

    /**
     * @property {Function} moveLeft - This function allows the object in question to move to the left.
     * @returns {void}
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.lastMovement = new Date().getTime();
    }

    /**
     * @property {Function} canJump - This function returns a true value if the SPACE key is pressed, 
     * if the game is not paused and if the character is not already in the air
     * @returns {Boolean} - a boolean value of true or false.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround() && !this.theGameIsPaused
    }

    /**
     * @property {Function} jump This function allows the object in question to jump.
     * The jump sound variable is then activated and finally the exact 
     * time from the moment of the jump is detected.
     * @returns {void}
     */
    jump() {
        if (!MUSIC.muted) {
            this.JUMPING_AUDIO.play();
        }
        super.jump();
        this.lastMovement = new Date().getTime();
    }

    /**
     * @property {Function} gameOver - This function is activated when the character's energy is equal to 0. 
     * Death animations are activated and then the moveDown() function 
     * is activated which makes the character jump downwards.
     * @returns {void}
     */
    gameOver() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speedY += 5
        this.acceleration -= 2
        this.moveDown();
        if (!MUSIC.muted) {
            this.SOUND_FAILURE.play();
        }
    }


    /**
     * @property {Function} canWalk - This function checks whether the Character can walk.
     * @returns {Boolean} - a boolean value of true or false. 
     */
    canWalk() {
        return this.isWalking() && !this.theGameIsPaused && !this.isAboveGround()
    }

    /**
     * @property {Function} isWalking This function returns a Boolean value of true if the game is not paused and if either the Arrow-Right 
     * key or the Arrow-Left key on the keyboard is pressed
     * @returns {Boolean} - a boolean value of true or false.
     */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.theGameIsPaused
    }
}