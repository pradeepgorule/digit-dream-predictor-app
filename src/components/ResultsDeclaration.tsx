
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultsDeclarationProps {
  onResultsDeclared: (singleDigit: number, jodiNumber: string) => void;
}

const ResultsDeclaration = ({ onResultsDeclared }: ResultsDeclarationProps) => {
  const [singleDigit, setSingleDigit] = useState('');
  const [jodiNumber, setJodiNumber] = useState('');
  const { toast } = useToast();

  const handleSingleDigitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      setSingleDigit(value);
    }
  };

  const handleJodiNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      setJodiNumber(value);
    }
  };

  const handleDeclareResults = () => {
    if (singleDigit === '' || jodiNumber === '' || jodiNumber.length !== 2) {
      toast({
        title: "Invalid Input",
        description: "Please enter a single digit (0-9) and a two-digit jodi number (00-99)",
        variant: "destructive",
      });
      return;
    }

    const singleDigitNum = parseInt(singleDigit);
    const formattedJodi = jodiNumber.padStart(2, '0');
    
    onResultsDeclared(singleDigitNum, formattedJodi);
    
    toast({
      title: "Results Declared!",
      description: `Single: ${singleDigitNum}, Jodi: ${formattedJodi}`,
    });

    // Reset form
    setSingleDigit('');
    setJodiNumber('');
  };

  return (
    <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Declare Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="single-digit" className="text-white">
              Single Digit (0-9)
            </Label>
            <Input
              id="single-digit"
              type="text"
              value={singleDigit}
              onChange={handleSingleDigitChange}
              placeholder="0"
              className="text-center text-xl font-bold bg-white/20 border-white/30 text-white placeholder-white/70"
              maxLength={1}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jodi-number" className="text-white">
              Jodi Number (00-99)
            </Label>
            <Input
              id="jodi-number"
              type="text"
              value={jodiNumber}
              onChange={handleJodiNumberChange}
              placeholder="00"
              className="text-center text-xl font-bold bg-white/20 border-white/30 text-white placeholder-white/70"
              maxLength={2}
            />
          </div>
        </div>

        <Button
          onClick={handleDeclareResults}
          disabled={singleDigit === '' || jodiNumber.length !== 2}
          className="w-full bg-white text-green-600 hover:bg-white/90 font-semibold"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Declare Results
        </Button>

        <p className="text-sm text-white/80 text-center">
          Enter the winning single digit and jodi number to declare results
        </p>
      </CardContent>
    </Card>
  );
};

export default ResultsDeclaration;
