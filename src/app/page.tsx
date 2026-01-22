import { getAllPrices, BinanceTickerResponse } from './utils/binance';
import ErrorBoundary from "./components/ErrorBoundary";
import CryptoCard from "./components/CryptoCard";
import { FaGithub } from "react-icons/fa";

export default async function Home() {
  let top20: string[] = [];

  try {
    const data: BinanceTickerResponse[] = await getAllPrices();

    top20 = data
      .filter(ticker => ticker.symbol.endsWith('USDT'))
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0,20)
      .map(ticker => ticker.symbol);
  } catch (e) {
    console.error('Failed to load top markets:', e);
    return (
      <div className="grid grid-rows-[1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <main className="flex flex-col gap-[32px] row-start-1 items-center">
          <div className="text-center mb-4">
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
              Coin Bag
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A minimalistic crypto price tracker.
            </p>
          </div>
          <div className="text-red-500 text-center">
            <p className="text-xl font-semibold mb-2">Failed to load markets</p>
            <p className="text-sm">Please try refreshing the page.</p>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/jdefalco715/coin-bag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            Github
          </a>
        </footer>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex flex-col gap-[32px] row-start-1 items-center">
        
        <div className="text-center mb-4">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
            Coin Bag
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300">
            Lightweight crypto price monitor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {top20.map((symbol) => (
              <ErrorBoundary key={symbol}>
                <CryptoCard symbol={symbol} />
              </ErrorBoundary>
            ))}
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Powered by <a href="https://www.binance.com/en/markets" target="_blank" className="underline hover:underline-offset-4" rel="noopener noreferrer">Binance</a> 24hr market data.
          </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/jdefalco715/coin-bag"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          Github
        </a>
      </footer>
    </div>
  );
}
