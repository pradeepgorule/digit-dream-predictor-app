
import React from 'react';
import { Button } from '@/components/ui/button';

interface NumberGridProps {
  selectedNumber: number | null;
  onNumberSelect: (number: number) => void;
  title: string;
}

const NumberGrid = ({ selectedNumber, onNumberSelect, title }: NumberGridProps) => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-5 gap-3">
        {numbers.map((number) => (
          <Button
            key={number}
            variant={selectedNumber === number ? "default" : "outline"}
            className={`h-12 w-12 text-lg font-bold transition-all duration-200 ${
              selectedNumber === number
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg scale-105"
                : "hover:bg-gray-50 hover:scale-105"
            }`}
            onClick={() => onNumberSelect(number)}
          >
            {number}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NumberGrid;
