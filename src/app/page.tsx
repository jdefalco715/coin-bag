import Image from "next/image";
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
          <CryptoCard symbol="BTCUSDT" />
          <CryptoCard symbol="ETHUSDT" />
          <CryptoCard symbol="SOLUSDT" />
          <CryptoCard symbol="ADAUSDT" />
          <CryptoCard symbol="DOGEUSDT" />
          <CryptoCard symbol="XRPUSDT" />
          <CryptoCard symbol="DOTUSDT" />
          <CryptoCard symbol="LINKUSDT" />
          <CryptoCard symbol="BCHUSDT" />
          <CryptoCard symbol="LTCUSDT" />
          <CryptoCard symbol="XLMUSDT" />
          <CryptoCard symbol="XMRUSDT" />
          <CryptoCard symbol="AVAXUSDT" />
          <CryptoCard symbol="MATICUSDT" />
          <CryptoCard symbol="UNIUSDT" />
          <CryptoCard symbol="ATOMUSDT" />
          <CryptoCard symbol="ALGOUSDT" />
          <CryptoCard symbol="VETUSDT" />
          <CryptoCard symbol="FILUSDT" />
          <CryptoCard symbol="AAVEUSDT" />
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
