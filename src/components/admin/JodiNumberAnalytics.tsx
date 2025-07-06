
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, TrendingDown } from 'lucide-react';

interface JodiNumberStat {
  number: string;
  count: number;
  totalBets: number;
  avgBet: number;
}

interface JodiNumberAnalyticsProps {
  jodiNumberStats: JodiNumberStat[];
}

const JodiNumberAnalytics = ({ jodiNumberStats }: JodiNumberAnalyticsProps) => {
  return (
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
  );
};

export default JodiNumberAnalytics;
