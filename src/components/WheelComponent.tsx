
import React from 'react';
import { wheelSegments } from '@/utils/wheelUtils';

interface WheelComponentProps {
  wheelRotation: number;
  isSpinning: boolean;
}

const WheelComponent = ({ wheelRotation, isSpinning }: WheelComponentProps) => {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <div 
          className={`w-80 h-80 rounded-full border-8 border-gray-300 relative overflow-hidden transition-transform duration-3000 ease-out ${isSpinning ? 'animate-spin' : ''}`}
          style={{ transform: `rotate(${wheelRotation}deg)` }}
        >
          {wheelSegments.map((segment, index) => {
            const angle = (360 / wheelSegments.length) * index;
            return (
              <div
                key={index}
                className={`absolute w-1/2 h-1/2 ${segment.color} flex items-center justify-center text-white font-bold`}
                style={{
                  transformOrigin: 'right bottom',
                  transform: `rotate(${angle}deg)`,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              >
                <span className="text-xl">{segment.multiplier}x</span>
              </div>
            );
          })}
        </div>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-10 border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>
      </div>
    </div>
  );
};

export default WheelComponent;
