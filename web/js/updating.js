import {game} from "./game.js";
import {inRadius, moveToTarget} from "./game_utils.js";

function update({map, enemies, turrets, bullets, dt}) {
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

export {update};