"use client";
import { useEffect } from "react";
import CoinDetails from "./components/MainPageComponents/CoinDetails";
import CoinStatistics from "./components/MainPageComponents/CoinStatistics";
import { useCrypto } from "@/app/Context/CryptoContext";
import LineChart from "./components/LineChart/LineChart";
import { getCoinInformation, getBitCoinData } from "./api";

export default function Home() {
  const { marketData, setMarketData, bitCoinData, setBitCoinData, currency } =
    useCrypto();

  const collectMarketData = async () => {
    const data = await getCoinInformation(currency);
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
        <div className="flex justify-between text-white mt-2.5 mx-2 p-2 rounded-2xl  bg-[#181825]">
          <div className="flex justify-between items-center w-1/4 text-center">
            <div className="w-10">#</div>
            <div className="w-40 flex justify-center">Image</div>

            <div className="w-60 flex justify-center">Name</div>
          </div>
          <div className="flex justify-between items-center w-1/3 text-center">
            <div className="w-1/4">Current Price</div>
            <div className="w-1/4">% Change (1H)</div>
            <div className="w-1/4">% Change (1D)</div>
            <div className="w-1/4">% Change (7D)</div>
          </div>
          <div className="flex justify-around items-center w-1/3 text-center">
            <div className="w-1/4">Volume (B)</div>
            <div className="w-1/2">Circulating Supply vs Total Supply</div>
            <div className="w-1/4">Graph</div>
          </div>
        </div>
        <div className="mt-4 h-[672px] overflow-scroll overflow-x-hidden space-y-2">
          {marketData.map((coin, index) => (
            <CoinDetails key={coin.id} data={coin} spot={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
