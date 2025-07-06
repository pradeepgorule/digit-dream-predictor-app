
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import ResultsDeclaration from '@/components/ResultsDeclaration';
import AdminDashboardHeader from '@/components/admin/AdminDashboardHeader';
import AdminSummaryCards from '@/components/admin/AdminSummaryCards';
import SingleNumberAnalytics from '@/components/admin/SingleNumberAnalytics';
import JodiNumberAnalytics from '@/components/admin/JodiNumberAnalytics';

// Mock data for demonstration - in a real app this would come from your backend
const mockPredictions = [
  { id: '1', type: 'single' as const, number: '5', betAmount: 50, timestamp: new Date() },
  { id: '2', type: 'jodi' as const, number: '23', betAmount: 100, timestamp: new Date() },
  { id: '3', type: 'single' as const, number: '7', betAmount: 25, timestamp: new Date() },
];

const AdminDashboard = () => {
  const { toast } = useToast();

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

  const handleResultsDeclared = (singleDigit: number, jodiNumber: string) => {
    console.log(`Results declared - Single: ${singleDigit}, Jodi: ${jodiNumber}`);
    // Here you would typically save the results to your backend
    toast({
      title: "Results Declared Successfully!",
      description: `Single: ${singleDigit}, Jodi: ${jodiNumber}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AdminDashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Declaration Section */}
        <div className="mb-8">
          <ResultsDeclaration onResultsDeclared={handleResultsDeclared} />
        </div>

        {/* Summary Cards */}
        <AdminSummaryCards
          totalSinglePredictions={totalSinglePredictions}
          totalJodiPredictions={totalJodiPredictions}
          totalBetAmount={totalBetAmount}
          lowPredictionNumbers={lowSingleNumbers.length + lowJodiNumbers.length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Single Number Analytics */}
          <SingleNumberAnalytics singleNumberStats={singleNumberStats} />

          {/* Jodi Number Analytics */}
          <JodiNumberAnalytics jodiNumberStats={jodiNumberStats} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
