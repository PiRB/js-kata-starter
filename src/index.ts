export interface Config {
    gameSheetHeight: number;
    gameSheetWidth: number;
}

export class GameOfLife {
    gameSheet: Array<Array<Cell>>
    constructor(gameSheet: Array<Array<Cell>>) {
        this.gameSheet = gameSheet;
    }

    startGame(): boolean {
        return true
    }

    displayGame(): number {
        return this.gameSheet.length;
    }
}

export class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Cell {
    position: Position;
    content: string;

    constructor(content: string, position: Position) {
        this.content = content;
        this.position = position;
    }
}

const cell1: Cell = new Cell(' ', new Position(0, 0))
const cell2: Cell = new Cell(' ', new Position(0, 1))
const cell3: Cell = new Cell(' ', new Position(1, 0))
const cell4: Cell = new Cell(' ', new Position(1, 1))
const array1 = [cell1, cell2];
const array2 = [cell3, cell4];
const array3 = [array1, array2];
const gameOfLife: GameOfLife = new GameOfLife(array3);
console.log(gameOfLife.startGame());
console.log(gameOfLife.displayGame());