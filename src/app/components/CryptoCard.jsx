'use client';

import React, { useState, useEffect } from 'react';
import { getSymbolStats } from '../api/binance';
import { connectToTicker } from '../utils/websocket';

export default function CryptoCard({ symbol }) {
    const [price, setPrice] = useState(0);
    const [change, setChange] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSymbolStats(symbol)
        .then((data) => {
            setPrice(parseFloat(data.lastPrice));
            setChange(parseFloat(data.priceChangePercent));
            setLoading(false);
            setError(null); // Clear any previous errors
        })
        .catch((err) => {
            setError('Failed to load price data'); 
            console.error('API Error:', err);
            console.error('Error details:', {
                message: err.message,
                symbol: symbol,
            });
            setLoading(false);
        });

        const ws = connectToTicker(symbol, (data) => {
            setPrice(parseFloat(data.p));
            setChange(parseFloat(data.P));
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
            <div className="bg-gray-200 w-40 h-40 p-4 rounded-lg flex flex-col justify-center items-center animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-100 w-40 h-40 p-4 rounded-lg flex flex-col justify-center items-center">
                <h2 className="text-lg font-bold text-gray-600">{symbol}</h2>
                <p className="text-red-500 text-xs text-center mt-2">{error}</p>
            </div>
        );
    }

    return (
    <div className="bg-gray-100 w-40 h-40 p-4 rounded-lg flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold text-gray-600">{symbol}</h2>
        <p className="text-sm text-gray-600">Price: ${price.toFixed(2)}</p>
        <p className="text-sm text-gray-600">Change: {change.toFixed(2)}%</p>
    </div>

    );
}
