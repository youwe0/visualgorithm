import React, { useState, useEffect } from "react";
import Controls from "./Controls";
import { generateArray } from "../Utils/GenerateArray";
import { bubbleSort } from "../Algorithms/Sorting/BubbleSort";
import { selectionSort } from "../Algorithms/Sorting/SelectionSort";
import { mergeSort } from "../Algorithms/Sorting/MergeSort";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [isRunning, setIsRunning] = useState(false);
  const [complexity, setComplexity] = useState({ time: "", space: "" });

  const playCompletionSound = () => {
    const audio = new Audio("/public/Sound Effect - Tun Tun Tuuuuuuun - TOP 7 sound effects.mp3");
    audio.play();
  };

  // Algorithm complexities
  const algorithmComplexities = {
    bubbleSort: { time: "O(n^2)", space: "O(1)" },
    selectionSort: { time: "O(n^2)", space: "O(1)" },
    mergeSort: { time: "O(n log n)", space: "O(n)" },
  };

  useEffect(() => {
    setArray(generateArray(size));
    setComplexity(algorithmComplexities[algorithm]);
  }, [size, algorithm]);

  const handleGenerateArray = () => {
    if (!isRunning) setArray(generateArray(size));
  };

  const handleStart = async () => {
    if (isRunning) return;
    setIsRunning(true);
    let animations = [];

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
        indices.forEach(idx => newArray[idx].color = "compare");
      } else if (type === "swap") {
        const [i, j] = indices;
        const temp = newArray[i].value;
        newArray[i].value = newArray[j].value;
        newArray[j].value = temp;
        newArray[i].color = "swap";
        newArray[j].color = "swap";
      } else if (type === "overwrite") {
        const [idx] = indices;
        newArray[idx].value = newVal;
        newArray[idx].color = "swap";
      } else if (type === "sorted") {
        indices.forEach(idx => newArray[idx].color = "sorted");
      }

      setArray(newArray);

      await new Promise(resolve => setTimeout(resolve, 100 - speed));

      setArray(prev =>
        prev.map(bar => ({ ...bar, color: bar.color === "sorted" ? "sorted" : "default", })))
    }

    setIsRunning(false);
    playCompletionSound();
  };

  return (
    <div>
      <Controls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        speed={speed}
        setSpeed={setSpeed}
        size={size}
        setSize={setSize}
        generateArray={handleGenerateArray}
        startVisualization={handleStart}
        isRunning={isRunning}
      />

      

      {/* Array as Boxes */}
      <div className="w-full flex flex-wrap justify-center items-center gap-2 bg-gray-100 rounded-lg p-4 shadow-inner my-1">
        {array.map((item, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center text-white font-semibold rounded ${getColorClass(item.color)}`}
          >
            {item.value}
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 p-4">
        {/* Graphical Bars */}
        <div className="relative flex-1 h-[470px] flex items-end justify-center gap-[2px] bg-gray-300 rounded-lg shadow-inner overflow-hidden my-[-20px]">

          {/* Algorithm Info */}
          <div className="absolute top-2 left-2 w-[300px] bg-gray-400 rounded-md px-4 py-2 shadow-md">
            <h2 className="text-xl font-semibold capitalize">{algorithm} Visualization</h2>
            <p>Time Complexity: {complexity.time}</p>
            <p>Space Complexity: {complexity.space}</p>
          </div>

          {array.map((item, index) => (
            <div
              key={index}
              className={`w-[6px] md:w-[10px] rounded-t transition-all duration-500 ${getColorClass(item.color)}`}
              style={{ height: `${item.value * 2.2}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getColorClass = (color) => {
  switch (color) {
    case "compare":
      return "bg-yellow-400";
    case "swap":
      return "bg-red-400";
    case "sorted":
      return "bg-green-500";
    case "default":
    default:
      return "bg-blue-500";
  }
};

export default SortingVisualizer;
