"use client";
import { useEffect } from "react";
import CoinDetails from "./components/MainPageComponents/CoinDetails";
import CoinStatistics from "./components/MainPageComponents/CoinStatistics";
import { useCrypto } from "@/app/Context/CryptoContext";
import LineChart from "./components/LineChart/LineChart";
import { getCoinInformation, getBitCoinData } from "./api";

export default function Home() {
  const { marketData, setMarketData, bitCoinData, setBitCoinData } =
    useCrypto();

  const collectMarketData = async () => {
    const data = await getCoinInformation();
    setMarketData(data);
  };

  const collectBitCoinData = async () => {
    const data = await getBitCoinData();
    setBitCoinData(data);
  };

  useEffect(() => {
    collectMarketData();
    collectBitCoinData();
  }, []);

  return (
    <main>
      <div className="bg-green p-5">
        <div className="flex items-center flex-col">
          <div className="flex justify-between w-full text-white">
            <div>Select the currency to view statistics</div>
            <div>Compare box</div>
          </div>
          <div className="flex overflow-scroll w-1/2">
            {marketData.map((coin) => (
              <CoinStatistics key={coin.id} data={coin} />
            ))}
          </div>
          <LineChart
            chartData={bitCoinData.prices}
            numDays={30}
            title="Bitcoin"
          />
        </div>
        <div className="mt-8 h-[800px] overflow-scroll overflow-x-hidden">
          {marketData.map((coin, index) => (
            <CoinDetails key={coin.id} data={coin} spot={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
