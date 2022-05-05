/**
 * ALL OF THE CORE FUncTION FOR THE GAME OF LIFE
 */
export interface Cell {
  x: number;
  y: number;
}

export interface Configuration extends Array<Cell> { }

export function randomConfiguration(numberOfCells: number = 500, limit: number = 600): Configuration {
  let configuration: Configuration = []
  for (let i = 0; i < numberOfCells; i++) {
    const x = Math.floor(Math.random() * (limit / 6))
    const y = Math.floor(Math.random() * (limit / 6))
    configuration.push({ x: x, y: y })
  }
  return configuration
}

export function processTurn(configuration: Configuration): Configuration {
  let neighbours: Configuration = [];
  configuration.map(cell => neighbours.push(...getNeighbours(cell.x, cell.y)));
  neighbours = removeDuplicatesNeighbours(neighbours)
  let newConfiguration: Array<Cell> = [];
  neighbours.map(neighbour => (processCell(configuration, neighbour.x, neighbour.y, checkIfNeighbourExists(configuration, neighbour))) ? newConfiguration.push({ x: neighbour.x, y: neighbour.y }) : null);
  return newConfiguration
}

export function processCell(configuration: Configuration, cellX: number, cellY: number, isAlive: boolean): boolean {
  let numberOfNeighbours: number = 0
  let neighbours = getNeighbours(cellX, cellY)
  neighbours.map(neighbour => checkIfNeighbourExists(configuration, neighbour) ? numberOfNeighbours++ : null);
  if (numberOfNeighbours === 3) {
    return true;
  } else return numberOfNeighbours === 2 && isAlive;
}

export function checkIfNeighbourExists(configuration: Configuration, neighbour: Cell) {
  let isFound = false
  configuration.some(cell => (cell.x === neighbour.x && cell.y === neighbour.y) ? isFound = true : '');
  return isFound
}

export function getNeighbours(cellPosX: number, cellPosY: number): Configuration {
  return [
    { x: cellPosX, y: cellPosY - 1 },
    { x: cellPosX + 1, y: cellPosY },
    { x: cellPosX, y: cellPosY + 1 },
    { x: cellPosX - 1, y: cellPosY },
    { x: cellPosX - 1, y: cellPosY - 1 },
    { x: cellPosX + 1, y: cellPosY - 1 },
    { x: cellPosX - 1, y: cellPosY + 1 },
    { x: cellPosX + 1, y: cellPosY + 1 },
  ]
}

export function removeDuplicatesNeighbours(neighbours: Configuration) {
  return neighbours.reduce((unique, neighbour) => {
    if (!unique.some(cell => cell.x === neighbour.x && cell.y === neighbour.y)) unique.push(neighbour);
    return unique;
  }, []);
}
