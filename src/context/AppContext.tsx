import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppMode = 'companion' | 'guardian' | 'activePlay';

interface AppContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  isGatekeeperOpen: boolean;
  setIsGatekeeperOpen: (open: boolean) => void;
  childMood: 'calm' | 'happy' | 'energetic';
  setChildMood: (mood: 'calm' | 'happy' | 'energetic') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AppMode>('companion');
  const [isGatekeeperOpen, setIsGatekeeperOpen] = useState(false);
  const [childMood, setChildMood] = useState<'calm' | 'happy' | 'energetic'>('calm');

  return (
    <AppContext.Provider value={{
      mode,
      setMode,
      isGatekeeperOpen,
      setIsGatekeeperOpen,
      childMood,
      setChildMood,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
