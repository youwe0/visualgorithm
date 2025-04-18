import React from "react";
import { Routes, Route } from "react-router-dom";
import SortingVisualizer from "./components/SortingVisualizer";
import SearchVisualizer from "./components/SearchVisualizer";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import Footer from "./components/Footer";
import GameOfLife from "./components/Gameoflife";
// import Datashow from "./components/Datashow";

const App = () => {
  return (
    
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          {/* <Datashow /> */}
          <Routes>
            {/* Define the routes here */}
            <Route path="/sorting" element={<SortingVisualizer />} />
            <Route path="/pathfinding" element={<PathfindingVisualizer />} />
            <Route path="/search" element={<SearchVisualizer />} />
            <Route path="/gameoflife" element={<GameOfLife />} />

            {/* Default route, in case no match */}
            <Route path="*" element={<PathfindingVisualizer />} />
          </Routes>
        </div>
        <Footer />
      </div>
    

  );
};

export default App;








