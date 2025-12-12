import React from 'react';

interface EmotionalBorderProps {
  mood: 'calm' | 'happy' | 'energetic';
  children: React.ReactNode;
}

const moodGradients = {
  calm: 'from-calm-glow via-transparent to-calm-glow',
  happy: 'from-happy-glow via-transparent to-happy-glow',
  energetic: 'from-energy-glow via-transparent to-energy-glow',
};

const EmotionalBorder: React.FC<EmotionalBorderProps> = ({ mood, children }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-squircle-xl">
      {/* Glowing border effect */}
      <div 
        className={`absolute inset-0 pointer-events-none z-10`}
        style={{
          boxShadow: mood === 'calm' 
            ? 'inset 0 0 80px rgba(147, 197, 253, 0.3)' 
            : mood === 'happy'
            ? 'inset 0 0 80px rgba(252, 211, 77, 0.3)'
            : 'inset 0 0 80px rgba(251, 146, 60, 0.3)',
        }}
      />
      
      {/* Animated gradient edges */}
      <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${moodGradients[mood]} opacity-50 animate-glow-pulse`} />
      <div className={`absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r ${moodGradients[mood]} opacity-50 animate-glow-pulse`} />
      <div className={`absolute inset-y-0 left-0 w-2 bg-gradient-to-b ${moodGradients[mood]} opacity-50 animate-glow-pulse`} />
      <div className={`absolute inset-y-0 right-0 w-2 bg-gradient-to-b ${moodGradients[mood]} opacity-50 animate-glow-pulse`} />
      
      {/* Content */}
      <div className="relative z-0 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default EmotionalBorder;
