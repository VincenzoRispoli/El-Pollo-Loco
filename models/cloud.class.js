class Cloud extends MovableObject {

    y = 20;
    height = 130;
    width = 250;
    speed = 0.05 + Math.random() * 0.15;
    theGameIsPaused = false;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 4000;
        this.animate();
    }

    /**
     * This function play the animations of this Object
     */
    animate() {
        setInterval(() => {
            if (!this.theGameIsPaused) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


}