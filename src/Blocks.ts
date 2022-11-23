
export const Blocks = {
    Blue: new Image(),
    Green: new Image(),
    LightBlue: new Image(),
    Orange: new Image(),
    Purple: new Image(),
    Red: new Image(),
    Yellow: new Image(),
};

class Shape {
    id: number;
    name: string;
    image: HTMLImageElement;
    matrix: boolean[][];

    constructor(id: number, name: string, image: HTMLImageElement, matrix: boolean[][]) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.matrix = matrix;
    }
}

export const Tetrominos = [
    new Shape(
        1,
        "I-Block",
        Blocks.LightBlue,
        [[true, true, true, true]]
    ),
    new Shape(
        2,
        "J-Block",
        Blocks.Blue,
        [
            [true, false, false, false],
            [true, true, true, true],
        ],
    ),
    new Shape(
        3,
        "L-Block",
        Blocks.Orange,
        [
            [false, false, false, true],
            [true, true, true, true],
        ],
    ),
    new Shape(
        4,
        "O-Block",
        Blocks.Yellow,
        [
            [true, true],
            [true, true],
        ],
    ),
    new Shape(
        5,
        "S-Block",
        Blocks.Green,
        [
            [false, true, true],
            [true, true, false],
        ],
    ),
    new Shape(
        6,
        "T-Block",
        Blocks.Purple,
        [
            [false, true, false],
            [true, true, true],
        ],
    ),
    new Shape(
        7,
        "Z-Block",
        Blocks.Red,
        [
            [true, true, false],
            [false, true, true],
        ],
    ),
];

function loadImage(img: HTMLImageElement, src: string) {
    // @ts-ignore // TODO: remove this
    return new Promise<void>((resolve) => {
        img.src = src;
        img.onload = () => resolve();
    });
}

export function loadImages() {
    // @ts-ignore // TODO: remove this
    return Promise.all([
        loadImage(Blocks.Blue, "assets/Blue.png"),
        loadImage(Blocks.Green, "assets/Green.png"),
        loadImage(Blocks.LightBlue, "assets/LightBlue.png"),
        loadImage(Blocks.Orange, "assets/Orange.png"),
        loadImage(Blocks.Purple, "assets/Purple.png"),
        loadImage(Blocks.Red, "assets/Red.png"),
        loadImage(Blocks.Yellow, "assets/Yellow.png"),
    ]);
}

