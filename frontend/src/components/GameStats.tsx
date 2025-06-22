
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GameStatsProps {
  walletBalance: number;
  dailyEarnings: number;
  totalSpins: number;
  maxDailyEarnings: number;
  onAddMoney: () => void;
}

const GameStats = ({ 
  walletBalance, 
  dailyEarnings, 
  totalSpins, 
  maxDailyEarnings, 
  onAddMoney 
}: GameStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">₹{walletBalance}</div>
          <div className="text-sm text-gray-600">Wallet Balance</div>
          <Button 
            variant="outline" 
            size="sm"
            className="mt-2"
            onClick={onAddMoney}
          >
            Add ₹100
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">₹{dailyEarnings}</div>
          <div className="text-sm text-gray-600">Daily Earnings</div>
          <div className="text-xs text-gray-500">Max: ₹{maxDailyEarnings}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">{totalSpins}</div>
          <div className="text-sm text-gray-600">Total Spins</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameStats;
