
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Gamepad2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SpinResult } from '@/types/spinGame';
import { getRandomMultiplier } from '@/utils/wheelUtils';
import GameStats from '@/components/GameStats';
import WheelComponent from '@/components/WheelComponent';
import BettingControls from '@/components/BettingControls';
import MultiplierLegend from '@/components/MultiplierLegend';
import RecentResults from '@/components/RecentResults';

const SpinWinGame = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [betAmount, setBetAmount] = useState(10);
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResults, setSpinResults] = useState<SpinResult[]>([]);
  const [wheelRotation, setWheelRotation] = useState(0);
  const { toast } = useToast();

  const MAX_DAILY_EARNINGS = 200;

  const spinWheel = async () => {
    if (walletBalance < betAmount) {
      toast({
        title: "Insufficient Balance",
        description: `Please add money to your wallet. Required: ₹${betAmount}`,
        variant: "destructive",
      });
      return;
    }

    if (dailyEarnings >= MAX_DAILY_EARNINGS) {
      toast({
        title: "Daily Limit Reached",
        description: `You've reached the daily earning limit of ₹${MAX_DAILY_EARNINGS}`,
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    setWalletBalance(prev => prev - betAmount);

    // Animate wheel
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = wheelRotation + (spins * 360);
    setWheelRotation(finalRotation);

    // Wait for animation
    setTimeout(() => {
      const multiplier = getRandomMultiplier();
      let winAmount = 0;
      let actualWin = false;

      // High multiplier control: users won't win on 15x or higher
      if (multiplier >= 15) {
        // They don't win, but we show the animation
        winAmount = 0;
        toast({
          title: "Almost!",
          description: `Landed on ${multiplier}x but luck wasn't on your side this time!`,
          variant: "destructive",
        });
      } else {
        winAmount = betAmount * multiplier;
        const potentialEarnings = dailyEarnings + (winAmount - betAmount);
        
        if (potentialEarnings > MAX_DAILY_EARNINGS) {
          // Cap the winnings to daily limit
          winAmount = betAmount + (MAX_DAILY_EARNINGS - dailyEarnings);
          actualWin = true;
        } else {
          actualWin = true;
        }

        if (actualWin) {
          setWalletBalance(prev => prev + winAmount);
          setDailyEarnings(prev => prev + (winAmount - betAmount));
          toast({
            title: "Congratulations!",
            description: `You won ₹${winAmount} with ${multiplier}x multiplier!`,
          });
        }
      }

      const result: SpinResult = {
        multiplier,
        winAmount: actualWin ? winAmount : 0,
        timestamp: new Date(),
      };

      setSpinResults(prev => [result, ...prev.slice(0, 9)]);
      setIsSpinning(false);
    }, 3000);
  };

  // Reset daily earnings at midnight (simplified)
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      setDailyEarnings(0);
      toast({
        title: "Daily Reset",
        description: "Your daily earnings have been reset!",
      });
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [toast]);

  const handleAddMoney = () => {
    setWalletBalance(prev => prev + 100);
  };

  return (
    <div className="space-y-6">
      <GameStats
        walletBalance={walletBalance}
        dailyEarnings={dailyEarnings}
        totalSpins={spinResults.length}
        maxDailyEarnings={MAX_DAILY_EARNINGS}
        onAddMoney={handleAddMoney}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Spin & Win
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <WheelComponent
            wheelRotation={wheelRotation}
            isSpinning={isSpinning}
          />

          <BettingControls
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            isSpinning={isSpinning}
            isDisabled={isSpinning || dailyEarnings >= MAX_DAILY_EARNINGS}
            onSpin={spinWheel}
          />

          <MultiplierLegend />
        </CardContent>
      </Card>

      <RecentResults spinResults={spinResults} />
    </div>
  );
};

export default SpinWinGame;
