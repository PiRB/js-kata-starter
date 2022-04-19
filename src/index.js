"use strict";
exports.__esModule = true;
exports.Cell = exports.Position = exports.GameOfLife = void 0;
var GameOfLife = /** @class */ (function () {
    function GameOfLife(gameSheet) {
        this.gameSheet = gameSheet;
    }
    GameOfLife.prototype.startGame = function () {
        return true;
    };
    GameOfLife.prototype.displayGame = function () {
        return this.gameSheet.length;
    };
    return GameOfLife;
}());
exports.GameOfLife = GameOfLife;
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    return Position;
}());
exports.Position = Position;
var Cell = /** @class */ (function () {
    function Cell(content, position) {
        this.content = content;
        this.position = position;
    }
    return Cell;
}());
exports.Cell = Cell;
var cell1 = new Cell(' ', new Position(0, 0));
var cell2 = new Cell(' ', new Position(0, 1));
var cell3 = new Cell(' ', new Position(1, 0));
var cell4 = new Cell(' ', new Position(1, 1));
var array1 = [cell1, cell2];
var array2 = [cell3, cell4];
var array3 = [array1, array2];
var gameOfLife = new GameOfLife(array3);
console.log(gameOfLife.startGame());
console.log(gameOfLife.displayGame());
