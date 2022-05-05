// @ts-ignore
import * as matchers from "jest-extended";
import { Cell, checkIfNeighbourExists, Configuration, getNeighbours, processTurn, removeDuplicatesNeighbours } from './index';
expect.extend(matchers);

describe('Retrieve all neighbours', function () {
  it('Should return an array with all neighbours cells', function () {
    let neighbours = getNeighbours(2, 2)
    expect(neighbours).toEqual([
      { x: 2, y: 1 },
      { x: 3, y: 2 },
      { x: 2, y: 3 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 3 },
    ])
  });
  it('Should return an array with all neighbours cells', function () {
    let neighbours = getNeighbours(0, 0)
    expect(neighbours).toEqual([
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
    ])
  });
});

describe('Counting all neighbours of a configuration', function () {
  it('Should return the total of all neighbours of configuration', function () {
    let config: Configuration = [
      { x: 2, y: 7 },
      { x: 5, y: 3 },
      { x: 8, y: 7 },
      { x: 9, y: 7 },
      { x: 7, y: 7 },
      { x: 7, y: 8 }
    ];
    let neighbours: Array<Cell> = [];
    config.map(cell => neighbours.push(...getNeighbours(cell.x, cell.y)));
    expect(neighbours.length).toEqual(48)
  });
})

describe('Remove all duplicates living cells', function () {
  it('Should return a clean configuration without any duplicates living cell', function () {
    let config: Configuration = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 13 },
      { x: 1453762, y: 13687138 },
      { x: 42, y: 69 },
      { x: 1453762, y: 13687138 },
    ];
    config = removeDuplicatesNeighbours(config);
    expect(config).toEqual([
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 13 },
      { x: 1453762, y: 13687138 },
      { x: 42, y: 69 },
    ])
  });
});

describe('Check if a cell exists', function () {
  it('Should return true', function () {
    let config: Configuration = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 13 },
      { x: 1453762, y: 13687138 },
      { x: 42, y: 69 },
      { x: 1453762, y: 13687138 },
    ];
    const cellToCheck: Cell = { x: 1, y: 1 }
    expect(checkIfNeighbourExists(config, cellToCheck)).toEqual(true);
  });
  it('Should return false', function () {
    let config: Configuration = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 13 },
      { x: 1453762, y: 13687138 },
      { x: 42, y: 69 },
      { x: 1453762, y: 13687138 },
    ];
    const cellToCheck: Cell = { x: 1456278, y: 42 }
    expect(checkIfNeighbourExists(config, cellToCheck)).toEqual(false);
  });
});

describe('Process a turn', function () {
  it('Represent a under-population case, so all cells should die', function () {
    let config: Configuration = [
      { x: 1, y: 1 },
      { x: 42, y: 69 },
      { x: 1453762, y: 13687138 },
    ];
    let newConfiguration: Configuration = processTurn(config);
    expect(newConfiguration).toBeArrayOfSize(0);
  });

  it('Represent immobilized living cells', function () {
    let config: Configuration = [
      { x: 42, y: 42 },
      { x: 42, y: 43 },
      { x: 43, y: 42 },
      { x: 43, y: 43 },
    ];
    let newConfiguration: Configuration = processTurn(config);
    expect(newConfiguration).toIncludeAllMembers(config);
  });

  it('Represent a glider of living cells', function () {
    let config: Configuration = [
      { x: 5, y: 5 },
      { x: 6, y: 6 },
      { x: 6, y: 7 },
      { x: 5, y: 7 },
      { x: 4, y: 7 }
    ];
    let numberOfTurns: number = 6
    for (let index = 0; index < numberOfTurns; index++) {
      config = processTurn(config);
    }
    expect(config).toIncludeSameMembers([
      { x: 5, y: 8 },
      { x: 6, y: 9 },
      { x: 7, y: 9 },
      { x: 7, y: 8 },
      { x: 7, y: 7 }
    ]);
  });
});



// it("Cas 2: cellules vivantes et immobiles", function () {
//   let configuration: Array<gameOfLife.Cell> = [
//     { x: 5, y: 5 },
//     { x: 6, y: 5 },
//     { x: 5, y: 6 },
//     { x: 6, y: 6 },
//   ];
//   let newConfiguration = gameOfLife.doTurn(configuration)
//   expect(newConfiguration).toIncludeSameMembers(configuration);
// });

// it("Cas 3: Oscillation (reprise de sa forme initiale - à | à -)", function () {
//   let configuration: Array<gameOfLife.Cell> = [
//     { x: 5, y: 5 },
//     { x: 6, y: 5 },
//     { x: 7, y: 5 }
//   ];
//   let newConfiguration = gameOfLife.doTurn(configuration)
//   let newConfigurationBis = gameOfLife.doTurn(newConfiguration)
//   expect(newConfigurationBis).toIncludeSameMembers(configuration);
// });