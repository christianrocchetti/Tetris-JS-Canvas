import {loadImages, Tetrominos} from "./Blocks.js"
import {blockSize, canvasHeight, canvasWidth} from "./Setting.js"
import {range} from "./Utility.js"
import {clearBlock, drawBlock, drawGrid,} from "./DrawCanvas.js"
import {Block, MoveState, Playfield, Position, PositionCanvas, StateBlock} from "./Class.js"

let playfield: Playfield = new Playfield( [],
     canvasWidth / blockSize, // x
     canvasHeight / blockSize, // y )
)

const centerX : number = playfield.width / 2

let keyPress : MoveState


function init() {
    range(playfield.height).forEach((yIndex) => {
        let row : Block[] = []
        range(playfield.width).forEach((xIndex) => {
            row.push(new Block (StateBlock.Null,
                new PositionCanvas(blockSize * xIndex,
                    blockSize * yIndex
                ),
                null)
            )
        })
        playfield.matrix.push(row)
    })
    drawGrid()
    loadImages().then(play)
}



function refreshGrid() : Position[] {
    let positionBlocksActive : Position[] = []
    range(playfield.height).forEach(y => {
        playfield.matrix[y].forEach((block, i) => {
            let positionBlock : Position = new Position(y, i)
            if (block.state == StateBlock.Active) {
                drawBlock(block.image, block.canvasPosition)
                positionBlocksActive.push(positionBlock)
            } else if (block.state == StateBlock.ToDelete) {
                clearBlock(block.canvasPosition)
                playfield.removeImage(positionBlock)
            }
        })
    })
    return positionBlocksActive
}

function spawnTetromino() {
    let randomIndex : number = Math.floor(Math.random() * Tetrominos.length)
    let tetromino = Tetrominos[randomIndex]
    let length = tetromino.matrix[0].length
    let halfLength : number = Math.floor(length / 2) + (length % 2)
    let xSpawn = centerX - halfLength
    let positionNewBlocks : Position[] = []
    range(tetromino.matrix.length).forEach((yIndex) => {
        let xLastSpawn = xSpawn
        tetromino.matrix[yIndex].forEach((shapeBlock) => {
            if (shapeBlock == true) {
                positionNewBlocks.push(new Position(yIndex, xLastSpawn))
            }
            xLastSpawn += 1
        })
    })

    let isPossible : boolean =  playfield.isPossibleAddShape(positionNewBlocks)

    if (isPossible) {
        positionNewBlocks.forEach(positionNewBlock => {
            playfield.addBlock(new Position(positionNewBlock.y, positionNewBlock.i), tetromino.image)
        })
    }
}


function moveActiveBlocks(positionBlocksActive: Position[]) {
    let image : HTMLImageElement = playfield.getBlock(positionBlocksActive[0]).image

    let keyPressed : MoveState = MoveState.Null
    switch (keyPress) {
        case MoveState.Right:
            keyPressed = MoveState.Right
            break
        case MoveState.Left:
            keyPressed = MoveState.Left
    }

    let newPositionBlocksActive : Position[] = positionBlocksActive
        .map(positionBlockActive => {
            switch (keyPress) {
                case MoveState.Right:
                    return positionBlockActive.downRight()
                case MoveState.Left:
                    return positionBlockActive.downLeft()
                default:
                    return positionBlockActive.down()
            }
        })
    
    let isPossible : boolean = playfield.isPossibleAddShape(newPositionBlocksActive)

    if (isPossible) {
        range(newPositionBlocksActive.length).forEach(i => {
            playfield.addBlock(newPositionBlocksActive[i], image)
            playfield.toDeleteBlock(positionBlocksActive[i])

        })
    } else {
        let newPositionBlocksActiveDown : Position[] = positionBlocksActive
            .map(positionBlockActive => positionBlockActive.down())

        if (playfield.isPossibleAddShape(newPositionBlocksActiveDown))  {
            range(newPositionBlocksActiveDown.length).forEach(i => {
                playfield.addBlock(newPositionBlocksActiveDown[i], image)
                playfield.toDeleteBlock(positionBlocksActive[i])

            })
        } else {
            positionBlocksActive.forEach(positionBlockActive => {
                playfield.deactivatedBlock(positionBlockActive)
            })
        }
    }
}

function update() {
    let positionBlocksActive : Position[] = refreshGrid()

    if (positionBlocksActive.length == 0) {
        spawnTetromino()
    }

    moveActiveBlocks(positionBlocksActive.reverse())
    keyPress = MoveState.Null
}

window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "KeyA":
            keyPress = MoveState.Left
            break
        case "KeyD":
            keyPress = MoveState.Right
            break
        case "KeyS":
            keyPress = MoveState.RotateLeft
            break
        case "KeyW":
            keyPress = MoveState.RotateRight
            break
    }
})


function play() {
    spawnTetromino()
    setInterval(() => { update() }
        , 150 )
}

init()
