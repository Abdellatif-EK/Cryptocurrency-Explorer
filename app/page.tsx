'use client';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CoinsTable from '@/components/CoinsTable';
import CoinsList from '@/components/CoinsList';
import Pagination from '@/components/Pagination';
import PerPageSelector from '@/components/PerPageSelector';
import FilterOptions from '@/components/FilterOptions';
import { useCoinContext } from '@/lib/CoinContext';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [isListView, setIsListView] = useState(true);

  const { 
    displayedCoins, 
    isLoading, 
    error, 
    fetchCoins, 
    updateDisplayedCoins,
    totalCoins
  } = useCoinContext();

  const handleFetchCoins = useCallback(() => {
    fetchCoins(searchField, searchTerm);
  }, [fetchCoins, searchField, searchTerm]);

  useEffect(() => {
    handleFetchCoins();
  }, [handleFetchCoins]);

  useEffect(() => {
    updateDisplayedCoins(currentPage, perPage);
  }, [currentPage, perPage, updateDisplayedCoins]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: string, filterValue: string) => {
    setSearchField(filterType);
    setSearchTerm(filterValue);
    setCurrentPage(1);
    handleFetchCoins();
  };

  const toggleView = () => {
    setIsListView((prev) => !prev);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Available Coins
      </h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <FilterOptions
              onFilterChange={handleFilterChange}
              onToggleView={toggleView}
              isListView={isListView}
            />
            <PerPageSelector
              perPage={perPage}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        </CardContent>
      </Card>
      
      {error && (
        <div className="text-center py-4 text-red-500">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : displayedCoins.length > 0 ? (
        <CardContent>
          {isListView ? (
            <CoinsList coins={displayedCoins} />
          ) : (
            <CoinsTable coins={displayedCoins} />
          )}
        </CardContent>
      ) : (
        <div className="text-center py-4">
          No coins found for your search criteria
        </div>
      )}
      
      {displayedCoins.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCoins / perPage)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
}

