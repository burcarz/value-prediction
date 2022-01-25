const { c, canvas } = require ('./Logic.js')

class Fighter {
    constructor(x, y, radius, color) {
        this.strength = 1;
        this.health = 100;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.update = function() {
            c.fillStyle = this.color
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        }
        this.newPos = function() {
            this.x += this.speedX;
            this.y += this.speedY; 
        };
        this.obstacleDetect = function(obj) {
            let left = this.x;
            let right = this.x + (this.radius);
            let top = this.y;
            let bottom = this.y + (this.radius);
            let obsLeft = obj.x
            let obsRight = obj.x + (obj.radius);
            let obsTop = obj.y;
            let obsBottom = obj.y + (obj.radius);
            let crash = true;
            if ((bottom < obsTop) ||
            (top > obsBottom) ||
            (right < obsLeft) ||
            (left > obsRight)) {
                crash = false;
            }
            return crash;
        }
        this.isAlive = function() {
            if (this.health === 0) {
                return false
            } else {
                return true
            }
        }
        this.reduceHealth = function(health) {
            this.health -= health

            if (this.health < 0) {
                this.health = 0
            }
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill();
    }
}

module.exports = Fighter;