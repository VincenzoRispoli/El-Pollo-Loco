class World {
    character = new Character();  // new Image() crea il tag HTML <img>
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StausbarCoins();
    statusbarBottles = new StatusbarBottle();
    statusbarEndBoss = new StatusbarEndBoss();
    coins = [new Coins(), new Coins(), new Coins(), new Coins(), new Coins()];
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()]
    throwableObjects = [];
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    endBoss = new EndBoss();
    gameIsFinish = false

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    /**
     * This function monitors events during the game, such as collisions between Character and enemies, 
     * between bottles and enemies, checks if enemies have been knocked down or if Character has been knocked down
     */
    run() {
        setInterval(() => {
            this.checkCollisionCoins();
            this.checkCollisionCharacterBottles();
            this.checkCollisionBottlesEnemy();
            this.checkCollisonFromAbove();
        }, 50);
        
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObject();
            this.checkiIfCharacterIsDead();
            this.checkIfBossIsDead();
            this.generateNewBottle();
            this.checkCollisionCharBoss();
            this.checkDistanceBetweenCharAndBoss();
            this.checkCollisionBottleEndBoss();
            this.checkPositionEndBoss();
        }, 200);
    }

    /**
     * This function controls the collision between Character Pepe and enemies.
     * In this case, the hit() function will be activated, which will reduce the Character's energy by 20% per hit
     */
    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.enemyIsDead && !this.character.theGameIsPaused) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        })
    }

    /**
     * This function instead counters the collision between Character Pepe and the final boss.
     * In this case, the hit() function will be activated, which will reduce the Character's energy by 20% per hit
     */
    checkCollisionCharBoss() {
        if (this.character.isColliding(this.endBoss) && !this.endBoss.isDead()) {
            this.character.hit();
            this.statusbarHealth.setPercentage(this.character.energy)
        }
    }

    /**
     * This function checks if a top-down collision occurs on an enemy. In such a case the enemy is knocked down
     */
    checkCollisonFromAbove() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() &&
                this.character.speedY < 0 && !enemy.enemyIsDead) {
                enemy.enemyIsDead = true;
                enemy.HIT_SOUND.play();
                this.character.jump();
            };
        });
    }

    /**
     * This function controls the collision between Character Pepe and coins.
     * In this case the statusCoins variable contained within the statusbarCoins class will be increased 
     * by +1 and a longer coin progress bar will be displayed. 
     * Next, the coin sound function is activated and finally the current coin is removed via the splice method
     */
    checkCollisionCoins() {
        for (let i = 0; i < this.coins.length; i++) {
            let coin = this.coins[i];
            if (this.character.isColliding(coin)) {
                this.statusbarCoins.setStatusCoins(this.statusbarCoins.statusCoins += 1)
                coin.isEarned = true
                coin.playCoinSound();
                this.coins.splice(i, 1);
            }
        }
    }

    /**
     * This function controls the collision between the Character Pepe and the bottles. In such case
     * the current bottle element is removed via the splice method
     * the statusBottles variable is incremented by
     * +1 to show on screen the image with the longest progress bar
     */
    checkCollisionCharacterBottles() {
        for (let i = 0; i < this.bottles.length; i++) {
            let bottle = this.bottles[i]
            if (this.character.isColliding(bottle) && this.bottles.length <= 5) {
                bottle.isGrabbed = true;
                bottle.playGrabbindSound();
                this.bottles.splice(i, 1);
                this.statusbarBottles.setStatusBottles(this.statusbarBottles.statusBottles += 1);
            }
        }
    }

    /**
     * This variable controls whether the Character is dead. In this case the functions within the Character 
     * class are called, for the animation for the sound and after 3 seconds the function youlost() 
     * is called which causes an overlay with the sign "You Lost" to appear and finally all intervals
     *  are stopped with the function clearInterval()
     */
    checkiIfCharacterIsDead() {
        if (this.character.isDead()) {
            MUSIC.pause();
            setTimeout(() => {
                this.character.youLost();
                for (let i = 1; i < 9999; i++) window.clearInterval(i);
                MUSIC.pause();
            }, 3000)
        }
    }

    /**
    * This variable controls whether the End Boss is dead. In this case the functions within the End Boss 
     * class are called, for the animation for the sound and after 3 seconds the function gameOver()
     * is called which causes an overlay with the sign "Game Over" to appear and finally all intervals
     *  are stopped with the function clearInterval()
     */
    checkIfBossIsDead() {
        if (this.endBoss.isDead()) {
            MUSIC.pause();
            setTimeout(() => {
                this.endBoss.gameOver();
                for (let i = 1; i < 9999; i++) window.clearInterval(i);
            }, 3000)
        }
    }

    /**
     * This function takes care of generating new bottles, for a maximum number of 2, when the bottle array is 0. 
     * That is, when the Character has taken all the bottles, 3 more appear.
     * 
     */
    generateNewBottle() {
        if (this.statusbarBottles.statusBottles == 0 && this.bottles.length <= 2) {
            let bots = new Bottle();
            bots.x = 50 + Math.random() * 350; 
            this.bottles.push(bots);
            if(this.character.x > 400){
                document.getElementById('new-bottles-advice-container').classList.remove('d-none')
                setTimeout(this.hideBottleAdvice, 3000);
            }
        }
    }

    /**
     * This function hide the new bottles advice after 3 seconds
     */
    hideBottleAdvice() {
        document.getElementById('new-bottles-advice-container').classList.add('d-none');
    }

    /**
     * This function controls the collision between bottles and enemies. After 180 milliseconds, 
     * the collided bottle is removed via the splice method
     */
    checkCollisionBottlesEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    bottle.isCollided = true
                    enemy.enemyIsDead = true;
                    setTimeout(() => {
                        this.deleteBottleFromCtx(bottle);
                    }, 180)
                }
            })
        }
    }

    /**
     * This function takes the current throwable object as a parameter, and removes it via the splice method
     * @param {object} bottle - The throwable object being thrown at enemies
     */
    deleteBottleFromCtx(bottle) {
        this.throwableObjects.splice(bottle, 1)
    }

    /**
     * This function controls the collision between bottles the final boss. If the bottle hits the boss, the hit() 
     * function is activated and the Boss's energy decreases by 20% for each bottle that hits it
     * After 130 seconds, the bottle is removed via the deleteBottleFromCtx(bottle) function
     */
    checkCollisionBottleEndBoss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.endBoss)) {
                bottle.isCollided = true;
                this.endBoss.isCollided = true
                this.endBoss.hit();
                this.statusbarEndBoss.setPercentage(this.endBoss.energy);
                setTimeout(() => {
                    this.deleteBottleFromCtx(bottle)
                }, 130)
            }
        });
    }

    /**
     * This function controls the distance between Character Pepe and the final Boss. 
     * If the distance between them is 350 pixels or less, the End Boss attacks
     */
    checkDistanceBetweenCharAndBoss() {
        if ((this.endBoss.x - this.character.x <= 500)) {
            this.endBoss.isCollided = false;
            this.endBoss.attack = true;
            document.getElementById('buttons-container').classList.add('traslateButtonsContainer');
        } else {
            this.endBoss.attack = false;
            document.getElementById('buttons-container').classList.remove('traslateButtonsContainer');
        }
    }

    /**
     * This function controls the current position of the final boss. If it is less than or equal to 1000 pixels, 
     * this means that it has moved far from its original position. 
     * It then moves back until it reaches 2000 pixels, which would be its original position
     */
    checkPositionEndBoss() {
        if (this.endBoss.x <= 1000) {
            this.endBoss.comeBack = true;
        } else if (this.endBoss.x >= 2000) {
            this.endBoss.comeBack = false;
        }
    }

    /**
     * This function checks whether there are any bottles to be thrown. 
     * If so, when the user presses the D key on the keyboard, the bottle is thrown. 
     * Then the value of the statusBottles variable is decremented by 1
     */
    checkThrowObject() {
        if (this.keyboard.D == true && this.statusbarBottles.statusBottles > 0) {
            if (this.character.otherDirection) {
                let bottle = new ThrowableObject(this.character.x - 20, this.character.y + 50);
                this.throwableObjects.push(bottle);
            } else {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
            }
            this.character.lastMovement = new Date().getTime();
            this.statusbarBottles.setStatusBottles(this.statusbarBottles.statusBottles -= 1)
        }
    }

    /**
     * This function draws the images we pass as arguments within the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // questa riga di codice cancella limmagine nella posizione attuale

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addToMap(this.endBoss); // vedi riga 15
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        if (this.endBoss.x - this.character.x <= 500) {
            this.addToMap(this.statusbarEndBoss);
        }
        this.ctx.translate(this.camera_x, 0)

        this.ctx.translate(-this.camera_x, 0)
        // draw() viene sempre richiamato per illustrare le immagine nel mondo continuamente;
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    /**
     * This function adds the current object passed as an argument that we want to draw to the canvas
     * @param {object} mo - the movable object we want to draw within the canvas
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
     * This function takes an array as its argument. This array is then iterated through 
     * the forEach loop and each object within the array is drawn in the canvas
     * @param {object} objects - the array of objects we want to iterate over to draw them in the canvas
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        })
    }

    /**
     * This function takes the current object as an argument 
     * and flips the image if this object moves in the opposite direction
     * @param {object} mo -  The movable object whose image we want to flipping
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1
    }

    /**
     * This function takes the movable object as an argument and flips the image back
     * @param {object} mo - The movable object whose image we want to flipping back
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1
    }
}