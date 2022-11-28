import {loadImages, Tetrominos} from "./Blocks.js";
import {blockSize, canvasHeight, canvasWidth} from "./Setting.js";
import {range} from "./Utility.js";
import {drawBlock, drawGrid,} from "./DrawCanvas.js";
import {Block, IPlayfield, Position} from "./Class";

let Playfield: IPlayfield = {
    matrix: [],
    width: canvasWidth / blockSize, // x
    height: canvasHeight / blockSize, // y
};

const centerX : number = Playfield.width / 2;


function init() {
    range(Playfield.height).forEach((xIndex) => {
        let row : Block[] = [];
        range(Playfield.width).forEach((yIndex) => {
            row.push(new Block (false,
                new Position(blockSize * yIndex,
                    blockSize * xIndex
                ),
                null)
            );
        });
        Playfield.matrix.push(row);
    });
    drawGrid();
    loadImages().then(play);
}



function refreshGrid() {
    for (let i = 0; i < Playfield.width; i++) {
        Playfield.matrix[i].forEach((block) => {
            if (block.active == true) {
                drawBlock(block.block, block.position);
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


function moveActiveBlocks() {
    let activeBlocks: Block[] = [];
    Playfield.matrix.forEach(row => {
        activeBlocks.concat(row.filter(block => block.active));
    });

    activeBlocks = activeBlocks.reverse();

}

function update() {
    moveActiveBlocks();
}


function play() {
    spawnTetromino();
}

init();
