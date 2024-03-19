/**
 * This class represents the Cloud object and is an instance of the MovableObject class.
 */
class Cloud extends MovableObject {

    y = 20;
    height = 130;
    width = 250;
    speed = 0.05 + Math.random() * 0.15;
    theGameIsPaused = false;

    /**
     * The constructor of the Cloud class, loads the cloud image, sets the x dimension to a 
     * random value ranging from 0 to 4000 pixels and finally activates the animate() 
     * function for the various animations of the object
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 4000;
        this.animate();
    }

    /**
     * @property {Function} animate - This function play the animations of this Object.
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            if (!this.theGameIsPaused) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


}