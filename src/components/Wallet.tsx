
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, QrCode, MessageCircle } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

const WalletComponent = () => {
  const { walletBalance } = useWallet();

  return (
    <Card className="p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          <h3 className="text-xl font-bold">Wallet Balance</h3>
        </div>
        <div className="text-3xl font-bold">₹{walletBalance}</div>
      </div>
      
      <div className="space-y-4 bg-white/10 rounded-lg p-4">
        <h4 className="font-semibold text-lg mb-3">Add Money to Wallet</h4>
        
        <div className="space-y-3 text-sm">
          <p className="flex items-start gap-2">
            <span className="font-medium">1.</span>
            <span>Kindly transfer the amount to the number <strong>1234567890</strong> via your preferred payment app.</span>
          </p>
          
          <p className="flex items-start gap-2">
            <span className="font-medium">2.</span>
            <span>Share the payment screenshot on WhatsApp to the same number (<strong>1234567890</strong>) for verification.</span>
          </p>
          
          <p className="flex items-start gap-2">
            <span className="font-medium">3.</span>
            <span>You can also scan the QR code provided and complete the payment.</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="bg-white p-4 rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=150&h=150&fit=crop" 
              alt="QR Code for Payment" 
              className="w-32 h-32 object-cover"
            />
          </div>
          <p className="text-xs text-center opacity-90">Scan QR code to pay</p>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            className="flex-1 bg-green-700 hover:bg-green-800 text-white"
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
          <Button
            className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
            variant="outline"
          >
            <QrCode className="h-4 w-4 mr-2" />
            QR Code
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WalletComponent;
