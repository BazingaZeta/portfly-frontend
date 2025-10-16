'use client';

import { useState, useEffect } from 'react';
import { STOCKS, Stock } from '@/lib/mock-data';
import styles from './dashboard.module.css';

interface StockWithChange extends Stock {
  dailyChangePercent: number;
}

const simulateDailyChanges = (): StockWithChange[] => {
  return STOCKS.map(stock => {
    const fluctuation = (Math.random() - 0.5) * 0.05; // +/- 5%
    const dailyChangePercent = fluctuation * 100;
    return { ...stock, dailyChangePercent: parseFloat(dailyChangePercent.toFixed(2)) };
  });
};

export default function TopMovers() {
  const [movers, setMovers] = useState<StockWithChange[]>([]);

  useEffect(() => {
    const updateMovers = () => {
      const stocksWithChanges = simulateDailyChanges();
      setMovers(stocksWithChanges);
    };

    updateMovers(); // Initial update
    const interval = setInterval(updateMovers, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const topGainers = movers
    .filter(m => m.dailyChangePercent > 0)
    .sort((a, b) => b.dailyChangePercent - a.dailyChangePercent)
    .slice(0, 5); // Top 5 gainers

  const topLosers = movers
    .filter(m => m.dailyChangePercent < 0)
    .sort((a, b) => a.dailyChangePercent - b.dailyChangePercent)
    .slice(0, 5); // Top 5 losers

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'percent', signDisplay: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
  };

  return (
    <div className={styles.topMoversContainer}>
      <h2 className="text-2xl font-bold mb-4">Top Movers</h2>
      <div className={styles.moversGrid}>
        <div className={styles.moversList}>
          <h3 className="text-xl font-semibold mb-2 text-green-500">Top Gainers</h3>
          <ul>
            {topGainers.length > 0 ? (
              topGainers.map(stock => (
                <li key={stock.ticker} className={styles.moverItem}>
                  <span>{stock.ticker}</span>
                  <span className={styles.positive}>{formatPercentage(stock.dailyChangePercent)}</span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No gainers today.</li>
            )}
          </ul>
        </div>
        <div className={styles.moversList}>
          <h3 className="text-xl font-semibold mb-2 text-red-500">Top Losers</h3>
          <ul>
            {topLosers.length > 0 ? (
              topLosers.map(stock => (
                <li key={stock.ticker} className={styles.moverItem}>
                  <span>{stock.ticker}</span>
                  <span className={styles.negative}>{formatPercentage(stock.dailyChangePercent)}</span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No losers today.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
