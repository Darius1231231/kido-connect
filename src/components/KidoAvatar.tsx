import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
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

// Check if WebGL is available
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

function GiraffeModel({ isListening, isSpeaking }: { isListening: boolean; isSpeaking: boolean }) {
  const { scene } = useGLTF('/models/giraffe.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      if (isSpeaking) {
        modelRef.current.position.y += Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 0.15;
      }
      
      if (isListening) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        modelRef.current.scale.setScalar(scale * 1.8);
      } else {
        modelRef.current.scale.setScalar(1.8);
      }
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      position={[0, -0.5, 0]}
    />
  );
}

const KidoAvatar: React.FC<KidoAvatarProps> = ({ 
  size = 'lg', 
  isListening = false, 
  isSpeaking = false,
  className = ''
}) => {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
  }, []);

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
        className={`relative ${sizeClasses[size]} rounded-squircle-xl overflow-hidden bg-gradient-to-b from-sage/20 to-background shadow-neumorphic`}
      >
        {webGLSupported ? (
          <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 3, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <GiraffeModel isListening={isListening} isSpeaking={isSpeaking} />
              <Environment preset="sunset" />
            </Suspense>
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        ) : (
          <img 
            src={kidoAvatar} 
            alt="Kido - Your friendly companion"
            className={`w-full h-full object-cover ${isSpeaking ? 'animate-bounce' : 'animate-float'}`}
          />
        )}
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

// Preload the model
useGLTF.preload('/models/giraffe.glb');

export default KidoAvatar;
