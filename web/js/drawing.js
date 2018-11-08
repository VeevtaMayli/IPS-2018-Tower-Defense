import {PATH_WIDTH} from "./maps.js";

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

function drawMap({ctx, boxWidth, boxHeight, map}) {
    ctx.fillStyle = "#000";
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

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(turret.x, turret.y, turret.size, 0, Math.PI * 2);
    ctx.fill();
}

export {redraw};