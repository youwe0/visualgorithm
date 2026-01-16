import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/sorting', label: 'Sorting', icon: 'ri-bar-chart-grouped-line', color: '#00E5FF' },
    { path: '/pathfinding', label: 'Pathfinding', icon: 'ri-route-line', color: '#8B5CF6' },
    { path: '/search', label: 'Search', icon: 'ri-search-eye-line', color: '#22C55E' },
    { path: '/lifegame', label: 'Life Game', icon: 'ri-checkbox-blank-circle-line', color: '#EC4899' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Glass Background */}
        <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <i className="ri-code-box-line text-white text-lg" />
              </div>
              <span className="text-lg font-semibold text-white tracking-tight hidden sm:block">
                Visualgorithm
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${link.color}20, transparent)`,
                            border: `1px solid ${link.color}30`
                          }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <i className={`${link.icon} text-base`} style={{ color: isActive ? link.color : undefined }} />
                      <span className="relative z-10">{link.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* GitHub Link */}
              <a
                href="https://github.com/youwe0/visualgorithm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <i className="ri-github-fill text-lg" />
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-lg`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5 p-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white/5 text-white'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                  style={({ isActive }) => isActive ? { borderLeft: `3px solid ${link.color}` } : {}}
                >
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
