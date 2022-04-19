// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
expect.extend(matchers);
import { Position, Cell, GameOfLife } from './index';

describe('GameOfLife', function () {

  describe('initialize a Cell', function () {
    it('Initialize a position', function () {
      const position: Position = new Position(0, 0);
      expect(position.x & position.y).toEqual(0);
    });
    it('Initialize a Cell', function () {
      const position: Position = new Position(0, 0);
      const cell: Cell = new Cell(' ', position);
      expect(cell.content).toEqual(' ');
    });
  });

  it('Start the game', function () {
    const cell1: Cell = new Cell(' ', new Position(0, 0))
    const cell2: Cell = new Cell(' ', new Position(0, 1))
    const cell3: Cell = new Cell(' ', new Position(1, 0))
    const cell4: Cell = new Cell(' ', new Position(1, 1))
    const array1 = [cell1, cell2];
    const array2 = [cell3, cell4];
    const array3 = [array1, array2];
    const gameOfLife: GameOfLife = new GameOfLife(array3);
    expect(gameOfLife.displayGame()).toEqual(2);
  })
});