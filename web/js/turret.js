const LASER_DAMAGE = 10;
const LASER_FREQUENCY = 30;
const LASER_RANGE = 100;
const LASER_BULLET_LIFETIME = 6;

const TURRET_SIZE = 20;

const TURRETS = {
    Laser: {
        damage: LASER_DAMAGE,
        rate: LASER_FREQUENCY,
        range: LASER_RANGE,
        shoot: function({enemies, bullets}) {
            const enemy = enemies[0];
            const turret = this;
            if ((enemy.hp -= turret.damage) <= 0) {
                turret.kills++;
            }

            bullets.push({
                drawBullet: (ctx) => {
                    ctx.lineCap = "round";
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "#EE82EE";
                    ctx.beginPath();
                    ctx.moveTo(turret.x, turret.y);
                    ctx.lineTo(enemy.x, enemy.y);
                    ctx.stroke();
                },
                lifetime: LASER_BULLET_LIFETIME
            });
        }
    }
};

function Turret({type, id, x, y}) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = TURRET_SIZE;
    this.damage = type.damage;
    this.rate = type.rate;
    this.range = type.range;
    this.kills = 0;
    this.lastshoot = 0;
    this.shoot = type.shoot;
}

export {
    TURRETS,
    Turret
};