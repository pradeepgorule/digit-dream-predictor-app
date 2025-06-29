
import { WheelSegment } from '@/types/spinGame';

export const wheelSegments: WheelSegment[] = [
  { multiplier: 0, probability: 30, color: 'bg-gray-600' },
  { multiplier: 2, probability: 25, color: 'bg-green-500' },
  { multiplier: 3, probability: 15, color: 'bg-blue-500' },
  { multiplier: 5, probability: 12, color: 'bg-yellow-500' },
  { multiplier: 10, probability: 8, color: 'bg-orange-500' },
  { multiplier: 15, probability: 5, color: 'bg-red-500' },
  { multiplier: 20, probability: 3, color: 'bg-purple-500' },
  { multiplier: 25, probability: 2, color: 'bg-pink-500' },
];

export const getRandomMultiplier = (): number => {
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const segment of wheelSegments) {
    cumulative += segment.probability;
    if (random <= cumulative) {
      return segment.multiplier;
    }
  }
  return 0; // fallback to 0x
};
