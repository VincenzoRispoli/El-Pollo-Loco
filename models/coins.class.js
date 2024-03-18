class Coins extends MovableObject {

    y = 100 + Math.random() * 50;
    x = 300 + Math.random() * 1200;
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


    constructor() {
        super();
        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.animate();
        this.playCoinSound();
    }

    /**
     * This function play the animation of this Object
     */
    animate() {
        setInterval(() => {
            if (!this.theGameIsPaused) {
                this.playAnimation(this.IMAGES_COINS);
            }
        }, 200)
    }
    /**
     * This function plays the sound of coins when one of them is taken by the Character
     */
    playCoinSound() {
        if (this.isEarned) {
            this.COIN_SOUND.play()
        }
    }
}