import {PATH_WIDTH} from './maps.js';
import {game} from './game.js';

const ENEMY_SIZE = 9;
const ENEMY_SPEED = 70;
const ENEMIES_COUNT = 10;

function Enemy({startX, startY, offset, hp, startPoint}) {
    this.x = startX;
    this.y = startY;
    this.offset = offset;
    this.hp = hp;
    this.nextPoint = startPoint;
    this.speed = ENEMY_SPEED;
    this.size = ENEMY_SIZE;
}

function createEnemies(enemies, count) {
    for (let i = 0; i < count; i++) {
        enemies.push(new Enemy({
            startX: game.enemyStart.x - 40 * i,
            startY: game.enemyStart.y,
            offset: (Math.random() * 2 - 1) * ((PATH_WIDTH - 2 * ENEMY_SIZE) / 2 - 1) ,
            hp: 1,
            startPoint: 0
        }));
    }
}

export {
    ENEMY_SIZE,
    ENEMIES_COUNT,
    createEnemies
};