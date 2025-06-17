import React, { useState } from 'react';
import NumberGrid from '@/components/NumberGrid';
import JodiInput from '@/components/JodiInput';
import PredictionHistory from '@/components/PredictionHistory';
import ResultsDisplay from '@/components/ResultsDisplay';
import WalletComponent from '@/components/Wallet';
import Admin from './Admin';
import { TrendingUp, Settings, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface Prediction {
  id: string;
  type: 'single' | 'jodi';
  number: string;
  betAmount: number;
  timestamp: Date;
}

const Index = () => {
  const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
  const [jodiValue, setJodiValue] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [latestSingle, setLatestSingle] = useState<number | null>(null);
  const [latestJodi, setLatestJodi] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [currentView, setCurrentView] = useState<'user' | 'admin'>('user');
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
    setWalletBalance(prev => prev + amount);
  };

  const handleSinglePredict = (betAmount: number) => {
    if (walletBalance < betAmount) {
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
      setWalletBalance(prev => prev - betAmount);
      toast({
        title: "Single Number Predicted!",
        description: `Your prediction: ${selectedSingle} with ₹${betAmount} bet`,
      });
    }
  };

  const handleJodiPredict = (betAmount: number) => {
    if (walletBalance < betAmount) {
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
      setWalletBalance(prev => prev - betAmount);
      toast({
        title: "Jodi Number Predicted!",
        description: `Your prediction: ${formattedJodi} with ₹${betAmount} bet`,
      });
    }
  };

  if (currentView === 'admin') {
    return (
      <div>
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <Button 
                onClick={() => setCurrentView('user')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Back to User View
              </Button>
            </div>
          </div>
        </div>
        <Admin predictions={predictions} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Number Prediction Hub
              </h1>
            </div>
            <Button 
              onClick={() => setCurrentView('admin')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Admin View
            </Button>
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
    </div>
  );
};

export default Index;
