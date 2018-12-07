import {MAPS} from './maps.js';
import {ENEMY_SIZE} from './enemy.js';
import {drawMap, redraw} from './drawing.js';
import {update} from './updating.js';
import {splitIntoTiles} from './game_utils.js';

const WAVE_FREQUENCY = 800;
const TILE_SIZE = 5;

const game = {
    kills: 0,
    ticks: 0,

    wave: 0,
    lastWave: 0,

    lastTimestamp: Date.now(),

    map: MAPS.baseMap,
    tiles: {},

    selection: false,

    enemies: [],
    turrets: [],
    bullets: [],

    initialize: ({context, width, height}) => {
        game.context = context;
        game.widthArea = width;
        game.heightArea = height;

        drawMap({
            ctx: game.context,
            boxWidth: game.widthArea,
            boxHeight: game.heightArea,
            map: game.map,
        });

        splitIntoTiles(game.context, game.tiles, TILE_SIZE);

        game.enemyStart = {
            x: game.map[0].x - ENEMY_SIZE,
            y: game.map[0].y,
        };
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
            dt: deltaTime,
        });
        redraw({
            ctx: game.context,
            boxWidth: game.widthArea,
            boxHeight: game.heightArea,
            map: game.map,
            enemies: game.enemies,
            turrets: game.turrets,
            bullets: game.bullets,
            dt: deltaTime,
        });
        game.ticks++;
        requestAnimationFrame(game.tick);
    },
};

export {
    TILE_SIZE,
    WAVE_FREQUENCY,
    game,
};
