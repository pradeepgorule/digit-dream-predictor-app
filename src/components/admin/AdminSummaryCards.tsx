
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AdminSummaryCardsProps {
  totalSinglePredictions: number;
  totalJodiPredictions: number;
  totalBetAmount: number;
  lowPredictionNumbers: number;
}

const AdminSummaryCards = ({ 
  totalSinglePredictions, 
  totalJodiPredictions, 
  totalBetAmount, 
  lowPredictionNumbers 
}: AdminSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Single Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{totalSinglePredictions}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Jodi Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{totalJodiPredictions}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Bet Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">₹{totalBetAmount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Low Prediction Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{lowPredictionNumbers}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSummaryCards;
