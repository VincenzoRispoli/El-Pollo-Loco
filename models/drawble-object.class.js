class DrawbleObject {
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
     * This function takes as an argument the image path of the object in question and assigns it to the img variable
     * @param {object} path - the path of the image that we pass as argument
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    /**
     * This function takes as its argument the array containing the image paths of the current object. 
     * Iterates through the image array and each image is assigned to the img variable
     * @param {array} arr - The array of image paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img
        })
    }

    /**
     * This function takes the context as an argument, and through the drawImage() 
     * function of which we pass the images as arguments, we can show the images or graphics 
     * in our canvas with the related animations
     * @param {object} ctx - the context object in which we can draw images or graphics
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

// drawFrame(ctx) {
//     if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof ThrowableObject || this instanceof SmallChicken || this instanceof EndBoss) { // assegnare le proprietá del bordo solo a pepe e chickens
//         ctx.beginPath();
//         ctx.lineWidth = "5";
//         ctx.strokeStyle = "blue";
//         ctx.rect(this.x, this.y, this.width, this.height);
//         ctx.stroke();
//     }

//     if (this instanceof Character || this instanceof Bottle || this instanceof EndBoss) {
//         ctx.beginPath();
//         ctx.lineWidth = "5";
//         ctx.strokeStyle = "red";
//         ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
//         ctx.stroke();
//     }
// }

