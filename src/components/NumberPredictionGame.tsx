
import React, { useState } from 'react';
import NumberGrid from '@/components/NumberGrid';
import JodiInput from '@/components/JodiInput';
import PredictionHistory from '@/components/PredictionHistory';
import ResultsDisplay from '@/components/ResultsDisplay';
import WalletComponent from '@/components/Wallet';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';

interface Prediction {
  id: string;
  type: 'single' | 'jodi';
  number: string;
  betAmount: number;
  timestamp: Date;
}

const NumberPredictionGame = () => {
  const { walletBalance, deductMoney, addMoney } = useWallet();
  const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
  const [jodiValue, setJodiValue] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [latestSingle, setLatestSingle] = useState<number | null>(null);
  const [latestJodi, setLatestJodi] = useState<string | null>(null);
  const { toast } = useToast();

  const addPrediction = (type: 'single' | 'jodi', number: string, betAmount: number) => {
    const newPrediction: Prediction = {
      id: Date.now().toString(),
      type,
      number,
      betAmount,
      timestamp: new Date(),
    };
    setPredictions(prev => [newPrediction, ...prev.slice(0, 9)]); // Keep last 10 predictions
  };

  const handleAddMoney = (amount: number) => {
    addMoney(amount);
  };

  const handleSinglePredict = (betAmount: number) => {
    if (!deductMoney(betAmount)) {
      toast({
        title: "Insufficient Balance",
        description: `Please add money to your wallet. Required: ₹${betAmount}`,
        variant: "destructive",
      });
      return;
    }

    if (selectedSingle !== null) {
      addPrediction('single', selectedSingle.toString(), betAmount);
      setLatestSingle(selectedSingle);
      toast({
        title: "Single Number Predicted!",
        description: `Your prediction: ${selectedSingle} with ₹${betAmount} bet`,
      });
    }
  };

  const handleJodiPredict = (betAmount: number) => {
    if (!deductMoney(betAmount)) {
      toast({
        title: "Insufficient Balance",
        description: `Please add money to your wallet. Required: ₹${betAmount}`,
        variant: "destructive",
      });
      return;
    }

    if (jodiValue.length === 2) {
      const formattedJodi = jodiValue.padStart(2, '0');
      addPrediction('jodi', formattedJodi, betAmount);
      setLatestJodi(formattedJodi);
      setJodiValue('');
      toast({
        title: "Jodi Number Predicted!",
        description: `Your prediction: ${formattedJodi} with ₹${betAmount} bet`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet and Results Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletComponent balance={walletBalance} onAddMoney={handleAddMoney} />
        <ResultsDisplay latestSingle={latestSingle} latestJodi={latestJodi} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prediction Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Single Number Prediction */}
          <NumberGrid
            selectedNumber={selectedSingle}
            onNumberSelect={setSelectedSingle}
            onPredict={handleSinglePredict}
            title="Single Number Prediction (0-9)"
          />

          {/* Jodi Number Prediction */}
          <JodiInput
            value={jodiValue}
            onChange={setJodiValue}
            onSubmit={handleJodiPredict}
          />
        </div>

        {/* Prediction History */}
        <div className="lg:col-span-1">
          <PredictionHistory predictions={predictions} />
        </div>
      </div>
    </div>
  );
};

export default NumberPredictionGame;
