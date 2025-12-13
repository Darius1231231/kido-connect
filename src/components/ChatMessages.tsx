import React, { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-2 max-h-[40vh] scrollbar-thin"
    >
      {messages.map((msg, idx) => (
        <ChatBubble
          key={idx}
          message={msg.content}
          isUser={msg.role === 'user'}
          isTyping={isLoading && idx === messages.length - 1 && msg.role === 'assistant'}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
