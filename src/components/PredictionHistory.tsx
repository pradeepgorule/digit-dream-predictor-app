
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Prediction {
  id: string;
  type: 'single' | 'jodi';
  number: string;
  timestamp: Date;
}

interface PredictionHistoryProps {
  predictions: Prediction[];
}

const PredictionHistory = ({ predictions }: PredictionHistoryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Predictions</h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {predictions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No predictions yet</p>
        ) : (
          predictions.map((prediction) => (
            <Card key={prediction.id} className="p-3 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Badge variant={prediction.type === 'single' ? 'default' : 'secondary'}>
                    {prediction.type === 'single' ? 'Single' : 'Jodi'}
                  </Badge>
                  <span className="font-bold text-lg text-purple-600">
                    {prediction.number}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {prediction.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PredictionHistory;
