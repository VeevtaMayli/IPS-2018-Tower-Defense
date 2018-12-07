import {TURRETS, Turret} from './turret.js';
import {TILE_SIZE, WAVE_FREQUENCY, game} from './game.js';

const ui = {
    buyControls: document.getElementById('turrets_buy_controls'),
    waveStarter: document.getElementById('wave_starter'),
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

            game.selection = {
                status: 'placing',
                turret: turret,
                placeable: false,
            };
        },
        deselect: () => {
            game.selection = false;
        },
    },
    initialize: () => {
        ui.bind('click', ui.buyControls.children, function() {
            ui.action.build(this.dataset.name);
        });

        ui.waveStarter.addEventListener('click', () => {
            game.lastWave = game.ticks - WAVE_FREQUENCY;
        });

        ui.canvas.addEventListener('mousemove', function(event) {
            const selection = game.selection;
            const turret = selection.turret;

            if (selection) {
                const turretInTiles = Math.floor(turret.size / TILE_SIZE);

                const xTile = Math.floor((event.pageX - this.offsetLeft) / TILE_SIZE);
                const yTile = Math.floor((event.pageY - this.offsetTop) / TILE_SIZE);

                turret.x = xTile * TILE_SIZE;
                turret.y = yTile * TILE_SIZE;

                const xStartTile = xTile - turretInTiles;
                const yStartTile = yTile - turretInTiles;

                selection.placeable = xStartTile >= 0 && xStartTile < Math.floor((game.widthArea - 2 * turret.size) / TILE_SIZE) &&
                                      yStartTile >= 0 && yStartTile < Math.floor((game.heightArea - 2 * turret.size) / TILE_SIZE);

                for (let dx = 0; dx < 2 * turretInTiles; dx++) {
                    for (let dy = 0; dy < 2 * turretInTiles; dy++) {
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
            const tile = game.tiles[
                Math.floor((event.pageX - this.offsetLeft) / TILE_SIZE) + ',' +
                Math.floor((event.pageY - this.offsetTop) / TILE_SIZE)
            ];

            if (selection.status === 'placing') {
                if (selection.placeable) {
                    game.turrets.push(turret);

                    const xTile = (turret.x - TILE_SIZE / 2) / TILE_SIZE;
                    const yTile = (turret.y - TILE_SIZE / 2) / TILE_SIZE;

                    for (let i = 0; i < TILE_SIZE; i++) {
                        for (let j = 0; j < TILE_SIZE; j++) {
                            game.tiles[(xTile + i) + (yTile + j)] = turret;
                        }
                    }
                }

                game.selection = false;
            } else {
                ui.action.deselect();
            }
        });
    },
};

export {ui};
