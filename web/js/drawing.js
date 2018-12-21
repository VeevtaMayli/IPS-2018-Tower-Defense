import {PATH_WIDTH, PATH_BORDER_WIDTH, PATH_COLOR, PATH_BORDER_COLOR} from './maps.js';
import {game} from './game.js';
import {ui} from './interface.js';

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
    ctx.fillStyle = 'rgba(153, 178, 22, 1)';
    ctx.fillRect(0, 0, boxWidth, boxHeight);
    const start = map[0];
    ctx.strokeStyle = PATH_BORDER_COLOR;
    ctx.lineWidth = PATH_WIDTH + 2 * PATH_BORDER_WIDTH;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    map.slice(1).forEach((turn) => {
        ctx.lineTo(turn.x, turn.y);
    });
    ctx.stroke();

    ctx.strokeStyle = PATH_COLOR;
    ctx.lineWidth = PATH_WIDTH;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    map.slice(1).forEach((turn) => {
        ctx.lineTo(turn.x, turn.y);
    });
    ctx.stroke();
}

function drawEnemy({ctx, enemy}) {
    const size = enemy.size;
    ctx.drawImage(game.enemies.img, enemy.x - size / 2, enemy.y - size / 2, size, size);
}

function drawTurret({ctx, turret}) {
    ctx.drawImage(ui.turretImages[turret.type], turret.x - turret.size, turret.y - turret.size, 2 * turret.size, 2 * turret.size);
}

function drawTurretArea({ctx, turret}) {
    ctx.fillStyle = game.selection.placeable ? 'rgba(255, 255, 255, .3)' : 'rgba(255, 0, 0, .3)';
    ctx.beginPath();
    ctx.arc(turret.x, turret.y, turret.range, 0, Math.PI * 2);
    ctx.fill();
}

export {
    drawMap,
    redraw,
};
