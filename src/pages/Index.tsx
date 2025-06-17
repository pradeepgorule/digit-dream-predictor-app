
import React, { useState } from 'react';
import NumberGrid from '@/components/NumberGrid';
import JodiInput from '@/components/JodiInput';
import PredictionHistory from '@/components/PredictionHistory';
import ResultsDisplay from '@/components/ResultsDisplay';
import WalletComponent from '@/components/Wallet';
import { Button } from '@/components/ui/button';
import { TrendingUp, Dice6 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Prediction {
  id: string;
  type: 'single' | 'jodi';
  number: string;
  timestamp: Date;
}

const Index = () => {
  const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
  const [jodiValue, setJodiValue] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [latestSingle, setLatestSingle] = useState<number | null>(null);
  const [latestJodi, setLatestJodi] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const { toast } = useToast();

  const addPrediction = (type: 'single' | 'jodi', number: string) => {
    const newPrediction: Prediction = {
      id: Date.now().toString(),
      type,
      number,
      timestamp: new Date(),
    };
    setPredictions(prev => [newPrediction, ...prev.slice(0, 9)]); // Keep last 10 predictions
  };

  const handleAddMoney = (amount: number) => {
    setWalletBalance(prev => prev + amount);
  };

  const handleSinglePredict = () => {
    if (walletBalance < 10) {
      toast({
        title: "Insufficient Balance",
        description: "Please add money to your wallet. Minimum balance required: ₹10",
        variant: "destructive",
      });
      return;
    }

    if (selectedSingle !== null) {
      addPrediction('single', selectedSingle.toString());
      setLatestSingle(selectedSingle);
      setWalletBalance(prev => prev - 10); // Deduct ₹10 for prediction
      toast({
        title: "Single Number Predicted!",
        description: `Your prediction: ${selectedSingle} (₹10 deducted)`,
      });
    }
  };

  const handleJodiPredict = () => {
    if (walletBalance < 10) {
      toast({
        title: "Insufficient Balance",
        description: "Please add money to your wallet. Minimum balance required: ₹10",
        variant: "destructive",
      });
      return;
    }

    if (jodiValue.length === 2) {
      const formattedJodi = jodiValue.padStart(2, '0');
      addPrediction('jodi', formattedJodi);
      setLatestJodi(formattedJodi);
      setJodiValue('');
      setWalletBalance(prev => prev - 10); // Deduct ₹10 for prediction
      toast({
        title: "Jodi Number Predicted!",
        description: `Your prediction: ${formattedJodi} (₹10 deducted)`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Number Prediction Hub
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet and Results Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <WalletComponent balance={walletBalance} onAddMoney={handleAddMoney} />
          <ResultsDisplay latestSingle={latestSingle} latestJodi={latestJodi} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prediction Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Single Number Prediction */}
            <div className="space-y-4">
              <NumberGrid
                selectedNumber={selectedSingle}
                onNumberSelect={setSelectedSingle}
                title="Single Number Prediction (0-9)"
              />
              <div className="flex justify-center">
                <Button
                  onClick={handleSinglePredict}
                  disabled={selectedSingle === null || walletBalance < 10}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-2 text-lg"
                >
                  <Dice6 className="h-5 w-5 mr-2" />
                  Predict Single Number (₹10)
                </Button>
              </div>
              {walletBalance < 10 && (
                <p className="text-center text-sm text-red-600">
                  Insufficient balance. Please add money to your wallet.
                </p>
              )}
            </div>

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
    </div>
  );
};

export default Index;
