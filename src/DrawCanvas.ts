import {blockSize, canvasHeight, canvasWidth} from "./Setting.js";
import {Position, PositionCanvas} from "./Class.js";

const canvas: HTMLCanvasElement = document.getElementById("playfieldCanvas") as HTMLCanvasElement;
const backgroundCanvas : HTMLCanvasElement = document.getElementById("backgroundCanvas") as HTMLCanvasElement;

const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
const ctxb : CanvasRenderingContext2D = backgroundCanvas.getContext("2d") as CanvasRenderingContext2D

ctxb.strokeStyle = "black";
ctxb.lineWidth = 0.2;

// TODO: tutto na classe!
export function drawGrid() {
    ctxb.beginPath();
    for (let x = 0; x <= canvasWidth; x += blockSize) {
        ctxb.moveTo(x, 0);
        ctxb.lineTo(x, canvasHeight);
    }
    for (let y = 0; y <= canvasHeight; y += blockSize) {
        ctxb.moveTo(0, y);
        ctxb.lineTo(canvasWidth, y);
    }
    ctxb.stroke();
}


export function drawBlock(image: CanvasImageSource, position: PositionCanvas) {
    ctx.drawImage(image, position.x, position.y, blockSize, blockSize);
}

export function clearBlock(position: PositionCanvas) {
    ctx.clearRect(position.x, position.y, blockSize, blockSize)
}