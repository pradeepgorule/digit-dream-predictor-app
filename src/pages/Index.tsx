
import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';
import { TrendingUp, User, Trophy, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import NumberPredictionGame from '@/components/NumberPredictionGame';
import CricketBettingGame from '@/components/CricketBettingGame';
import SpinWinGame from '@/components/SpinWinGame';
import MobileNavigation from '@/components/MobileNavigation';

const Index = () => {
  const [activeGame, setActiveGame] = useState('number-prediction');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const games = [
    {
      id: 'number-prediction',
      title: 'Number Prediction',
      icon: TrendingUp,
      component: NumberPredictionGame
    },
    {
      id: 'cricket-betting',
      title: 'Cricket Betting',
      icon: Trophy,
      component: CricketBettingGame
    },
    {
      id: 'spin-win',
      title: 'Spin & Win',
      icon: Gamepad2,
      component: SpinWinGame
    }
  ];

  const ActiveGameComponent = games.find(game => game.id === activeGame)?.component || NumberPredictionGame;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          {!isMobile && (
            <Sidebar>
              <SidebarHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Gaming Hub
                  </h1>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  {games.map((game) => (
                    <SidebarMenuItem key={game.id}>
                      <SidebarMenuButton 
                        onClick={() => setActiveGame(game.id)}
                        isActive={activeGame === game.id}
                        className="w-full justify-start"
                      >
                        <game.icon className="h-4 w-4" />
                        <span>{game.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
          )}

          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  {!isMobile && <SidebarTrigger />}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {games.find(game => game.id === activeGame)?.title}
                  </h2>
                </div>
                {!isMobile && (
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => navigate('/profile')}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                    <Button 
                      onClick={() => navigate('/login')}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Game Content */}
            <div className={`flex-1 p-6 ${isMobile ? 'pb-20' : ''}`}>
              <ActiveGameComponent />
            </div>
          </div>
        </div>

        <MobileNavigation 
          activeGame={activeGame} 
          onGameChange={setActiveGame} 
        />
      </SidebarProvider>
    </div>
  );
};

export default Index;
