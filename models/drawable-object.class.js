/**
 * This class represents the model for the creation of drawable objects and serves as a model for all objects 
 * that are depicted within the canvas context.
 */
class DrawableObject {
    x = 120
    y = 100
    height = 200;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    /**
     * @property {Function} loadImage - This function takes as an argument the image path of the object in question and assigns it to the img variable
     * @param {object} path - the path of the image that we pass as argument.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    /**
     * @property {Function} loadImages This function takes as its argument the array containing the image paths of the current object. 
     * Iterates through the image array and each image is assigned to the img variable
     * @param {array} arr - The array of image paths
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img
        })
    }

    /**
     * @property {Function} draw This function takes the context as an argument, and through the drawImage() 
     * function of which we pass the images as arguments, we can show the images or graphics 
     * in our canvas with the related animations
     * @param {object} ctx - the context object in which we can draw images or graphics.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

