function moveToTarget({object, target, dt}) {
    const distanceX = target.x - object.x;
    const distanceY = target.y - object.y;
    const direction = Math.atan2(distanceY, distanceX);

    object.x += object.speed * dt * Math.cos(direction);
    object.y += object.speed * dt * Math.sin(direction);

    return Math.sqrt(Math.pow(Math.abs(distanceX), 2) + Math.pow(Math.abs(distanceY), 2)) < 2 * object.speed * dt;
}

function inRadius({target, object, radius}) {
    return (Math.pow(object.x - target.x, 2)) +(Math.pow(object.y - target.y, 2)) < radius * radius;
}

export {
  moveToTarget,
  inRadius
};