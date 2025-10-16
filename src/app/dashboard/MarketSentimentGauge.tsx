"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";

type Sentiment =
  | "Strong Bullish"
  | "Bullish"
  | "Neutral"
  | "Bearish"
  | "Strong Bearish";

const sentimentColors: Record<Sentiment, string> = {
  "Strong Bullish": styles.sentimentStrongBullish,
  Bullish: styles.sentimentBullish,
  Neutral: styles.sentimentNeutral,
  Bearish: styles.sentimentBearish,
  "Strong Bearish": styles.sentimentStrongBearish,
};

const sentimentValues: Record<Sentiment, number> = {
  "Strong Bullish": 100,
  Bullish: 75,
  Neutral: 50,
  Bearish: 25,
  "Strong Bearish": 0,
};

export default function MarketSentimentGauge() {
  const [currentSentiment, setCurrentSentiment] =
    useState<Sentiment>("Neutral");

  useEffect(() => {
    const sentiments: Sentiment[] = Object.keys(sentimentValues) as Sentiment[];
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * sentiments.length);
      setCurrentSentiment(sentiments[randomIndex]);
    }, 5000); // Change sentiment every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const gaugeValue = sentimentValues[currentSentiment];
  const gaugeColorClass = sentimentColors[currentSentiment];

  return (
    <div className={styles.sentimentGaugeContainer}>
      <h3 className={styles.sentimentGaugeTitle}>Market Sentiment</h3>
      <div className={styles.gaugeBarBackground}>
        <div
          className={`${styles.gaugeBarFill} ${gaugeColorClass}`}
          style={{ width: `${gaugeValue}%` }}
        ></div>
      </div>
      <div className={styles.sentimentLabel}>{currentSentiment}</div>
      <div className={styles.sentimentLegend}>
        <span>Strong Bearish</span>
        <span>Neutral</span>
        <span>Strong Bullish</span>
      </div>
    </div>
  );
}
