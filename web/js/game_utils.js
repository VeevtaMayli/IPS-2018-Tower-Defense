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
        let dx = next.x - cur.x;
        let dy = next.y - cur.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            const direction = dy / dx;
            cur.x += (dx < 0) ? PATH_WIDTH / 2 + 1 : -PATH_WIDTH / 2 - 1;
            const offset = cur.y - direction * cur.x;
            dx = (dx < 0) ? -1 : 1;

            while (cur.x !== next.x) {
                cur.x += dx;

                for (let j = -halfWidth + 1; j <= halfWidth; j++) {
                    tiles[Math.round(cur.x / halfWidth) + "," + Math.round((direction * cur.x + offset) / halfWidth + j)] = true;
                }
            }
        } else if (dy !== 0) {
            const direction = dx / dy;
            cur.y += (dy < 0) ? PATH_WIDTH / 2 + 1 : -PATH_WIDTH / 2 - 1;
            const offset = cur.x - direction * cur.y;
            dy = (dy < 0) ? -1 : 1;

            while (cur.y !== next.y) {
                cur.y += dy;

                for (let j = -halfWidth + 1; j <= halfWidth; j++) {
                    tiles[Math.round((direction * cur.x + offset) / halfWidth + j) + "," + Math.round(cur.x / halfWidth)] = true;
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