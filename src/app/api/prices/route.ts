import { NextRequest, NextResponse } from "next/server";
import { getAllPrices, BinanceTickerResponse } from "@/app/utils/binance";

export async function GET(request: NextRequest) {
    let top: string[] = [];

    try {
        const data: BinanceTickerResponse[] = await getAllPrices();

        top = data
            .filter(ticker => ticker.symbol.endsWith('USDT'))
            .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
            .map(ticker => ticker.symbol);

        return NextResponse.json({ top }, { status: 200 });
    } catch (error) {
        console.error('Error fetching prices:', error);
        return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
    }


}