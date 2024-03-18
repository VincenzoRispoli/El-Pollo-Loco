class StatusbarBottle extends DrawbleObject {

    x = 0
    y = 70
    width = 200;
    height = 50;


    STATUSBAR_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ]

    statusBottles = 0

    constructor(){
        super().loadImages(this.STATUSBAR_BOTTLES);
        this.setStatusBottles(this.statusBottles)
    }

    /**
     * This function takes the current numeric value of the statusCoin variable as an argument 
     * and iterates through the STATUSBAR_BOTTLES array. It takes the image with the index equal to the 
     * value of the statusBottles variable and displays the selected image within the canvas.
     * As the value of the statusBottles variable increases or decreases, 
     * we will have a longer or shorter image of the bottle progress bar
     * @param {number} statusBottles - a numerical value from 0 to 5
     */
    setStatusBottles(statusBottles){
        let path = this.STATUSBAR_BOTTLES[statusBottles];
        this.img = this.imageCache[path];
    }
}