'use client';

import { useMemo } from 'react';
import { WATCHLIST_STOCKS, getStockDataForWatchlistItem } from '@/lib/mock-watchlist';
import styles from '../dashboard.module.css'; // Reusing dashboard styles

export default function WatchlistPage() {
  const watchlistData = useMemo(() => {
    return WATCHLIST_STOCKS.map(item => {
      const stockData = getStockDataForWatchlistItem(item);
      if (!stockData) return null;

      // Simulate a daily change for watchlist items
      const dailyChangeAbsolute = (Math.random() - 0.5) * (stockData.price * 0.02); // +/- 2%
      const dailyChangePercentage = (dailyChangeAbsolute / stockData.price) * 100;

      return {
        ...item,
        currentPrice: stockData.price,
        dailyChangeAbsolute,
        dailyChangePercentage,
      };
    }).filter(Boolean);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Your Watchlist</h1>
      <p className="text-muted-foreground mb-6">Stocks you are currently monitoring.</p>

      <div className={styles.holdingsTableContainer}> {/* Reusing holdings table container style */}
        <table className={styles.holdingsTable}> {/* Reusing holdings table style */}
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Current Price</th>
              <th>Daily Change</th>
            </tr>
          </thead>
          <tbody>
            {watchlistData.map(item => (
              <tr key={item.ticker}>
                <td>{item.ticker}</td>
                <td>{item.name}</td>
                <td>{formatCurrency(item.currentPrice)}</td>
                <td className={item.dailyChangeAbsolute >= 0 ? styles.positive : styles.negative}>
                  {formatCurrency(item.dailyChangeAbsolute)} ({formatPercentage(item.dailyChangePercentage)})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
