import {GridType, gridParamsType} from "../constants/types";

export const createGrid = (gridParams: gridParamsType): GridType => {
    const grid: GridType = [];
    for (let row = 0; row < gridParams.numRows; row++) {
        const newRow: number[] = [];
        for (let col = 0; col < gridParams.numCols; col++) {
            newRow.push(Math.random() > 0.8 ? 1 : 0); // 20% chance of being alive (1)
        }
        grid.push(newRow);
    }
    return grid;
};

export const countLiveNeighbors = (grid: GridType, x: number, y: number, gridParams: gridParamsType ): number => {
    const neighborsCoordinates = [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];

    return neighborsCoordinates.reduce((count, [dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < gridParams.numRows && newY >= 0 && newY < gridParams.numCols) {
            count += grid[newX][newY];
        }
        return count;
    }, 0);
};

export const getUpdatedGrid = (grid: GridType, gridParams: gridParamsType): GridType => {
    const newGrid = grid.map(arr => [...arr]); // Deep copy of the grid

    for (let row = 0; row < gridParams.numRows; row++) {
        for (let col = 0; col < gridParams.numCols; col++) {
            const liveNeighbors = countLiveNeighbors(grid, row, col,gridParams);

            if (grid[row][col] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
                newGrid[row][col] = 0; // Die
            } else if (grid[row][col] === 0 && liveNeighbors === 3) {
                newGrid[row][col] = 1; // Become alive
            }
        }
    }

    return newGrid;
};
