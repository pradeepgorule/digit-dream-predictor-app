
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Wallet from "@/components/Wallet";
import NumberPredictionGame from "@/components/NumberPredictionGame";
import CricketBettingGame from "@/components/CricketBettingGame";
import SpinWinGame from "@/components/SpinWinGame";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeGame, setActiveGame] = useState<'number' | 'cricket' | 'spin'>('number');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdminAccess = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gaming Platform
            </h1>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleAdminAccess}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Admin Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Wallet */}
          <div className="lg:col-span-1">
            <Wallet />
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-3">
            {/* Game Selector */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setActiveGame('number')}
                    variant={activeGame === 'number' ? 'default' : 'outline'}
                    className="flex-1 min-w-0"
                  >
                    Number Prediction
                  </Button>
                  <Button
                    onClick={() => setActiveGame('cricket')}
                    variant={activeGame === 'cricket' ? 'default' : 'outline'}
                    className="flex-1 min-w-0"
                  >
                    Cricket Betting
                  </Button>
                  <Button
                    onClick={() => setActiveGame('spin')}
                    variant={activeGame === 'spin' ? 'default' : 'outline'}
                    className="flex-1 min-w-0"
                  >
                    Spin & Win
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Game Component */}
            {activeGame === 'number' && <NumberPredictionGame />}
            {activeGame === 'cricket' && <CricketBettingGame />}
            {activeGame === 'spin' && <SpinWinGame />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
