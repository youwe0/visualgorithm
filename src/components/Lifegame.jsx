import { motion } from "framer-motion";
import { useState, useCallback, useRef } from "react";

const numRows = 30;
const numCols = 40;

const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1],
  [1, 0], [-1, 0], [1, 1], [-1, -1]
];

const generateEmptyGrid = () => {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => 0)
  );
};

const generateRandomGrid = () => {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
};

export default function Lifegame() {
  const [grid, setGrid] = useState(generateEmptyGrid);
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(100);
  const runningRef = useRef(running);
  const speedRef = useRef(speed);
  runningRef.current = running;
  speedRef.current = speed;

  const countAlive = () => {
    return grid.flat().filter(cell => cell === 1).length;
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => {
      return g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
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

    setGeneration(gen => gen + 1);
    setTimeout(runSimulation, speedRef.current);
  }, []);

  const handleStartStop = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const handleClear = () => {
    setGrid(generateEmptyGrid());
    setGeneration(0);
    setRunning(false);
  };

  const handleRandom = () => {
    setGrid(generateRandomGrid());
    setGeneration(0);
  };

  const toggleCell = (i, j) => {
    if (running) return;
    const newGrid = grid.map((row, rowIdx) =>
      row.map((cell, colIdx) =>
        rowIdx === i && colIdx === j ? (cell ? 0 : 1) : cell
      )
    );
    setGrid(newGrid);
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Conway's Game of Life
          </h1>
          <p className="text-zinc-500">
            A cellular automaton simulation - watch patterns emerge and evolve
          </p>
        </motion.div>

        {/* Controls Panel */}
        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* Action Buttons */}
            <button
              className={`btn ${running ? 'btn-danger' : 'btn-success'}`}
              onClick={handleStartStop}
            >
              {running ? (
                <>
                  <i className="ri-pause-fill" />
                  Pause
                </>
              ) : (
                <>
                  <i className="ri-play-fill" />
                  Start
                </>
              )}
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleClear}
              disabled={running}
            >
              <i className="ri-delete-bin-line" />
              Clear
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleRandom}
              disabled={running}
            >
              <i className="ri-shuffle-line" />
              Random
            </button>

            <div className="h-6 w-px bg-zinc-700 hidden sm:block" />

            {/* Speed Control */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-zinc-400">Speed:</label>
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={500 - speed}
                onChange={(e) => setSpeed(500 - Number(e.target.value))}
                className="slider w-24"
              />
              <span className="text-sm text-zinc-500 w-12">{Math.round((500 - speed) / 5)}%</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Info Panel */}
          <motion.div
            className="lg:col-span-1 space-y-4 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* About */}
            <div className="glass rounded-xl p-5">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                <i className="ri-bubble-chart-line text-xl text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">About</h3>
              <p className="text-sm text-zinc-500">
                A zero-player game that evolves based on its initial state.
                Each cell lives or dies based on its neighbors.
              </p>
            </div>

            {/* Stats */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Generation</span>
                  <span className="text-cyan-400 font-mono text-lg">{generation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Alive Cells</span>
                  <span className="text-green-400 font-mono text-lg">{countAlive()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Dead Cells</span>
                  <span className="text-zinc-400 font-mono text-lg">{numRows * numCols - countAlive()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Grid Size</span>
                  <span className="text-white font-mono text-lg">{numRows}x{numCols}</span>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Rules</h4>
              <ul className="text-sm text-zinc-500 space-y-3">
                <li className="flex items-start gap-2">
                  <i className="ri-skull-line text-red-400 mt-0.5" />
                  <span>Any live cell with &lt;2 neighbors dies (underpopulation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-heart-line text-green-400 mt-0.5" />
                  <span>Any live cell with 2-3 neighbors survives</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-skull-line text-red-400 mt-0.5" />
                  <span>Any live cell with &gt;3 neighbors dies (overpopulation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-seedling-line text-cyan-400 mt-0.5" />
                  <span>Any dead cell with exactly 3 neighbors becomes alive</span>
                </li>
              </ul>
            </div>

            {/* Complexity */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Complexity</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Time (per gen)</span>
                  <span className="text-white font-mono">O(m×n)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Space</span>
                  <span className="text-white font-mono">O(m×n)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="lg:col-span-3 order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass rounded-2xl p-4 sm:p-6 overflow-x-auto">
              {!running && (
                <p className="text-sm text-zinc-500 mb-4">
                  Click on cells to toggle them, then press Start
                </p>
              )}

              {/* Grid Container */}
              <div
                className="mx-auto w-fit"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                  gap: "1px"
                }}
              >
                {grid.map((rows, i) =>
                  rows.map((col, j) => (
                    <div
                      key={`${i}-${j}`}
                      onClick={() => toggleCell(i, j)}
                      className={`
                        w-4 h-4 sm:w-5 sm:h-5 rounded-sm cursor-pointer transition-all duration-150
                        ${grid[i][j]
                          ? "life-cell-alive"
                          : "life-cell-dead hover:bg-zinc-700"
                        }
                      `}
                    />
                  ))
                )}
              </div>

              {/* Status */}
              {running && (
                <div className="mt-4 flex items-center justify-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Simulation running... Generation {generation}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
