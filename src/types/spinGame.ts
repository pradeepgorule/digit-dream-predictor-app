
export interface SpinResult {
  multiplier: number;
  winAmount: number;
  timestamp: Date;
}

export interface WheelSegment {
  multiplier: number;
  probability: number;
  color: string;
}
