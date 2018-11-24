import {PATH_WIDTH} from "./maps.js";

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

function splitIntoTiles(map, tiles, tileSize) {
    const halfWidth = PATH_WIDTH / tileSize / 2;
    map.forEach((cur, i, map) => {
        const next = map[i + 1] || cur;
        let x = cur.x;
        let y = cur.y;
        let dx = next.x - x;
        let dy = next.y - y;

        if (Math.abs(dx) > Math.abs(dy)) {
            const direction = dy / dx;
            const offset = y - direction * x;
            dx = (dx < 0) ? -1 : 1;

            while (x !== next.x) {
                x += dx;

                for (let j = -halfWidth + 1; j <= halfWidth; j++) {
                    tiles[Math.round(x / halfWidth) + "," + Math.round((direction * x + offset) / halfWidth + j)] = true;
                }
            }
        } else if (dy !== 0) {
            const direction = dx / dy;
            const offset = x - direction * y;
            dy = (dy < 0) ? -1 : 1;

            while (y !== next.y) {
                y += dy;

                for (let j = -halfWidth + 1; j <= halfWidth; j++) {
                    tiles[Math.round((direction * y + offset) / halfWidth + j) + "," + Math.round(y / halfWidth)] = true;
                }
            }
        }
    });
}

export {
    moveToTarget,
    inRadius,
    splitIntoTiles
};