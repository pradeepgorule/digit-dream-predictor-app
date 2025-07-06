
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Hash, TrendingDown } from 'lucide-react';

interface SingleNumberStat {
  number: string;
  count: number;
  totalBets: number;
  avgBet: number;
}

interface SingleNumberAnalyticsProps {
  singleNumberStats: SingleNumberStat[];
}

const SingleNumberAnalytics = ({ singleNumberStats }: SingleNumberAnalyticsProps) => {
  return (
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
  );
};

export default SingleNumberAnalytics;
