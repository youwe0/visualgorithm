import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SortingVisualizer from "./components/SortingVisualizer";
import SearchVisualizer from "./components/SearchVisualizer";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import GameOfLife from "./components/Lifegame";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";

const App = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Only show navbar on non-landing pages */}
      {!isLanding && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Visualizer Routes */}
          <Route path="/pathfinding" element={<PathfindingVisualizer />} />
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/search" element={<SearchVisualizer />} />
          <Route path="/lifegame" element={<GameOfLife />} />

          {/* Fallback to Landing */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
