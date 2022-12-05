

export class Position {
    y: number;
    i: number;

    constructor(y: number, i: number) {
        this.i = i;
        this.y = y;
    }
    
    down() : Position {
        return new Position(this.y + 1, this.i);
    }

    up() : Position {
        return new Position(this.y - 1, this.i);
    }

    downRight() : Position {
        return new Position(this.y + 1, this.i + 1);
    }

    downLeft() : Position {
        return new Position(this.y + 1, this.i - 1);
    }
}

export class PositionCanvas {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export enum StateBlock {
    Null,
    Active,
    ToDelete,
    Deactivated
}

export enum MoveState {
    Null,
    RotateLeft,
    RotateRight,
    Right,
    Left
}

export class Block {
    state: StateBlock;
    canvasPosition: PositionCanvas;
    image: any;


    constructor(state: StateBlock, position: PositionCanvas, image: any) {
        this.state = state;
        this.canvasPosition = position;
        this.image = image;
    }
}


export class Playfield {
    matrix: Block[][];
    width: number; // x or i
    height: number; // y

    constructor(matrix: Block[][], width: number, height: number) {
        this.matrix = matrix;
        this.width = width;
        this.height = height;
    }

    getBlock(position: Position) : Block {
        if (this.isPossible(position)) {
            return this.matrix[position.y][position.i]
        }
        throw new Error("is not possible in this position:" + position)
    }

    /**
     * @deprecated The method should not be used
     */
    nullBlock(position: Position) {
        this.matrix[position.y][position.i].state = StateBlock.Null;
    }

    deactivatedBlock(position: Position) {
        this.matrix[position.y][position.i].state = StateBlock.Deactivated;
    }

    toDeleteBlock(position: Position) {
        this.matrix[position.y][position.i].state = StateBlock.ToDelete;
    }


    removeImage(position: Position) {
        if (this.isPossible(position)) {
            this.matrix[position.y][position.i].image = null;
            this.matrix[position.y][position.i].state = StateBlock.Null;
        }
    }

    addBlock(position: Position, image: HTMLImageElement) : boolean {
        if (!(image instanceof HTMLImageElement)) {
            throw new Error("image is not HTMLImageElement")
        }
        if (this.isPossible(position)) {
            this.matrix[position.y][position.i].state = StateBlock.Active;
            this.matrix[position.y][position.i].image = image;
            return true
        }
        return false
    }

    isPossible(position: Position) {
        console.log(position)
        if (position.i > this.width -1 || position.i < 0  ||
            position.y > this.height -1 || position.y < 0 ||
            this.matrix[position.y][position.i].state == StateBlock.Deactivated) {
            return false
        }
        return true
    }

    isPossibleAddShape(positions: Position[]) : boolean {
        return positions.every(positionBlockActive => {
            return this.isPossible(positionBlockActive)
        });
    }

}