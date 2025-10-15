import { STOCKS } from '@/lib/mock-data';
import StockCard from './StockCard';
import styles from './portfolio.module.css';

export default function PortfolioPage() {
  const benchmark = STOCKS.find(s => s.ticker === 'SPY');
  const portfolioStocks = STOCKS.filter(s => s.ticker !== 'SPY');

  return (
    <div>
      <h1>Select Stocks for Your Portfolio</h1>
      <p style={{ marginBottom: '2rem', color: '#9ca3af' }}>Select the assets you want to add. The portfolio will be benchmarked against SPY.</p>
      
      {benchmark && (
        <div className={styles.benchmark}>
          <h2>Benchmark</h2>
          <p>{benchmark.ticker} - ${benchmark.price.toFixed(2)}</p>
        </div>
      )}

      <h2>Available Stocks</h2>
      <div className={styles.grid}>
        {portfolioStocks.map(stock => (
          <StockCard key={stock.ticker} stock={stock} />
        ))}
      </div>
    </div>
  );
}
