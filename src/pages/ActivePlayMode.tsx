import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import KidoAvatar from '@/components/KidoAvatar';
import { Button } from '@/components/ui/button';
import { X, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ActivePlayMode: React.FC = () => {
  const { setMode } = useApp();
  const [energyLevel, setEnergyLevel] = useState(35);
  const [isScanning, setIsScanning] = useState(false);

  // Simulate energy increasing over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyLevel(prev => Math.min(prev + 1, 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setMode('companion');
  };

  return (
    <div className="fixed inset-0 bg-foreground/90 flex flex-col">
      {/* Camera viewfinder simulation */}
      <div className="flex-1 relative overflow-hidden">
        {/* Fake camera background */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/80 to-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground/50">
            <div className="w-40 h-40 border-4 border-dashed border-muted-foreground/30 rounded-squircle-xl mx-auto mb-4" />
            <p className="text-lg">Camera viewfinder</p>
          </div>
        </div>
        
        {/* Energy progress bar at top */}
        <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-foreground/50 to-transparent">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-energy-glow" />
              <span className="text-sm font-bold text-primary-foreground">Energy Level</span>
              <span className="ml-auto text-sm font-bold text-energy-glow">{energyLevel}%</span>
            </div>
            <div className="h-3 bg-foreground/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-energy to-energy-glow rounded-full transition-all duration-500"
                style={{ width: `${energyLevel}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-background/20 hover:bg-background/40 text-primary-foreground"
          onClick={handleClose}
        >
          <X className="w-6 h-6" />
        </Button>
        
        {/* Scan target box */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-64 h-64 border-4 rounded-squircle-xl flex flex-col items-center justify-center gap-4 ${
            isScanning 
              ? 'border-primary animate-pulse bg-primary/10' 
              : 'border-primary-foreground/50'
          }`}>
            <p className="text-xl font-bold text-primary-foreground text-center px-4">
              Scan a <span className="text-destructive">RED</span> Object here!
            </p>
            
            {isScanning && (
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </div>
        
        {/* Avatar in corner */}
        <div className="absolute bottom-6 left-6 flex items-end gap-3">
          <div className="bg-background rounded-squircle-lg p-3 shadow-neumorphic">
            <KidoAvatar size="sm" />
          </div>
          <div className="bg-sage rounded-squircle p-3 mb-2 shadow-neumorphic max-w-[200px]">
            <p className="text-sm font-semibold text-foreground">
              You're doing great! Keep moving! 🎉
            </p>
          </div>
        </div>
        
        {/* Capture button */}
        <div className="absolute bottom-6 right-6">
          <Button
            variant="mic"
            size="iconXl"
            className="shadow-glow-calm"
            onClick={() => setIsScanning(!isScanning)}
          >
            <div className="w-12 h-12 rounded-full bg-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivePlayMode;
