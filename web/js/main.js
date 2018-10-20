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

const PATH_WIDTH = 60;
const ENEMY_SIZE = 9;
const ENEMY_SPEED = 1;

function Enemy({startX, startY, offset, hp, startPoint}) {
    this.x = startX;
    this.y = startY;
    this.offset = offset;
    this.hp = hp;
    this.nextPoint = startPoint;
    this.speed = ENEMY_SPEED;
    this.size = ENEMY_SIZE;
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

function moveToTarget({object, target}) {
    const distanceX = target.x - object.x;
    const distanceY = target.y - object.y;
    const direction = Math.atan2(distanceY, distanceX);

    object.x += object.speed * Math.cos(direction);
    object.y += object.speed * Math.sin(direction);

    return Math.sqrt(Math.pow(distanceX < 0 ? -distanceX : distanceX, 2) +
                     Math.pow(distanceY < 0 ? -distanceY : distanceY, 2)) < 2 * object.speed;
}

function redraw({ctx, boxWidth, boxHeight, map, enemies}) {
    drawMap({ctx, boxWidth, boxHeight, map});
    enemies.forEach((enemy) => {
        drawEnemy({ctx, enemy});
    });
}

function update({map, enemies, dt}) {
    enemies.forEach((enemy, i, pointArr) => {
        if (enemy.nextPoint === map.length) {
            console.log("Я прошел до конца!");
            delete pointArr[i];
        } else {
            let wayPoint = map[enemy.nextPoint];
            if (moveToTarget({
                object: enemy,
                target: {x: wayPoint.x + enemy.offset, y: wayPoint.y + enemy.offset}
            })) {
                enemy.nextPoint++;
            }
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
    const enemyStart = {x: map[0].x - 9, y: map[0].y};

    for (let i = 0; i < 10; i++) {
        enemies.push(new Enemy({
            startX: enemyStart.x - 30 * i,
            startY: enemyStart.y,
            offset: (Math.random() * 2 - 1) * ((PATH_WIDTH - 2 * ENEMY_SIZE) / 2 - 1) ,
            hp: null,
            startPoint: 0
        }));
    }

    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        // processMouseEvents({
        //     dt: deltaTime
        // });
        update({
            dt: deltaTime,
            map: map,
            enemies: enemies,
        });
        redraw({
            ctx,
            boxWidth: width,
            boxHeight: height,
            map: map,
            enemies: enemies
        });
        requestAnimationFrame(animateFn);
    };

    animateFn();
}