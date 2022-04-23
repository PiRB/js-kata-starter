// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
expect.extend(matchers);
import { Sheet, Config, GameOfLife, } from './index';

describe('GameOfLife', function () {

  describe('Initialize game', function () {
    it('Initialize game with size 0', function () {
      const config: Config = {
        gameSheetHeight: 0,
        gameSheetWidth: 0
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      expect(gameOfLife.gameSheet).toHaveLength(0);
    });

    it('Initialize game with size 3', function () {
      const config: Config = {
        gameSheetHeight: 1,
        gameSheetWidth: 3
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      expect(gameOfLife.gameSheet).toHaveLength(3);
    });

    it('Initialize game with size 9', function () {
      const config: Config = {
        gameSheetHeight: 3,
        gameSheetWidth: 3
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      expect(gameOfLife.gameSheet).toHaveLength(9);
    });

    it('Initialize game with size -1', function () {
      const config: Config = {
        gameSheetHeight: -1,
        gameSheetWidth: 1
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      expect(() => {
        gameOfLife.initializeGame(config);
      }).toThrow("Config having a negative number");
    });
  });

  describe('Populate sheet', function () {
    it('Fill a sheet of 1 cells', function () {
      const config: Config = {
        gameSheetHeight: 1,
        gameSheetWidth: 1
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      gameOfLife.populateSheet();
      expect(gameOfLife.gameSheet).toEqual([false]);
    });

    it('Fill a sheet of 3 cells', function () {
      const config: Config = {
        gameSheetHeight: 3,
        gameSheetWidth: 1
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      gameOfLife.populateSheet();
      expect(gameOfLife.gameSheet).toEqual([false, false, false]);
    });
  });

  describe('Place a cell', function () {
    it('Should add a living cell to the game sheet', function () {
      const config: Config = {
        gameSheetHeight: 1,
        gameSheetWidth: 3
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      gameOfLife.populateSheet();
      gameOfLife.placeCell(2, 1);
      expect(gameOfLife.gameSheet).toEqual([false, true, false]);
    });

    it('Should add a living cell to the game sheet', function () {
      const config: Config = {
        gameSheetHeight: 2,
        gameSheetWidth: 3
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      gameOfLife.populateSheet();
      gameOfLife.placeCell(2, 2);
      expect(gameOfLife.gameSheet).toEqual([false, false, false, false, true, false]);
    });
  });

  describe('Check neighbors', function () {
    it('Should return the correct number of all near living cells', function () {
      const config: Config = {
        gameSheetHeight: 2,
        gameSheetWidth: 3
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      gameOfLife.populateSheet();
      gameOfLife.placeCell(2, 2);
      expect(gameOfLife.getNeighbors(2, 2)).toEqual(0);
    });

    it('Should return the correct number of all near living cells', function () {
      const config: Config = {
        gameSheetHeight: 2,
        gameSheetWidth: 3
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      gameOfLife.populateSheet();
      gameOfLife.placeCell(2, 2);
      gameOfLife.placeCell(2, 3);
      expect(gameOfLife.getNeighbors(2, 2)).toEqual(1);
    });

    it('Should return the correct number of all near living cells', function () {
      const config: Config = {
        gameSheetHeight: 3,
        gameSheetWidth: 3
      }
      const gameOfLife: GameOfLife = new GameOfLife();
      gameOfLife.initializeGame(config);
      gameOfLife.populateSheet();
      gameOfLife.placeCell(1, 1);
      gameOfLife.placeCell(3, 1);
      gameOfLife.placeCell(2, 2);
      gameOfLife.placeCell(2, 3);
      expect(gameOfLife.getNeighbors(2, 2)).toEqual(3);
    });
  });
});