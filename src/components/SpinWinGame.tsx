
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SpinResult {
  multiplier: number;
  winAmount: number;
  timestamp: Date;
}

const SpinWinGame = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [betAmount, setBetAmount] = useState(10);
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResults, setSpinResults] = useState<SpinResult[]>([]);
  const [wheelRotation, setWheelRotation] = useState(0);
  const { toast } = useToast();

  // Wheel segments with different multipliers and probabilities - increased high multiplier chances
  const wheelSegments = [
    { multiplier: 2, probability: 25, color: 'bg-green-500' },
    { multiplier: 3, probability: 20, color: 'bg-blue-500' },
    { multiplier: 5, probability: 15, color: 'bg-yellow-500' },
    { multiplier: 10, probability: 12, color: 'bg-orange-500' },
    { multiplier: 15, probability: 10, color: 'bg-red-500' },
    { multiplier: 20, probability: 8, color: 'bg-purple-500' },
    { multiplier: 25, probability: 6, color: 'bg-pink-500' },
    { multiplier: 30, probability: 4, color: 'bg-indigo-500' },
  ];

  const MAX_DAILY_EARNINGS = 200;

  const getRandomMultiplier = () => {
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

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">₹{walletBalance}</div>
            <div className="text-sm text-gray-600">Wallet Balance</div>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-2"
              onClick={() => setWalletBalance(prev => prev + 100)}
            >
              Add ₹100
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">₹{dailyEarnings}</div>
            <div className="text-sm text-gray-600">Daily Earnings</div>
            <div className="text-xs text-gray-500">Max: ₹{MAX_DAILY_EARNINGS}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{spinResults.length}</div>
            <div className="text-sm text-gray-600">Total Spins</div>
          </CardContent>
        </Card>
      </div>

      {/* Spin Wheel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Spin & Win
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wheel - Made larger */}
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

          {/* Betting Controls */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="bet" className="text-sm font-medium">Bet Amount:</label>
              <Input
                id="bet"
                type="number"
                min="10"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="w-24"
              />
            </div>
            <Button 
              onClick={spinWheel}
              disabled={isSpinning || dailyEarnings >= MAX_DAILY_EARNINGS}
              className="flex items-center gap-2"
            >
              <RotateCw className={`h-4 w-4 ${isSpinning ? 'animate-spin' : ''}`} />
              {isSpinning ? 'Spinning...' : 'Spin Now'}
            </Button>
          </div>

          {/* Multiplier Legend */}
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
        </CardContent>
      </Card>

      {/* Recent Results */}
      {spinResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Spins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {spinResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <Badge variant="outline">{result.multiplier}x</Badge>
                    <span className="ml-2 text-sm text-gray-600">
                      {result.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className={`font-medium ${result.winAmount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.winAmount > 0 ? `+₹${result.winAmount}` : '₹0'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpinWinGame;
