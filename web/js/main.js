import {ui} from "./interface.js";
import {game} from "./game.js";

(function main() {
    const gameArea = {
        width: ui.canvas.offsetWidth,
        height: ui.canvas.offsetHeight,
        context: ui.canvas.getContext('2d')
    };

    ui.initialize();
    game.initialize(gameArea);
    game.tick();
})();