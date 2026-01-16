import { motion } from "framer-motion";
import { mergeSort } from "../Algorithms/Sorting/MergeSort";
import { bubbleSort } from "../Algorithms/Sorting/BubbleSort";
import { selectionSort } from "../Algorithms/Sorting/SelectionSort";
import { generateArray } from "../Utils/GenerateArray";
import { useState, useEffect } from "react";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [isRunning, setIsRunning] = useState(false);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const algorithmInfo = {
    bubbleSort: {
      name: "Bubble Sort",
      time: "O(n²)",
      space: "O(1)",
      description: "Repeatedly swaps adjacent elements if they're in wrong order",
      color: "#00E5FF"
    },
    selectionSort: {
      name: "Selection Sort",
      time: "O(n²)",
      space: "O(1)",
      description: "Finds minimum element and places it at the beginning",
      color: "#8B5CF6"
    },
    mergeSort: {
      name: "Merge Sort",
      time: "O(n log n)",
      space: "O(n)",
      description: "Divides array in half, sorts, then merges back together",
      color: "#22C55E"
    }
  };

  useEffect(() => {
    setArray(generateArray(size));
    setComparisons(0);
    setSwaps(0);
  }, [size, algorithm]);

  const handleGenerateArray = () => {
    if (!isRunning) {
      setArray(generateArray(size));
      setComparisons(0);
      setSwaps(0);
    }
  };

  const handleStart = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setComparisons(0);
    setSwaps(0);
    let animations = [];
    let compCount = 0;
    let swapCount = 0;

    if (algorithm === "bubbleSort") {
      animations = bubbleSort(array);
    } else if (algorithm === "selectionSort") {
      animations = selectionSort(array);
    } else if (algorithm === "mergeSort") {
      animations = mergeSort(array);
    }

    for (let i = 0; i < animations.length; i++) {
      const [type, indices, newVal] = animations[i];
      const newArray = [...array];

      if (type === "compare") {
        compCount++;
        setComparisons(compCount);
        indices.forEach(idx => newArray[idx].color = "compare");
        setArray(newArray);
        await sleep(100 - speed);
      } else if (type === "swap") {
        swapCount++;
        setSwaps(swapCount);
        const [i, j] = indices;
        setSwappingIndices([i, j]);
        setArray(prev =>
          prev.map((bar, idx) => ({
            ...bar,
            color: indices.includes(idx) ? "swap" : bar.color,
          }))
        );
        await sleep(150 - speed);

        const temp = newArray[i].value;
        newArray[i].value = newArray[j].value;
        newArray[j].value = temp;
        setArray(newArray);
        await sleep(150 - speed);
        setSwappingIndices([]);
      } else if (type === "overwrite") {
        const [idx] = indices;
        newArray[idx].value = newVal;
        newArray[idx].color = "swap";
        setArray(newArray);
        await sleep(80 - speed * 0.7);
      } else if (type === "sorted") {
        indices.forEach(idx => newArray[idx].color = "sorted");
        setArray(newArray);
        await sleep(30);
      }

      setArray(prev =>
        prev.map(bar => ({
          ...bar,
          color: bar.color === "sorted" ? "sorted" : "default",
        }))
      );
    }

    setIsRunning(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, Math.max(ms, 5)));

  const getBarStyle = (item, index) => {
    const isSwapping = swappingIndices.includes(index);
    let background = "";
    let boxShadow = "";
    let transform = "";

    switch (item.color) {
      case "compare":
        background = "linear-gradient(180deg, #FBBF24 0%, #F59E0B 100%)";
        boxShadow = "0 0 25px rgba(251, 191, 36, 0.7)";
        break;
      case "swap":
        background = "linear-gradient(180deg, #EF4444 0%, #DC2626 100%)";
        boxShadow = "0 0 35px rgba(239, 68, 68, 0.8)";
        transform = "scaleX(1.1)";
        break;
      case "sorted":
        background = "linear-gradient(180deg, #22C55E 0%, #059669 100%)";
        boxShadow = "0 0 15px rgba(34, 197, 94, 0.4)";
        break;
      default:
        background = "linear-gradient(180deg, #00E5FF 0%, #3B82F6 100%)";
    }

    if (isSwapping) {
      transform = "scaleX(1.15) translateY(-8px)";
      boxShadow = "0 0 40px rgba(236, 72, 153, 0.8)";
    }

    return { background, boxShadow, transform };
  };

  const currentAlgo = algorithmInfo[algorithm];

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
            Sorting Visualizer
          </h1>
          <p className="text-zinc-500">
            Watch how different sorting algorithms organize data in real-time
          </p>
        </motion.div>

        {/* Controls Panel */}
        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Algorithm Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Algorithm</label>
              <select
                className="select w-full"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                disabled={isRunning}
              >
                <option value="bubbleSort">Bubble Sort</option>
                <option value="selectionSort">Selection Sort</option>
                <option value="mergeSort">Merge Sort</option>
              </select>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">
                Speed: {speed}%
              </label>
              <input
                type="range"
                min="1"
                max="99"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isRunning}
                className="slider w-full"
              />
            </div>

            {/* Size Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">
                Array Size: {size}
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                disabled={isRunning}
                className="slider w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-end gap-3">
              <button
                className="btn btn-secondary flex-1"
                onClick={handleGenerateArray}
                disabled={isRunning}
              >
                <i className="ri-refresh-line" />
                New Array
              </button>
              <button
                className="btn btn-primary flex-1"
                onClick={handleStart}
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
            </div>
          </div>
        </motion.div>

        {/* Main Visualization Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Algorithm Info Card */}
          <motion.div
            className="lg:col-span-1 space-y-4"
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
                <i className="ri-bar-chart-grouped-line text-xl" style={{ color: currentAlgo.color }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{currentAlgo.name}</h3>
              <p className="text-sm text-zinc-500 mb-4">{currentAlgo.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Time Complexity</span>
                  <span className="text-white font-mono">{currentAlgo.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Space Complexity</span>
                  <span className="text-white font-mono">{currentAlgo.space}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Live Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Comparisons</span>
                  <span className="text-cyan-400 font-mono text-lg">{comparisons}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Swaps</span>
                  <span className="text-pink-400 font-mono text-lg">{swaps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Array Size</span>
                  <span className="text-white font-mono text-lg">{size}</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Legend</h4>
              <div className="space-y-2">
                {[
                  { color: "from-cyan-500 to-blue-500", label: "Unsorted" },
                  { color: "from-yellow-400 to-amber-500", label: "Comparing" },
                  { color: "from-red-500 to-red-600", label: "Swapping" },
                  { color: "from-green-500 to-emerald-600", label: "Sorted" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded bg-gradient-to-r ${item.color}`} />
                    <span className="text-sm text-zinc-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Visualization */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Bar Chart */}
            <div className="glass rounded-2xl p-6 h-[500px] flex items-end justify-center gap-[2px] relative overflow-hidden">
              {/* Background Glow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 blur-[100px] opacity-30"
                style={{ background: `radial-gradient(circle, ${currentAlgo.color}40, transparent)` }}
              />

              {/* Bars */}
              {array.map((item, index) => {
                const style = getBarStyle(item, index);
                const maxHeight = 400;
                const barHeight = (item.value / 200) * maxHeight;
                const barWidth = Math.max(Math.floor((100 / size) * 1.5), 8);

                return (
                  <motion.div
                    key={index}
                    className="relative rounded-t-sm"
                    style={{
                      width: `${barWidth}px`,
                      height: `${barHeight}px`,
                      background: style.background,
                      boxShadow: style.boxShadow,
                      transform: style.transform,
                    }}
                    initial={false}
                    animate={{
                      height: `${barHeight}px`,
                    }}
                    transition={{
                      duration: 0.15,
                      ease: "easeOut"
                    }}
                  />
                );
              })}

              {/* Running Indicator */}
              {isRunning && (
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-zinc-400">Sorting...</span>
                </div>
              )}
            </div>

            {/* Array Values (for smaller arrays) */}
            {size <= 25 && (
              <div className="mt-4 glass rounded-xl p-4">
                <h4 className="text-sm font-medium text-zinc-400 mb-3">Array Values</h4>
                <div className="flex flex-wrap gap-2">
                  {array.map((item, index) => {
                    const isSwapping = swappingIndices.includes(index);
                    let bgColor = "bg-zinc-800";
                    let textColor = "text-zinc-300";
                    let borderColor = "border-zinc-700";

                    if (item.color === "sorted") {
                      bgColor = "bg-green-500/20";
                      textColor = "text-green-400";
                      borderColor = "border-green-500/30";
                    } else if (item.color === "compare") {
                      bgColor = "bg-yellow-500/20";
                      textColor = "text-yellow-400";
                      borderColor = "border-yellow-500/30";
                    } else if (item.color === "swap" || isSwapping) {
                      bgColor = "bg-red-500/20";
                      textColor = "text-red-400";
                      borderColor = "border-red-500/30";
                    }

                    return (
                      <motion.div
                        key={index}
                        className={`w-10 h-10 rounded-lg border flex items-center justify-center text-sm font-mono ${bgColor} ${textColor} ${borderColor}`}
                        animate={{
                          scale: isSwapping ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.15 }}
                      >
                        {item.value}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
