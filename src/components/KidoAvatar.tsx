import React, { Suspense, useRef, useState, useEffect } from 'react';
import kidoAvatar from '@/assets/kido-avatar.png';

interface KidoAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isListening?: boolean;
  isSpeaking?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-40 h-40',
  xl: 'w-56 h-56',
};

const KidoAvatar: React.FC<KidoAvatarProps> = ({ 
  size = 'lg', 
  isListening = false, 
  isSpeaking = false,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-radial from-sage/60 via-sage/20 to-transparent blur-xl opacity-60 ${
          isListening ? 'animate-pulse-gentle' : ''
        }`}
        style={{ transform: 'scale(1.5)' }}
      />
      
      {/* Avatar container */}
      <div 
        className={`relative ${sizeClasses[size]} rounded-squircle-xl overflow-hidden bg-gradient-to-b from-sage/20 to-background shadow-neumorphic flex items-center justify-center`}
      >
        {/* Giraffe emoji as animated character */}
        <div 
          className={`text-7xl ${isSpeaking ? 'animate-bounce' : 'animate-float'} ${
            isListening ? 'scale-110' : ''
          } transition-transform duration-300`}
          style={{ 
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            fontSize: size === 'xl' ? '5rem' : size === 'lg' ? '4rem' : size === 'md' ? '2.5rem' : '1.5rem'
          }}
        >
          🦒
        </div>
      </div>
      
      {/* Listening indicator rings */}
      {isListening && (
        <>
          <div className="absolute inset-0 rounded-full border-4 border-calm-glow/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-calm-glow/20 animate-ping" style={{ animationDelay: '0.5s' }} />
        </>
      )}
    </div>
  );
};

export default KidoAvatar;
