
import React, { useState } from 'react';
import NumberGrid from '@/components/NumberGrid';
import JodiInput from '@/components/JodiInput';
import PredictionHistory from '@/components/PredictionHistory';
import ResultsDisplay from '@/components/ResultsDisplay';
import ResultsDeclaration from '@/components/ResultsDeclaration';
import WalletComponent from '@/components/Wallet';
import PopularNumbersBanner from '@/components/PopularNumbersBanner';
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
  const [declaredSingle, setDeclaredSingle] = useState<number | null>(null);
  const [declaredJodi, setDeclaredJodi] = useState<string | null>(null);
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

  const handleResultsDeclared = (singleDigit: number, jodiNumber: string) => {
    setDeclaredSingle(singleDigit);
    setDeclaredJodi(jodiNumber);
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
      {/* Popular Numbers Banner */}
      <PopularNumbersBanner />

      {/* Results Declaration */}
      <ResultsDeclaration onResultsDeclared={handleResultsDeclared} />

      {/* Wallet and Results Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletComponent balance={walletBalance} onAddMoney={handleAddMoney} />
        <ResultsDisplay latestSingle={latestSingle} latestJodi={latestJodi} />
      </div>

      {/* Declared Results Display */}
      {(declaredSingle !== null || declaredJodi !== null) && (
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Declared Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Winning Single Digit</h4>
              <div className="text-4xl font-bold bg-white/20 rounded-lg py-4">
                {declaredSingle !== null ? declaredSingle : '?'}
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Winning Jodi Number</h4>
              <div className="text-4xl font-bold bg-white/20 rounded-lg py-4">
                {declaredJodi || '??'}
              </div>
            </div>
          </div>
        </div>
      )}

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
