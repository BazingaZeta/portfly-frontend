'use client';

import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';

type VIXLevel = 'Low' | 'Moderate' | 'High' | 'Extreme';

const getVIXLevel = (vix: number): VIXLevel => {
  if (vix < 15) return 'Low';
  if (vix < 25) return 'Moderate';
  if (vix < 40) return 'High';
  return 'Extreme';
};

const getVIXColorClass = (level: VIXLevel): string => {
  switch (level) {
    case 'Low': return styles.vixLow;
    case 'Moderate': return styles.vixModerate;
    case 'High': return styles.vixHigh;
    case 'Extreme': return styles.vixExtreme;
    default: return '';
  }
};

export default function VIXIndicator() {
  const [vixValue, setVixValue] = useState(20); // Start with a moderate VIX

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate VIX fluctuation
      const fluctuation = (Math.random() - 0.5) * 5; // +/- 2.5
      setVixValue(prevVix => {
        let newVix = prevVix + fluctuation;
        // Keep VIX within a reasonable range (e.g., 10-80)
        newVix = Math.max(10, Math.min(80, newVix));
        return Math.round(newVix * 100) / 100; // Round to 2 decimal places
      });
    }, 7000); // Update every 7 seconds

    return () => clearInterval(interval);
  }, []);

  const vixLevel = getVIXLevel(vixValue);
  const vixColorClass = getVIXColorClass(vixLevel);
  return (
    <div className={`${styles.vixIndicatorContainer} ${vixColorClass}`}>
      <h3 className={styles.vixIndicatorTitle}>VIX Index</h3>
      <p className={styles.vixIndicatorValue}>{vixValue.toFixed(2)}</p>
      <p className={styles.vixIndicatorLevel}>{vixLevel}</p>
    </div>
  );
}