export function exposeCell(cell) {
    cell.isExposed = true;
}

export function toggleFlagCell(cell) {
    cell.isFlagged = !cell.isFlagged;
}
