const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
import Projectile from './Projectile.js';
import Fighter from './Fighter.js';
export { c, canvas }

const redFighter = new Fighter(400, 500, 30, 'red');
const blueFighter = new Fighter(1200, 500, 30, 'blue');
redFighter.draw();
blueFighter.draw();

const redProjectiles = [];
const blueProjectiles = [];
console.log(Math.hypot(redFighter.x - blueFighter.x, redFighter.y - blueFighter.y));
function Initialize() {


    if (redFighter.obstacleDetect(blueFighter) || blueFighter.obstacleDetect(redFighter)) {
        clearInterval(inter)
    } else {
            c.clearRect(0, 0, canvas.width, canvas.height);
        if (!redFighter.isAlive() && blueFighter.isAlive()) {
            console.log('Blue wins');
            clearInterval(inter)
        } else if (!blueFighter.isAlive() && redFighter.isAlive()) {
            console.log('red wins!');
            clearInterval(inter)
        } else {
            redFighter.draw();
            redFighter.newPos();
            blueFighter.draw();
            blueFighter.newPos();
            createBlueProjectile()
            blueFighterControl();

            blueProjectiles.forEach((projectile) => {
                projectile.update();
            })

            redProjectiles.forEach((projectile) => {
                projectile.update();
            
            })
            redProjectiles.forEach((projectile) => {
                const dist = Math.hypot(projectile.x - blueFighter.x,
                    projectile.y - blueFighter.y)
                // console.log(dist);

                if (dist - blueFighter.radius - projectile.radius < 1) {
                    console.log('hit')
                }
            })
        }
    }
}

function createRedProjectile() {
    const bAngle = Math.atan2(
        blueFighter.y - canvas.height / 2,
        blueFighter.x - canvas.width / 2
    )
    const bVelocity = {
        x: Math.cos(bAngle),
        y: Math.sin(bAngle)
    }
    redProjectiles.push(new Projectile(
        redFighter.x,
        redFighter.y,
        5,
        'black',
        bVelocity))
}

function createBlueProjectile() {
    const rAngle = Math.atan2(
        redFighter.y - canvas.height / 2,
        redFighter.x - canvas.width / 2
    )
    const rVelocity = {
        x: Math.cos(rAngle),
        y: Math.sin(rAngle)
    }
    blueProjectiles.push(new Projectile(
        blueFighter.x,
        blueFighter.y,
        5,
        'black',
        rVelocity))
}

function redFighterControl() {
    redFighter.speedY = 1

    if (redFighter.y >= 800) {
        redFighter.speedY = -2
    } else {
        redFighter.speedY = 1
    }
}

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

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

} 
let upkey;
let key;

// Initialize();

const redPro = setInterval(createRedProjectile, 1000)

const downInterval = setInterval(redFighterControl, 3000)

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
  }
}

const inter = setInterval(Initialize, 20)