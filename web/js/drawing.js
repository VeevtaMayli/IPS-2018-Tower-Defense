import {PATH_WIDTH, PATH_BORDER_WIDTH, PATH_COLOR, PATH_BORDER_COLOR, FINISH_PATH_COLOR} from './maps.js';
import {game} from './game.js';
import {ui} from './interface.js';

const ALLOWED_ZONE_COLOR = 'rgba(255, 255, 255, .3)';
const FORBIDDEN_ZONE_COLOR = 'rgba(255, 0, 0, .3)';

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
    const canvas = ctx.canvas;
    const dx = canvas.offsetParent.offsetLeft + canvas.offsetLeft;
    const dy = canvas.offsetParent.offsetTop + canvas.offsetTop;

    ctx.drawImage(map.img, dx, dy, boxWidth, boxHeight, 0, 0, boxWidth, boxHeight);
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

    const endPoint = map.length - 1;

    ctx.fillStyle = FINISH_PATH_COLOR;
    ctx.beginPath();
    ctx.arc(map[endPoint].x, map[endPoint].y, PATH_WIDTH / 1.1, 0, Math.PI * 2);
    ctx.fill();
}

function drawEnemy({ctx, enemy}) {
    const size = enemy.size;
    ctx.drawImage(game.enemies.img, enemy.x - size / 2, enemy.y - size / 2, size, size);
}

function drawTurret({ctx, turret}) {
    ctx.drawImage(ui.turretImages[turret.type], turret.x - turret.size / 2, turret.y - turret.size / 2, turret.size, turret.size);
}

function drawTurretArea({ctx, turret}) {
    ctx.fillStyle = game.selection.placeable ? ALLOWED_ZONE_COLOR : FORBIDDEN_ZONE_COLOR;
    ctx.beginPath();
    ctx.arc(turret.x, turret.y, turret.range, 0, Math.PI * 2);
    ctx.fill();
}

export {
    drawMap,
    redraw,
};
