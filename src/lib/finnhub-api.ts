import axios from "axios";

interface FinnhubQuoteResponse {
  c: number; // Current price
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

export class FinnhubAPI {
  private apiKey: string;
  private baseUrl: string = "https://finnhub.io/api/v1";

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Finnhub API Key is required.");
    }
    this.apiKey = apiKey;
  }

  private async request<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response = await axios.get<T>(`${this.baseUrl}${endpoint}`, {
        params: { ...params, token: this.apiKey },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `Finnhub API Error: ${error.response?.status} - ${
            error.response?.data?.error || error.message
          }`
        );
        throw new Error(
          error.response?.data?.error || "Failed to fetch data from Finnhub."
        );
      } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred.");
      }
    }
  }

  public async getQuote(symbol: string): Promise<FinnhubQuoteResponse> {
    return this.request<FinnhubQuoteResponse>("/quote", { symbol });
  }

  // You can add more methods here for other Finnhub endpoints (e.g., company profile, news, etc.)
}
