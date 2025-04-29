import React from "react";
import { Routes, Route } from "react-router-dom";
import SortingVisualizer from "./components/SortingVisualizer";
import SearchVisualizer from "./components/SearchVisualizer";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import Footer from "./components/Footer";
import GameOfLife from "./components/Lifegame";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Navbar />

        <Routes>
          {/* Define the routes here */}
          <Route path="/pathfinding" element={<PathfindingVisualizer />} />
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/search" element={<SearchVisualizer />} />
          <Route path="/Lifegame" element={<GameOfLife />} />
          {/* <Route path="/Lifegame" element={<Landing/>} /> */}


          {/* Default route, in case no match */}
          <Route path="*" element={<PathfindingVisualizer />} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;








