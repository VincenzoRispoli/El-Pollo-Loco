class StatusbarEndBoss extends DrawbleObject {
    //  x = 2157
    x = 500
    y = 0
    width = 200;
    height = 50;

    STATUSBAR_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.STATUSBAR_ENDBOSS);
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
        let path = this.STATUSBAR_ENDBOSS[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }

    /**
   * This function checks the current value of the percentage variable of the statusbarHealth 
   * object by means of some conditions and returns a number from 0 to 5 
   * if the value is equal to some number of a condition
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