import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, BookOpen, Camera, Gamepad2 } from 'lucide-react';

interface ActivityCardProps {
  title: string;
  icon: 'draw' | 'story' | 'camera' | 'game';
  color: 'sage' | 'sand' | 'lavender';
  onClick?: () => void;
}

const iconMap = {
  draw: Pencil,
  story: BookOpen,
  camera: Camera,
  game: Gamepad2,
};

const colorMap = {
  sage: 'prompt',
  sand: 'sand',
  lavender: 'lavender',
} as const;

const ActivityCard: React.FC<ActivityCardProps> = ({ title, icon, color, onClick }) => {
  const Icon = iconMap[icon];
  
  return (
    <Card 
      variant={colorMap[color]}
      className="cursor-pointer hover:scale-105 hover:shadow-soft transition-all duration-300 active:scale-95"
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-background/50 flex items-center justify-center shadow-neumorphic">
          <Icon className="w-8 h-8 text-foreground" />
        </div>
        <p className="text-lg font-bold text-foreground text-center">{title}</p>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
