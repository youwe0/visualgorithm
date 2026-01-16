# Visualgorithm

A modern, interactive algorithm visualizer with a stunning dark theme UI. Watch sorting, pathfinding, and searching algorithms come to life through beautiful, real-time visualizations.

**[Live Demo](https://visualgorithum.netlify.app/)**

---

## Overview

Visualgorithm transforms complex algorithms into intuitive visual experiences. Built for developers, students, and anyone curious about how algorithms work under the hood.

### Features

**Sorting Algorithms**
- Bubble Sort, Selection Sort, Merge Sort
- Real-time bar chart visualization with gradient colors
- Live comparison and swap counters
- Adjustable speed and array size controls

**Pathfinding Algorithms**
- A* Search, Breadth-First Search, Depth-First Search
- Interactive grid with drag-to-draw walls
- Custom start/end point placement
- Random maze generation
- Wave-like animation for visited nodes

**Searching Algorithms**
- Binary Search, Jump Search
- Visual search range highlighting
- Step-by-step animation
- Found/not-found feedback

**Conway's Game of Life**
- Cellular automaton simulation
- Click-to-toggle cell states
- Generation counter and live statistics
- Adjustable simulation speed

---

## UI/UX Highlights

- **Dark Theme First** - True black backgrounds with high contrast
- **Neon Accent Colors** - Cyan, purple, green, pink gradients
- **Glass Morphism** - Subtle blur effects on control panels
- **Micro-interactions** - Hover glows, scale transforms, smooth transitions
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Performance Optimized** - Smooth 60fps animations

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#050505` | Primary dark background |
| Neon Cyan | `#00E5FF` | Primary accent, default bars |
| Electric Purple | `#8B5CF6` | Secondary accent, visited nodes |
| Neon Green | `#22C55E` | Success states, sorted/path |
| Hot Pink | `#EC4899` | Highlight, end nodes |
| Amber | `#F59E0B` | Warning, comparing states |

---

## Tech Stack

- **React 19** - Latest React with hooks
- **Vite** - Fast development and optimized builds
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Remix Icon** - Icon library

---

## Screenshots

> Add screenshots of your application here

| Landing Page | Sorting Visualizer |
|--------------|-------------------|
| ![Landing](screenshots/landing.png) | ![Sorting](screenshots/sorting.png) |

| Pathfinding | Search |
|-------------|--------|
| ![Pathfinding](screenshots/pathfinding.png) | ![Search](screenshots/search.png) |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/youwe0/visualgorithm.git

# Navigate to project directory
cd visualgorithm

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
visualgorithm/
├── src/
│   ├── Algorithms/
│   │   ├── Pathfinding/    # A*, BFS, DFS
│   │   ├── Searching/      # Binary, Jump
│   │   └── Sorting/        # Bubble, Selection, Merge
│   ├── components/
│   │   ├── Landing.jsx
│   │   ├── Navbar.jsx
│   │   ├── SortingVisualizer.jsx
│   │   ├── PathfindingVisualizer.jsx
│   │   ├── SearchVisualizer.jsx
│   │   └── Lifegame.jsx
│   ├── Utils/
│   ├── index.css           # Global styles & design system
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

---

## Why This Project Stands Out

This isn't just another algorithm visualizer. It's a portfolio-defining piece that demonstrates:

1. **Modern Frontend Skills** - React 19, Tailwind CSS v4, Framer Motion
2. **UI/UX Design Sense** - Award-inspired dark theme with attention to detail
3. **Algorithm Knowledge** - Clean implementation of classic CS algorithms
4. **Performance Awareness** - Optimized animations and efficient rendering
5. **Responsive Design** - Works beautifully on all screen sizes
6. **Code Organization** - Clean separation of concerns, reusable components

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

MIT License - feel free to use this project for learning or as inspiration for your own work.

---

Built with care by [@youwe0](https://github.com/youwe0)
