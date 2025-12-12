import React from 'react';
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
        className={`relative ${sizeClasses[size]} rounded-squircle-xl overflow-hidden bg-background shadow-neumorphic ${
          isListening ? 'animate-pulse-gentle' : ''
        } ${isSpeaking ? 'animate-bounce-slow' : 'animate-float'}`}
      >
        <img 
          src={kidoAvatar} 
          alt="Kido - Your friendly companion"
          className="w-full h-full object-cover"
        />
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
