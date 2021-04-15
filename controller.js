import {exposeCellByPosition, flagCellByPosition} from './logic/boardLogic.js';

export class Controller {
    constructor(boardModel, boardView) {
        this.boardModel = boardModel;
        this.boardView = boardView;

        this.boardView.bindExposeCell(this.handleExposeCell);
        this.boardView.bindFlagCell(this.handleFlagCell);

        this.onBoardChanged(this.boardModel);
    }

    onBoardChanged = board => {
        this.boardView.displayBoard(board);
    }

    handleExposeCell = (row, col) => {
        exposeCellByPosition(this.boardModel, row, col);
        this.onBoardChanged(this.boardModel);
    }

    handleFlagCell = (row, col) => {
        flagCellByPosition(this.boardModel, row, col);
        this.onBoardChanged(this.boardModel);
    }
}
