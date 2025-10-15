'use client';

import { useState } from 'react';
import type { Stock } from '@/lib/mock-data';
import styles from './portfolio.module.css';

interface StockCardProps {
  stock: Stock;
}

export default function StockCard({ stock }: StockCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    // In a real app, you'd also update a parent component's state
    console.log(`${stock.ticker} selection status: ${!isSelected}`);
  };

  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
      onClick={handleClick}
    >
      <h3 className={styles.ticker}>{stock.ticker}</h3>
      <p className={styles.name}>{stock.name}</p>
      <p className={styles.price}>${stock.price.toFixed(2)}</p>
    </div>
  );
}
