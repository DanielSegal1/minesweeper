import {LEVELS} from '../config/boardConfig.js';
import {createElement, getElement} from './viewUtils.js';


export class BoardView {
    constructor() {
        this.app = getElement('#root');
        this.boardContainer = createElement('div', ['board-container']);
        this.board = createElement('div', ['board']);
        this.boardContainer.append(this.board);
        this.boardFinishMessage = createElement('span', ['board-finish']);
        this.newGameForm = createElement('form', ['new-game-form']);
        this.initNewGameForm();
        this.app.append(this.boardFinishMessage, this.newGameForm, this.boardContainer);
    }

    displayBoard(boardModel) {
        while (this.board.firstChild) {
            this.board.removeChild(this.board.firstChild);
        }

        this.displayBoardState(boardModel);

        const boardStyle = getComputedStyle(this.board);
        let boardRows = [];
        boardModel.cells.forEach((cellsRow, i) => {
            const boardRow = createElement('div', ['board-row']);
            cellsRow.forEach((cellObj, j) => {
                const classNames = ['board-cell'];
                if (!cellObj.isExposed) {
                    classNames.push('hidden');
                }
                const cellHtml = createElement('div', classNames);
                cellHtml.setAttribute('data-row', i);
                cellHtml.setAttribute('data-col', j);
                cellHtml.style.width = parseInt(boardStyle.width) / boardModel.size + "px";
                cellHtml.style.height = parseInt(boardStyle.height) / boardModel.size + "px";
                cellHtml.textContent = this.getCellValue(cellObj);
                boardRow.append(cellHtml);
            });
            boardRows.push(boardRow)
        });
        this.board.append(...boardRows);

    }

    displayBoardState(board) {
        this.boardFinishMessage.innerHTML = null;
        if (board.isWin !== null) {
            this.boardFinishMessage.innerHTML = board.isWin ?
                                    "Congratulations! You Won 🎉" :
                                    "You Detonated a Mine 💣";
        }
    }

    getCellValue(cell) {
        if (cell.isExposed) {
            return cell.isMine ? '💣' : cell.nearbyMines ? cell.nearbyMines : '';
        } else {
            return cell.isFlagged ? '🏴' : '';
        }
    }

    initNewGameForm() {
        this.newGameLevel = createElement('select', ['new-game-level']);
        for (const level in LEVELS) {
            const option = createElement('option', ['new-game-level-option']);
            option.value = level;
            option.innerHTML = level;
            this.newGameLevel.append(option);
        }

        this.newGameStart = createElement('input', ['new-game-start']);
        this.newGameStart.type = 'submit';
        this.newGameStart.value = 'Start';
        this.newGameForm.append(this.newGameLevel, this.newGameStart);
    }

    bindStartNewGame(handler) {
        this.newGameForm.addEventListener('submit', event => {
            event.preventDefault();
            handler(this.newGameLevel.value);
        })
    }

    bindExposeCell(handler) {
        this.board.addEventListener('click', event => {
            let {row, col} = event.target.dataset;
            row = Number(row);
            col = Number(col);
            if (!isNaN(row) && !isNaN(col)) {
                handler(row, col);
            }
        });
    }

    bindToggleFlagCell(handler) {
        this.board.addEventListener('contextmenu', event => {
            event.preventDefault();
            let {row, col} = event.target.dataset;
            row = Number(row);
            col = Number(col)
            if (!isNaN(row) && !isNaN(col)) {
                handler(row, col);
            }
        })
    }
}
