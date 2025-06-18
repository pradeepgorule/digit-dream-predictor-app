
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Cricket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OverStats {
  overNumber: number;
  sixes: number;
  fours: number;
  isOut: boolean;
  bets: {
    sixesBet?: number;
    foursBet?: number;
    outBet?: number;
  };
}

const CricketBettingGame = () => {
  const [totalOvers, setTotalOvers] = useState(20);
  const [currentOver, setCurrentOver] = useState(1);
  const [overs, setOvers] = useState<OverStats[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const { toast } = useToast();

  const initializeOvers = () => {
    const newOvers: OverStats[] = [];
    for (let i = 1; i <= totalOvers; i++) {
      newOvers.push({
        overNumber: i,
        sixes: 0,
        fours: 0,
        isOut: false,
        bets: {}
      });
    }
    setOvers(newOvers);
    setCurrentOver(1);
  };

  const placeBet = (overIndex: number, betType: 'sixes' | 'fours' | 'out', amount: number) => {
    if (walletBalance < amount) {
      toast({
        title: "Insufficient Balance",
        description: `Please add money to your wallet. Required: ₹${amount}`,
        variant: "destructive",
      });
      return;
    }

    setOvers(prev => {
      const updated = [...prev];
      updated[overIndex].bets = {
        ...updated[overIndex].bets,
        [`${betType}Bet`]: amount
      };
      return updated;
    });

    setWalletBalance(prev => prev - amount);
    toast({
      title: "Bet Placed!",
      description: `₹${amount} bet on ${betType} for Over ${overIndex + 1}`,
    });
  };

  const simulateOver = (overIndex: number) => {
    const sixes = Math.floor(Math.random() * 3); // 0-2 sixes
    const fours = Math.floor(Math.random() * 4); // 0-3 fours
    const isOut = Math.random() < 0.1; // 10% chance of getting out

    setOvers(prev => {
      const updated = [...prev];
      updated[overIndex] = {
        ...updated[overIndex],
        sixes,
        fours,
        isOut
      };
      return updated;
    });

    // Calculate winnings
    const over = overs[overIndex];
    let winnings = 0;
    
    if (over.bets.sixesBet && sixes > 0) {
      winnings += over.bets.sixesBet * 5; // 5x multiplier for sixes
    }
    if (over.bets.foursBet && fours > 0) {
      winnings += over.bets.foursBet * 3; // 3x multiplier for fours
    }
    if (over.bets.outBet && isOut) {
      winnings += over.bets.outBet * 10; // 10x multiplier for getting out
    }

    if (winnings > 0) {
      setWalletBalance(prev => prev + winnings);
      toast({
        title: "You Won!",
        description: `Won ₹${winnings} from Over ${overIndex + 1}`,
      });
    }

    toast({
      title: `Over ${overIndex + 1} Complete`,
      description: `${sixes} sixes, ${fours} fours${isOut ? ', Player Out!' : ''}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Game Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cricket className="h-5 w-5" />
            Cricket Betting Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="overs" className="text-sm font-medium">Total Overs:</label>
              <Input
                id="overs"
                type="number"
                min="20"
                max="50"
                value={totalOvers}
                onChange={(e) => setTotalOvers(Number(e.target.value))}
                className="w-20"
              />
            </div>
            <Button onClick={initializeOvers}>
              Start Match
            </Button>
            <div className="ml-auto">
              <Badge variant="outline">Wallet: ₹{walletBalance}</Badge>
              <Button 
                variant="outline" 
                className="ml-2"
                onClick={() => setWalletBalance(prev => prev + 100)}
              >
                Add ₹100
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overs Grid */}
      {overs.length > 0 && (
        <div className="grid gap-4">
          {overs.map((over, index) => (
            <Card key={over.overNumber} className={`${index < currentOver - 1 ? 'opacity-60' : ''}`}>
              <CardHeader>
                <CardTitle className="text-lg">Over {over.overNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Stats Display */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Results:</h4>
                    <div className="text-sm space-y-1">
                      <div>Sixes: {over.sixes}</div>
                      <div>Fours: {over.fours}</div>
                      <div>Out: {over.isOut ? 'Yes' : 'No'}</div>
                    </div>
                  </div>

                  {/* Betting Controls */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Bet on Sixes:</h4>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => placeBet(index, 'sixes', 10)}
                        disabled={index < currentOver - 1}
                      >
                        ₹10
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => placeBet(index, 'sixes', 50)}
                        disabled={index < currentOver - 1}
                      >
                        ₹50
                      </Button>
                    </div>
                    {over.bets.sixesBet && <Badge>Bet: ₹{over.bets.sixesBet}</Badge>}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Bet on Fours:</h4>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => placeBet(index, 'fours', 10)}
                        disabled={index < currentOver - 1}
                      >
                        ₹10
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => placeBet(index, 'fours', 50)}
                        disabled={index < currentOver - 1}
                      >
                        ₹50
                      </Button>
                    </div>
                    {over.bets.foursBet && <Badge>Bet: ₹{over.bets.foursBet}</Badge>}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Bet on Out:</h4>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => placeBet(index, 'out', 20)}
                        disabled={index < currentOver - 1}
                      >
                        ₹20
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => placeBet(index, 'out', 100)}
                        disabled={index < currentOver - 1}
                      >
                        ₹100
                      </Button>
                    </div>
                    {over.bets.outBet && <Badge>Bet: ₹{over.bets.outBet}</Badge>}
                  </div>
                </div>

                {/* Simulate Button */}
                {index === currentOver - 1 && (
                  <div className="mt-4">
                    <Button 
                      onClick={() => {
                        simulateOver(index);
                        setCurrentOver(prev => prev + 1);
                      }}
                    >
                      Play Over {over.overNumber}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CricketBettingGame;
