
import { WheelSegment } from '@/types/spinGame';

export const wheelSegments: WheelSegment[] = [
  { multiplier: 2, probability: 25, color: 'bg-green-500' },
  { multiplier: 3, probability: 20, color: 'bg-blue-500' },
  { multiplier: 5, probability: 15, color: 'bg-yellow-500' },
  { multiplier: 10, probability: 12, color: 'bg-orange-500' },
  { multiplier: 15, probability: 10, color: 'bg-red-500' },
  { multiplier: 20, probability: 8, color: 'bg-purple-500' },
  { multiplier: 25, probability: 6, color: 'bg-pink-500' },
  { multiplier: 30, probability: 4, color: 'bg-indigo-500' },
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
  return 2; // fallback
};
