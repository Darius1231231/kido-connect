import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceButtonProps {
  onPress?: () => void;
  onRelease?: () => void;
  isListening?: boolean;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ 
  onPress, 
  onRelease, 
  isListening = false 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [waveHeights, setWaveHeights] = useState([0.3, 0.5, 0.7, 0.5, 0.3]);

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setWaveHeights(prev => prev.map(() => 0.2 + Math.random() * 0.8));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  const handlePress = () => {
    setIsPressed(true);
    onPress?.();
  };

  const handleRelease = () => {
    setIsPressed(false);
    onRelease?.();
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Sound wave visualization */}
      {isListening && (
        <div className="absolute -top-8 flex items-end gap-1 h-6">
          {waveHeights.map((height, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-primary to-calm-glow rounded-full transition-all duration-100"
              style={{ height: `${height * 24}px` }}
            />
          ))}
        </div>
      )}
      
      {/* Main button */}
      <Button
        variant="mic"
        size="mic"
        className={`relative ${isPressed ? 'scale-95 shadow-neumorphic-pressed' : ''} ${
          isListening ? 'animate-pulse-gentle shadow-glow-calm' : ''
        }`}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        onMouseLeave={() => isPressed && handleRelease()}
      >
        {/* Pulse rings when listening */}
        {isListening && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-primary/10 animate-ping" style={{ animationDelay: '0.3s' }} />
          </>
        )}
        
        <Mic className={`w-12 h-12 ${isListening ? 'animate-pulse' : ''}`} />
      </Button>
      
      {/* Label */}
      <p className="mt-4 text-lg font-semibold text-muted-foreground">
        {isListening ? "I'm listening..." : "Tap to talk to me!"}
      </p>
    </div>
  );
};

export default VoiceButton;
