import {TURRETS, Turret} from "./turret.js";
import {TILE_SIZE, WAVE_FREQUENCY, game} from "./game.js";

const ui = {
    buyControls: document.getElementById("turrets_buy_controls"),
    waveStarter: document.getElementById("wave_starter"),
    canvas: document.getElementById("canvas"),

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
                y: -1000
            });

            game.selection = {
                status: "placing",
                turret: turret,
                placeable: false
            };
        },
        deselect: () => {
            game.selection = false;
        }
    },
    initialize: () => {
        ui.bind("click", ui.buyControls.children, function() {
            ui.action.build(this.dataset.name);
        });

        ui.waveStarter.addEventListener("click", () => {
            game.lastWave = game.ticks - WAVE_FREQUENCY;
        });

        ui.canvas.addEventListener("mousemove", function(event) {
            const selection = game.selection;
            const turret = selection.turret;

            if (selection) {
                let xTile = Math.ceil((event.pageX - this.offsetLeft) / TILE_SIZE);
                let yTile = Math.ceil((event.pageY - this.offsetTop) / TILE_SIZE);

                turret.x = (xTile * TILE_SIZE) - TILE_SIZE / 2;
                turret.y = (yTile * TILE_SIZE) - TILE_SIZE / 2;

                selection.placeable = true;

                for (let i = 0; i < TILE_SIZE; i++) {
                    for (let j = 0; j < TILE_SIZE; j++) {
                        if (game.tiles[(xTile + i - 2) + (yTile + j - 2)]) {
                            selection.placeable = false;
                            return;
                        }
                    }
                }
            }
        });

        ui.canvas.addEventListener("click", function(event) {
            const selection = game.selection;
            const turret = selection.turret;
            const tile = game.tiles[
                Math.ceil((event.pageX - this.offsetLeft) / TILE_SIZE) + "," +
                Math.ceil((event.pageY - this.offsetTop) / TILE_SIZE)
                ];

            if (selection.status === "placing") {
                if (selection.placeable) {
                    game.turrets.push(turret);

                    let xTile = (turret.x + TILE_SIZE / 2) / TILE_SIZE;
                    let yTile = (turret.y + TILE_SIZE / 2) / TILE_SIZE;

                    for (let i = 0; i < TILE_SIZE; i++) {
                        for (let j = 0; j < TILE_SIZE; j++) {
                            game.tiles[(xTile + i - 2) + (yTile + j - 2)] = turret;
                        }
                    }
                }

                game.selection = false;
            } else {
                ui.action.deselect();
            }
        });
    }
};

export {ui};