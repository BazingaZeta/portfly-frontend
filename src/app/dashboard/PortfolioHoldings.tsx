'use client';

import { useMemo } from 'react';
import { PORTFOLIO_HOLDINGS, getStockDataForHolding } from '@/lib/mock-portfolio-holdings';
import { STOCKS } from '@/lib/mock-data';
import styles from './dashboard.module.css';

export default function PortfolioHoldings() {
  const portfolioSummary = useMemo(() => {
    let totalValue = 0;
    let totalCost = 0;
    let totalDailyChange = 0;

    const holdingsWithCurrentData = PORTFOLIO_HOLDINGS.map(holding => {
      const currentStockData = getStockDataForHolding(holding);
      if (!currentStockData) return null; // Should not happen with consistent mock data

      const currentValue = holding.quantity * currentStockData.price;
      const costBasis = holding.quantity * holding.averageCost;
      const dailyChange = (currentStockData.price - holding.averageCost) * holding.quantity; // Simplified daily change for mock

      totalValue += currentValue;
      totalCost += costBasis;
      totalDailyChange += dailyChange;

      return {
        ...holding,
        currentPrice: currentStockData.price,
        currentValue,
        dailyChange,
        profitOrLoss: currentValue - costBasis,
      };
    }).filter(Boolean);

    const totalProfitOrLoss = totalValue - totalCost;
    const totalProfitOrLossPercentage = totalCost > 0 ? (totalProfitOrLoss / totalCost) * 100 : 0;

    return {
      totalValue,
      totalDailyChange,
      totalProfitOrLoss,
      totalProfitOrLossPercentage,
      holdings: holdingsWithCurrentData,
    };
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
  };

  return (
    <div className={styles.portfolioHoldingsContainer}>
      <h2 className="text-2xl font-bold mb-4">Your Holdings</h2>

      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <h3>Total Portfolio Value</h3>
          <p className={styles.summaryValue}>{formatCurrency(portfolioSummary.totalValue)}</p>
        </div>
        <div className={styles.summaryCard}>
          <h3>Today's Change (Simulated)</h3>
          <p className={`${styles.summaryValue} ${portfolioSummary.totalDailyChange >= 0 ? styles.positive : styles.negative}`}>
            {formatCurrency(portfolioSummary.totalDailyChange)}
          </p>
        </div>
        <div className={styles.summaryCard}>
          <h3>Total P&L (Simulated)</h3>
          <p className={`${styles.summaryValue} ${portfolioSummary.totalProfitOrLoss >= 0 ? styles.positive : styles.negative}`}>
            {formatCurrency(portfolioSummary.totalProfitOrLoss)} ({formatPercentage(portfolioSummary.totalProfitOrLossPercentage)})
          </p>
        </div>
      </div>

      <div className={styles.holdingsTableContainer}>
        <table className={styles.holdingsTable}>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Quantity</th>
              <th>Avg. Cost</th>
              <th>Current Price</th>
              <th>Current Value</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {portfolioSummary.holdings.map(holding => (
              <tr key={holding.ticker}>
                <td>{holding.ticker}</td>
                <td>{holding.quantity}</td>
                <td>{formatCurrency(holding.averageCost)}</td>
                <td>{formatCurrency(holding.currentPrice)}</td>
                <td>{formatCurrency(holding.currentValue)}</td>
                <td className={holding.profitOrLoss >= 0 ? styles.positive : styles.negative}>
                  {formatCurrency(holding.profitOrLoss)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
