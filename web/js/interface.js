import {TURRETS, Turret} from './turret.js';
import {TILE_SIZE, WAVE_FREQUENCY, BASE_TIME_COEF, MAX_TIME_COEF, game} from './game.js';

const ui = {
    turretImages: {
        Laser: document.getElementById('laser_image'),
        Mortar: document.getElementById('mortar_image'),
    },

    buyControls: document.getElementById('turrets_buy_controls'),
    waveStarter: document.getElementById('wave_starter'),
    pauseControl: document.getElementById('pause_controller'),
    rateControl: document.getElementById('rate_controller'),

    cash: document.getElementById('cash_indicator'),
    wave: document.getElementById('wave_indicator'),
    life: document.getElementById('life_indicator'),
    kills: document.getElementById('kills_indicator'),
    killsMessage: document.getElementById('kills_counter'),
    score: document.getElementById('score_indicator'),
    scoreMessage: document.getElementById('score_counter'),

    toMenu: document.getElementById('to_menu'),
    playAgain: document.getElementById('again_button'),

    canvas: document.getElementById('canvas'),

    bind: (event, elements, func) => {
        Array.prototype.slice.call(elements).forEach((elements) => {
            elements.addEventListener(event, func);
        });
    },
    action: {
        build: (type) => {
            const turret = new Turret({
                id: game.turrets.length,
                type: TURRETS[type],
                x: -1000,
                y: -1000,
            });

            game.selection = game.cash - turret.cost >= 0 ? {
                status: 'placing',
                turret: turret,
                placeable: false,
            } : false;
        },
        deselect: () => {
            game.selection = false;
        },
        refresh: () => {
            ui.cash.textContent = game.cash;
            ui.wave.textContent = game.wave;
            ui.kills.textContent = game.kills;
            ui.score.textContent = game.score;
            ui.killsMessage.textContent = game.kills;
            ui.scoreMessage.textContent = game.score;
        },
    },
    initialize: () => {
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        }, false);

        window.addEventListener('blur', () => {
            game.paused = true;
        });

        ui.bind('click', ui.buyControls.children, function() {
            if (!game.paused) {
                ui.action.build(this.dataset.name);
            }
        });

        ui.waveStarter.addEventListener('click', () => {
            if (!game.paused) {
                game.lastWave = game.ticks - WAVE_FREQUENCY;
            }
        });

        ui.pauseControl.addEventListener('click', function() {
            this.textContent = game.paused ? game.start() : game.pause();
        });

        ui.rateControl.addEventListener('click', function() {
            this.textContent = game.fast ? 'Faster' : 'Slower';
            game.timeCoef = game.fast ? BASE_TIME_COEF : MAX_TIME_COEF;
            game.fast = !game.fast;
        });

        ui.toMenu.addEventListener('click', () => {
            window.location = 'menu.php';
        });

        ui.playAgain.addEventListener('click', () => {
            window.location.reload(true);
        });

        ui.canvas.addEventListener('mousemove', function(event) {
            const selection = game.selection;
            const turret = selection.turret;

            if (selection) {
                const turretInTiles = Math.floor(turret.size / TILE_SIZE);

                const xTile = Math.floor((event.pageX - this.offsetParent.offsetLeft - this.offsetLeft) / TILE_SIZE);
                const yTile = Math.floor((event.pageY - this.offsetParent.offsetTop - this.offsetTop) / TILE_SIZE);

                turret.x = xTile * TILE_SIZE;
                turret.y = yTile * TILE_SIZE;

                const xStartTile = xTile - turretInTiles / 2;
                const yStartTile = yTile - turretInTiles / 2;

                selection.placeable = xStartTile >= 0 && xStartTile < Math.floor((game.widthArea - turret.size) / TILE_SIZE) &&
                                      yStartTile >= 0 && yStartTile < Math.floor((game.heightArea - turret.size) / TILE_SIZE);

                for (let dx = 0; dx < turretInTiles; dx++) {
                    for (let dy = 0; dy < turretInTiles; dy++) {
                        if (game.tiles[(xStartTile + dx) + ', ' + (yStartTile + dy)]) {
                            selection.placeable = false;
                            return;
                        }
                    }
                }
            }
        });

        ui.canvas.addEventListener('click', function(event) {
            const selection = game.selection;
            const turret = selection.turret;

            const turretInTiles = Math.floor(turret.size / TILE_SIZE);
            if (selection.status === 'placing') {
                if (selection.placeable) {
                    const xTile = Math.floor((event.pageX - this.offsetParent.offsetLeft - this.offsetLeft) / TILE_SIZE);
                    const yTile = Math.floor((event.pageY - this.offsetParent.offsetTop - this.offsetTop) / TILE_SIZE);

                    const xStartTile = xTile - turretInTiles / 2;
                    const yStartTile = yTile - turretInTiles / 2;

                    game.cash -= turret.cost;
                    game.spent += turret.cost;
                    game.turrets.push(turret);

                    for (let i = 0; i < turretInTiles; i++) {
                        for (let j = 0; j < turretInTiles; j++) {
                            game.tiles[(xStartTile + i) + ', ' + (yStartTile + j)] = turret;
                        }
                    }
                }

                game.selection = false;
                ui.action.refresh();
            } else {
                ui.action.deselect();
            }
        });
    },
};

export {ui};
