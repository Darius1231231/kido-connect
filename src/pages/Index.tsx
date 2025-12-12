import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import CompanionMode from '@/pages/CompanionMode';
import ActivePlayMode from '@/pages/ActivePlayMode';
import GuardianMode from '@/pages/GuardianMode';
import Gatekeeper from '@/components/Gatekeeper';

const AppContent: React.FC = () => {
  const { mode, setMode, isGatekeeperOpen, setIsGatekeeperOpen } = useApp();

  const handleUnlock = () => {
    setIsGatekeeperOpen(false);
    setMode('guardian');
  };

  const handleCancelGatekeeper = () => {
    setIsGatekeeperOpen(false);
  };

  return (
    <div className="w-full min-h-screen font-nunito">
      {/* Main content based on mode */}
      {mode === 'companion' && <CompanionMode />}
      {mode === 'activePlay' && <ActivePlayMode />}
      {mode === 'guardian' && <GuardianMode />}
      
      {/* Gatekeeper overlay */}
      {isGatekeeperOpen && (
        <Gatekeeper
          onUnlock={handleUnlock}
          onCancel={handleCancelGatekeeper}
        />
      )}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
