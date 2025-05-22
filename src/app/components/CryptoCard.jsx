'use client';

import React, { useState, useEffect } from 'react';
import { getSymbolStats } from '../api/binance';
import { connectToTicker } from '../utils/websocket';

export default function CryptoCard({ symbol }) {
    const [price, setPrice] = useState(0);
    const [change, setChange] = useState(0);

    useEffect(() => {
        getSymbolStats(symbol).then((data) => {
            setPrice(parseFloat(data.lastPrice));
            setChange(parseFloat(data.priceChangePercent));
        });

        const ws = connectToTicker(symbol, (data) => {
            setPrice(parseFloat(data.p));
            setChange(parseFloat(data.P));
        });
    }, [symbol]);

    return (
    <div className="bg-gray-100 w-40 h-40 p-4 rounded-lg flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold text-gray-600">{symbol}</h2>
        <p className="text-sm text-gray-600">Price: ${price.toFixed(2)}</p>
        <p className="text-sm text-gray-600">Change: {change.toFixed(2)}%</p>
     </div>

    );
}
