
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Gamepad2, Trophy, Clock, ArrowRight, Sparkles, Zap, Star, Gift, Target, Crown, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CurrentTime from '@/components/CurrentTime';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const handleViewGames = () => {
    navigate('/');
  };

  const gameCards = [
    {
      title: "Number Prediction",
      description: "Predict numbers and win massive rewards with high multipliers",
      icon: TrendingUp,
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      bgPattern: "bg-gradient-to-br from-cyan-50/50 to-blue-100/50",
      accentColor: "text-cyan-400",
      features: ["🎯 Single & Jodi Predictions", "⚡ Instant Results", "💎 High Multipliers", "🏆 Daily Rewards"],
      isComingSoon: false,
      multiplier: "Up to 90x"
    },
    {
      title: "Cricket Betting",
      description: "Live cricket action with real-time betting opportunities",
      icon: Trophy,
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      bgPattern: "bg-gradient-to-br from-green-50/50 to-emerald-100/50",
      accentColor: "text-green-400",
      features: ["🏏 Live Match Betting", "📊 Over-by-Over Stats", "🎲 Dynamic Odds", "🔥 Hot Streaks"],
      isComingSoon: true,
      multiplier: "Coming Soon"
    },
    {
      title: "Spin & Win",
      description: "Spin the magical wheel and unlock incredible prizes",
      icon: Target,
      gradient: "from-pink-400 via-purple-500 to-indigo-600",
      bgPattern: "bg-gradient-to-br from-pink-50/50 to-purple-100/50",
      accentColor: "text-pink-400",
      features: ["🎡 Lucky Wheel", "🎁 Mystery Prizes", "⭐ Bonus Rounds", "💰 Mega Jackpots"],
      isComingSoon: true,
      multiplier: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative bg-black p-8 rounded-full border border-purple-500/50">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Gamepad2 className="h-10 w-10 text-white animate-bounce" />
            </div>
          </div>
        </div>

        {/* Current Time */}
        <div className="mb-8">
          <CurrentTime />
        </div>

        {/* Main Title */}
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            GAME<span className="text-white">•</span>ZONE
          </h1>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white/80">
            <Flame className="h-6 w-6 text-orange-400 animate-bounce" />
            <span>Where Winners Are Made</span>
            <Flame className="h-6 w-6 text-orange-400 animate-bounce" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enter the ultimate gaming arena. Predict, bet, spin, and win big with our cutting-edge platform designed for champions.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Sparkles className="mr-3 h-6 w-6 animate-spin" />
            START WINNING
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          {user && (
            <Button 
              onClick={handleViewGames}
              variant="outline"
              size="lg"
              className="px-12 py-6 text-xl font-bold border-2 border-purple-500/50 bg-black/50 backdrop-blur-sm text-white hover:bg-purple-500/20 hover:border-purple-400 transform hover:scale-105 transition-all duration-300"
            >
              <Trophy className="mr-3 h-6 w-6" />
              VIEW GAMES
            </Button>
          )}
        </div>
      </div>

      {/* Games Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6 flex items-center justify-center gap-4">
              <Star className="h-12 w-12 text-yellow-400 animate-spin" />
              FEATURED GAMES
              <Star className="h-12 w-12 text-yellow-400 animate-spin" />
            </h2>
            <p className="text-xl text-gray-300">Choose your path to victory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameCards.map((game, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden bg-black/50 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Coming Soon Badge */}
                {game.isComingSoon && (
                  <Badge className="absolute top-4 right-4 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-3 py-1 animate-pulse">
                    COMING SOON
                  </Badge>
                )}

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${game.gradient} shadow-lg`}>
                      <game.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">{game.title}</CardTitle>
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${game.gradient} text-white text-sm font-bold`}>
                    {game.multiplier}
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-6">
                  <p className={`text-center text-gray-300 ${game.isComingSoon ? 'opacity-70' : ''}`}>
                    {game.description}
                  </p>
                  
                  <div className="space-y-3">
                    {game.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center text-sm ${game.isComingSoon ? 'text-gray-400' : 'text-gray-200'} bg-white/5 rounded-lg p-2 backdrop-blur-sm`}
                      >
                        <span className="text-base mr-2">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {!game.isComingSoon && (
                    <Button 
                      className={`w-full bg-gradient-to-r ${game.gradient} hover:opacity-90 font-bold py-3 transform hover:scale-105 transition-all duration-300`}
                      onClick={() => navigate('/')}
                    >
                      <Crown className="mr-2 h-4 w-4" />
                      PLAY NOW
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Gaming Schedule */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-black/70 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-4xl font-black text-white">
                <Clock className="h-10 w-10 text-purple-400 animate-spin" />
                GAMING HOURS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center p-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 backdrop-blur-sm">
                  <div className="text-green-400 font-bold text-2xl mb-3 flex items-center justify-center gap-2">
                    <Zap className="h-6 w-6" />
                    LIVE GAMING
                  </div>
                  <div className="text-4xl font-black text-white mb-2">6:00 AM - 11:59 PM</div>
                  <div className="text-green-300">All systems GO! Maximum winnings activated</div>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30 backdrop-blur-sm">
                  <div className="text-orange-400 font-bold text-2xl mb-3 flex items-center justify-center gap-2">
                    <Gift className="h-6 w-6" />
                    POWER UP TIME
                  </div>
                  <div className="text-4xl font-black text-white mb-2">12:00 AM - 5:59 AM</div>
                  <div className="text-orange-300">System upgrades & bonus preparations</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
