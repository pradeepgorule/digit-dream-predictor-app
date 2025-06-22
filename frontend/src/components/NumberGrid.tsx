
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NumberGridProps {
  selectedNumber: number | null;
  onNumberSelect: (number: number) => void;
  onPredict: (betAmount: number) => void;
  title: string;
}

const NumberGrid = ({ selectedNumber, onNumberSelect, onPredict, title }: NumberGridProps) => {
  const [betAmount, setBetAmount] = useState('10');

  const numbers = Array.from({ length: 10 }, (_, i) => i);

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(amount)) {
      setBetAmount(amount);
    }
  };

  const handlePredict = () => {
    const amount = parseInt(betAmount);
    if (amount >= 10 && selectedNumber !== null) {
      onPredict(amount);
    }
  };

  const betAmountNum = parseInt(betAmount) || 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      
      <div className="grid grid-cols-5 gap-3 mb-6">
        {numbers.map((number) => (
          <Button
            key={number}
            onClick={() => onNumberSelect(number)}
            variant={selectedNumber === number ? "default" : "outline"}
            className={`h-12 w-12 text-lg font-bold ${
              selectedNumber === number
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'hover:bg-purple-50 hover:border-purple-300'
            }`}
          >
            {number}
          </Button>
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <Input
          type="text"
          value={betAmount}
          onChange={handleBetAmountChange}
          placeholder="Bet Amount"
          className="text-center text-lg font-semibold h-12 max-w-32"
        />
        <Button
          onClick={handlePredict}
          disabled={selectedNumber === null || betAmountNum < 10}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 flex-1"
        >
          Predict Number {selectedNumber !== null ? selectedNumber : ''} (₹{betAmountNum})
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        Select a number from 0-9 • Minimum bet: ₹10 • Your bet: ₹{betAmountNum}
      </p>
    </div>
  );
};

export default NumberGrid;
