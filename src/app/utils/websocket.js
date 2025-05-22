export function connectToTicker(symbol, onMessage) {
    const ws = new WebSocket(`wss://stream.binance.us:9443/ws/${symbol.toLowerCase()}@ticker`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data); // You'll get live price, volume, etc.
    };
  
    return ws;
  }