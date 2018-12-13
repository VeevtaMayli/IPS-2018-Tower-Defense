import {PATH_WIDTH} from './maps.js';
import {game} from './game.js';

const ENEMY_HP_COEF = {
    1: 1.3,
    10: 1.2,
    25: 1.1,
    50: 1.06,
    100: 1.04,
    150: 1.02,
    200: 1.01,
};

const ENEMY_SIZE = 9;
//const ENEMY_START_COST = 2;
const ENEMY_SPEED = 90;
const ENEMY_DISTANCE = 40;
const ENEMIES_COUNT = 10;
const ENEMY_START_HP = 1;

function Enemy({startX, startY, offset, hp, cost, startPoint}) {
    this.x = startX;
    this.y = startY;
    this.offset = offset;
    this.hp = hp;
    this.cost = cost;
    this.nextPoint = startPoint;
    this.speed = ENEMY_SPEED;
    this.size = ENEMY_SIZE;
}

function createEnemies(enemies, count) {
    game.enemies.hpMultiplier = ENEMY_HP_COEF[game.wave] || game.enemies.hpMultiplier;
    game.enemies.hp *= game.enemies.hpMultiplier;

    for (let i = 0; i < count; i++) {
        enemies.push(new Enemy({
            startX: game.enemyStart.x - ENEMY_DISTANCE * i,
            startY: game.enemyStart.y,
            offset: (Math.random() * 2 - 1) * ((PATH_WIDTH - 2 * ENEMY_SIZE) / 2 - 1),
            hp: game.enemies.hp,
            cost: game.wave,
            startPoint: 0,
        }));
    }
}

export {
    ENEMY_SIZE,
    ENEMIES_COUNT,
    ENEMY_START_HP,
    ENEMY_HP_COEF,
    createEnemies,
};
