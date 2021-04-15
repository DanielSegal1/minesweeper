import {createElement, getElement} from './viewUtils.js'

export class BoardView {
    constructor() {
        this.app = getElement('#root');
        const boardTableContainer = createElement('div', ['board-container']);
        this.boardTable = createElement('table', ['board']);
        boardTableContainer.append(this.boardTable);
        this.app.append(boardTableContainer);

        this.initLocalListeners();
    }

    displayBoard(board) {
        while (this.boardTable.firstChild) {
            this.boardTable.removeChild(this.boardTable.firstChild);
        }

        board.cells.forEach((cellsRow, i) => {
            const tableRow = createElement('tr', ['board-row']);
            tableRow.id = i;
            cellsRow.forEach((cellObj, j) => {
                const classNames = ['board-cell'];
                if (!cellObj.isExposed) {
                    classNames.push('hidden');
                }
                const cellHtml = createElement('td', classNames);
                cellHtml.setAttribute('data-row', i);
                cellHtml.setAttribute('data-col', j);
                cellHtml.innerHTML = this.getCellValue(cellObj);
                tableRow.append(cellHtml);
            });
            this.boardTable.append(tableRow);
        });

    }

    getCellValue(cell) {
        if (cell.isExposed) {
            return cell.isMine ? '💣' : cell.nearbyMines;
        } else {
            return cell.isFlagged ? '🏴' : '';
        }
    }

    initLocalListeners() {
    }

    bindExposeCell(handler) {
        this.boardTable.addEventListener('click', event => {
            let {row, col} = event.target.dataset;
            row = Number(row);
            col = Number(col)
            if (!isNaN(row) && !isNaN(col)) {
                handler(row, col);
            }
        });
    }

    bindFlagCell(handler) {
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
