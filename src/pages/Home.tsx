
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Gamepad2, Trophy, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CurrentTime from '@/components/CurrentTime';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          {/* Current Time */}
          <CurrentTime />

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gaming Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the thrill of prediction games, cricket betting, and spin-to-win challenges. 
              Your ultimate destination for online gaming entertainment.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {user && (
              <Button 
                onClick={handleViewGames}
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg"
              >
                View Games
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Games</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our exciting collection of games and start winning today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Number Prediction Game */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-fit">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Number Prediction</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Predict single numbers (0-9) or jodi pairs (00-99) and win big rewards
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Single number predictions</li>
                <li>• Jodi number betting</li>
                <li>• Real-time results</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cricket Betting */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-fit">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Cricket Betting</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Bet on cricket match outcomes and over-by-over statistics
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Over-by-over betting</li>
                <li>• Sixes, fours predictions</li>
                <li>• Live match simulation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Spin & Win */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Spin & Win</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Spin the wheel and win exciting prizes with different multipliers
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Multiple multipliers</li>
                <li>• Daily earning limits</li>
                <li>• Instant rewards</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Game Schedule Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Clock className="h-6 w-6" />
                Game Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-700 font-semibold text-lg mb-2">Games Available</div>
                  <div className="text-2xl font-bold text-green-600">6:00 AM - 11:59 PM</div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-orange-700 font-semibold text-lg mb-2">Maintenance</div>
                  <div className="text-2xl font-bold text-orange-600">12:00 AM - 5:59 AM</div>
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
