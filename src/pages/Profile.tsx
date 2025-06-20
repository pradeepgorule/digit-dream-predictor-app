
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User, Trophy, TrendingUp, Gamepad2, History } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

interface GameHistoryItem {
  id: string;
  game: 'Number Prediction' | 'Cricket Betting' | 'Spin & Win';
  type: string;
  amount: number;
  result: 'win' | 'loss';
  winAmount?: number;
  timestamp: Date;
}

// Mock data for game history - in a real app this would come from a database
const mockGameHistory: GameHistoryItem[] = [
  {
    id: '1',
    game: 'Number Prediction',
    type: 'Single: 7',
    amount: 50,
    result: 'win',
    winAmount: 150,
    timestamp: new Date(2024, 5, 19, 14, 30)
  },
  {
    id: '2',
    game: 'Cricket Betting',
    type: 'Over 5 - Sixes',
    amount: 30,
    result: 'loss',
    timestamp: new Date(2024, 5, 19, 13, 15)
  },
  {
    id: '3',
    game: 'Spin & Win',
    type: '3x Multiplier',
    amount: 20,
    result: 'win',
    winAmount: 60,
    timestamp: new Date(2024, 5, 19, 12, 45)
  },
  {
    id: '4',
    game: 'Number Prediction',
    type: 'Jodi: 45',
    amount: 100,
    result: 'loss',
    timestamp: new Date(2024, 5, 19, 11, 20)
  },
  {
    id: '5',
    game: 'Cricket Betting',
    type: 'Over 3 - Fours',
    amount: 25,
    result: 'win',
    winAmount: 75,
    timestamp: new Date(2024, 5, 19, 10, 10)
  }
];

const Profile = () => {
  const { walletBalance } = useWallet();

  const getGameIcon = (game: string) => {
    switch (game) {
      case 'Number Prediction':
        return <TrendingUp className="h-4 w-4" />;
      case 'Cricket Betting':
        return <Trophy className="h-4 w-4" />;
      case 'Spin & Win':
        return <Gamepad2 className="h-4 w-4" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  const totalWins = mockGameHistory.filter(item => item.result === 'win').length;
  const totalLosses = mockGameHistory.filter(item => item.result === 'loss').length;
  const totalWinAmount = mockGameHistory
    .filter(item => item.result === 'win')
    .reduce((sum, item) => sum + (item.winAmount || 0), 0);
  const totalBetAmount = mockGameHistory.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">₹{walletBalance}</div>
                <div className="text-sm text-gray-600">Current Balance</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{totalWins}</div>
                <div className="text-sm text-gray-600">Total Wins</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{totalLosses}</div>
                <div className="text-sm text-gray-600">Total Losses</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">₹{totalWinAmount}</div>
                <div className="text-sm text-gray-600">Total Winnings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Game History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Bet Amount</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Win Amount</TableHead>
                  <TableHead>Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGameHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getGameIcon(item.game)}
                        <span className="font-medium">{item.game}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>₹{item.amount}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.result === 'win' ? 'default' : 'destructive'}
                        className={item.result === 'win' ? 'bg-green-500 hover:bg-green-600' : ''}
                      >
                        {item.result === 'win' ? 'Win' : 'Loss'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.result === 'win' && item.winAmount ? `₹${item.winAmount}` : '-'}
                    </TableCell>
                    <TableCell>
                      {item.timestamp.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })} {item.timestamp.toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
