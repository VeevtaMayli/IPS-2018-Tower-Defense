import {moveToTarget, inRadius} from './game_utils.js';
import {game} from './game.js';

const LASER_COST = 15;
const LASER_DAMAGE = 10;
const LASER_FREQUENCY = 30;
const LASER_WIDTH = 5;
const LASER_COLOR = '#EE82EE';
const LASER_RANGE = 100;
const LASER_BULLET_LIFETIME = 6;
const LASER_SIZE = 20;

const MORTAR_COST = 60;
const MORTAR_DAMAGE = 50;
const MORTAR_FREQUENCY = 120;
const MORTAR_RANGE = 200;
const MORTAR_BULLET_SIZE = 3;
const MORTAR_BULLET_LIFETIME = Infinity;
const MORTAR_BULLET_SPEED = 150;
const MORTAR_BULLET_COLOR = '#808080';
const MORTAR_SHELL_MIN_RADIUS = 25;
const MORTAR_SHELL_COLOR = '#FF0';
const MORTAR_SHELL_LIFETIME = 10;
const MORTAR_SIZE = 25;

const TURRETS = {
    Laser: {
        typeName: 'Laser',
        cost: LASER_COST,
        damage: LASER_DAMAGE,
        rate: LASER_FREQUENCY,
        range: LASER_RANGE,
        size: LASER_SIZE,
        shoot: function({enemies, bullets}) {
            const enemy = enemies[0];
            const turret = this;
            if ((enemy.hp -= turret.damage) <= 0) {
                turret.kills++;
            }

            bullets.push({
                drawBullet: ({ctx, dt}) => {
                    ctx.lineCap = 'round';
                    ctx.lineWidth = LASER_WIDTH;
                    ctx.strokeStyle = LASER_COLOR;
                    ctx.beginPath();
                    ctx.moveTo(turret.x, turret.y);
                    ctx.lineTo(enemy.x, enemy.y);
                    ctx.stroke();
                },
                lifetime: LASER_BULLET_LIFETIME,
            });
        },
    },
    Mortar: {
        typeName: 'Mortar',
        cost: MORTAR_COST,
        damage: MORTAR_DAMAGE,
        rate: MORTAR_FREQUENCY,
        range: MORTAR_RANGE,
        size: MORTAR_SIZE,
        shoot: function({enemies, bullets}) {
            const enemy = enemies[0];
            const turret = this;
            const target = {
                x: enemy.x,
                y: enemy.y,
            };
            const shell = {
                x: turret.x,
                y: turret.y,
                speed: MORTAR_BULLET_SPEED,
            };
            const radius = MORTAR_SHELL_MIN_RADIUS;

            bullets.push({
                drawBullet: function({ctx, dt}) {
                    if (moveToTarget({object: shell, target, dt})) {
                        game.enemies.id.forEach(function(enemy) {
                            if (inRadius({target: enemy, object: target, radius})) {
                                if ((enemy.hp -= turret.damage) <= 0) {
                                    turret.kills++;
                                }
                            }
                        });

                        bullets.push({
                            drawBullet: ({ctx, dt}) => {
                                ctx.fillStyle = MORTAR_SHELL_COLOR;
                                ctx.beginPath();
                                ctx.moveTo(target.x, target.y);
                                ctx.arc(target.x, target.y, radius, 0, Math.PI * 2);
                                ctx.fill();
                            },
                            lifetime: MORTAR_SHELL_LIFETIME,
                        });

                        this.lifetime = 1;
                    } else {
                        const size = MORTAR_BULLET_SIZE;
                        ctx.fillStyle = MORTAR_BULLET_COLOR;
                        ctx.fillRect(shell.x - size, shell.y - size, 2 * size, 2 * size);
                    }
                },
                lifetime: MORTAR_BULLET_LIFETIME,
            });
        },
    },
};

function Turret({type, id, x, y}) {
    this.id = id;
    this.type = type.typeName;
    this.x = x;
    this.y = y;
    this.cost = type.cost;
    this.size = type.size;
    this.damage = type.damage;
    this.rate = type.rate;
    this.range = type.range;
    this.kills = 0;
    this.lastshoot = 0;
    this.shoot = type.shoot;
}

export {
    TURRETS,
    Turret,
};
