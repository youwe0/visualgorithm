import { useEffect, useState, useCallback } from 'react';
import { getRandomSymbol } from '../Utils/csSymbols';

const FallingSymbol = ({ symbol, left, delay, duration, onComplete, id }) => {
  const [phase, setPhase] = useState('falling');
  const [bottom, setBottom] = useState(null);

  useEffect(() => {
    const timers = [];

    // Touch ground
    timers.push(
      setTimeout(() => {
        setBottom(0);
        setPhase('jump1');
      }, duration * 1000)
    );

    timers.push(
      setTimeout(() => setPhase('jump2'), duration * 1000 + 350)
    );

    timers.push(
      setTimeout(() => setPhase('done'), duration * 1000 + 650)
    );

    timers.push(
      setTimeout(() => onComplete(id), 5000)
    );

    return () => timers.forEach(clearTimeout);
  }, [duration, id, onComplete]);

  const baseStyle = {
    left: `${left}%`,
    animationDelay: `${delay}s`,
  };

  const getStyle = () => {
    switch (phase) {
      case 'falling':
        return {
          ...baseStyle,
          animation: `symbolFall ${duration}s linear forwards`,
        };

      case 'jump1':
        return {
          ...baseStyle,
          bottom,
          top: 'auto',
          animation: 'symbolJump1 0.35s ease-out forwards',
        };

      case 'jump2':
        return {
          ...baseStyle,
          bottom,
          top: 'auto',
          animation: 'symbolJump2 0.25s ease-out forwards',
        };

      case 'done':
        return {
          ...baseStyle,
          bottom,
          top: 'auto',
          opacity: 0,
          transition: 'opacity 0.25s ease-out',
        };

      default:
        return baseStyle;
    }
  };

  const colors = [
    'rgba(0,229,255,0.6)',
    'rgba(139,92,246,0.6)',
    'rgba(34,197,94,0.5)',
    'rgba(236,72,153,0.5)',
    'rgba(245,158,11,0.5)',
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <span
      className="falling-symbol"
      style={{
        ...getStyle(),
        color,
        textShadow: `0 0 10px ${color}`,
      }}
    >
      {symbol}
    </span>
  );
};

const FallingSymbols = () => {
  const [symbols, setSymbols] = useState([]);

  const removeSymbol = useCallback((id) => {
    setSymbols(prev => prev.filter(s => s.id !== id));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSymbols(prev => {
        if (prev.length >= 30) return prev;

        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            symbol: getRandomSymbol(),
            left: Math.random() * 95,
            delay: 0,
            duration: 3 + Math.random() * 4,
          },
        ];
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="falling-symbols-container">
      {symbols.map(sym => (
        <FallingSymbol
          key={sym.id}
          {...sym}
          onComplete={removeSymbol}
        />
      ))}
    </div>
  );
};

export default FallingSymbols;