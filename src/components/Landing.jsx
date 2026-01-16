import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FallingSymbols from "./FallingSymbols";

const Landing = () => {
  const algorithms = [
    {
      title: "Sorting",
      description: "Visualize Bubble, Selection & Merge Sort with dynamic bar animations",
      icon: "ri-bar-chart-grouped-line",
      path: "/sorting",
      gradient: "from-cyan-500 to-blue-500",
      glow: "rgba(0, 229, 255, 0.3)",
      color: "#00E5FF"
    },
    {
      title: "Pathfinding",
      description: "Explore A*, BFS & DFS algorithms on interactive grids",
      icon: "ri-route-line",
      path: "/pathfinding",
      gradient: "from-purple-500 to-pink-500",
      glow: "rgba(139, 92, 246, 0.3)",
      color: "#8B5CF6"
    },
    {
      title: "Searching",
      description: "Watch Binary & Jump Search find elements step-by-step",
      icon: "ri-search-eye-line",
      path: "/search",
      gradient: "from-green-500 to-cyan-500",
      glow: "rgba(34, 197, 94, 0.3)",
      color: "#22C55E"
    },
    {
      title: "Game of Life",
      description: "Experience Conway's cellular automaton simulation",
      icon: "ri-checkbox-blank-circle-line",
      path: "/lifegame",
      gradient: "from-pink-500 to-amber-500",
      glow: "rgba(236, 72, 153, 0.3)",
      color: "#EC4899"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <FallingSymbols />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16 sm:mb-24" initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-l from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">See Algorithms</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Come to Life
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience sorting, pathfinding, and searching algorithms through
            beautiful, real-time visualizations. Learn by watching, not just reading.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/sorting"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Exploring
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <a
              href="https://github.com/youwe0/visualgorithm"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <i className="ri-github-fill text-xl" />
              View Source
            </a>
          </div>
        </motion.div>

        {/* Algorithm Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {algorithms.map((algo) => (
            <motion.div key={algo.title} variants={itemVariants}>
              <Link
                to={algo.path}
                className="group block h-full p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:bg-white/[0.04] relative overflow-hidden"
                style={{
                  boxShadow: `0 0 0 rgba(0,0,0,0)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px ${algo.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
                }}
              >
                {/* Glow Effect on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${algo.glow}, transparent 70%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${algo.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                    style={{ boxShadow: `0 8px 30px ${algo.glow}` }}
                  >
                    <i className={`${algo.icon} text-2xl text-white`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                    {algo.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {algo.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: algo.color }}>
                    <span>Explore</span>
                    <i className="ri-arrow-right-up-line group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mt-24 sm:mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Visualgorithm?
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Built for learners, developers, and algorithm enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "ri-speed-line",
                title: "Real-time Speed Control",
                description: "Adjust animation speed to match your learning pace",
                color: "#00E5FF"
              },
              {
                icon: "ri-palette-line",
                title: "Visual Distinction",
                description: "Color-coded states make every step crystal clear",
                color: "#8B5CF6"
              },
              {
                icon: "ri-device-line",
                title: "Fully Responsive",
                description: "Seamless experience across all devices",
                color: "#22C55E"
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5 text-center"
              >
                <div
                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <i className={`${feature.icon} text-xl`} style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-zinc-600 text-sm">
            Open source project by{" "}
            <a
              href="https://github.com/youwe0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              @youwe0
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
