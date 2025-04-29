import React from 'react'

const Landing = () => {
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
            <NavLink
                to="Lifegame"
                className={({ isActive }) =>
                    `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
            >
                Lifegame
            </NavLink>


        </div>
    )
}

export default Landing