
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, Hash, IndianRupee } from 'lucide-react';

interface Prediction {
  id: string;
  type: 'single' | 'jodi';
  number: string;
  betAmount: number;
  timestamp: Date;
}

interface PredictionHistoryProps {
  predictions: Prediction[];
}

const PredictionHistory = ({ predictions }: PredictionHistoryProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-purple-600" />
          Recent Predictions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {predictions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No predictions yet</p>
        ) : (
          predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  prediction.type === 'single' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  <Hash className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {prediction.type === 'single' ? 'Single' : 'Jodi'}: {prediction.number}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <IndianRupee className="h-3 w-3" />
                    <span>{prediction.betAmount}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {formatTime(prediction.timestamp)}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionHistory;
