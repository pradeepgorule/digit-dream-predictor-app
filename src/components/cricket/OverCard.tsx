
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkipForward } from 'lucide-react';
import { OverStats } from '@/types/cricketGame';

interface OverCardProps {
  over: OverStats;
  index: number;
  currentOver: number;
  onPlaceBet: (overIndex: number, betType: 'sixes' | 'fours' | 'out', amount: number) => void;
  onSimulateOver: (overIndex: number) => void;
  onSkipOver: (overIndex: number) => void;
}

const OverCard = ({ over, index, currentOver, onPlaceBet, onSimulateOver, onSkipOver }: OverCardProps) => {
  return (
    <Card className={`${index < currentOver - 1 ? 'opacity-60' : ''}`}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Over {over.overNumber}
          {over.isSkipped && <Badge variant="secondary">Skipped</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!over.isSkipped ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Stats Display */}
            <div className="space-y-2">
              <h4 className="font-medium">Results:</h4>
              <div className="text-sm space-y-1">
                <div>Sixes: {over.sixes}</div>
                <div>Fours: {over.fours}</div>
                <div>Out: {over.isOut ? 'Yes' : 'No'}</div>
              </div>
            </div>

            {/* Betting Controls */}
            <div className="space-y-2">
              <h4 className="font-medium">Bet on Sixes:</h4>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onPlaceBet(index, 'sixes', 10)}
                  disabled={index < currentOver - 1}
                >
                  ₹10
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onPlaceBet(index, 'sixes', 50)}
                  disabled={index < currentOver - 1}
                >
                  ₹50
                </Button>
              </div>
              {over.bets.sixesBet && <Badge>Bet: ₹{over.bets.sixesBet}</Badge>}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Bet on Fours:</h4>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onPlaceBet(index, 'fours', 10)}
                  disabled={index < currentOver - 1}
                >
                  ₹10
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onPlaceBet(index, 'fours', 50)}
                  disabled={index < currentOver - 1}
                >
                  ₹50
                </Button>
              </div>
              {over.bets.foursBet && <Badge>Bet: ₹{over.bets.foursBet}</Badge>}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Bet on Out:</h4>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onPlaceBet(index, 'out', 20)}
                  disabled={index < currentOver - 1}
                >
                  ₹20
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onPlaceBet(index, 'out', 100)}
                  disabled={index < currentOver - 1}
                >
                  ₹100
                </Button>
              </div>
              {over.bets.outBet && <Badge>Bet: ₹{over.bets.outBet}</Badge>}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            This over was skipped
          </div>
        )}

        {/* Action Buttons */}
        {index === currentOver - 1 && (
          <div className="mt-4 flex gap-2">
            <Button 
              onClick={() => onSimulateOver(index)}
            >
              Play Over {over.overNumber}
            </Button>
            <Button 
              onClick={() => onSkipOver(index)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <SkipForward className="h-4 w-4" />
              Skip Over
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OverCard;
