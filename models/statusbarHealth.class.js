class StatusbarHealth extends DrawbleObject {
    x = 0
    y = 0;
    width = 200;
    height = 50;

    STATUSBAR_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ]; 

    percentage = 100

    constructor() {
        super();
        this.loadImages(this.STATUSBAR_HEALTH);
        this.setPercentage(this.percentage)
    }

    /**
     * This function sets the current energy value of the object in question.
     * As the energy value of the object in question decreases, 
     * an image of the health status bar is shown in the canvas with a shorter bar
     * @param {number} percentage - numerical value of the energy of an object
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.STATUSBAR_HEALTH[this.resolveImageIndex()]
        this.img = this.imageCache[imagePath];
    }

    /**
     * This function checks the current value of the percentage variable of the statusbarHealth 
     * object by means of some conditions 
     * and returns a number from 0 to 5 if the value is equal to some number of a condition
     * @returns - a numerical value from 0 to 5 depending on the verified condition
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5
        } else if (this.percentage == 80) {
            return 4
        } else if (this.percentage == 60) {
            return 3
        } else if (this.percentage == 40) {
            return 2
        } else if (this.percentage == 20) {
            return 1
        } else {
            return 0
        }
    }
}