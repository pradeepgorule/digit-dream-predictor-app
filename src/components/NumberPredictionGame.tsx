
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dice1, Hash, TrendingUp, Clock } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import Wallet from '@/components/Wallet';

const NumberPredictionGame = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [jodiNumber, setJodiNumber] = useState('');
  const [betAmount, setBetAmount] = useState(10);
  const [predictions, setPredictions] = useState<any[]>([]);
  const { walletBalance, deductMoney } = useWallet();
  const { toast } = useToast();

  const handleNumberSelect = (number: number) => {
    setSelectedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      } else {
        return [...prev, number];
      }
    });
  };

  const handleJodiNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      setJodiNumber(value);
    }
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= walletBalance) {
      setBetAmount(value);
    }
  };

  const handlePlaceSingleBet = () => {
    if (selectedNumbers.length === 0) {
      toast({
        title: "No numbers selected",
        description: "Please select at least one number to predict.",
        variant: "destructive",
      });
      return;
    }

    if (betAmount > walletBalance) {
      toast({
        title: "Insufficient balance",
        description: "You do not have enough balance to place this bet.",
        variant: "destructive",
      });
      return;
    }

    const success = deductMoney(betAmount);
    if (!success) {
      toast({
        title: "Insufficient balance",
        description: "You do not have enough balance to place this bet.",
        variant: "destructive",
      });
      return;
    }

    const newPrediction = {
      id: Date.now(),
      type: 'single',
      numbers: selectedNumbers,
      amount: betAmount,
      timestamp: new Date(),
    };

    setPredictions(prev => [...prev, newPrediction]);
    setSelectedNumbers([]);

    toast({
      title: "Bet placed!",
      description: `₹${betAmount} placed on numbers ${selectedNumbers.join(', ')}`,
    });
  };

  const handlePlaceJodiBet = () => {
    if (jodiNumber.length !== 2) {
      toast({
        title: "Invalid Jodi Number",
        description: "Please enter a valid two-digit jodi number.",
        variant: "destructive",
      });
      return;
    }

    if (betAmount > walletBalance) {
      toast({
        title: "Insufficient balance",
        description: "You do not have enough balance to place this bet.",
        variant: "destructive",
      });
      return;
    }

    const success = deductMoney(betAmount);
    if (!success) {
      toast({
        title: "Insufficient balance",
        description: "You do not have enough balance to place this bet.",
        variant: "destructive",
      });
      return;
    }

    const newPrediction = {
      id: Date.now(),
      type: 'jodi',
      jodiNumber: jodiNumber,
      amount: betAmount,
      timestamp: new Date(),
    };

    setPredictions(prev => [...prev, newPrediction]);
    setJodiNumber('');

    toast({
      title: "Jodi bet placed!",
      description: `₹${betAmount} placed on jodi number ${jodiNumber}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Dice1 className="h-8 w-8" />
              Number Prediction Game
            </CardTitle>
            <p className="opacity-90">Predict single numbers (0-9) or jodi pairs (00-99)</p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Single Number Prediction (0-9)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <Button
                key={number}
                variant={selectedNumbers.includes(number) ? 'default' : 'outline'}
                onClick={() => handleNumberSelect(number)}
                className="w-full"
              >
                {number}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Jodi Number Prediction (00-99)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jodi-number">Enter Jodi Number:</Label>
              <Input
                type="text"
                id="jodi-number"
                placeholder="Enter 2-digit number"
                value={jodiNumber}
                onChange={handleJodiNumberChange}
                maxLength={2}
              />
            </div>
            <Button onClick={handlePlaceJodiBet} className="w-full">
              Predict Jodi Number
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Betting Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bet-amount">Enter Bet Amount (₹):</Label>
              <Input
                type="number"
                id="bet-amount"
                placeholder="Enter amount"
                value={betAmount}
                onChange={handleBetAmountChange}
                min="10"
                max={walletBalance}
              />
            </div>
            <Button onClick={handlePlaceSingleBet} className="w-full">
              Place Single Number Bet
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {predictions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No predictions yet</p>
            ) : (
              <div className="space-y-3">
                {predictions.slice(-5).reverse().map((prediction) => (
                  <div key={prediction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant={prediction.type === 'single' ? 'default' : 'secondary'}>
                        {prediction.type}
                      </Badge>
                      <span className="font-mono text-lg">
                        {prediction.type === 'single' 
                          ? prediction.numbers.join(', ') 
                          : prediction.jodiNumber
                        }
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{prediction.amount}</div>
                      <div className="text-sm text-gray-500">
                        {prediction.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Wallet />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Predictions:</span>
              <span className="font-semibold">{predictions.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Single Predictions:</span>
              <span className="font-semibold">
                {predictions.filter(p => p.type === 'single').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Jodi Predictions:</span>
              <span className="font-semibold">
                {predictions.filter(p => p.type === 'jodi').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount Bet:</span>
              <span className="font-semibold text-green-600">
                ₹{predictions.reduce((sum, p) => sum + p.amount, 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NumberPredictionGame;
