
import React from 'react';
import { wheelSegments } from '@/utils/wheelUtils';

const MultiplierLegend = () => {
  return (
    <div>
      <h4 className="font-medium mb-2">Multipliers:</h4>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {wheelSegments.map(segment => (
          <div key={segment.multiplier} className="text-center">
            <div className={`w-8 h-8 ${segment.color} rounded mx-auto mb-1`}></div>
            <div className="text-xs">{segment.multiplier}x</div>
            <div className="text-xs text-gray-500">{segment.probability}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiplierLegend;
