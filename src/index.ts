export interface Config {
  gameSheetHeight: number;
  gameSheetWidth: number;
}

export type Sheet = Array<Boolean>;

export class GameOfLife {

  gameSheet: Sheet;
  config: Config
  initializeGame = (config: Config): Sheet => {
    if (config.gameSheetHeight * config.gameSheetWidth >= 0) {
      this.config = config;
      this.gameSheet = [...new Array(config.gameSheetHeight * config.gameSheetWidth)];
      return this.gameSheet;
    } else {
      throw new Error("Config having a negative number");
    }
  }

  populateSheet = (): Sheet => {
    this.gameSheet.fill(false);
    return this.gameSheet;
  }

  placeCell(cellPosX: number, cellPosY: number): Sheet {
    let indexToChange: number = (cellPosY - 1) * this.config.gameSheetWidth + cellPosX - 1;
    this.gameSheet[indexToChange] = true;
    return this.gameSheet;
  }

  getNeighbors(cellPosX: number, cellPosY: number): number {
    let neighborsCounter: number = 0
    let index: number = (cellPosY - 1) * this.config.gameSheetWidth + cellPosX - 1;
    if (this.gameSheet[index - this.config.gameSheetWidth - 1]) neighborsCounter++;
    if (this.gameSheet[index - this.config.gameSheetWidth]) neighborsCounter++;
    if (this.gameSheet[index - this.config.gameSheetWidth + 1]) neighborsCounter++;
    if (this.gameSheet[index - 1]) neighborsCounter++;
    if (this.gameSheet[index + 1]) neighborsCounter++;
    if (this.gameSheet[index + this.config.gameSheetWidth - 1]) neighborsCounter++;
    if (this.gameSheet[index + this.config.gameSheetWidth]) neighborsCounter++;
    if (this.gameSheet[index + this.config.gameSheetWidth + 1]) neighborsCounter++;
    return neighborsCounter;
  }
}