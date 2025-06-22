
export interface OverStats {
  overNumber: number;
  sixes: number;
  fours: number;
  isOut: boolean;
  bets: {
    sixesBet?: number;
    foursBet?: number;
    outBet?: number;
  };
  isSkipped?: boolean;
}
