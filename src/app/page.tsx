"use client";
import { useEffect, useState } from "react";
import CoinDetails from "./components/MainPageComponents/CoinDetails";
import CoinStatistics from "./components/MainPageComponents/CoinStatistics";
import { useCrypto } from "@/app/Context/CryptoContext";
import LineChart from "./components/LineChart/LineChart";
import { getCoinInformation, getBitCoinData } from "./api";

export default function Home() {
  const { marketData, setMarketData, bitCoinData, setBitCoinData, currency } =
    useCrypto();
  const [selectedDays, setSelectedDays] = useState("30");

  const collectMarketData = async () => {
    const data = await getCoinInformation(currency);
    setMarketData(data);
  };

  const collectBitCoinData = async () => {
    const data = await getBitCoinData();
    setBitCoinData(data);
  };

  const setDays = (days) => {
    setSelectedDays(days.target.value);
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
          <div className="flex overflow-scroll overflow-y-hidden w-1/2">
            {marketData.map((coin) => (
              <CoinStatistics key={coin.id} data={coin} />
            ))}
          </div>
          <LineChart
            chartData={bitCoinData.prices}
            numDays={selectedDays}
            title="Bitcoin"
          />
        </div>
        <div className="flex justify-center items-center text-white space-x-14">
          <button onClick={setDays} value={7}>
            7D
          </button>
          <button onClick={setDays} value={30}>
            30D
          </button>
          <button onClick={setDays} value={180}>
            6M
          </button>
        </div>
        <div className="flex justify-between text-white mt-2.5 mx-2 p-2 rounded-2xl  bg-[#181825] mt-5">
          <div className="flex justify-between items-center w-1/5 text-center">
            <div className="w-10">#</div>
            <div className="w-full">
              <div className="flex justify-center">Currency</div>
            </div>
          </div>
          <div className="flex justify-between items-center w-1/2 text-center">
            <div className="w-1/4">Current Price</div>
            <div className="w-1/4">% Change (1H)</div>
            <div className="w-1/4">% Change (1D)</div>
            <div className="w-1/4">% Change (7D)</div>
          </div>
          <div className="flex justify-between items-center w-1/4 text-center">
            <div className="w-1/4">Volume vs Market Cap</div>
            <div className="w-1/2">Circulating Supply vs Total Supply</div>
            <div className="w-1/4">Graph</div>
          </div>
        </div>
        <div className="mt-4 h-[672px] space-y-2">
          {marketData.map((coin, index) => (
            <CoinDetails key={coin.id} data={coin} spot={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
