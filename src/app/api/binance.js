const BASE_URL = "https://api.binance.us";

// Get all current prices
export async function getAllPrices() {
  const res = await fetch(`${BASE_URL}/api/v3/ticker/24hr`, {
    headers: {
      'X-MBX-APIKEY': process.env.BINANCE_API_KEY
    }
  });
  return await res.json(); // This returns an array of 24hr stats for all trading pairs
}

// Get a specific coin by symbol (e.g., BTCUSDT)
export async function getSymbolStats(symbol) {
  const res = await fetch(`${BASE_URL}/api/v3/ticker/24hr?symbol=${symbol}`, {
    headers: {
      'X-MBX-APIKEY': process.env.BINANCE_API_KEY
    }
  });
  return await res.json();
}