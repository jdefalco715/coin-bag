export interface WebSocketTickerMessage {
  c: string; // Last (current) Price
  p: string; // Price Change (in USD)
  P: string; // Price Change (Percentage)
}

export type TickerMessageCallback = (data: WebSocketTickerMessage) => void;

export function connectToTicker(symbol: string, onMessage: TickerMessageCallback): WebSocket {
    const ws = new WebSocket(`wss://stream.binance.us:9443/ws/${symbol.toLowerCase()}@ticker`);
    
    ws.onmessage = (event: MessageEvent) => {
      const data: WebSocketTickerMessage = JSON.parse(event.data as string);
      onMessage(data); 
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return ws;
}