
import React, { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { OverStats } from '@/types/cricketGame';
import GameSetup from '@/components/cricket/GameSetup';
import OverCard from '@/components/cricket/OverCard';

const CricketBettingGame = () => {
  const { deductMoney, addMoney } = useWallet();
  const [totalOvers, setTotalOvers] = useState(20);
  const [currentOver, setCurrentOver] = useState(1);
  const [overs, setOvers] = useState<OverStats[]>([]);
  const { toast } = useToast();

  const initializeOvers = () => {
    const newOvers: OverStats[] = [];
    for (let i = 1; i <= totalOvers; i++) {
      newOvers.push({
        overNumber: i,
        sixes: 0,
        fours: 0,
        isOut: false,
        bets: {},
        isSkipped: false
      });
    }
    setOvers(newOvers);
    setCurrentOver(1);
  };

  const placeBet = (overIndex: number, betType: 'sixes' | 'fours' | 'out', amount: number) => {
    setOvers(prev => {
      const updated = [...prev];
      updated[overIndex].bets = {
        ...updated[overIndex].bets,
        [`${betType}Bet`]: amount
      };
      return updated;
    });

    toast({
      title: "Bet Placed!",
      description: `₹${amount} bet on ${betType} for Over ${overIndex + 1}`,
    });
  };

  const simulateOver = (overIndex: number) => {
    const over = overs[overIndex];
    const totalBetAmount = (over.bets.sixesBet || 0) + (over.bets.foursBet || 0) + (over.bets.outBet || 0);
    
    // Deduct money only when playing the over
    if (totalBetAmount > 0 && !deductMoney(totalBetAmount)) {
      toast({
        title: "Insufficient Balance",
        description: `Please add money to your wallet. Required: ₹${totalBetAmount}`,
        variant: "destructive",
      });
      return;
    }

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
      addMoney(winnings);
      toast({
        title: "You Won!",
        description: `Won ₹${winnings} from Over ${overIndex + 1}`,
      });
    }

    toast({
      title: `Over ${overIndex + 1} Complete`,
      description: `${sixes} sixes, ${fours} fours${isOut ? ', Player Out!' : ''}`,
    });

    setCurrentOver(prev => prev + 1);
  };

  const skipOver = (overIndex: number) => {
    setOvers(prev => {
      const updated = [...prev];
      updated[overIndex] = {
        ...updated[overIndex],
        isSkipped: true
      };
      return updated;
    });

    toast({
      title: "Over Skipped",
      description: `Over ${overIndex + 1} has been skipped`,
    });

    setCurrentOver(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <GameSetup
        totalOvers={totalOvers}
        setTotalOvers={setTotalOvers}
        onStartMatch={initializeOvers}
      />

      {overs.length > 0 && (
        <div className="grid gap-4">
          {overs.map((over, index) => (
            <OverCard
              key={over.overNumber}
              over={over}
              index={index}
              currentOver={currentOver}
              onPlaceBet={placeBet}
              onSimulateOver={simulateOver}
              onSkipOver={skipOver}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CricketBettingGame;
