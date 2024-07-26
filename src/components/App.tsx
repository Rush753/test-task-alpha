import React, {useEffect, useState} from 'react';
import '../assets/App.css';
import {GridType} from "../constants/types";
import { gridParams } from "../constants/constants";
import {createGrid, getUpdatedGrid} from "../controllers/logic";

const App: React.FC = () => {
    const [grid, setGrid] = useState<GridType>(createGrid(gridParams));
    const [isTick, setIsTick] = useState<boolean>(false);

    const toggleTick = () => {
        setIsTick(!isTick);
    };

    useEffect(() => {
        if (!isTick) {
            return;
        }

        const interval = setInterval(() => {
            setGrid(prevGrid => getUpdatedGrid(prevGrid, gridParams));
        }, 1000);

        return () => clearInterval(interval);
    }, [isTick]);

    return (
        <div className='app-container'>
            <div className='app-grid' >
                {grid.map((row, rowIndex) =>
                    row.map((col, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`grid-item ${grid[rowIndex][colIndex] ? 'alive' : ''}`}
                        />
                    ))
                )}
            </div>
            <button className='app-button' onClick={toggleTick}>
                {isTick ? 'Stop' : 'Start Ticks'}
            </button>
        </div>
    );
};

export default App;
