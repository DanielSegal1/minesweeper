import {LEVELS} from '../config/boardConfig.js';
import {Cell} from "../models/cell.js";
import {Board} from '../models/board.js';
import {exposeCell, toggleFlagCell} from './cellLogic.js';

export function startNewGame(level = 'Easy') {
    return new Board(LEVELS[level].size, LEVELS[level].minesQuantity);
}

export function initializeCells({size, minesQuantity}) {
    let cells = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(new Cell());
        }
        cells.push(row);
    }

    let currentMinesQuantity = 0;
    while (currentMinesQuantity < minesQuantity) {
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);
        if (!cells[row][col].isMine) {
            cells[row][col].isMine = true;
            increaseNearbyCellsValue(cells, size, row, col);
            currentMinesQuantity++;
        }
    }

    return cells;

    function increaseNearbyCellsValue(cells, size, row, col) {
        for (let [nearbyCellRow, nearbyCellColumn] of getNearbyCellsPositions(cells, row, col)) {
            cells[nearbyCellRow][nearbyCellColumn].nearbyMines++;
        }
    }
}

export function exposeCellByPosition(board, row, col) {
    if (board.isWin === null) {
        exposeCellByPositionRec(board, row, col);
        checkForWin(board);
        board.onBoardChanged(board);
    }

    function exposeCellByPositionRec(board, row, col) {
        let cell = board.cells[row][col];

        if (!cell.isExposed && !cell.isFlagged) {
            exposeCell(cell);
            let cellValue = cell.nearbyMines;
            if (cellValue === 0 && !cell.isMine) {
                getNearbyCellsPositions(board.cells, row, col).forEach(([cellRow, cellCol]) => {
                    let neighborCell = board.cells[cellRow][cellCol];
                    if (!neighborCell.isExposed && neighborCell.nearbyMines === 0) {
                        exposeCellByPositionRec(board, cellRow, cellCol);
                    }
                })
            }
        }
    }
}

export function toggleFlagCellByPosition(board, row, col) {
    if (board.isWin === null) {
        let cell = board.cells[row][col];
        if (!cell.isExposed) {
            toggleFlagCell(cell);
        }

        checkForWin(board);
        board.onBoardChanged(board);
    }
}

function getNearbyCellsPositions(cells, row, col) {
    let nearbyCells = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (cells?.[row + i]?.[col + j]) {
                nearbyCells.push([row + i, col + j]);
            }
        }
    }

    return nearbyCells;
}

export function checkForWin(board) {
    let isWin = true;
    for (let row of board.cells) {
        for (let cell of row) {
            if (cell.isExposed) {
                if (cell.isMine) {
                    board.isWin = false;
                    return false;
                }
            } else if (cell.isFlagged) {
                if (!cell.isMine) {
                    isWin = false;
                }
            } else {
                isWin = false;
            }
        }
    }

    board.isWin = isWin ? true : null;
    return board.isWin;
}
