

export class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}


export class Block {
    active: boolean;
    position: Position;
    block: any;


    constructor(active: boolean, position: Position, block: any) {
        this.active = active;
        this.position = position;
        this.block = block;
    }
}

export interface IPlayfield {
    matrix: Block[][],
    width: number, // x
    height: number, // y
}