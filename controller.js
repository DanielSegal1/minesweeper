import {startNewGame,
        exposeCellByPosition,
        toggleFlagCellByPosition}
        from './logic/boardLogic.js';

export class Controller {
    constructor(boardModel, boardView) {
        this.boardModel = boardModel;
        this.boardView = boardView;

        this.boardModel.bindBoardChanged(this.onBoardChanged);
        this.boardView.bindStartNewGame(this.handleStartNewGame);
        this.boardView.bindExposeCell(this.handleExposeCell);
        this.boardView.bindToggleFlagCell(this.handleToggleFlagCell);

        this.onBoardChanged(this.boardModel);
    }

    onBoardChanged = board => {
        this.boardView.displayBoard(board);
    }

    handleStartNewGame = (level) => {
        this.boardModel = startNewGame(level);
        this.boardModel.bindBoardChanged(this.onBoardChanged);
        this.onBoardChanged(this.boardModel);
    }
    handleExposeCell = (row, col) => {
        exposeCellByPosition(this.boardModel, row, col);
    }

    handleToggleFlagCell = (row, col) => {
        toggleFlagCellByPosition(this.boardModel, row, col);
    }
}
