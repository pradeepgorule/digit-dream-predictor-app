
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Gamepad2, Trophy, Clock, ArrowRight, BookOpen, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CurrentTime from '@/components/CurrentTime';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
      description: "Predict single numbers (0-9) or jodi pairs (00-99) and win big rewards",
      icon: TrendingUp,
      gradient: "from-blue-500 to-purple-500",
      bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
      features: ["Single number predictions", "Jodi number betting", "Real-time results", "High multipliers"]
    },
    {
      title: "Cricket Betting",
      description: "Bet on cricket match outcomes and over-by-over statistics",
      icon: Trophy,
      gradient: "from-green-500 to-blue-500",
      bannerImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop",
      features: ["Over-by-over betting", "Sixes, fours predictions", "Live match simulation", "Dynamic odds"]
    },
    {
      title: "Spin & Win",
      description: "Spin the wheel and win exciting prizes with different multipliers",
      icon: Gamepad2,
      gradient: "from-purple-500 to-pink-500",
      bannerImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=400&fit=crop",
      features: ["Multiple multipliers", "Daily earning limits", "Instant rewards", "Lucky bonuses"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center space-y-8">
            {/* Current Time */}
            <div className="flex justify-center">
              <CurrentTime />
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Gaming Platform
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Experience the thrill of prediction games, cricket betting, and spin-to-win challenges. 
                Your ultimate destination for online gaming entertainment with real rewards.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {user && (
                <Button 
                  onClick={handleViewGames}
                  variant="outline"
                  size="lg"
                  className="px-10 py-4 text-lg border-2 border-purple-300 hover:bg-purple-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  View Games
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Games Carousel Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Premium Games</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our exciting collection of games and start winning today
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {gameCards.map((game, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
                  {/* Banner Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={game.bannerImage} 
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${game.gradient} opacity-70`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                        <game.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-center">{game.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-center leading-relaxed">
                      {game.description}
                    </p>
                    <ul className="space-y-2">
                      {game.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-500">
                          <Zap className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Game Schedule Section */}
      <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-3xl">
                <Clock className="h-8 w-8 text-blue-600" />
                Game Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-green-700 font-semibold text-xl mb-3">🎮 Games Available</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">6:00 AM - 11:59 PM</div>
                  <div className="text-green-600 text-sm">All games active and ready to play</div>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-orange-700 font-semibold text-xl mb-3">🔧 Maintenance</div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">12:00 AM - 5:59 AM</div>
                  <div className="text-orange-600 text-sm">System updates and maintenance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rules Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 text-blue-600" />
              Game Rules & Guidelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important rules and guidelines to ensure fair play and maximum enjoyment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Shield className="h-5 w-5" />
                  Fair Play
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• All games are conducted fairly</li>
                  <li>• Random number generation</li>
                  <li>• Transparent result system</li>
                  <li>• Equal chances for all players</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Clock className="h-5 w-5" />
                  Timing Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Games: 6:00 AM - 11:59 PM</li>
                  <li>• Maintenance: 12:00 AM - 5:59 AM</li>
                  <li>• Results declared on time</li>
                  <li>• No betting during maintenance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <TrendingUp className="h-5 w-5" />
                  Betting Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Minimum bet: ₹10</li>
                  <li>• Maximum bet: ₹10,000</li>
                  <li>• Daily limits apply</li>
                  <li>• Responsible gaming encouraged</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-orange-800 mb-4">
                  📝 More Rules Coming Soon
                </h3>
                <p className="text-orange-700 text-lg">
                  We're constantly updating our rules and guidelines to provide the best gaming experience. 
                  Check back regularly for updates and new features!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
