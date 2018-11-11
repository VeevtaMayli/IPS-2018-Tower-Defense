import {ui} from "./interface.js";
import {game} from "./game.js";

(function main() {
    const canvas = document.getElementById("canvas");

    const gameArea = {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        context: canvas.getContext('2d')
    };

    ui.initialize();
    game.initialize(gameArea);
    game.tick();
})();