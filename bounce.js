"use strict";

//Setup pixi.js with a canvas size of 512px x 512px
let renderer = PIXI.autoDetectRenderer(512, 512, {transparent: true});
document.body.appendChild(renderer.view);
let stage = new PIXI.Container();
renderer.render(stage);

PIXI.loader
    .add("ball", "sprites/ball.png")
    .load(setup);

let ball;
/**
 * setup the scene, create the ball and bounce it
 */
function setup () {
    ball = _createSprite(120, 120, "ball");
    initializeBall();
    stage.addChild(ball);

    sceneBottom = renderer.view.height - 10 - ball.height;
    document.getElementById("ball-speed").value = speed;

    bounce();
}

/**
 * Initialize the ball with the starting values of the simulation
 */
function initializeBall() {
    ball.center();
    ball.y = 0;
    ball.goingDown = true;
    ball.velocity = 0.01;
}

/**
 * Change the speed of the ball
 * @param newSpeed
 */
function changeSpeed(newSpeed) {
    speed = newSpeed;
    restart();
}

/**
 * The delay between each frame
 * @type {number}
 */
let delay = 16;
/**
 * The speed scaling factor
 * @type {number}
 */
let speed = 1;
/**
 * The gravity scale
 * @type {number}
 */
const gravityScale = 0.50;
/**
 * A constant for defining the bottom of the scene
 * @type {number}
 */
let sceneBottom = 0;
function bounce() {
    //Calculate the velocity of the ball and move it vertically by that number
    let vel = ball.velocity;
    ball.velocity += Math.abs(vel * gravityScale) * (1 / delay) * speed;
    ball.moveBy(0, vel);

    //The ball has hit the bottom of the Canvas, begin moving it up
    if (ball.y >= sceneBottom) {
        ball.y = sceneBottom;
        //Check if the ball is moving very slowly and stop it if so, else bounce it back up
        if(vel < 0.3)
            ball.velocity = 0;
        else {
            squeeze(true, 20, 20);
            ball.velocity = -vel;
            ball.goingDown = false;
        }
    }
    //The ball has reached the top, move it down
    else if(!ball.goingDown && vel > -0.1) {
        ball.goingDown = true;
        ball.velocity = -vel;
    }

    renderer.render(stage);
    setTimeout(bounce, delay, ball);
}

/**
 * Squeeze the ball by gradually changing the height of the sprite down and up again
 * @param squeezingDown {boolean} - True if the ball is squeezing down, false if not
 * @param curr {number} - The current amount of squeeze
 * @param init - The initial amount of squeeze
 */
function squeeze (squeezingDown, curr, init) {
    //The ball is as fully squeezed, flip the direction
    if(curr === 0 && squeezingDown) {
        squeezingDown = false;
    }
    //squeeze down
    if(squeezingDown && curr !== 0) {
        let squeezeDown = 10;
        ball.height -= squeezeDown;
        ball.y += squeezeDown;
        setTimeout(squeeze, delay, squeezingDown, curr - squeezeDown, init);
    }
    //expand
    else if (!squeezingDown && curr !== init) {
        let squeezeUp = 2;
        ball.height += squeezeUp;
        ball.y -= squeezeUp;
        setTimeout(squeeze, delay, squeezingDown, curr + squeezeUp, init);
    }
}

/**
 * Restarts the simulation by repositioning the ball
 */
function restart() {
    initializeBall();
}

/**
 * Creates the ball sprite with the given width and height from the given textureName
 * @param width - The width of the sprite
 * @param height - The height of the sprite
 * @param textureName - The name of the texture to create a sprite from
 * @private
 */
function _createSprite(width, height, textureName) {
    let sprite = new PIXI.Sprite(
        PIXI.loader.resources[textureName].texture
    );
    sprite.width = width;
    sprite.height = height;

    return sprite;
}
/**
 * Centers the sprite
 */
PIXI.Sprite.prototype.center = function () {
    let view = renderer.view;
    let centerX = (0.5 * view.width) - (0.5 * this.width);
    let centerY = (0.5 * view.height) - (0.5 * this.height);
    this.x = centerX;
    this.y = centerY;
};
/**
 * Moves the sprite by a delta coordinate
 * @param deltaX
 * @param deltaY
 */
PIXI.Sprite.prototype.moveBy = function (deltaX, deltaY) {
    this.x += deltaX;
    this.y += deltaY;
};