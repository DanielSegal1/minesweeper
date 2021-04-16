import {createElement, getElement} from './viewUtils.js';
import {LEVELS} from '../config/boardConfig.js';

export class BoardView {
    constructor() {
        this.app = getElement('#root');
        this.boardTableContainer = createElement('div', ['board-container']);
        this.boardTable = createElement('div', ['board']);
        this.boardTableContainer.append(this.boardTable);
        this.boardFinishMessage = createElement('span', ['board-finish']);
        this.newGameForm = createElement('form', ['new-game-form']);
        this.initNewGameForm();
        this.app.append(this.boardFinishMessage, this.newGameForm, this.boardTableContainer);

        this.initLocalListeners();
    }

    displayBoard(board) {
        while (this.boardTable.firstChild) {
            this.boardTable.removeChild(this.boardTable.firstChild);
        }

        this.displayBoardState(board);

        const boardTableStyle = getComputedStyle(this.boardTable);
        const boardTableWidth = boardTableStyle.width;
        board.cells.forEach((cellsRow, i) => {
            const tableRow = createElement('div', ['board-row']);
            tableRow.id = i;
            cellsRow.forEach((cellObj, j) => {
                const classNames = ['board-cell'];
                if (!cellObj.isExposed) {
                    classNames.push('hidden');
                }
                const cellHtml = createElement('div', classNames);
                cellHtml.setAttribute('data-row', i);
                cellHtml.setAttribute('data-col', j);
                cellHtml.style.width = parseInt(boardTableStyle.width) / board.size + "px";
                cellHtml.style.height = parseInt(boardTableStyle.height) / board.size + "px";
                cellHtml.textContent = this.getCellValue(cellObj);
                tableRow.append(cellHtml);
            });
            this.boardTable.append(tableRow);
        });
        console.log(parseInt(getComputedStyle(this.boardTable).width));
    }

    displayBoardState(board) {
        this.boardFinishMessage.innerHTML = null;
        if (board.isWin !== null) {
            console.log('finish');
            this.boardFinishMessage.innerHTML = board.isWin ?
                                    "Congratulations! You Won 🎉" :
                                    "You Detonated a Mine 💣";
        }
    }

    getCellValue(cell) {
        if (cell.isExposed) {
            return cell.isMine ? '💣' : cell.nearbyMines;
        } else {
            return cell.isFlagged ? '🏴' : ' ';
        }
    }

    initLocalListeners() {
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
        this.boardTable.addEventListener('click', event => {
            let {row, col} = event.target.dataset;
            row = Number(row);
            col = Number(col);
            if (!isNaN(row) && !isNaN(col)) {
                handler(row, col);
            }
        });
    }

    bindToggleFlagCell(handler) {
        this.boardTable.addEventListener('contextmenu', event => {
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
