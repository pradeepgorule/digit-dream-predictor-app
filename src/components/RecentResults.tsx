
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpinResult } from '@/types/spinGame';

interface RecentResultsProps {
  spinResults: SpinResult[];
}

const RecentResults = ({ spinResults }: RecentResultsProps) => {
  if (spinResults.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Spins</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {spinResults.map((result, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <Badge variant="outline">{result.multiplier}x</Badge>
                <span className="ml-2 text-sm text-gray-600">
                  {result.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className={`font-medium ${result.winAmount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.winAmount > 0 ? `+₹${result.winAmount}` : '₹0'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentResults;
