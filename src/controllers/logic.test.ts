import { createGrid, countLiveNeighbors, getUpdatedGrid } from './logic';
import {gridParams} from "../constants/constants";
import {gridParamsType} from "../constants/types";

describe('logic.js',() => {
test('createGrid should create a grid with specified dimensions', () => {
    const grid = createGrid(gridParams);

    expect(grid.length).toBe(gridParams.numRows);
    expect(grid[0].length).toBe(gridParams.numCols);
});

test('countLiveNeighbors should correctly count live neighbors for x=1 y=1', () => {
    const grid = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
    ];
    const x = 1;
    const y = 1;
    const gridParams: gridParamsType = {
        numRows: 3,
        numCols: 3
    }

    const liveNeighbors = countLiveNeighbors(grid, x, y, gridParams);

    expect(liveNeighbors).toBe(1);
});

test('countLiveNeighbors should correctly count live neighbors for x=0 y=0', () => {
    const grid = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
    ];
    const x = 0;
    const y = 0;
    const gridParams: gridParamsType = {
        numRows: 3,
        numCols: 3
    }

    const liveNeighbors = countLiveNeighbors(grid, x, y, gridParams);

    expect(liveNeighbors).toBe(2);
});

test('getUpdatedGrid should update cells based on live neighbors', () => {
    const grid = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    const gridParams: gridParamsType = {
        numRows: 5,
        numCols: 5
    }

    const newGrid = getUpdatedGrid(grid, gridParams);

    expect(newGrid[1][3]).toBe(0); // Center cell should die due to 2 live neighbors
    expect(newGrid[2][1]).toBe(1); // Top right cell should become alive due to 3 live neighbors
});
})
