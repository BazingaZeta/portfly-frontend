import { STOCKS, Stock } from './mock-data';

export type Holding = {
  ticker: string;
  quantity: number;
  averageCost: number; // Average price at which the stock was bought
};

export const PORTFOLIO_HOLDINGS: Holding[] = [
  { ticker: 'AAPL', quantity: 10, averageCost: 180.00 },
  { ticker: 'MSFT', quantity: 5, averageCost: 400.00 },
  { ticker: 'AMZN', quantity: 8, averageCost: 150.00 },
  { ticker: 'NVDA', quantity: 3, averageCost: 100.00 },
];

// Helper to get current stock data for a holding
export const getStockDataForHolding = (holding: Holding): Stock | undefined => {
  return STOCKS.find(s => s.ticker === holding.ticker);
};
