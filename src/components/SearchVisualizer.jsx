import { motion } from "framer-motion";
import { useState } from "react";
import { jumpSearch } from "../Algorithms/Searching/Jump";
import { binarySearch } from "../Algorithms/Searching/BinarySearch";

const generateStudents = (count = 30) => {
  const students = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    roll: Math.floor(Math.random() * 100),
  })).sort((a, b) => a.roll - b.roll);
  return students;
};

const SearchVisualizer = () => {
  const [students, setStudents] = useState(generateStudents());
  const [targetRoll, setTargetRoll] = useState("");
  const [algorithm, setAlgorithm] = useState("binary");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [found, setFound] = useState(null);
  const [searchRange, setSearchRange] = useState({ left: null, right: null });

  const algorithmInfo = {
    binary: {
      name: "Binary Search",
      time: "O(log n)",
      space: "O(1)",
      description: "Divides search space in half each step - requires sorted array",
      color: "#00E5FF"
    },
    jump: {
      name: "Jump Search",
      time: "O(√n)",
      space: "O(1)",
      description: "Jumps ahead by fixed steps, then linear search backward",
      color: "#8B5CF6"
    }
  };

  const handleGenerate = () => {
    setStudents(generateStudents());
    setSteps([]);
    setCurrentStep(-1);
    setRunning(false);
    setFound(null);
    setSearchRange({ left: null, right: null });
  };

  const startSearch = () => {
    if (!targetRoll || isNaN(targetRoll)) return;
    if (running) return;

    let searchSteps = [];
    const rolls = students.map((s) => s.roll);
    const target = parseInt(targetRoll);

    if (algorithm === "binary") {
      searchSteps = binarySearch(rolls, target);
    } else if (algorithm === "jump") {
      searchSteps = jumpSearch(rolls, target);
    }

    setSteps(searchSteps);
    setCurrentStep(-1);
    setFound(null);
    setRunning(true);
    animate(searchSteps);
  };

  const animate = async (searchSteps) => {
    for (let i = 0; i < searchSteps.length; i++) {
      setCurrentStep(i);
      const step = searchSteps[i];

      if (step.left !== undefined && step.right !== undefined) {
        setSearchRange({ left: step.left, right: step.right });
      }

      if (step.found) {
        setFound(step.mid);
      }

      await new Promise((r) => setTimeout(r, 600));
    }
    setRunning(false);
  };

  const current = steps[currentStep] || {};
  const currentAlgo = algorithmInfo[algorithm];

  const getCardState = (index) => {
    if (found === index) return "found";
    if (current.mid === index) return "active";
    if (searchRange.left !== null && searchRange.right !== null) {
      if (index >= searchRange.left && index <= searchRange.right) {
        return "inRange";
      }
      return "outOfRange";
    }
    return "default";
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
            Search Visualizer
          </h1>
          <p className="text-zinc-500">
            Watch how search algorithms find elements in sorted arrays
          </p>
        </motion.div>

        {/* Controls Panel */}
        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap items-end gap-4">
            {/* Algorithm Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Algorithm</label>
              <select
                className="select"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                disabled={running}
              >
                <option value="binary">Binary Search</option>
                <option value="jump">Jump Search</option>
              </select>
            </div>

            {/* Target Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Target Roll Number</label>
              <input
                type="number"
                placeholder="Enter roll number"
                value={targetRoll}
                onChange={(e) => setTargetRoll(e.target.value)}
                className="input w-40"
                disabled={running}
              />
            </div>

            {/* Action Buttons */}
            <button
              className="btn btn-secondary"
              onClick={handleGenerate}
              disabled={running}
            >
              <i className="ri-refresh-line" />
              New Data
            </button>

            <button
              className="btn btn-primary"
              onClick={startSearch}
              disabled={running || !targetRoll}
            >
              {running ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching
                </>
              ) : (
                <>
                  <i className="ri-search-line" />
                  Search
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Algorithm Info */}
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
                <i className="ri-search-eye-line text-xl" style={{ color: currentAlgo.color }} />
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

            {/* Search Status */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Search Status</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Target</span>
                  <span className="text-cyan-400 font-mono text-lg">{targetRoll || "-"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Step</span>
                  <span className="text-white font-mono text-lg">
                    {currentStep >= 0 ? currentStep + 1 : 0} / {steps.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Result</span>
                  {found !== null ? (
                    <span className="text-green-400 font-medium flex items-center gap-1">
                      <i className="ri-checkbox-circle-fill" />
                      Found
                    </span>
                  ) : running ? (
                    <span className="text-amber-400 font-medium">Searching...</span>
                  ) : steps.length > 0 && currentStep === steps.length - 1 ? (
                    <span className="text-red-400 font-medium flex items-center gap-1">
                      <i className="ri-close-circle-fill" />
                      Not Found
                    </span>
                  ) : (
                    <span className="text-zinc-500">-</span>
                  )}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="glass rounded-xl p-5">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Legend</h4>
              <div className="space-y-2">
                {[
                  { color: "bg-zinc-800", border: "border-zinc-700", label: "Default" },
                  { color: "bg-cyan-500/10", border: "border-cyan-500/30", label: "In Search Range" },
                  { color: "bg-amber-500/20", border: "border-amber-500", label: "Current Check" },
                  { color: "bg-green-500/20", border: "border-green-500", label: "Found!" },
                  { color: "bg-zinc-900", border: "border-zinc-800", label: "Out of Range" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg ${item.color} border ${item.border}`} />
                    <span className="text-sm text-zinc-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Student Cards Grid */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Students ({students.length})
                </h3>
                <span className="text-sm text-zinc-500">
                  Sorted by Roll Number
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {students.map((student, index) => {
                  const state = getCardState(index);

                  let cardClass = "";
                  let glowStyle = {};

                  switch (state) {
                    case "found":
                      cardClass = "bg-green-500/20 border-green-500 text-green-400";
                      glowStyle = { boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" };
                      break;
                    case "active":
                      cardClass = "bg-amber-500/20 border-amber-500 text-amber-400";
                      glowStyle = { boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)" };
                      break;
                    case "inRange":
                      cardClass = "bg-cyan-500/10 border-cyan-500/30 text-cyan-400";
                      break;
                    case "outOfRange":
                      cardClass = "bg-zinc-900/50 border-zinc-800 text-zinc-600";
                      break;
                    default:
                      cardClass = "bg-zinc-800/50 border-zinc-700 text-zinc-300";
                  }

                  return (
                    <motion.div
                      key={student.id}
                      className={`p-3 rounded-xl border text-center transition-all duration-300 ${cardClass}`}
                      style={glowStyle}
                      animate={{
                        scale: state === "active" || state === "found" ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-xs opacity-60 mb-1">#{index}</div>
                      <div className="text-lg font-bold font-mono">{student.roll}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Running Indicator */}
              {running && (
                <div className="mt-6 flex items-center justify-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  {algorithm === "binary" ? "Binary searching..." : "Jump searching..."}
                </div>
              )}

              {/* Result Message */}
              {!running && found !== null && (
                <motion.div
                  className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="ri-checkbox-circle-fill text-green-500 text-2xl" />
                  <p className="text-green-400 font-medium mt-2">
                    Found roll number {targetRoll} at index {found}!
                  </p>
                </motion.div>
              )}

              {!running && steps.length > 0 && found === null && currentStep === steps.length - 1 && (
                <motion.div
                  className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="ri-close-circle-fill text-red-500 text-2xl" />
                  <p className="text-red-400 font-medium mt-2">
                    Roll number {targetRoll} not found in the dataset
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SearchVisualizer;
