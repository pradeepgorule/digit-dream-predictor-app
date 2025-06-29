
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface JodiInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (betAmount: number) => void;
}

const JodiInput = ({ value, onChange, onSubmit }: JodiInputProps) => {
  const [betAmount, setBetAmount] = useState('10');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only allow numbers and limit to 2 digits
    if (/^\d{0,2}$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(amount)) {
      setBetAmount(amount);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const amount = parseInt(betAmount);
    if (amount >= 10) {
      onSubmit(amount);
    }
  };

  const betAmountNum = parseInt(betAmount) || 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Jodi Number (00-99)</h3>
      <div className="space-y-4">
        <div className="flex gap-3">
          <Input
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="00"
            className="text-center text-2xl font-bold h-12 max-w-24"
            maxLength={2}
          />
          <Input
            type="text"
            value={betAmount}
            onChange={handleBetAmountChange}
            placeholder="Bet Amount"
            className="text-center text-lg font-semibold h-12 max-w-32"
          />
          <Button
            onClick={handleSubmit}
            disabled={value.length !== 2 || betAmountNum < 10}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
          >
            Predict (₹{betAmountNum})
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          Enter a number from 00 to 99 • Minimum bet: ₹10 • Your bet: ₹{betAmountNum}
        </p>
      </div>
    </div>
  );
};

export default JodiInput;
