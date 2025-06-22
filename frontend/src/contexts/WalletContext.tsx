
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  addMoney: (amount: number) => void;
  deductMoney: (amount: number) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [walletBalance, setWalletBalance] = useState(0);

  const addMoney = (amount: number) => {
    setWalletBalance(prev => prev + amount);
  };

  const deductMoney = (amount: number): boolean => {
    if (walletBalance >= amount) {
      setWalletBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{
      walletBalance,
      setWalletBalance,
      addMoney,
      deductMoney
    }}>
      {children}
    </WalletContext.Provider>
  );
};
