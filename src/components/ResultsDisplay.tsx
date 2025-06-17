
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface ResultsDisplayProps {
  latestSingle: number | null;
  latestJodi: string | null;
}

const ResultsDisplay = ({ latestSingle, latestJodi }: ResultsDisplayProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-6 w-6" />
        <h3 className="text-xl font-bold">Latest Predictions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
          <h4 className="font-semibold mb-2">Single Number</h4>
          <div className="text-3xl font-bold text-center">
            {latestSingle !== null ? latestSingle : '?'}
          </div>
        </Card>
        <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
          <h4 className="font-semibold mb-2">Jodi Number</h4>
          <div className="text-3xl font-bold text-center">
            {latestJodi || '??'}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;
