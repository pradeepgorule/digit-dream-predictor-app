
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6" />
          <div>
            <div className="text-2xl font-bold font-mono">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm opacity-90">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentTime;
