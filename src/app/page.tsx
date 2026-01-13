import Image from "next/image";
import ErrorBoundary from "./components/ErrorBoundary";
import CryptoCard from "./components/CryptoCard";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-1 items-center">
        
        <p className="text-center text-2xl">
          Coin Bag, a crypto price tracker.
        </p>
          <div className="grid grid-cols-4 gap-2">
            {['BTCUSDT',
              'ETHUSDT', 
              'SOLUSDT', 
              'ADAUSDT', 
              'DOGEUSDT', 
              'XRPUSDT', 
              'DOTUSDT', 
              'LINKUSDT', 
              'BCHUSDT', 
              'LTCUSDT', 
              'XLMUSDT',
              'XMRUSDT', 
              'AVAXUSDT', 
              'MATICUSDT',
              'UNIUSDT',
              'ATOMUSDT',
              'ALGOUSDT',
              'VETUSDT',
              'FILUSDT',
              'AAVEUSDT'].map((symbol) => (
                <ErrorBoundary key={symbol}>
                  <CryptoCard symbol={symbol} />
                </ErrorBoundary>
              ))}
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
