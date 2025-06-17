
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface JodiInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const JodiInput = ({ value, onChange, onSubmit }: JodiInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only allow numbers and limit to 2 digits
    if (/^\d{0,2}$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Jodi Number (00-99)</h3>
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
        <Button
          onClick={onSubmit}
          disabled={value.length !== 2}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
        >
          Predict
        </Button>
      </div>
      <p className="text-sm text-gray-500 mt-2">Enter a number from 00 to 99</p>
    </div>
  );
};

export default JodiInput;
