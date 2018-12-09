import {moveToTarget, inRadius} from './game_utils.js';
import {game} from './game.js';

const LASER_DAMAGE = 10;
const LASER_FREQUENCY = 30;
const LASER_RANGE = 100;
const LASER_BULLET_LIFETIME = 6;

const MORTAR_DAMAGE = 50;
const MORTAR_FREQUENCY = 120;
const MORTAR_RANGE = 200;
const MORTAR_BULLET_LIFETIME = Infinity;
const MORTAR_BULLET_SPEED = 150;
const MORTAR_SHELL_LIFETIME = 10;

const TURRET_SIZE = 20;

const TURRETS = {
    Laser: {
        typeName: 'Laser',
        damage: LASER_DAMAGE,
        rate: LASER_FREQUENCY,
        range: LASER_RANGE,
        shoot: function({enemies, bullets}) {
            const enemy = enemies[0];
            const turret = this;
            if ((enemy.hp -= turret.damage) <= 0) {
                turret.kills++;
            }

            bullets.push({
                drawBullet: ({ctx, dt}) => {
                    ctx.lineCap = 'round';
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#EE82EE';
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
        damage: MORTAR_DAMAGE,
        rate: MORTAR_FREQUENCY,
        range: MORTAR_RANGE,
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
            const radius = 25;

            bullets.push({
                drawBullet: function({ctx, dt}) {
                    if (moveToTarget({object: shell, target, dt})) {
                        game.enemies.forEach(function(enemy) {
                            if (inRadius({target: enemy, object: target, radius})) {
                                if ((enemy.hp -= turret.damage) <= 0) {
                                    turret.kills++;
                                }
                            }
                        });

                        bullets.push({
                            drawBullet: ({ctx, dt}) => {
                                ctx.fillStyle = '#FF0';
                                ctx.beginPath();
                                ctx.moveTo(target.x, target.y);
                                ctx.arc(target.x, target.y, radius, 0, Math.PI * 2);
                                ctx.fill();
                            },
                            lifetime: MORTAR_SHELL_LIFETIME,
                        });

                        this.lifetime = 1;
                    } else {
                        ctx.fillStyle = '#808080';
                        ctx.fillRect(shell.x - 3, shell.y - 3, 6, 6);
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
    this.size = TURRET_SIZE;
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
