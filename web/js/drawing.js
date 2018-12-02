import {PATH_WIDTH} from "./maps.js";
import {game} from "./game.js";

function redraw({ctx, boxWidth, boxHeight, map, enemies, turrets, bullets, dt}) {
    drawMap({ctx, boxWidth, boxHeight, map});

    enemies.forEach((enemy) => {
        drawEnemy({ctx, enemy});
    });

    turrets.forEach((turret) => {
        drawTurret({ctx, turret});
    });

    if (game.selection) {
        drawTurretArea({ctx, turret: game.selection.turret});
        drawTurret({ctx, turret: game.selection.turret});
    }

    bullets.forEach((bullet) => {
        bullet.drawBullet({ctx, dt});
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
    ctx.fillStyle = turret.type === "Laser" ? "green" : "violet";
    ctx.beginPath();
    ctx.arc(turret.x, turret.y, turret.size, 0, Math.PI * 2);
    ctx.fill();
}

function drawTurretArea({ctx, turret}) {
    ctx.fillStyle = game.selection.placeable ? "rgba(255, 255, 255, .3)" : "rgba(255, 0, 0, .3)";
    ctx.beginPath();
    ctx.arc(turret.x, turret.y, turret.range, 0, Math.PI * 2);
    ctx.fill();
}

export {redraw};