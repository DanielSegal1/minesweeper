import {Cell} from "../models/cell.js";
import {exposeCell, flagCell} from './cellLogic.js';

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
    let cell = board.cells[row][col];

    if (!cell.isExposed && !cell.isFlagged) {
        exposeCell(cell);
        let cellValue = cell.nearbyMines;
        if (cellValue === 0) {
            getNearbyCellsPositions(board.cells, row, col).forEach(([cellRow, cellCol]) => {
                let neighborCell = board.cells[cellRow][cellCol];
                if (!neighborCell.isExposed && neighborCell.nearbyMines === 0) {
                    exposeCellByPosition(board, cellRow, cellCol);
                }
            })
        }
    }
}

export function flagCellByPosition(board, row, col) {
    let cell = board.cells[row][col];
    if (!cell.isExposed) {
        flagCell(cell);
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
