
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, TrendingDown, Hash, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration - in a real app this would come from your backend
const mockPredictions = [
  { id: '1', type: 'single' as const, number: '5', betAmount: 50, timestamp: new Date() },
  { id: '2', type: 'jodi' as const, number: '23', betAmount: 100, timestamp: new Date() },
  { id: '3', type: 'single' as const, number: '7', betAmount: 25, timestamp: new Date() },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Analyze single number predictions
  const singleNumberStats = React.useMemo(() => {
    const stats: Record<string, { count: number; totalBets: number }> = {};
    
    // Initialize all numbers 0-9
    for (let i = 0; i <= 9; i++) {
      stats[i.toString()] = { count: 0, totalBets: 0 };
    }
    
    mockPredictions
      .filter(p => p.type === 'single')
      .forEach(p => {
        stats[p.number].count++;
        stats[p.number].totalBets += p.betAmount;
      });
    
    return Object.entries(stats).map(([number, data]) => ({
      number,
      count: data.count,
      totalBets: data.totalBets,
      avgBet: data.count > 0 ? Math.round(data.totalBets / data.count) : 0
    })).sort((a, b) => a.count - b.count);
  }, []);

  // Analyze jodi number predictions
  const jodiNumberStats = React.useMemo(() => {
    const stats: Record<string, { count: number; totalBets: number }> = {};
    
    mockPredictions
      .filter(p => p.type === 'jodi')
      .forEach(p => {
        if (!stats[p.number]) {
          stats[p.number] = { count: 0, totalBets: 0 };
        }
        stats[p.number].count++;
        stats[p.number].totalBets += p.betAmount;
      });
    
    return Object.entries(stats).map(([number, data]) => ({
      number,
      count: data.count,
      totalBets: data.totalBets,
      avgBet: Math.round(data.totalBets / data.count)
    })).sort((a, b) => a.count - b.count);
  }, []);

  const totalSinglePredictions = mockPredictions.filter(p => p.type === 'single').length;
  const totalJodiPredictions = mockPredictions.filter(p => p.type === 'jodi').length;
  const totalBetAmount = mockPredictions.reduce((sum, p) => sum + p.betAmount, 0);

  const lowSingleNumbers = singleNumberStats.filter(s => s.count <= 1);
  const lowJodiNumbers = jodiNumberStats.filter(s => s.count <= 1);

  const handleLogout = () => {
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
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
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Single Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalSinglePredictions}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Jodi Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{totalJodiPredictions}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bet Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalBetAmount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Low Prediction Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{lowSingleNumbers.length + lowJodiNumbers.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Single Number Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-blue-600" />
                Single Number Analytics (0-9)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Predictions</TableHead>
                    <TableHead>Total Bets</TableHead>
                    <TableHead>Avg Bet</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {singleNumberStats.map((stat) => (
                    <TableRow 
                      key={stat.number}
                      className={stat.count <= 1 ? 'bg-red-50 text-red-800' : ''}
                    >
                      <TableCell className="font-bold">{stat.number}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {stat.count}
                          {stat.count <= 1 && <TrendingDown className="h-4 w-4 text-red-500" />}
                        </div>
                      </TableCell>
                      <TableCell>₹{stat.totalBets}</TableCell>
                      <TableCell>₹{stat.avgBet}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Jodi Number Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Jodi Number Analytics (00-99)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {jodiNumberStats.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No jodi predictions yet</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>Predictions</TableHead>
                      <TableHead>Total Bets</TableHead>
                      <TableHead>Avg Bet</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jodiNumberStats.map((stat) => (
                      <TableRow 
                        key={stat.number}
                        className={stat.count <= 1 ? 'bg-red-50 text-red-800' : ''}
                      >
                        <TableCell className="font-bold">{stat.number}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {stat.count}
                            {stat.count <= 1 && <TrendingDown className="h-4 w-4 text-red-500" />}
                          </div>
                        </TableCell>
                        <TableCell>₹{stat.totalBets}</TableCell>
                        <TableCell>₹{stat.avgBet}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
