
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
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
  );
};

export default AdminDashboardHeader;
