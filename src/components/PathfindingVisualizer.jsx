import { dfs } from "../Algorithms/Pathfinding/Dfs";
import { bfs } from "../Algorithms/Pathfinding/Bfs";
import { astar } from "../Algorithms/Pathfinding/Astar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GRID_CONFIG = {
  mobile: { rows: 15, cols: 20 },
  desktop: { rows: 20, cols: 40 }
};

const createNode = (row, col, start, end) => ({
  row,
  col,
  isStart: row === start.row && col === start.col,
  isEnd: row === end.row && col === end.col,
  isWall: false,
  isVisited: false,
  isPath: false,
  previousNode: null,
  g: Infinity,
  f: Infinity,
});

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState({ row: 5, col: 5 });
  const [end, setEnd] = useState({ row: 10, col: 15 });
  const [mouseDown, setMouseDown] = useState(false);
  const [selectMode, setSelectMode] = useState(null); // 'start', 'end', or null
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState("astar");
  const [isMobile, setIsMobile] = useState(false);
  const [visitedCount, setVisitedCount] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  const dimensions = isMobile ? GRID_CONFIG.mobile : GRID_CONFIG.desktop;

  const algorithmInfo = {
    astar: {
      name: "A* Search",
      time: "O(E + V log V)",
      space: "O(V)",
      description: "Uses heuristics to find the optimal path efficiently",
      color: "#8B5CF6"
    },
    bfs: {
      name: "Breadth-First Search",
      time: "O(V + E)",
      space: "O(V)",
      description: "Explores all neighbors before moving deeper - guarantees shortest path",
      color: "#00E5FF"
    },
    dfs: {
      name: "Depth-First Search",
      time: "O(V + E)",
      space: "O(V)",
      description: "Explores as far as possible before backtracking",
      color: "#22C55E"
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    generateGrid();
  }, [dimensions, start, end]);

  const generateGrid = () => {
    const newGrid = [];
    for (let row = 0; row < dimensions.rows; row++) {
      const currentRow = [];
      for (let col = 0; col < dimensions.cols; col++) {
        currentRow.push(createNode(row, col, start, end));
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setVisitedCount(0);
    setPathLength(0);
  };

  const getNeighbors = (node, grid) => {
    const { row, col } = node;
    const neighbors = [];
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < dimensions.rows - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < dimensions.cols - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
  };

  const heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

  const animate = async (visited, path) => {
    setVisitedCount(visited.length);

    // Animate visited nodes
    for (let i = 0; i < visited.length; i++) {
      const node = visited[i];
      await new Promise((r) => setTimeout(r, 15));
      setGrid(prev => {
        const newGrid = prev.map(row => row.map(n => ({ ...n })));
        if (!newGrid[node.row][node.col].isStart && !newGrid[node.row][node.col].isEnd) {
          newGrid[node.row][node.col].isVisited = true;
        }
        return newGrid;
      });
    }

    // Animate path
    setPathLength(path.length);
    for (let i = 0; i < path.length; i++) {
      const node = path[i];
      await new Promise((r) => setTimeout(r, 40));
      setGrid(prev => {
        const newGrid = prev.map(row => row.map(n => ({ ...n })));
        if (!newGrid[node.row][node.col].isStart && !newGrid[node.row][node.col].isEnd) {
          newGrid[node.row][node.col].isPath = true;
        }
        return newGrid;
      });
    }
  };

  const handleMouseDown = (row, col) => {
    if (isRunning) return;

    if (selectMode === 'start') {
      const node = grid[row][col];
      if (!node.isEnd && !node.isWall) {
        setStart({ row, col });
        setSelectMode(null);
      }
    } else if (selectMode === 'end') {
      const node = grid[row][col];
      if (!node.isStart && !node.isWall) {
        setEnd({ row, col });
        setSelectMode(null);
      }
    } else {
      toggleWall(row, col);
      setMouseDown(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseDown || isRunning || selectMode) return;
    toggleWall(row, col);
  };

  const handleMouseUp = () => setMouseDown(false);

  const toggleWall = (row, col) => {
    setGrid(prev => {
      const newGrid = prev.map(r => r.map(n => ({ ...n })));
      const node = newGrid[row][col];
      if (!node.isStart && !node.isEnd) {
        node.isWall = !node.isWall;
      }
      return newGrid;
    });
  };

  const visualize = async () => {
    if (isRunning) return;
    setIsRunning(true);

    // Reset grid visualization
    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isVisited: false,
        isPath: false,
        previousNode: null,
        g: Infinity,
        f: Infinity,
      }))
    );
    setGrid(newGrid);
    setVisitedCount(0);
    setPathLength(0);

    const startNode = newGrid[start.row][start.col];
    const endNode = newGrid[end.row][end.col];
    let result;

    if (algorithm === "astar") {
      result = astar(newGrid, startNode, endNode, getNeighbors, heuristic);
    } else if (algorithm === "dfs") {
      result = dfs(newGrid, startNode, endNode, getNeighbors);
    } else if (algorithm === "bfs") {
      result = bfs(newGrid, startNode, endNode, getNeighbors);
    }

    await animate(result.visited, result.path);
    setIsRunning(false);
  };

  const generateMaze = () => {
    if (isRunning) return;
    const newGrid = grid.map((row) =>
      row.map((node) => {
        if (!node.isStart && !node.isEnd) {
          return { ...node, isWall: Math.random() < 0.3, isVisited: false, isPath: false };
        }
        return { ...node, isVisited: false, isPath: false };
      })
    );
    setGrid(newGrid);
    setVisitedCount(0);
    setPathLength(0);
  };

  const clearGrid = () => {
    if (isRunning) return;
    generateGrid();
  };

  const clearPath = () => {
    if (isRunning) return;
    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isVisited: false,
        isPath: false,
      }))
    );
    setGrid(newGrid);
    setVisitedCount(0);
    setPathLength(0);
  };

  const getNodeClass = (node) => {
    if (node.isStart) return "node-start";
    if (node.isEnd) return "node-end";
    if (node.isPath) return "node-path";
    if (node.isWall) return "node-wall";
    if (node.isVisited) return "node-visited";
    return "node-default";
  };

  const currentAlgo = algorithmInfo[algorithm];
  const cellSize = isMobile ? 16 : 20;

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Pathfinding Visualizer
          </h1>
          <p className="text-zinc-500">
            Draw walls and watch algorithms find the shortest path
          </p>
        </motion.div>

        {/* Controls Panel */}
        <motion.div
          className="glass rounded-2xl p-4 sm:p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Algorithm Selector */}
            <select
              className="select"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isRunning}
            >
              <option value="astar">A* Search</option>
              <option value="bfs">BFS</option>
              <option value="dfs">DFS</option>
            </select>

            {/* Action Buttons */}
            <button
              className="btn btn-primary"
              onClick={visualize}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running
                </>
              ) : (
                <>
                  <i className="ri-play-fill" />
                  Visualize
                </>
              )}
            </button>

            <div className="h-6 w-px bg-zinc-700 hidden sm:block" />

            {/* Node Selection */}
            <button
              className={`btn ${selectMode === 'start' ? 'btn-success' : 'btn-secondary'}`}
              onClick={() => setSelectMode(selectMode === 'start' ? null : 'start')}
              disabled={isRunning}
            >
              <i className="ri-map-pin-line" />
              <span className="hidden sm:inline">Set Start</span>
            </button>

            <button
              className={`btn ${selectMode === 'end' ? 'btn-danger' : 'btn-secondary'}`}
              onClick={() => setSelectMode(selectMode === 'end' ? null : 'end')}
              disabled={isRunning}
            >
              <i className="ri-flag-line" />
              <span className="hidden sm:inline">Set End</span>
            </button>

            <div className="h-6 w-px bg-zinc-700 hidden sm:block" />

            {/* Grid Actions */}
            <button
              className="btn btn-secondary"
              onClick={generateMaze}
              disabled={isRunning}
            >
              <i className="ri-layout-grid-line" />
              <span className="hidden sm:inline">Random Maze</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={clearPath}
              disabled={isRunning}
            >
              <i className="ri-eraser-line" />
              <span className="hidden sm:inline">Clear Path</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={clearGrid}
              disabled={isRunning}
            >
              <i className="ri-delete-bin-line" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Algorithm Info */}
          <motion.div
            className="lg:col-span-1 space-y-4 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Current Algorithm */}
            <div className="glass rounded-xl p-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${currentAlgo.color}20` }}
              >
                <i className="ri-route-line text-xl" style={{ color: currentAlgo.color }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{currentAlgo.name}</h3>
              <p className="text-sm text-zinc-500 mb-4">{currentAlgo.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Time</span>
                  <span className="text-white font-mono">{currentAlgo.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Space</span>
                  <span className="text-white font-mono">{currentAlgo.space}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Nodes Visited</span>
                  <span className="text-cyan-400 font-mono text-lg">{visitedCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Path Length</span>
                  <span className="text-green-400 font-mono text-lg">{pathLength}</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Legend</h4>
              <div className="space-y-2">
                {[
                  { class: "bg-green-500", label: "Start Node", glow: true },
                  { class: "bg-pink-500", label: "End Node", glow: true },
                  { class: "bg-gradient-to-r from-cyan-500 to-purple-500", label: "Visited" },
                  { class: "bg-green-500", label: "Shortest Path", glow: true },
                  { class: "bg-zinc-900 border border-red-500/30", label: "Wall" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded ${item.class}`}
                      style={item.glow ? { boxShadow: `0 0 8px currentColor` } : {}}
                    />
                    <span className="text-sm text-zinc-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-3">How to Use</h4>
              <ul className="text-sm text-zinc-500 space-y-2">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-cyan-400 mt-0.5" />
                  Click and drag to draw walls
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-cyan-400 mt-0.5" />
                  Use buttons to set start/end points
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-cyan-400 mt-0.5" />
                  Press Visualize to find the path
                </li>
              </ul>
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
              {/* Selection Mode Indicator */}
              {selectMode && (
                <div className={`mb-4 px-4 py-2 rounded-lg inline-flex items-center gap-2 ${
                  selectMode === 'start' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                }`}>
                  <i className={selectMode === 'start' ? 'ri-map-pin-line' : 'ri-flag-line'} />
                  Click on grid to set {selectMode} point
                </div>
              )}

              {/* Grid Container */}
              <div
                className="mx-auto w-fit flex flex-col gap-px"
                style={{ cursor: selectMode ? 'crosshair' : 'pointer' }}
                onMouseLeave={handleMouseUp}
              >
                {grid.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex gap-px">
                    {row.map((node) => (
                      <div
                        key={`${node.row}-${node.col}`}
                        className={`${getNodeClass(node)} transition-all duration-200`}
                        style={{
                          width: `${cellSize}px`,
                          height: `${cellSize}px`,
                          borderRadius: '3px'
                        }}
                        onMouseDown={() => handleMouseDown(node.row, node.col)}
                        onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                        onMouseUp={handleMouseUp}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Running Indicator */}
              {isRunning && (
                <div className="mt-4 flex items-center justify-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  Finding path...
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
