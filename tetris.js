/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const canvasWidth = 350
const canvasHeight = 700
const blockSize = 35

ctx.strokeStyle = 'black';
ctx.lineWidth = .2;

const Blocks = {
    Blue: new Image(),
    Green: new Image(),
    LightBlue: new Image(),
    Orange: new Image(),
    Purple: new Image(),
    Red: new Image(),
    Yellow: new Image()
};

const Tetrominos = [{
    id: 1,
    name: 'I-Block',
    block: Blocks.LightBlue,
    shape: [
        [1, 1, 1, 1]
    ]
},
{
    id: 2,
    name: 'J-Block',
    block: Blocks.Blue,
    shape: [
        [2, 0, 0, 0],
        [2, 2, 2, 2]
    ]
},
{
    id: 3,
    name: 'L-Block',
    block: Blocks.Orange,
    shape: [
        [0, 0, 0, 3],
        [3, 3, 3, 3]
    ]
},
{
    id: 4,
    name: 'O-Block',
    block: Blocks.Yellow,
    shape: [
        [4, 4],
        [4, 4]
    ]
},
{
    id: 5,
    name: 'S-Block',
    block: Blocks.Green,
    shape: [
        [0, 5, 5],
        [5, 5, 0]
    ]
},
{
    id: 6,
    name: 'T-Block',
    block: Blocks.Purple,
    shape: [
        [0, 6, 0],
        [6, 6, 6]
    ]
},
{
    id: 7,
    name: 'Z-Block',
    block: Blocks.Red,
    shape: [
        [7, 7, 0],
        [0, 7, 7]
    ]
}
];

let Playfield = [];

function init() {
    for(let i = 0; i < canvasHeight / blockSize; i++) {
        let row = [];
        for(let y = 0; y < canvasWidth / blockSize; y++) {
            row.push(0);
        }
        Playfield.push(row);
    }
    drawGrid();
    loadImages().then(play);
}

function drawGrid() {
    ctx.beginPath();
    for (let x = 0; x <= canvasWidth; x += blockSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
    }
    for (let y = 0; y <= canvasHeight; y += blockSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
    }
    ctx.stroke();
}

function loadImages() {
    return Promise.all([
        loadImage(Blocks.Blue, "assets/Blue.png"),
        loadImage(Blocks.Green, "assets/Green.png"),
        loadImage(Blocks.LightBlue, "assets/LightBlue.png"),
        loadImage(Blocks.Orange, "assets/Orange.png"),
        loadImage(Blocks.Purple, "assets/Purple.png"),
        loadImage(Blocks.Red, "assets/Red.png"),
        loadImage(Blocks.Yellow, "assets/Yellow.png")
    ]);
}

function drawBlock(block, x, y) {
    ctx.drawImage(block, x, y, blockSize, blockSize);
}

function loadImage(img, src) {
    return new Promise((resolve) => {
        img.src = src;
        img.onload = () => resolve();
    });
}

function spawnTetromino() {
    
    let tetromino = Tetrominos[Math.floor(Math.random() * Tetrominos.length)];
    let length = tetromino.shape[0].length;
    let halfLength = Math.floor(length / 2) + length % 2;
    let xSpawn = centerX() - (halfLength * blockSize);
    
    for(let i = 0; i < tetromino.shape.length; i++) {
        let xLastSpawn = xSpawn;
        tetromino.shape[i].forEach(block => {
            if(block != 0) {
                drawBlock(tetromino.block, xLastSpawn, i * blockSize);
            }
            xLastSpawn += blockSize;
        })
    }
}

function centerX() {
    let center = canvasWidth / 2;
    let rest = center % 35;
    if(rest != 0) {
        center -= rest;
    }
    return center;
}

function play() {
    spawnTetromino();
}

init();