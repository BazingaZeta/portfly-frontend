'use client';

import { useState, useEffect } from 'react';
import { STOCKS, type Stock } from '@/lib/mock-data';
import StockCard from './StockCard';
import styles from './portfolio.module.css';
import ConfirmationModal from './ConfirmationModal';
import { FinnhubAPI } from '@/lib/finnhub-api';

type Signal = 'BUY' | 'SELL' | 'HOLD';
type AnalysisResult = { stock: Stock; signal: Signal; performed: boolean };

// --- Helper Functions ---
const getSignalStyle = (signal: Signal) => {
  if (signal === 'BUY') return styles.buy;
  if (signal === 'SELL') return styles.sell;
  return styles.hold;
};

const fetchAnalysis = (selectedTickers: string[], stocks: Stock[]): Promise<AnalysisResult[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const signals: Signal[] = ['BUY', 'SELL', 'HOLD'];
      const results: AnalysisResult[] = selectedTickers.map(ticker => {
        const stock = stocks.find(s => s.ticker === ticker)!;
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
      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
      <table className={styles.resultsTable}>
        <thead>
          <tr><th>Ticker</th><th>Name</th><th>Price</th><th>Signal</th><th className={styles.checkboxCell}>Eseguita</th></tr>
        </thead>
        <tbody>
          {results.map(({ stock, signal, performed }) => (
            <tr key={stock.ticker} className={performed ? styles.rowPerformed : ''}>
              <td className="font-medium">{stock.ticker}</td>
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
      <div className="mt-6 text-right">
        <button onClick={onReset} className={styles.button}>Analyze New Selection</button>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [selectedTickers, setSelectedTickers] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockToConfirm, setStockToConfirm] = useState<string | null>(null);
  const [isConfirmingAction, setIsConfirmingAction] = useState(false);

  const [benchmark, setBenchmark] = useState<Stock | undefined>(STOCKS.find(s => s.ticker === 'SPY'));
  const [portfolioStocks, setPortfolioStocks] = useState<Stock[]>(STOCKS.filter(s => s.ticker !== 'SPY'));

  useEffect(() => {
    const finnhubApi = new FinnhubAPI(process.env.NEXT_PUBLIC_FINNHUB_API_KEY!);

    const fetchPrices = async () => {
      const updatedStocks = await Promise.all(
        portfolioStocks.map(async (stock) => {
          try {
            const quote = await finnhubApi.getQuote(stock.ticker);
            return { ...stock, price: quote.c };
          } catch (error) {
            console.error(`Failed to fetch price for ${stock.ticker}`, error);
            return stock;
          }
        })
      );
      setPortfolioStocks(updatedStocks);

      if (benchmark) {
        try {
          const quote = await finnhubApi.getQuote(benchmark.ticker);
          setBenchmark({ ...benchmark, price: quote.c });
        } catch (error) {
          console.error(`Failed to fetch price for ${benchmark.ticker}`, error);
        }
      }
    };

    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const results = await fetchAnalysis(Array.from(selectedTickers), portfolioStocks);
    setAnalysisResult(results);
    setIsLoading(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setSelectedTickers(new Set());
  }

  const handleTogglePerformed = (ticker: string) => {
    // Open modal instead of directly toggling
    setStockToConfirm(ticker);
    setIsModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (!stockToConfirm) return;

    setIsConfirmingAction(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    setAnalysisResult(prevResults => {
      if (!prevResults) return null;
      return prevResults.map(result => 
        result.stock.ticker === stockToConfirm 
          ? { ...result, performed: !result.performed } 
          : result
      );
    });

    setIsConfirmingAction(false);
    setIsModalOpen(false);
    setStockToConfirm(null);
  };

  const handleCancelToggle = () => {
    setIsModalOpen(false);
    setStockToConfirm(null);
  };

  const selectedCount = selectedTickers.size;

  if (analysisResult) {
    return (
      <>
        <ResultsTable results={analysisResult} onReset={handleReset} onTogglePerformed={handleTogglePerformed} />
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCancelToggle}
          onConfirm={handleConfirmToggle}
          title="Conferma Operazione"
          message={`Sei sicuro di voler ${analysisResult.find(r => r.stock.ticker === stockToConfirm)?.performed ? 'annullare' : 'confermare'} l'esecuzione per ${stockToConfirm}?`}
          isLoading={isConfirmingAction}
        />
      </>
    );
  }

  return (
    <div>
      <h1>Select Stocks for Your Portfolio</h1>
      <p style={{ marginBottom: '2rem', color: '#9ca3af' }}>Select the assets you want to add. The portfolio will be benchmarked against SPY.</p>
      
      {benchmark && (
        <div className="mb-6">
          <h2 className="text-lg font-bold">Benchmark</h2>
          <p className="text-2xl font-bold">{benchmark.ticker} - ${benchmark.price.toFixed(2)}</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Available Stocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {portfolioStocks.map(stock => (
          <StockCard 
            key={stock.ticker} 
            stock={stock} 
            isSelected={selectedTickers.has(stock.ticker)}
            onSelect={handleSelectStock}
          />
        ))}
      </div>

      <div className="mt-6 text-right">
        <button onClick={handleAnalyze} disabled={selectedCount === 0 || isLoading} className={styles.button}>
          {isLoading ? 'Analyzing...' : `Analyze ${selectedCount} Selected Stocks`}
        </button>
      </div>
    </div>
  );
}