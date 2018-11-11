import {TURRETS, Turret} from "./turret.js";
import {game} from "./game.js";

const ui = {
    buyControls: document.getElementById("turrets-buy-controls"),

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
    }
};

export {ui};