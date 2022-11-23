import {loadImages, Tetrominos} from "./Blocks.js";
import {blockSize, canvasHeight, canvasWidth} from "./Setting.js";
import {range} from "./Utility.js";

const canvas: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.strokeStyle = "black";
ctx.lineWidth = 0.2;

interface IPlayfield {
    matrix: Block[][],
    width: number, // x
    height: number, // y
}

let Playfield: IPlayfield = {
    matrix: [],
    width: canvasWidth / blockSize, // x
    height: canvasHeight / blockSize, // y
};

class Block {
    active: boolean;
    x: number;
    y: number;
    block: any;


    constructor(active: boolean, x: number, y: number, block: any) {
        this.active = active;
        this.x = x;
        this.y = y;
        this.block = block;
    }
}

const centerX : number = Playfield.width / 2;


function init() {
    range(Playfield.height).forEach((xIndex) => {
        let row : Block[] = [];
        range(Playfield.width).forEach((yIndex) => {
            row.push( new Block (false,
                blockSize * yIndex,
                blockSize * xIndex,
                null)
            );
        });
        Playfield.matrix.push(row);
    });
    drawGrid();
    loadImages().then(play);
}

function initX() {
    return;
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

function refreshGrid() {
    for (let i = 0; i < Playfield.width; i++) {
        Playfield.matrix[i].forEach((block) => {
            console.log(block);
            if (block.active == true) {
                drawBlock(block.block, block.x, block.y);
            }
        });
    }
}

function spawnTetromino() {
    let randomIndex : number = Math.floor(Math.random() * Tetrominos.length);
    let tetromino = Tetrominos[randomIndex];
    let length = tetromino.matrix[0].length;
    let halfLength : number = Math.floor(length / 2) + (length % 2);
    let xSpawn = centerX - halfLength;
    range(tetromino.matrix.length).forEach((yIndex) => {
        let xLastSpawn = xSpawn;
        tetromino.matrix[yIndex].forEach((block) => {
            if (block == true) {
                Playfield.matrix[yIndex][xLastSpawn].active = true;
                Playfield.matrix[yIndex][xLastSpawn].block = tetromino.image;
            }
            xLastSpawn += 1;
            console.log(xLastSpawn);
        });
    });
    refreshGrid();
    console.log(Playfield);
}

function drawBlock(block: CanvasImageSource, x: number, y: number) {
    ctx.drawImage(block, x, y, blockSize, blockSize);
}

function play() {
    spawnTetromino();
}

init();
