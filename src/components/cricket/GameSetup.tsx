
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

interface GameSetupProps {
  totalOvers: number;
  setTotalOvers: (overs: number) => void;
  onStartMatch: () => void;
}

const GameSetup = ({ totalOvers, setTotalOvers, onStartMatch }: GameSetupProps) => {
  const { walletBalance, addMoney } = useWallet();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
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
          <Button onClick={onStartMatch}>
            Start Match
          </Button>
          <div className="ml-auto">
            <Badge variant="outline">Wallet: ₹{walletBalance}</Badge>
            <Button 
              variant="outline" 
              className="ml-2"
              onClick={() => addMoney(100)}
            >
              Add ₹100
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameSetup;
