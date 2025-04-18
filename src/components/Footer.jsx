import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const baseClass =
    "px-4 py-2 rounded transition font-medium text-white";
  const activeClass = "bg-blue-500";
  const inactiveClass = "bg-gray-700 hover:bg-gray-600";

  return (
    <div className="w-full bg-gray-800 py-4 flex justify-center gap-4 shadow-inner mt-8">
      <NavLink
        to="/sorting"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        Sorting algorithm
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        Searching algorithm
      </NavLink>
      <NavLink
        to="/pathfinding"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        Pathfinding alorithm
      </NavLink>
    </div>
  );
};

export default Footer;
