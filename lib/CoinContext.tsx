'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Coin } from '@/types';
import { getCoinsList } from '@/lib/api';

interface CoinContextType {
  allCoins: Coin[];
  displayedCoins: Coin[];
  totalPages: number;
  totalCoins: number;
  isLoading: boolean;
  error: string | null;
  fetchCoins: (searchField: string, searchTerm: string) => Promise<void>;
  updateDisplayedCoins: (page: number, perPage: number) => void;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const useCoinContext = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('useCoinContext must be used within a CoinProvider');
  }
  return context;
};

export const CoinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [displayedCoins, setDisplayedCoins] = useState<Coin[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoins = useCallback(async (searchField: string, searchTerm: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
      const data = await getCoinsList(
        1,
        250, // Fetch 250 coins at once
        searchField,
        searchTerm,
        { signal: controller.signal }
      );
    
      clearTimeout(timeoutId);
    
      setAllCoins(data.coins);
      setTotalCoins(data.totalCoins);
      setTotalPages(Math.ceil(data.totalCoins / 10)); // Assuming default perPage is 10
    } catch (error: unknown) {
      console.error('Error fetching coins:', error);
      
      if (error instanceof Error) {
        setError(error.message || 'Failed to fetch coins');
      } else {
        setError('Failed to fetch coins');
      }
      
      setAllCoins([]);
      setTotalPages(0);
      setTotalCoins(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateDisplayedCoins = useCallback((page: number, perPage: number) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    setDisplayedCoins(allCoins.slice(startIndex, endIndex));
  }, [allCoins]);

  return (
    <CoinContext.Provider value={{ 
      allCoins, 
      displayedCoins, 
      totalPages, 
      totalCoins, 
      isLoading, 
      error, 
      fetchCoins,
      updateDisplayedCoins 
    }}>
      {children}
    </CoinContext.Provider>
  );
};

