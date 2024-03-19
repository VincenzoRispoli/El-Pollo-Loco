/**
 * This class is an extension of the MovableObject class and represents the Background objects.
 */
class BackgroundObject extends MovableObject {
    height = 480
    width = 720;

    /**
     * The constructor of the BackgroudObjects class takes as an argument, 
     * the image path of each background object and the position x of each background object to be positioned. 
     * Finally, it calculates the y-axis position of each object by subtracting the height - 480 pixels.
     * @param {string} imagePath - the path of the image to be loaded
     * @param {number} x - the position on the x-axis where the object will be positioned
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x
        this.y = this.height - 480
    }
}