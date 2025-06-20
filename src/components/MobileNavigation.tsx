
import React from 'react';
import { TrendingUp, Trophy, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileNavigationProps {
  activeGame: string;
  onGameChange: (gameId: string) => void;
}

const MobileNavigation = ({ activeGame, onGameChange }: MobileNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navItems = [
    {
      id: 'number-prediction',
      title: 'Number Bet',
      icon: TrendingUp,
      action: () => {
        if (location.pathname !== '/') {
          navigate('/');
        }
        onGameChange('number-prediction');
      },
      isActive: location.pathname === '/' && activeGame === 'number-prediction'
    },
    {
      id: 'cricket-betting',
      title: 'Cricket Bet',
      icon: Trophy,
      action: () => {
        if (location.pathname !== '/') {
          navigate('/');
        }
        onGameChange('cricket-betting');
      },
      isActive: location.pathname === '/' && activeGame === 'cricket-betting'
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: User,
      action: () => navigate('/profile'),
      isActive: location.pathname === '/profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              item.isActive
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <item.icon className={`h-5 w-5 ${item.isActive ? 'text-purple-600' : 'text-gray-600'}`} />
            <span className="text-xs mt-1 font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
