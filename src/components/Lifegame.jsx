import { useState, useCallback, useRef, useEffect } from "react";

const numRows = 25;
const numCols = 25;

const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1],
  [1, 0], [-1, 0], [1, 1], [-1, -1]
];

const generateEmptyGrid = () => {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => 0)
  );
};

export default function Lifegame() {
  const [grid, setGrid] = useState(generateEmptyGrid);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;
    setGrid((g) => {
      return g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (
              newI >= 0 && newI < numRows &&
              newJ >= 0 && newJ < numCols
            ) {
              neighbors += g[newI][newJ];
            }
          });

          if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
            return 0;
          } else if (cell === 0 && neighbors === 3) {
            return 1;
          } else {
            return cell;
          }
        })
      );
    });
    setTimeout(runSimulation, 200);
  }, []);

  return (
    <div className="p-4 flex flex-col items-center gap-4 ">
      <div className="bg-red-300 p-2 realtive left-[-100px] rounded-2xl">
        <h1 className="text-2xl font-bold">Conway's Game of Life</h1>
        <p>Time Complexity:  O(mn)* </p>
        <p>Space Complexity: O(1) </p>
      </div>


      <div className="grid relative" style={{ display: "grid", gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = grid.map((row, rowIdx) =>
                  row.map((cell, colIdx) =>
                    rowIdx === i && colIdx === j ? (cell ? 0 : 1) : cell
                  )
                );
                setGrid(newGrid);
              }}
              className={`w-5 h-5 border rounded-full border-red-300 ${grid[i][j] ? "bg-black" : "bg-white"
                }`}
            />
          ))
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Clear
        </button>
        <button
          onClick={() => {
            const rows = Array.from({ length: numRows }, () =>
              Array.from({ length: numCols }, () =>
                Math.random() > 0.7 ? 1 : 0
              )
            );
            setGrid(rows);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Random
        </button>
      </div>
    </div>
  );
}
