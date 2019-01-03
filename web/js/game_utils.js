import {PATH_COLOR, PATH_BORDER_COLOR} from './maps.js';
import {getResponse} from './ajax.js';

function moveToTarget({object, target, dt}) {
    const distanceX = target.x - object.x;
    const distanceY = target.y - object.y;
    const direction = Math.atan2(distanceY, distanceX);

    object.x += object.speed * dt * Math.cos(direction);
    object.y += object.speed * dt * Math.sin(direction);

    return Math.sqrt(Math.pow(Math.abs(distanceX), 2) + Math.pow(Math.abs(distanceY), 2)) < 2 * object.speed * dt;
}

function inRadius({target, object, radius}) {
    return (Math.pow(object.x - target.x, 2)) + (Math.pow(object.y - target.y, 2)) < radius * radius;
}

function splitIntoTiles(ctx, tiles, tileSize) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const mapData = ctx.getImageData(0, 0, width, height).data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let startRGBAByte = 4 * (width * y + x);
            const pixelColor = 'rgba(' +
                mapData[startRGBAByte] + ', ' +
                mapData[++startRGBAByte] + ', ' +
                mapData[++startRGBAByte] + ', ' +
                mapData[++startRGBAByte] / 255 +
            ')';

            const curTile = pxToTile(x, y, tileSize);
            if (curTile && (pixelColor === PATH_COLOR || pixelColor === PATH_BORDER_COLOR)) {
                tiles[curTile] = true;
            }
        }
    }
}

function pxToTile(x, y, tileSize) {
    return Math.floor(x / tileSize) + ', ' + Math.floor(y / tileSize);
}

function recordScore(score) {
    const data = {'score': score};
    getResponse('score_recorder.php', data);
}

export {
    moveToTarget,
    inRadius,
    splitIntoTiles,
    recordScore,
};
