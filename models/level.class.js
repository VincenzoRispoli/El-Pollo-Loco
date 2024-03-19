/**
 * This class represents the level object, which will be the level of the game, 
 * with the respective enemies, background objects and clouds
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200

    /**
     * This constructor takes as arguments the arrays enemies, clouds and backgroundObjects
     * and assigns them to the class variables, enemies, clouds and backgroundObjects
     * @param {array} enemies - array of enemy objects in the game
     * @param {array} clouds - array of clouds objects in the game
     * @param {array} backgroundObjects - array of backgroundObjects objects in the game
     */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}