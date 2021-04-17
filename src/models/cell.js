export class Cell {
    constructor() {
        this.isMine = false;
        this.nearbyMines = 0;
        this.isFlagged = false;
        this.isExposed = false;
    }

    incrementNearbyMines() {
        this.nearbyMines++;
    }

    exposeCell() {
        this.isExposed = true;
    }
}