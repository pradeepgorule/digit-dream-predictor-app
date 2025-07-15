import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from 'sonner';
import { Shuffle, Timer, Trophy, Apple, Grape, Banana, Cherry, Heart, Star, Zap, Gift } from 'lucide-react';

// Define difficulty levels
const DIFFICULTY_LEVELS = [
  { multiplier: 1.25, viewTime: 8000, label: 'Easy' },
  { multiplier: 1.80, viewTime: 6000, label: 'Medium' },
  { multiplier: 2.00, viewTime: 4000, label: 'Hard' },
  { multiplier: 2.50, viewTime: 3000, label: 'Expert' },
  { multiplier: 4.00, viewTime: 2000, label: 'Master' }
];

// Fruit and symbol icons
const FRUIT_SYMBOLS = [
  { icon: Apple, color: 'text-red-500' },
  { icon: Grape, color: 'text-purple-500' },
  { icon: Banana, color: 'text-yellow-500' },
  { icon: Cherry, color: 'text-red-600' },
  { icon: Heart, color: 'text-pink-500' },
  { icon: Star, color: 'text-yellow-400' },
  { icon: Zap, color: 'text-blue-500' },
  { icon: Gift, color: 'text-green-500' }
];

interface Card {
  id: number;
  symbol: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCardGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(DIFFICULTY_LEVELS[0]);
  const [betAmount, setBetAmount] = useState(10);
  const [showingCards, setShowingCards] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  
  const { walletBalance, deductMoney, addMoney } = useWallet();

  // Initialize game cards
  const initializeCards = () => {
    const symbols = Array.from({ length: 8 }, (_, i) => i);
    const cardPairs = [...symbols, ...symbols];
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setGameFinished(false);
  };

  // Start game
  const startGame = () => {
    if (betAmount > walletBalance) {
      toast.error('Insufficient balance!');
      return;
    }

    if (!deductMoney(betAmount)) {
      toast.error('Failed to place bet!');
      return;
    }

    initializeCards();
    setGameStarted(true);
    setShowingCards(true);
    setTimeLeft(selectedDifficulty.viewTime);
    setGameTime(0);
    
    toast.success(`Game started! Bet: ₹${betAmount}`);
  };

  // Handle card click
  const handleCardClick = (cardId: number) => {
    if (showingCards || flippedCards.length >= 2 || cards[cardId].isMatched || cards[cardId].isFlipped) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      
      if (cards[firstCard].symbol === cards[secondCard].symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstCard || card.id === secondCard 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstCard || card.id === secondCard 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Timer effects
  useEffect(() => {
    if (showingCards && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 100), 100);
      return () => clearTimeout(timer);
    } else if (showingCards && timeLeft <= 0) {
      setShowingCards(false);
      setCards(prev => prev.map(card => ({ ...card, isFlipped: false })));
    }
  }, [showingCards, timeLeft]);

  useEffect(() => {
    if (gameStarted && !showingCards && !gameFinished) {
      const timer = setTimeout(() => setGameTime(prev => prev + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [gameStarted, showingCards, gameFinished, gameTime]);

  // Check win condition
  useEffect(() => {
    if (matchedPairs === 8 && gameStarted) {
      setGameFinished(true);
      setGameStarted(false);
      const winAmount = Math.floor(betAmount * selectedDifficulty.multiplier);
      addMoney(winAmount);
      toast.success(`Congratulations! You won ₹${winAmount}!`);
    }
  }, [matchedPairs, gameStarted, betAmount, selectedDifficulty.multiplier, addMoney]);

  const resetGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setShowingCards(false);
    setCards([]);
    setFlippedCards([]);
    setMatchedPairs(0);
    setTimeLeft(0);
    setGameTime(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-xl border border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Memory Card Game
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Game Controls */}
          {!gameStarted && (
            <div className="space-y-4">
              {/* Difficulty Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Select Difficulty Level
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {DIFFICULTY_LEVELS.map((level) => (
                    <Button
                      key={level.multiplier}
                      onClick={() => setSelectedDifficulty(level)}
                      variant={selectedDifficulty.multiplier === level.multiplier ? 'default' : 'outline'}
                      className="flex flex-col gap-1 h-auto py-3"
                    >
                      <span className="text-xs">{level.label}</span>
                      <span className="font-bold">{level.multiplier}x</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bet Amount */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-200">
                  Bet Amount:
                </label>
                <input
                  type="number"
                  min="10"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white w-24"
                />
                <Badge className="bg-green-600">
                  Balance: ₹{walletBalance}
                </Badge>
              </div>

              <Button 
                onClick={startGame}
                disabled={betAmount > walletBalance}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Start Game - Bet ₹{betAmount}
              </Button>
            </div>
          )}

          {/* Game Info */}
          {gameStarted && (
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-600 flex items-center gap-2">
                <Timer className="h-4 w-4" />
                {showingCards ? `Preview: ${(timeLeft / 1000).toFixed(1)}s` : `Time: ${gameTime}s`}
              </Badge>
              <Badge className="bg-green-600 flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Pairs: {matchedPairs}/8
              </Badge>
              <Badge className="bg-purple-600">
                {selectedDifficulty.label} - {selectedDifficulty.multiplier}x
              </Badge>
            </div>
          )}

          {/* Game Board */}
          {(gameStarted || gameFinished) && (
            <div className="grid grid-cols-4 gap-3">
              {cards.map((card) => {
                const SymbolIcon = FRUIT_SYMBOLS[card.symbol].icon;
                const shouldShow = showingCards || card.isFlipped || card.isMatched;
                
                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`
                      aspect-square rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center
                      ${shouldShow 
                        ? `bg-gradient-to-br from-white to-gray-100 border-purple-400 ${card.isMatched ? 'ring-2 ring-green-400' : ''}`
                        : 'bg-gradient-to-br from-purple-600 to-blue-600 border-purple-400 hover:from-purple-500 hover:to-blue-500'
                      }
                      ${!showingCards && !card.isMatched ? 'hover:scale-105' : ''}
                    `}
                  >
                    {shouldShow ? (
                      <SymbolIcon className={`h-8 w-8 ${FRUIT_SYMBOLS[card.symbol].color}`} />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full opacity-50"></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Game Finished */}
          {gameFinished && (
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-green-400">
                🎉 Congratulations! 🎉
              </div>
              <div className="text-gray-200">
                You completed the game in {gameTime} seconds!
                <br />
                Won: ₹{Math.floor(betAmount * selectedDifficulty.multiplier)}
              </div>
              <Button onClick={resetGame} className="bg-gradient-to-r from-green-600 to-blue-600">
                Play Again
              </Button>
            </div>
          )}

          {/* Game Rules */}
          <div className="text-xs text-gray-400 space-y-1">
            <p><strong>How to Play:</strong></p>
            <p>• Select difficulty level (higher multiplier = shorter preview time)</p>
            <p>• Place your bet and start the game</p>
            <p>• Memorize card positions during preview</p>
            <p>• Find all 8 pairs to win</p>
            <p>• Win amount = Bet × Multiplier</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemoryCardGame;
