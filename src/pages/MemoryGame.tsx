
import { Button } from "@/components/ui/button";
import MemoryCardGame from "@/components/MemoryCardGame";
import Wallet from "@/components/Wallet";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MemoryGame = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdminAccess = () => {
    navigate('/admin');
  };

  const handleBackToGames = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackToGames}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Games
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Memory Card Game
              </h1>
            </div>
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

          {/* Game Area */}
          <div className="lg:col-span-3">
            <MemoryCardGame />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
