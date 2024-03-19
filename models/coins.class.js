/**
 * This class is an instance of the MovableObject class and represents the Coins object.
 */
class Coins extends MovableObject {

    y = 100 + Math.random() * 50;
    x = 800 + Math.random() * 1200;
    height = 130;
    width = 130;
    isEarned = false
    theGameIsPaused = false;
    COIN_SOUND = new Audio('assets/audio/coins.mp3');

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    offset = {
        top:40,
        left: 40,
        right: 80,
        bottom: 80
    }


    /**
     * The constructor of the Coins class loads the single image and the array of images 
     * for the animation. Then the animate() function is called for the various animations, 
     * and finally the playSound() function is called, which contains a sound effect, which is only 
     * activated when a coin is picked up
     * 
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.animate();
        this.playCoinSound();
    }

    /**
     * @property {Function} animate - This function play the animation of this Object
     * @returns {void} 
     */
    animate() {
        setInterval(() => {
            if (!this.theGameIsPaused) {
                this.playAnimation(this.IMAGES_COINS);
            }
        }, 200)
    }
    /**
     * @property {Function} playCoinSound This function plays the sound of coins when one of them is taken 
     * by the Character.
     * @returns {void} 
     */
    playCoinSound() {
        if (this.isEarned) {
            this.COIN_SOUND.play();
        }
    }
}