
import React from 'react';
import { wheelSegments } from '@/utils/wheelUtils';

interface WheelComponentProps {
  wheelRotation: number;
  isSpinning: boolean;
}

const WheelComponent = ({ wheelRotation, isSpinning }: WheelComponentProps) => {
  const segmentAngle = 360 / wheelSegments.length;
  
  return (
    <div className="flex justify-center">
      <div className="relative">
        {/* Outer ring decoration */}
        <div className="absolute inset-0 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl animate-pulse"></div>
        
        {/* Main wheel */}
        <div 
          className={`relative w-80 h-80 m-8 rounded-full border-8 border-yellow-400 shadow-xl overflow-hidden transition-transform ${
            isSpinning 
              ? 'duration-[4000ms] ease-out' 
              : 'duration-1000 ease-out'
          }`}
          style={{ 
            transform: `rotate(${wheelRotation}deg)`,
            background: 'conic-gradient(from 0deg, #f59e0b, #eab308, #f59e0b)'
          }}
        >
          {wheelSegments.map((segment, index) => {
            const rotation = segmentAngle * index;
            return (
              <div
                key={index}
                className={`absolute w-full h-full ${segment.color} flex items-center justify-center`}
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%)`,
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <div 
                  className="text-white font-bold text-lg drop-shadow-lg"
                  style={{ transform: `rotate(${segmentAngle / 2}deg)` }}
                >
                  {segment.multiplier === 0 ? '0x' : `${segment.multiplier}x`}
                </div>
              </div>
            );
          })}
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border-4 border-yellow-400 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          </div>
        </div>
        
        {/* Pointer */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600 drop-shadow-lg"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full"></div>
          </div>
        </div>
        
        {/* Spinning glow effect */}
        {isSpinning && (
          <div className="absolute inset-0 w-96 h-96 rounded-full bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent animate-spin"></div>
        )}
      </div>
    </div>
  );
};

export default WheelComponent;
