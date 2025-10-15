export type Stock = {
  ticker: string;
  name: string;
  price: number;
};

export const STOCKS: Stock[] = [
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', price: 545.39 },
  { ticker: 'AAPL', name: 'Apple Inc.', price: 214.29 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 179.22 },
  { ticker: 'MSFT', name: 'Microsoft Corporation', price: 449.78 },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.', price: 185.57 },
  { ticker: 'TSLA', name: 'Tesla, Inc.', price: 183.01 },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', price: 135.58 },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', price: 198.88 },
  { ticker: 'V', name: 'Visa Inc.', price: 275.22 },
];
