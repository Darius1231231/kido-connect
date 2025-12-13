import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import KidoAvatar from '@/components/KidoAvatar';
import VoiceButton from '@/components/VoiceButton';
import ActivityCard from '@/components/ActivityCard';
import PromptBubble from '@/components/PromptBubble';
import EmotionalBorder from '@/components/EmotionalBorder';
import ChatMessages from '@/components/ChatMessages';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLeoChat } from '@/hooks/useLeoChat';

const CompanionMode: React.FC = () => {
  const { setMode, setIsGatekeeperOpen, childMood } = useApp();
  const [isListening, setIsListening] = useState(false);
  const { messages, isLoading, sendMessage } = useLeoChat();

  const handleSettingsClick = () => {
    setIsGatekeeperOpen(true);
  };

  const handleActivityClick = (activity: string) => {
    if (activity === 'camera') {
      setMode('activePlay');
    }
    if (activity === 'draw') {
      sendMessage("I want to draw something!");
    }
    if (activity === 'story') {
      sendMessage("Tell me a story!");
    }
  };

  // Get the latest Leo message for the prompt bubble
  const latestLeoMessage = messages.filter(m => m.role === 'assistant').pop()?.content;
  const defaultPrompt = "I'm bored of sitting! Can you find something RED in this room and show me? 🔴";

  return (
    <EmotionalBorder mood={childMood}>
      <div className="min-h-screen bg-background p-6 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-calm-glow animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground capitalize">
              Feeling {childMood}
            </span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSettingsClick}
            className="opacity-30 hover:opacity-60"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </header>

        {/* Chat messages area */}
        {messages.length > 0 && (
          <ChatMessages messages={messages} isLoading={isLoading} />
        )}

        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left activity card */}
          <div className="order-2 lg:order-1">
            <ActivityCard
              title="Let's draw!"
              icon="draw"
              color="sand"
              onClick={() => handleActivityClick('draw')}
            />
          </div>

          {/* Center: Avatar and prompt */}
          <div className="order-1 lg:order-2 flex flex-col items-center gap-6">
            <PromptBubble
              message={latestLeoMessage || defaultPrompt}
              showCamera={!latestLeoMessage}
              onCameraClick={() => handleActivityClick('camera')}
            />
            
            <KidoAvatar 
              size="xl" 
              isListening={isListening}
              isSpeaking={isLoading}
            />
          </div>

          {/* Right activity card */}
          <div className="order-3">
            <ActivityCard
              title="Tell me a story"
              icon="story"
              color="lavender"
              onClick={() => handleActivityClick('story')}
            />
          </div>
        </div>

        {/* Voice button at bottom */}
        <div className="flex justify-center pb-6">
          <VoiceButton
            isListening={isListening}
            onPress={() => setIsListening(true)}
            onRelease={() => {
              setIsListening(false);
              // For now, send a demo message since we don't have STT yet
              sendMessage("Hello Leo! What should we do today?");
            }}
          />
        </div>
      </div>
    </EmotionalBorder>
  );
};

export default CompanionMode;
