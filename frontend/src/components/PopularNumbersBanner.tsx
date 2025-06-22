
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users } from 'lucide-react';

interface PopularNumber {
  number: number;
  count: number;
}

// Mock data for popular numbers - in a real app this would come from a database
const mockPopularNumbers: PopularNumber[] = [
  { number: 7, count: 1247 },
  { number: 3, count: 1089 },
  { number: 9, count: 892 }
];

const PopularNumbersBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Most Popular Numbers</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {mockPopularNumbers.map((item, index) => (
            <div 
              key={item.number}
              className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm border"
            >
              <div className={`text-2xl font-bold mb-1 ${
                index === 0 ? 'text-yellow-600' : 
                index === 1 ? 'text-gray-600' : 
                'text-orange-600'
              }`}>
                #{index + 1}
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {item.number}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{item.count.toLocaleString()} users</span>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-3">
          Based on single number predictions from all users
        </p>
      </CardContent>
    </Card>
  );
};

export default PopularNumbersBanner;
