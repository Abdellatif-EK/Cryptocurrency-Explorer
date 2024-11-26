export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_cap_rank: number | null;
  market_data: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    fully_diluted_valuation: { [key: string]: number } | null;
    total_volume:{ [key: string]: number };
    price_change_24h_in_currency: { [key: string]: number };
    price_change_percentage_24h: number;
    circulating_supply: number;
    max_supply: number | null;
    ath: { [key: string]: number };
    atl: { [key: string]: number };
  };
  description: { [key: string]: string };
  categories: string[];
  links: {
    homepage: string[];
    blockchain_site: string[];
    twitter_screen_name: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
    };
  };
}

export interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
  
}

