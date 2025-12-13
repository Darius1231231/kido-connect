import React from 'react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isTyping?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, isTyping }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-squircle shadow-soft ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-card-foreground shadow-neumorphic'
        } ${isTyping ? 'animate-pulse-gentle' : ''}`}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
