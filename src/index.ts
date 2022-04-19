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

  placeCell(posX: number, posY: number): Sheet {
    let indexToChange = (posY - 1) * this.config.gameSheetWidth + posX - 1;
    this.gameSheet[indexToChange] = true
    return this.gameSheet
  }
}