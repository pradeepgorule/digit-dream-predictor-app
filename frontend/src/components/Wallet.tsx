
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wallet, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletProps {
  balance: number;
  onAddMoney: (amount: number) => void;
}

const WalletComponent = ({ balance, onAddMoney }: WalletProps) => {
  const [addAmount, setAddAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddMoney = () => {
    const amount = parseInt(addAmount);
    
    if (!amount || amount < 10) {
      toast({
        title: "Invalid Amount",
        description: "Minimum amount is ₹10",
        variant: "destructive",
      });
      return;
    }

    onAddMoney(amount);
    setAddAmount('');
    setIsAdding(false);
    toast({
      title: "Money Added!",
      description: `₹${amount} added to your wallet`,
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          <h3 className="text-xl font-bold">Wallet Balance</h3>
        </div>
        <div className="text-3xl font-bold">₹{balance}</div>
      </div>
      
      {!isAdding ? (
        <Button
          onClick={() => setIsAdding(true)}
          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Money
        </Button>
      ) : (
        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Enter amount (min ₹10)"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
            min="10"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleAddMoney}
              className="flex-1 bg-white text-green-600 hover:bg-white/90"
            >
              Add ₹{addAmount || '0'}
            </Button>
            <Button
              onClick={() => {
                setIsAdding(false);
                setAddAmount('');
              }}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Cancel
            </Button>
          </div>
          <p className="text-sm text-white/80">Minimum amount: ₹10</p>
        </div>
      )}
    </Card>
  );
};

export default WalletComponent;
