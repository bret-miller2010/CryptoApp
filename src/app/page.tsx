"use client";
import { useState } from "react";
import CoinDetails from "./components/MainPageComponents/CoinDetails";
import CoinStatistics from "./components/MainPageComponents/CoinStatistics";
import { useCrypto } from "@/app/Context/CryptoContext";
import LineChart from "./components/LineChart/LineChart";

export default function Home() {
  const { marketData, bitCoinData } = useCrypto();
  const [selectedDays, setSelectedDays] = useState("30");
  const [statisticsValue, setStatisticsValue] = useState(0);
  const [detailsValue, setDetailsValue] = useState(0);

  const setDays = (days) => {
    setSelectedDays(days.target.value);
  };

  const updateDetailsChart = (amount) => {
    if (detailsValue + amount < 0) {
      setDetailsValue(0);
    } else if (detailsValue + amount > 49) {
      setDetailsValue(40);
    } else {
      setDetailsValue(detailsValue + amount);
    }
  };

  const updateStatisticsChart = (amount) => {
    if (statisticsValue + amount < 0) {
      setStatisticsValue(0);
    } else if (statisticsValue + amount > 49) {
      setStatisticsValue(45);
    } else {
      setStatisticsValue(statisticsValue + amount);
    }
  };

  return (
    <main>
      <div className="bg-green p-5">
        <div className="flex items-center flex-col">
          <div className="flex p-8 rounded-3xl w-full justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-16 mr-5"
              onClick={() => updateStatisticsChart(-5)}
            >
              <path
                fillRule="evenodd"
                d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
            {marketData.map((coin, index) => {
              if (index >= statisticsValue && index <= statisticsValue + 4) {
                return <CoinStatistics key={coin.id} data={coin} />;
              }
            })}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-16 ml-5"
              onClick={() => updateStatisticsChart(5)}
            >
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
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
        <div className="flex justify-center items-center mt-12 space-x-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="size-14"
            onClick={() => updateDetailsChart(-10)}
          >
            <path
              fillRule="evenodd"
              d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="size-14"
            onClick={() => updateDetailsChart(10)}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="flex justify-between text-white mt-2.5 p-2 rounded-2xl  bg-[#181825] mt-5">
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
        <div className="mt-4 space-y-2 flex justify-center items-center flex-col w-full">
          {marketData.map((coin, index) => {
            if (index >= detailsValue && index <= detailsValue + 9) {
              return <CoinDetails key={coin.id} data={coin} spot={index} />;
            }
          })}
        </div>
      </div>
    </main>
  );
}
