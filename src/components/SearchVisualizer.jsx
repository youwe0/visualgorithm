import React, { useState } from "react";
import { binarySearch } from "../Algorithms/Searching/BinarySearch";
import { jumpSearch } from "../Algorithms/Searching/Jump";

// Function to generate students
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
    const [currentStep, setCurrentStep] = useState(0);
    const [running, setRunning] = useState(false);

    const [complexity, setComplexity] = useState({ time: "", space: "" });

    // Algorithm complexities
    const algorithmComplexities = {
        binary: { time: "O(log n)", space: "O(1)" },
        jump: { time: "O(√n)", space: "O(1)" },
    };

    const handleGenerate = () => {
        setStudents(generateStudents());
        setSteps([]);
        setCurrentStep(0);
        setRunning(false);
    };

    const startSearch = () => {
        if (!targetRoll || isNaN(targetRoll)) return;
        let searchSteps = [];

        if (algorithm === "binary") {
            const rolls = students.map((s) => s.roll);
            searchSteps = binarySearch(rolls, parseInt(targetRoll));
        } else if (algorithm === "jump") {
            const rolls = students.map((s) => s.roll);
            searchSteps = jumpSearch(rolls, parseInt(targetRoll));
        }

        setSteps(searchSteps);
        setCurrentStep(0);
        setRunning(true);
        setComplexity(algorithmComplexities[algorithm]);
        animate(searchSteps);
    };

    const animate = async (searchSteps) => {
        for (let i = 0; i < searchSteps.length; i++) {
            setCurrentStep(i);
            await new Promise((r) => setTimeout(r, 500));
        }
        setRunning(false);
    };

    const current = steps[currentStep] || {};

    return (
        <div className="p-4 bg-blue-50 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-4">Search Visualizer (Classroom Style)</h2>

            {/* Algorithm Info
            <div className="absolute top-2 left-2 w-[300px] bg-gray-400 rounded-md px-4 py-2 shadow-md">
                <h3 className="text-xl font-semibold">{algorithm === "binary" ? "Binary Search" : "Jump Search"}</h3>
                <p>Time Complexity: {complexity.time}</p>
                <p>Space Complexity: {complexity.space}</p>
            </div> */}

            <div className="flex flex-wrap sm:flex-row items-center justify-center gap-4 mb-6">
                <button
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    onClick={handleGenerate}
                >
                    Generate Students
                </button>

                <input
                    type="number"
                    placeholder="Target Roll"
                    value={targetRoll}
                    onChange={(e) => setTargetRoll(e.target.value)}
                    className="border px-3 py-2 rounded w-32"
                />

                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="binary">Binary Search</option>
                    <option value="jump">Jump Search</option>
                </select>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={startSearch}
                    disabled={running}
                >
                    Start Search
                </button>
            </div>
            {/* Algorithm Info */}
            <div className=" top-2 left-2 w-[300px] bg-gray-400 rounded-md px-4 py-2 shadow-md my-10">
                <h3 className="text-xl font-semibold">{algorithm === "binary" ? "Binary Search" : "Jump Search"}</h3>
                <p>Time Complexity: {complexity.time}</p>
                <p>Space Complexity: {complexity.space}</p>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-4 justify-center">
                {students.map((student, index) => {
                    const isMid = current.mid === index;
                    const isFound = current.found && current.mid === index;

                    let bg = "bg-gray-200";
                    if (isFound) bg = "bg-green-400";
                    else if (isMid) bg = "bg-yellow-300";

                    return (
                        <div
                            key={index}
                            className={`${bg} border w-24 h-16 flex flex-col items-center justify-center rounded shadow`}
                        >
                            <span className="text-sm">{student.name}</span>
                            <span className="text-xs">Roll: {student.roll}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchVisualizer;
