'use client';

import React, { useState, useEffect } from 'react';
import { getSymbolStats, BinanceTickerResponse } from '../utils/binance';
import { connectToTicker, WebSocketTickerMessage } from '../utils/websocket';

interface CryptoCardProps {
    symbol: string;
}


export default function CryptoCard({ symbol } : CryptoCardProps) {
    const [price, setPrice] = useState<number>(0);
    const [change, setChange] = useState<number>(0);
    const [perc, setPerc] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const changeColor = perc >= 0 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400';
    const changeIcon = perc >= 0 ? '↑' : '↓';

    useEffect(() => {
        getSymbolStats(symbol)
        .then((data: BinanceTickerResponse) => {
            setPrice(parseFloat(data.lastPrice));
            setChange(parseFloat(data.priceChange));
            setPerc(parseFloat(data.priceChangePercent));
            setLoading(false);
            setError(null); // Clear any previous errors
        })
        .catch((err: unknown) => {
            setError('Failed to load price data'); 
            console.error('API Error:', err);
            console.error('Error details:', {
                message: err instanceof Error ? err.message : 'Unknown error',
                symbol: symbol,
            });
            setLoading(false);
        });

        const ws: WebSocket = connectToTicker(symbol, (data : WebSocketTickerMessage) => {
            setPrice(parseFloat(data.c));
            setChange(parseFloat(data.p));
            setPerc(parseFloat(data.P));
        });

        return () => {
            // Close the WebSocket connection when the component unmounts
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [symbol]);

    if (loading) {
        return (
            <div className="bg-gray-700 dark:bg-gray-200 w-48 h-48 p-4 rounded-lg flex flex-col justify-center items-center gap-2 animate-pulse shadow-md dark:shadow-lg dark:shadow-gray-500/20">
                <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-800 dark:bg-gray-100 w-48 h-48 p-4 rounded-lg flex flex-col justify-center items-center gap-2 shadow-lg dark:shadow-xl dark:shadow-red-500/20 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-red-500/30 hover:scale-105 transition-all">
                <h2 className="text-xl font-bold tracking-tight leading-tight text-gray-200 dark:text-gray-600">{symbol}</h2>
                <p className="text-red-500 dark:text-red-400 text-sm text-center mt-2">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 dark:bg-gray-100 w-48 h-48 p-4 rounded-lg flex flex-col justify-center items-center gap-2 shadow-lg dark:shadow-xl dark:shadow-purple-500/20 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-purple-500/30 hover:scale-105 transition-all">
            <h2 className="text-xl font-bold tracking-tight leading-tight text-gray-200 dark:text-gray-600">{symbol}</h2>
            <p className="text-base leading-relaxed text-gray-300 dark:text-gray-600">
                ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={`text-base leading-relaxed ${changeColor}`}>
                Change: {change >= 0 ? '+' : '-'}${Math.abs(change).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={`text-base font-bold ${changeColor}`}>
                {changeIcon} {Math.abs(perc).toFixed(2)}%
            </p>
        </div>
    );
}
