
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CurrentTime from '@/components/CurrentTime';

const GameStatus = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Current Time Display */}
          <CurrentTime />

          {/* Game Status Card */}
          <Card className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-3 text-3xl">
                <AlertCircle className="h-8 w-8" />
                Game Not Available
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-xl font-semibold">
                Prediction game is currently not valid
              </div>
              <div className="text-lg opacity-90">
                Please try after morning 6:00 AM
              </div>
              <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                <Clock className="h-4 w-4" />
                Game will be available from 6:00 AM to 11:59 PM
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Game Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-700">Available Hours</div>
                  <div className="text-green-600">6:00 AM - 11:59 PM</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="font-semibold text-red-700">Maintenance Hours</div>
                  <div className="text-red-600">12:00 AM - 5:59 AM</div>
                </div>
              </div>
              <div className="text-center pt-4">
                <Button onClick={handleGoBack} className="px-8">
                  Go Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameStatus;
