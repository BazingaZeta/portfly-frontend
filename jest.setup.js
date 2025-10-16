// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock ResizeObserver for Recharts ResponsiveContainer
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Set a dummy Finnhub API key for tests
process.env.NEXT_PUBLIC_FINNHUB_API_KEY = "test_finnhub_key";

// Mock FinnhubAPI for tests
jest.mock("@/lib/finnhub-api", () => ({
  FinnhubAPI: jest.fn(() => ({
    getQuote: jest.fn(async (symbol) => {
      // Return a mock quote response
      if (symbol === "SPY") {
        return {
          c: 400.0, // Current price
          h: 401.0, // High price of the day
          l: 399.0, // Low price of the day
          o: 399.5, // Open price of the day
          pc: 398.0, // Previous close price
          t: Date.now(), // Timestamp
        };
      }
      throw new Error(`Mock FinnhubAPI: Quote for ${symbol} not found.`);
    }),
  })),
}));
