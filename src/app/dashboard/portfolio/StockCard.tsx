'use client';

import type { Stock } from '@/lib/mock-data';
import styles from './portfolio.module.css';

interface StockCardProps {
  stock: Stock;
  isSelected: boolean;
  onSelect: (ticker: string) => void;
}

export default function StockCard({ stock, isSelected, onSelect }: StockCardProps) {
  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
      onClick={() => onSelect(stock.ticker)}
    >
      <h3 className={styles.ticker}>{stock.ticker}</h3>
      <p className={styles.name}>{stock.name}</p>
      <p className={styles.price}>${stock.price.toFixed(2)}</p>
    </div>
  );
}
