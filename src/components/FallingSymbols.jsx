import { useEffect, useState, useCallback } from 'react';
import { getRandomSymbol } from '../Utils/csSymbols';

const FallingSymbol = ({ symbol, left, delay, duration, onComplete, id }) => {
  const [phase, setPhase] = useState('falling'); // falling, bounce1, bounce2, done

  useEffect(() => {
    const fallTimer = setTimeout(() => {
      setPhase('bounce1');
    }, duration * 1000);

    const bounce1Timer = setTimeout(() => {
      setPhase('bounce2');
    }, duration * 1000 + 300);

    const bounce2Timer = setTimeout(() => {
      setPhase('done');
    }, duration * 1000 + 500);

    const removeTimer = setTimeout(() => {
      onComplete(id);
    }, duration * 1000 + 700);

    return () => {
      clearTimeout(fallTimer);
      clearTimeout(bounce1Timer);
      clearTimeout(bounce2Timer);
      clearTimeout(removeTimer);
    };
  }, [duration, id, onComplete]);

  const getAnimationStyle = () => {
    const baseStyle = {
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    };

    switch (phase) {
      case 'falling':
        return {
          ...baseStyle,
          animation: `symbolFall ${duration}s linear forwards`,
        };
      case 'bounce1':
        return {
          ...baseStyle,
          bottom: '0px',
          top: 'auto',
          animation: 'symbolBounce1 0.3s ease-out forwards',
        };
      case 'bounce2':
        return {
          ...baseStyle,
          bottom: '0px',
          top: 'auto',
          animation: 'symbolBounce2 0.2s ease-out forwards',
        };
      case 'done':
        return {
          ...baseStyle,
          bottom: '0px',
          top: 'auto',
          opacity: 0,
          transition: 'opacity 0.2s ease-out',
        };
      default:
        return baseStyle;
    }
  };

  const colors = [
    'rgba(0, 229, 255, 0.6)',   // Cyan
    'rgba(139, 92, 246, 0.6)',  // Purple
    'rgba(34, 197, 94, 0.5)',   // Green
    'rgba(236, 72, 153, 0.5)',  // Pink
    'rgba(245, 158, 11, 0.5)',  // Amber
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <span
      className="falling-symbol"
      style={{
        ...getAnimationStyle(),
        color: randomColor,
        textShadow: `0 0 10px ${randomColor}`,
      }}
    >
      {symbol}
    </span>
  );
};

const FallingSymbols = () => {
  const [symbols, setSymbols] = useState([]);
  const [idCounter, setIdCounter] = useState(0);

  const removeSymbol = useCallback((id) => {
    setSymbols(prev => prev.filter(s => s.id !== id));
  }, []);

  const addSymbol = useCallback(() => {
    const newSymbol = {
      id: idCounter,
      symbol: getRandomSymbol(),
      left: Math.random() * 95,
      delay: 0,
      duration: 3 + Math.random() * 4, // 3-7 seconds fall time
    };

    setSymbols(prev => [...prev, newSymbol]);
    setIdCounter(prev => prev + 1);
  }, [idCounter]);

  useEffect(() => {
    // Initial burst of symbols
    const initialCount = 15;
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => addSymbol(), i * 200);
    }

    // Continuous spawning
    const spawnInterval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to spawn
        addSymbol();
      }
    }, 400);

    return () => clearInterval(spawnInterval);
  }, []);

  // Separate effect for continuous spawning after initial load
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setSymbols(prev => {
        if (prev.length < 30) { // Max 30 symbols at once
          const newSymbol = {
            id: Date.now() + Math.random(),
            symbol: getRandomSymbol(),
            left: Math.random() * 95,
            delay: 0,
            duration: 3 + Math.random() * 4,
          };
          return [...prev, newSymbol];
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(spawnInterval);
  }, []);

  return (
    <div className="falling-symbols-container">
      {symbols.map(sym => (
        <FallingSymbol
          key={sym.id}
          id={sym.id}
          symbol={sym.symbol}
          left={sym.left}
          delay={sym.delay}
          duration={sym.duration}
          onComplete={removeSymbol}
        />
      ))}
    </div>
  );
};

export default FallingSymbols;
