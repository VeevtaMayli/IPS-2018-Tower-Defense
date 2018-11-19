import {TURRETS, Turret} from "./turret.js";
import {WAVE_FREQUENCY, game} from "./game.js";

const ui = {
    buyControls: document.getElementById("turrets_buy_controls"),
    waveStarter: document.getElementById("wave_starter"),

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
                x: 640,
                y: 130
            });

            game.turrets.push(turret);
        }
    },
    initialize: () => {
        ui.bind("click", ui.buyControls.children, function() {
            ui.action.build(this.dataset.name);
        });

        ui.waveStarter.addEventListener("click", () => {
            game.lastWave = game.ticks - WAVE_FREQUENCY;
        });
    }
};

export {ui};