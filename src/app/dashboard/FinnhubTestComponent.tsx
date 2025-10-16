"use client";

import { useState } from "react";
import { FinnhubAPI } from "@/lib/finnhub-api";
import styles from './dashboard.module.css'; // Reusing dashboard styles

const finnhub = new FinnhubAPI(process.env.NEXT_PUBLIC_FINNHUB_API_KEY || "");

export default function FinnhubTestComponent() {
  const [quote, setQuote] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApiCall = async () => {
    setLoading(true);
    setError(null);
    setQuote(null);
    try {
      if (
        !process.env.NEXT_PUBLIC_FINNHUB_API_KEY ||
        process.env.NEXT_PUBLIC_FINNHUB_API_KEY === "LA_TUA_FINNHUB_API_KEY"
      ) {
        throw new Error("Finnhub API Key not set or is default placeholder.");
      }
      const result = await finnhub.getQuote("AAPL"); // Test with Apple stock
      setQuote(result.c);
      console.log("Finnhub API Test Result (AAPL):", result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Finnhub API Test Error:", err);
      setError(err?.message || "An unknown error occurred during API call.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.topMoversContainer}>
      {" "}
      {/* Reusing a container style */}
      <h2 className="text-2xl font-bold mb-4">Finnhub API Test</h2>
      <button
        onClick={testApiCall}
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Testing..." : "Test Finnhub API (AAPL)"}
      </button>
      {error && <p className={`${styles.negative} mt-2`}>Error: {error}</p>}
      {quote && (
        <p className={`${styles.positive} mt-2`}>
          AAPL Current Price: ${quote.toFixed(2)}
        </p>
      )}
      <p className="text-muted-foreground mt-2">
        Check browser console for full response.
      </p>
    </div>
  );
}
