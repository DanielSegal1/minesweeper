import {initializeCells} from '../logic/boardLogic.js';

export class Board {
    constructor(size = 8, minesQuantity = null) {
        this.size = size;
        this.minesQuantity = minesQuantity ?? this.size;
        this.minesQuantity = Math.min(this.minesQuantity, this.size ** 2);
        this.cells = initializeCells(this);
    }
}
