import {WAVE_FREQUENCY, game} from './game.js';
import {inRadius, moveToTarget} from './game_utils.js';
import {createEnemies, ENEMIES_COUNT} from './enemy.js';
import {ui} from './interface.js';

function update({map, enemies, turrets, bullets, dt}) {
    if (game.lastWave + WAVE_FREQUENCY === game.ticks) {
        game.wave++;
        ui.action.refresh();
        createEnemies(enemies, ENEMIES_COUNT);
        game.lastWave = game.ticks;
    }

    enemies.forEach((enemy, i, enemiesArr) => {
        if (enemy.hp <= 0) {
            game.kills++;
            game.cash += enemy.cost;
            ui.action.refresh();
            delete enemiesArr[i];
        } else if (enemy.nextPoint === map.length) {
            delete enemiesArr[i];
            ui.life.textContent = --game.lives;

            if (game.lives === 0) {
                game.end();
            }
        } else {
            const wayPoint = map[enemy.nextPoint];
            if (moveToTarget({
                object: enemy,
                target: {x: wayPoint.x + enemy.offset, y: wayPoint.y + enemy.offset},
                dt,
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
                    radius: turret.range,
                });
            });

            if (visibleEnemies.length > 0) {
                turret.shoot({
                    enemies: visibleEnemies,
                    bullets,
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

export {update};
