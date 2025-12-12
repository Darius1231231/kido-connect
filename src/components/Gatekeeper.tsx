import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

interface GatekeeperProps {
  onUnlock: () => void;
  onCancel: () => void;
}

const Gatekeeper: React.FC<GatekeeperProps> = ({ onUnlock, onCancel }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const HOLD_DURATION = 3000; // 3 seconds
  const PROGRESS_INTERVAL = 30;

  const startHold = () => {
    setIsHolding(true);
    setProgress(0);
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (HOLD_DURATION / PROGRESS_INTERVAL));
        if (newProgress >= 100) {
          clearInterval(progressIntervalRef.current!);
          return 100;
        }
        return newProgress;
      });
    }, PROGRESS_INTERVAL);

    holdTimerRef.current = setTimeout(() => {
      onUnlock();
    }, HOLD_DURATION);
  };

  const endHold = () => {
    setIsHolding(false);
    setProgress(0);
    
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-md"
      onClick={onCancel}
    >
      <div 
        className="bg-card rounded-squircle-xl shadow-neumorphic p-10 flex flex-col items-center gap-6 max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-foreground">Parent Access</h2>
        <p className="text-muted-foreground text-center">
          Press and hold the button for 3 seconds to unlock Guardian Mode
        </p>
        
        {/* Hold button with progress ring */}
        <div className="relative">
          <svg className="w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 58}`}
              strokeDashoffset={`${2 * Math.PI * 58 * (1 - progress / 100)}`}
              className="transition-all duration-100"
            />
          </svg>
          
          <button
            className={`absolute inset-4 rounded-full bg-gradient-to-br from-lavender to-lavender-accent shadow-neumorphic flex items-center justify-center transition-all ${
              isHolding ? 'scale-95 shadow-neumorphic-pressed' : ''
            }`}
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
          >
            <span className="text-lg font-bold text-foreground">
              {isHolding ? `${Math.round(progress)}%` : 'Hold'}
            </span>
          </button>
        </div>
        
        <button 
          className="text-muted-foreground hover:text-foreground transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Gatekeeper;
