import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  ArrowLeft, 
  Utensils, 
  Moon, 
  TrendingUp,
  Clock,
  MessageCircle,
  Heart
} from 'lucide-react';

// Mood data points for the chart
const moodData = [
  { time: '3:00 PM', mood: 'happy', value: 80 },
  { time: '3:30 PM', mood: 'calm', value: 60 },
  { time: '4:00 PM', mood: 'calm', value: 55 },
  { time: '4:15 PM', mood: 'frustrated', value: 30 },
  { time: '4:30 PM', mood: 'happy', value: 75 },
  { time: '5:00 PM', mood: 'calm', value: 65 },
];

const GuardianMode: React.FC = () => {
  const { setMode } = useApp();
  const [bedtimeMode, setBedtimeMode] = useState(false);

  const handleBack = () => {
    setMode('companion');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      bedtimeMode ? 'guardian-mode bg-background' : 'bg-background'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleBack}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Daily Snapshot</h1>
              <p className="text-sm text-muted-foreground">Leo's activity today</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-sage rounded-squircle px-4 py-2 shadow-neumorphic">
            <Shield className="w-5 h-5 text-sage-accent" />
            <span className="text-sm font-semibold text-foreground">Data stored locally</span>
          </div>
        </header>

        {/* Dinner Table Card - High Priority */}
        <Card variant="sand" className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-squircle bg-sand-accent/30 flex items-center justify-center">
                <Utensils className="w-6 h-6 text-sand-accent" />
              </div>
              <div>
                <CardTitle className="text-xl">Dinner Table Conversation</CardTitle>
                <CardDescription>Today's learning moment</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground mb-4">
              Leo learned about <strong>Gravity</strong> today!
            </p>
            <div className="bg-background/50 rounded-squircle p-4">
              <p className="text-muted-foreground mb-2">Try asking:</p>
              <p className="text-lg font-semibold text-foreground italic">
                "Why does the apple fall down?"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card variant="guardian" className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-calm-glow" />
              <div>
                <p className="text-2xl font-bold text-foreground">47 min</p>
                <p className="text-sm text-muted-foreground">Screen time</p>
              </div>
            </div>
          </Card>
          
          <Card variant="guardian" className="p-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-sage-accent" />
              <div>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-sm text-muted-foreground">Conversations</p>
              </div>
            </div>
          </Card>
          
          <Card variant="guardian" className="p-4">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-lavender-accent" />
              <div>
                <p className="text-2xl font-bold text-foreground">Happy</p>
                <p className="text-sm text-muted-foreground">Overall mood</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sentiment Graph */}
        <Card variant="guardian" className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              <CardTitle>Mood Throughout the Day</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end justify-between gap-2 mb-4">
              {moodData.map((point, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className={`w-full rounded-squircle-sm transition-all duration-300 ${
                      point.mood === 'happy' ? 'bg-happy-glow' : 
                      point.mood === 'frustrated' ? 'bg-destructive/60' : 
                      'bg-calm-glow'
                    }`}
                    style={{ height: `${point.value}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              {moodData.map((point, index) => (
                <span key={index}>{point.time}</span>
              ))}
            </div>
            
            {/* Legend / Annotation */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <span className="text-muted-foreground">Frustrated at 4:15 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-happy-glow" />
                <span className="text-muted-foreground">Happy at 4:30 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bedtime Mode Toggle */}
        <Card variant="lavender" className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-squircle bg-lavender-accent/30 flex items-center justify-center">
                <Moon className="w-7 h-7 text-lavender-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Bedtime Mode</h3>
                <p className="text-sm text-muted-foreground">
                  {bedtimeMode ? 'Night mode is active' : 'Enable calming night experience'}
                </p>
              </div>
            </div>
            
            <Switch
              checked={bedtimeMode}
              onCheckedChange={setBedtimeMode}
              className="scale-125"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GuardianMode;
