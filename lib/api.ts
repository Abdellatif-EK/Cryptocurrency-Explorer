import { Coin, CoinDetails, MarketChartData } from '@/types'

const API_BASE_URL = 'https://api.coingecko.com/api/v3'

export async function getCoinsList(
  page: number,
  perPage: number,
  filterType?: string,
  filterValue?: string,
  options?: { signal?: AbortSignal }
): Promise<{ coins: Coin[]; totalPages: number; totalCoins: number }> {
  const baseUrl = `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&locale=en`;
  

  const response = await fetch(baseUrl, options);
  if (!response.ok) {
    throw new Error('Failed to fetch coins');
  }
  const allCoins = await response.json();

  // Apply filtering in memory
  let filteredCoins = allCoins;
  if (filterType && filterValue && filterValue.trim() !== '') {
    const searchValue = filterValue.toLowerCase().trim();
    filteredCoins = allCoins.filter((coin: Coin) => {
      if (filterType === 'name') {
        return coin.name.toLowerCase().includes(searchValue) ||
               coin.symbol.toLowerCase().includes(searchValue);
      }
      return true;
    });
  }

  const totalCoins = filteredCoins.length;
  const totalPages = Math.ceil(totalCoins / perPage);

  return {
    coins: filteredCoins,
    totalPages,
    totalCoins
  };
}

export async function getCoinDetails(id: string): Promise<CoinDetails> {
  const response = await fetch(`${API_BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
  if (!response.ok) {
    throw new Error('Failed to fetch coin details')
  }
  return response.json()
}

export async function getCoinMarketChart(id: string, days: number): Promise<MarketChartData> {
  const response = await fetch(`${API_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`)
  if (!response.ok) {
    throw new Error('Failed to fetch market chart data')
  }
  return response.json()
}

export async function getTrendingCoins() {
  const response = await fetch(`${API_BASE_URL}/search/trending`)
  if (!response.ok) {
    throw new Error('Failed to fetch trending coins')
  }
  return response.json()
}

