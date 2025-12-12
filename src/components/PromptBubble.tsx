import React from 'react';
import { Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PromptBubbleProps {
  message: string;
  showCamera?: boolean;
  onCameraClick?: () => void;
}

const PromptBubble: React.FC<PromptBubbleProps> = ({ 
  message, 
  showCamera = false,
  onCameraClick 
}) => {
  return (
    <Card variant="prompt" className="max-w-sm animate-float">
      <CardContent className="p-5 flex items-start gap-3">
        <div className="flex-1">
          <p className="text-base font-semibold text-foreground leading-relaxed">
            {message}
          </p>
        </div>
        
        {showCamera && (
          <Button
            variant="squishy"
            size="icon"
            className="shrink-0"
            onClick={onCameraClick}
          >
            <Camera className="w-5 h-5" />
          </Button>
        )}
      </CardContent>
      
      {/* Speech bubble tail */}
      <div className="absolute -bottom-3 left-8 w-6 h-6 bg-sage rotate-45 border-b-2 border-r-2 border-sage-deep" />
    </Card>
  );
};

export default PromptBubble;
