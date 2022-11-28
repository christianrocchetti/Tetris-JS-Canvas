import {blockSize, canvasHeight, canvasWidth} from "./Setting";
import {Position} from "./Class";

const canvas: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.strokeStyle = "black";
ctx.lineWidth = 0.2;

export function drawGrid() {
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


export function drawBlock(image: CanvasImageSource, position: Position) {
    ctx.drawImage(image, position.x, position.y, blockSize, blockSize);
}