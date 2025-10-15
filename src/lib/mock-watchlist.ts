import { STOCKS, Stock } from './mock-data';

export type WatchlistItem = {
  ticker: string;
  name: string;
};

export const WATCHLIST_STOCKS: WatchlistItem[] = [
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.' },
  { ticker: 'V', name: 'Visa Inc.' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.' }, // Example of a stock that might also be in holdings
  { ticker: 'TSLA', name: 'Tesla, Inc.' },
];

// Helper to get current stock data for a watchlist item
export const getStockDataForWatchlistItem = (item: WatchlistItem): Stock | undefined => {
  return STOCKS.find(s => s.ticker === item.ticker);
};
