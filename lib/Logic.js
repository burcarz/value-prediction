const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const Fighter = require('./Fighter');
const Projectile = require('./Projectile');

const redFighter = new Fighter(400, 500, 30, 'red');
const blueFighter = new Fighter(1200, 500, 30, 'blue');

const redProjectiles = [];
const blueProjectiles = [];

function collisionDetection() {
    let by = blueFighter.y
    let bx = blueFighter.x

    let r = blueFighter.radius

    let ry = redFighter.y
    let rx = redFighter.x

    let rr = redFighter.radius
    for (let c = 0; c < redProjectiles.length; c++) {
        let p = redProjectiles[c];
        if (p.x > bx && p.x < bx+r && p.y > by && p.y < by+r) {
            redProjectiles.splice([c], 1)
            blueFighter.reduceHealth(10);
            console.log(`blue Fighter health left: ${blueFighter.health}`)
        }
    }
    for (let c = 0; c < blueProjectiles.length; c++) {
        let p = blueProjectiles[c];
        if (p.x > rx && p.x < rx+rr && p.y > ry && p.y < ry+rr) {
            blueProjectiles.splice([c], 1)
            redFighter.reduceHealth(10);
            console.log(`red Fighter health left: ${redFighter.health}`)
        }
    }
}

function Initialize() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (!redFighter.isAlive() && blueFighter.isAlive()) {
        console.log('Blue wins');
        clearInterval(inter)
    } else if (!blueFighter.isAlive() && redFighter.isAlive()) {
        console.log('red wins!');
        clearInterval(inter)
    } else {
        blueFighter.draw();
        redFighter.draw();
        redFighter.newPos();
        blueFighter.newPos();
        blueFighterControl();
        redFighterControl();
        collisionDetection();
        blueProjectiles.forEach((projectile) => {
            projectile.update();
        })
        redProjectiles.forEach((projectile) => {
            projectile.update();
        })
    }
}

function createRedProjectile() {
    const angle = Math.atan2(
        blueFighter.y - canvas.height / 2,
        blueFighter.x - canvas.width / 2
    )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    redProjectiles.push(new Projectile(
        redFighter.x,
        redFighter.y,
        5,
        'black',
        velocity))
}

function createBlueProjectile(event) {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
    )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    blueProjectiles.push(new Projectile(
        blueFighter.x,
        blueFighter.y,
        5,
        'blue',
        velocity))
}

function redFighterControl() {
    let xDiff = blueFighter.x - redFighter.x;
    let yDiff = blueFighter.y - redFighter.y;
    let hypo = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    if (hypo) {
        xDiff /= hypo;
        yDiff /= hypo;
    }
    redFighter.x += xDiff;
    redFighter.y += yDiff;

    if (redFighter.obstacleDetect(blueFighter)) {
        blueFighter.reduceHealth(1);
    }
}

let keyW = false;
let keyA = false;
let keyS = false;
let keyD = false;
let keySpace = false;

function blueFighterControl() {
    if (keyD == true) {
    blueFighter.speedX = 2;
    }
    if (keyS == true) {
    blueFighter.speedY = 2;
    }
    if (keyA == true) {
    blueFighter.speedX = -2;
    }
    if (keyW == true) {
    blueFighter.speedY = -2;
    }
    if (keySpace == true && blueFighter.obstacleDetect(redFighter)) {
        redFighter.reduceHealth(1);
    }
} 

// Initialize();

window.addEventListener('click', createBlueProjectile);

setInterval(createRedProjectile, 1000)

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

function onKeyDown(event) {
  var keyCode = event.keyCode;
  switch (keyCode) {
    case 68: //d
      keyD = true;
      break;
    case 83: //s
      keyS = true;
      break;
    case 65: //a
      keyA = true;
      break;
    case 87: //w
      keyW = true;
      break;
    case 32: //space
      keySpace = true;
      break;
  }
}

function onKeyUp(event) {
  var keyCode = event.keyCode;
  blueFighter.speedX = 0;
  blueFighter.speedY = 0;
  switch (keyCode) {
    case 68: //d
      keyD = false;
      break;
    case 83: //s
      keyS = false;
      break;
    case 65: //a
      keyA = false;
      break;
    case 87: //w
      keyW = false;
      break;
    case 32: //space
      keySpace = false;
      break;
  }
}

function clear() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(inter);
}

const inter = setInterval(Initialize, 20)

// window.addEventListener('click', clear);

module.exports = { c, canvas }