class StausbarCoins extends DrawbleObject {

    x = 0
    y = 35
    width = 200;
    height = 50;

    STATUSBAR_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]

    statusCoins = 0
 
    constructor(){
        super().loadImages(this.STATUSBAR_COINS);
        this.setStatusCoins(this.statusCoins)
    }

    /**
     * This function takes the current numeric value of the statusCoin variable as an argument 
     * and iterates through the STATUSBAR_COINS array. It takes the image with the index equal to the 
     * value of the statusBar variable and displays the selected image within the canvas
     * As the value of the statusCoins variable increases or decreases, we will have 
     * a longer or shorter image of the coin progress bar
     * @param {number} statusCoins - a numerical value from 0 to 5
     */
    setStatusCoins(statusCoins){
        let path = this.STATUSBAR_COINS[statusCoins];
        this.img = this.imageCache[path];
    }
}