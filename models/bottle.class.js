/**
 * This class is an extension of the MovableObject class and represents the Bottle object.
 */
class Bottle extends MovableObject {
    y = 330;
    x = 200 + Math.random() * 800;
    height = 100;
    width = 100;
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    theGameIsPaused = false;
    isGrabbed = false;
    BOTTLE_TAKEN = new Audio('assets/audio/grab-bottle.mp3');

    /**
     * The constructor of the Bottle class loads the single image and the array of images 
     * for the animations. Then the animate() function is called for the various animations, 
     * and finally the playGrabbindSound() function is called, which contains a sound effect, which is only 
     * activated when a bottle is grabbed.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.animate();
        this.playGrabbindSound();
    }

    /**
     * This function play the animation of the Object in question
     */
    animate() {
        setInterval(() => {
            if (!this.theGameIsPaused) {
                this.playAnimation(this.IMAGES_BOTTLE)
            }
        }, 220)
    }

    /**
     * This function plays the bottle grabbing sound if the isGrabbing variable is true, 
     * that means if the Character has collided with a bottle along the way

     */
    playGrabbindSound() {
        if (this.isGrabbed && !MUSIC.muted) {
            this.BOTTLE_TAKEN.play();
        }
    }
}