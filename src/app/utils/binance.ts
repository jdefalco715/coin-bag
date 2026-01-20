const BASE_URL = "https://api.binance.us";

export interface BinanceTickerResponse {
  symbol: string;
  lastPrice: string;
  priceChange: string;
  priceChangePercent: string;
}


/*
export type BinanceTickerArray = BinanceTickerResponse[];

// Get all current prices - commented out for now to implement in the future

  export async function getAllPrices(): Promise<BinanceTickerArray> {
    const res = await fetch(`${BASE_URL}/api/v3/ticker/24hr`);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return await res.json(); // This returns an array of 24hr stats for all trading pairs
  }
*/

// Get a specific coin by symbol (e.g., BTCUSDT)
export async function getSymbolStats(symbol : string): Promise<BinanceTickerResponse> {
  const res = await fetch(`${BASE_URL}/api/v3/ticker/24hr?symbol=${symbol}`);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}