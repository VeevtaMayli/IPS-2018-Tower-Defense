const TURRET_DAMAGE = 10;
const TURRET_FREQUENCY = 30;
const TURRET_RANGE = 100;
const TURRET_SIZE = 20;

function Turret(shoot) {
    this.x = 640;
    this.y = 140;
    this.size = TURRET_SIZE;
    this.damage = TURRET_DAMAGE;
    this.rate = TURRET_FREQUENCY;
    this.range = TURRET_RANGE;
    this.kills = 0;
    this.lastshoot = 0;
    this.shoot = shoot;
    this.id = 0;
}

function laserShoot({enemies, bullets}) {
    const enemy = enemies[0];
    const turret = this;

    if ((enemy.hp -= turret.damage) <= 0) {
        turret.kills++;
    }

    bullets.push({drawBullet: (ctx) => {
            ctx.lineCap = "round";
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#EE82EE";
            ctx.beginPath();
            ctx.moveTo(turret.x, turret.y);
            ctx.lineTo(enemy.x, enemy.y);
            ctx.stroke();
        }, lifetime: 6});
}

export {
    Turret,
    laserShoot
};