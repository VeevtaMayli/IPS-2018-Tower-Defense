import {MAPS} from "./maps.js";
import {createEnemies, ENEMIES_COUNT, ENEMY_SIZE} from "./enemy.js";
import {Turret, laserShoot} from "./turret.js";
import {redraw} from "./drawing.js";
import {update} from "./updating.js";

const game = {
    kills: 0,
    ticks: 0,
    lastTimestamp: Date.now(),

    map: MAPS.baseMap,
    enemies: [],
    turrets: [],
    bullets: [],

    initialize: ({context, width, height}) => {
        game.context = context;
        game.widthArea = width;
        game.heightArea = height;

        game.enemyStart = {x: game.map[0].x - ENEMY_SIZE, y: game.map[0].y};

        createEnemies(game.enemies, ENEMIES_COUNT);

        game.turrets.push(new Turret(laserShoot));
    },

    tick: () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - game.lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        game.lastTimestamp = currentTimeStamp;

        // processMouseEvents({
        //     dt: deltaTime
        // });
        update({
            map: game.map,
            enemies: game.enemies,
            turrets: game.turrets,
            bullets: game.bullets,
            dt: deltaTime
        });
        redraw({
            ctx: game.context,
            boxWidth: game.widthArea,
            boxHeight: game.heightArea,
            map: game.map,
            enemies: game.enemies,
            turrets: game.turrets,
            bullets: game.bullets
        });
        game.ticks++;
        requestAnimationFrame(game.tick);
    }
};

export {game};