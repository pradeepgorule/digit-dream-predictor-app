
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RotateCw } from 'lucide-react';

interface BettingControlsProps {
  betAmount: number;
  setBetAmount: (amount: number) => void;
  isSpinning: boolean;
  isDisabled: boolean;
  onSpin: () => void;
}

const BettingControls = ({ 
  betAmount, 
  setBetAmount, 
  isSpinning, 
  isDisabled, 
  onSpin 
}: BettingControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="bet" className="text-sm font-medium">Bet Amount:</label>
        <Input
          id="bet"
          type="number"
          min="10"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="w-24"
        />
      </div>
      <Button 
        onClick={onSpin}
        disabled={isDisabled}
        className="flex items-center gap-2"
      >
        <RotateCw className={`h-4 w-4 ${isSpinning ? 'animate-spin' : ''}`} />
        {isSpinning ? 'Spinning...' : 'Spin Now'}
      </Button>
    </div>
  );
};

export default BettingControls;
