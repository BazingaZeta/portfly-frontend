'use client';

import { useState } from 'react';
import { STOCKS, type Stock } from '@/lib/mock-data';
import StockCard from './StockCard';
import styles from './portfolio.module.css';

type Signal = 'BUY' | 'SELL' | 'HOLD';
type AnalysisResult = { stock: Stock; signal: Signal; performed: boolean };

// --- Helper Functions ---
const getSignalStyle = (signal: Signal) => {
  if (signal === 'BUY') return styles.buy;
  if (signal === 'SELL') return styles.sell;
  return styles.hold;
};

const fetchAnalysis = (selectedTickers: string[]): Promise<AnalysisResult[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const signals: Signal[] = ['BUY', 'SELL', 'HOLD'];
      const results: AnalysisResult[] = selectedTickers.map(ticker => {
        const stock = STOCKS.find(s => s.ticker === ticker)!;
        const randomSignal = signals[Math.floor(Math.random() * signals.length)];
        return { stock, signal: randomSignal, performed: false }; // Add performed state
      });
      resolve(results);
    }, 1500);
  });
};

// --- Components ---
function ResultsTable({ results, onReset, onTogglePerformed }: { results: AnalysisResult[], onReset: () => void, onTogglePerformed: (ticker: string) => void }) {
  return (
    <div>
      <h2>Analysis Results</h2>
      <table className={styles.resultsTable}>
        <thead>
          <tr><th>Ticker</th><th>Name</th><th>Price</th><th>Signal</th><th className={styles.checkboxCell}>Eseguita</th></tr>
        </thead>
        <tbody>
          {results.map(({ stock, signal, performed }) => (
            <tr key={stock.ticker} className={performed ? styles.rowPerformed : ''}>
              <td>{stock.ticker}</td>
              <td>{stock.name}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td><span className={`${styles.signalBadge} ${getSignalStyle(signal)}`}>{signal}</span></td>
              <td className={styles.checkboxCell}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={performed}
                  onChange={() => onTogglePerformed(stock.ticker)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.controls}>
        <button onClick={onReset} className={styles.button}>Analyze New Selection</button>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [selectedTickers, setSelectedTickers] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult[] | null>(null);

  const benchmark = STOCKS.find(s => s.ticker === 'SPY');
  const portfolioStocks = STOCKS.filter(s => s.ticker !== 'SPY');

  const handleSelectStock = (ticker: string) => {
    setSelectedTickers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ticker)) {
        newSet.delete(ticker);
      } else {
        newSet.add(ticker);
      }
      return newSet;
    });
  };

  const handleAnalyze = async () => {
    if (selectedTickers.size === 0) return;
    setIsLoading(true);
    const results = await fetchAnalysis(Array.from(selectedTickers));
    setAnalysisResult(results);
    setIsLoading(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setSelectedTickers(new Set());
  }

  const handleTogglePerformed = (ticker: string) => {
    setAnalysisResult(prevResults => {
      if (!prevResults) return null;
      return prevResults.map(result => 
        result.stock.ticker === ticker 
          ? { ...result, performed: !result.performed } 
          : result
      );
    });
  };

  if (analysisResult) {
    return <ResultsTable results={analysisResult} onReset={handleReset} onTogglePerformed={handleTogglePerformed} />;
  }

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
          <StockCard 
            key={stock.ticker} 
            stock={stock} 
            isSelected={selectedTickers.has(stock.ticker)}
            onSelect={handleSelectStock}
          />
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={handleAnalyze} disabled={selectedTickers.size === 0 || isLoading} className={styles.button}>
          {isLoading ? 'Analyzing...' : `Analyze ${selectedTickers.size} Selected Stocks`}
        </button>
      </div>
    </div>
  );
}
