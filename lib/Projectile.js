const { c, canvas } = require ('./Logic.js')

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity
    }
        update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
    }

        obstacleDetect(obj) {
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
            draw() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
    }
}

module.exports = Projectile;