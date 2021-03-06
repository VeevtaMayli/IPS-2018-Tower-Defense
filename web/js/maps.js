const PATH_WIDTH = 50;
const PATH_BORDER_WIDTH = 3;
const PATH_COLOR = 'rgba(235, 192, 23, 1)';
const PATH_BORDER_COLOR = 'rgba(112, 72, 55, 1)';
const FINISH_PATH_COLOR = 'rgba(152, 72, 77, 1)';
const MAP_IMAGE = 'web/img/background.png';

const MAPS = {
    baseMap: [
        {x: 0, y: 50},
        {x: 600, y: 50},
        {x: 200, y: 300},
        {x: 600, y: 550},
        {x: 0, y: 550},
    ],
};

export {
    MAPS,
    MAP_IMAGE,
    PATH_WIDTH,
    PATH_BORDER_WIDTH,
    PATH_COLOR,
    PATH_BORDER_COLOR,
    FINISH_PATH_COLOR,
};
