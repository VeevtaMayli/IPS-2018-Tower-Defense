const maps = {
    baseMap: [
        {x: 0, y: 60},
        {x: 720, y: 60},
        {x: 720, y: 300},
        {x: 80, y: 300},
        {x: 80, y: 540},
        {x: 800, y: 540}
    ]
};

const PATH_WIDTH = 40;
const ENEMY_SIZE = 9;
const ENEMY_SPEED = 70;

const TURRET_DAMAGE = 10;
const TURRET_RATE = 40;
const TURRET_RANGE = 80;

let game = {
    kills: 0,
    ticks: 0
};

function Enemy({startX, startY, offset, hp, startPoint}) {
    this.x = startX;
    this.y = startY;
    this.offset = offset;
    this.hp = hp;
    this.nextPoint = startPoint;
    this.speed = ENEMY_SPEED;
    this.size = ENEMY_SIZE;
}

function Turret(shoot) {
    this.x = 100;
    this.y = 110;
    this.size = 20;
    this.damage = TURRET_DAMAGE;
    this.rate = TURRET_RATE;
    this.range = TURRET_RANGE;
    this.kills = 30;
    this.lastshoot = 0;
    this.shoot = shoot;
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

function drawMap({ctx, boxWidth, boxHeight, map}) {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, boxWidth, boxHeight);

    const start = map[0];
    ctx.strokeStyle = "blue";
    ctx.lineWidth = PATH_WIDTH;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    map.slice(1).forEach((turn) => {
       ctx.lineTo(turn.x, turn.y);
    });
    ctx.stroke();

    ctx.strokeStyle = "green";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    map.slice(1).forEach((turn) => {
        ctx.lineTo(turn.x, turn.y);
    });
    ctx.stroke();
}

function drawEnemy({ctx, enemy}) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
    ctx.fill();
}

function drawTurret({ctx, turret}) {
    ctx.fillStyle = "rgba(255, 255, 255, .6)";
    ctx.beginPath();
    ctx.arc(turret.x, turret.y, turret.range, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "violet";
    ctx.beginPath();
    ctx.arc(turret.x, turret.y, turret.size, 0, Math.PI * 2);
    ctx.fill();
}

function moveToTarget({object, target, dt}) {
    const distanceX = target.x - object.x;
    const distanceY = target.y - object.y;
    const direction = Math.atan2(distanceY, distanceX);

    object.x += object.speed * dt * Math.cos(direction);
    object.y += object.speed * dt * Math.sin(direction);

    return Math.sqrt(Math.pow(Math.abs(distanceX), 2) +
                     Math.pow(Math.abs(distanceY), 2)) < 2 * object.speed * dt;
}

function inRadius({target, object, radius}) {
    return (Math.pow(object.x - target.x, 2)) +(Math.pow(object.y - target.y, 2)) < radius * radius;
}

function redraw({ctx, boxWidth, boxHeight, map, enemies, turrets, bullets}) {
    drawMap({ctx, boxWidth, boxHeight, map});

    enemies.forEach((enemy) => {
        drawEnemy({ctx, enemy});
    });

    turrets.forEach((turret) => {
       drawTurret({ctx, turret});
    });

    bullets.forEach((bullet) => {
        bullet.drawBullet(ctx);
    });
}

function update({ctx, map, enemies, turrets, bullets, dt}) {
    enemies.forEach((enemy, i, enemiesArr) => {
        if (enemy.hp <= 0) {
            console.log("[", i, "] убит!");
            game.kills++;
            delete enemiesArr[i];
        } else if (enemy.nextPoint === map.length) {
            console.log("[", i, "] прошел до конца!");
            delete enemiesArr[i];
        } else {
            let wayPoint = map[enemy.nextPoint];
            if (moveToTarget({
                object: enemy,
                target: {x: wayPoint.x + enemy.offset, y: wayPoint.y + enemy.offset},
                dt
            })) {
                enemy.nextPoint++;
            }
        }
    });

    turrets.forEach((turret) => {
        if (turret.lastshoot + turret.rate <= game.ticks) {
            const visibleEnemies = enemies.filter((enemy) => {
                return inRadius({
                    target: enemy,
                    object: turret,
                    radius: turret.range
                });
            });

            if (visibleEnemies.length > 0) {
                turret.shoot({
                    ctx,
                    enemies: visibleEnemies,
                    bullets
                });
                turret.lastshoot = game.ticks;
            }
        }
    });

    bullets.forEach((bullet, i, bullets) => {
        if (--bullet.lifetime === 0) {
            delete bullets[i];
        }
    });
}

function main() {
    const canvas = document.getElementById("canvas");

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    let lastTimestamp = Date.now();
    const map = maps.baseMap;
    let enemies = [];
    let turrets = [];
    let bullets = [];
    const enemyStart = {x: map[0].x - ENEMY_SIZE, y: map[0].y};

    for (let i = 0; i < 10; i++) {
        enemies.push(new Enemy({
            startX: enemyStart.x - 40 * i,
            startY: enemyStart.y,
            offset: (Math.random() * 2 - 1) * ((PATH_WIDTH - 2 * ENEMY_SIZE) / 2 - 1) ,
            hp: 1,
            startPoint: 0
        }));
    }

    turrets.push(new Turret(laserShoot));

    const tick = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        // processMouseEvents({
        //     dt: deltaTime
        // });
        update({
            ctx,
            map,
            enemies,
            turrets,
            bullets,
            dt: deltaTime
        });
        redraw({
            ctx,
            boxWidth: width,
            boxHeight: height,
            map,
            enemies,
            turrets,
            bullets
        });
        game.ticks++;
        requestAnimationFrame(tick);
    };

    tick();
}