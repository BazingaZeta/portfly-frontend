'use client';

import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';

type FearGreedCategory = 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';

const getFearGreedCategory = (score: number): FearGreedCategory => {
  if (score <= 24) return 'Extreme Fear';
  if (score <= 44) return 'Fear';
  if (score <= 55) return 'Neutral';
  if (score <= 75) return 'Greed';
  return 'Extreme Greed';
};

const getFearGreedColorClass = (category: FearGreedCategory): string => {
  switch (category) {
    case 'Extreme Fear': return styles.fgExtremeFear;
    case 'Fear': return styles.fgFear;
    case 'Neutral': return styles.fgNeutral;
    case 'Greed': return styles.fgGreed;
    case 'Extreme Greed': return styles.fgExtremeGreed;
    default: return '';
  }
};

export default function FearGreedIndex() {
  const [score, setScore] = useState(50); // Start with Neutral

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate score fluctuation
      const fluctuation = (Math.random() - 0.5) * 20; // +/- 10
      setScore(prevScore => {
        let newScore = prevScore + fluctuation;
        // Keep score within 0-100 range
        newScore = Math.max(0, Math.min(100, newScore));
        return Math.round(newScore);
      });
    }, 6000); // Update every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const category = getFearGreedCategory(score);
  const colorClass = getFearGreedColorClass(category);
  return (
    <div className={`${styles.fearGreedContainer} ${colorClass}`}>
      <h3 className={styles.fearGreedTitle}>Fear & Greed Index</h3>
      <p className={styles.fearGreedScore}>{score}</p>
      <p className={styles.fearGreedCategory}>{category}</p>
    </div>
  );
}