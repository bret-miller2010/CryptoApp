"use client";
import { useState, useEffect } from "react";
import CoinDetails from "./components/MainPageComponents/CoinDetails";
import CoinStatistics from "./components/MainPageComponents/CoinStatistics";
import { useCrypto } from "@/app/Context/CryptoContext";
import LineChart from "./components/LineChart/LineChart";

export default function Home() {
  const { marketData, bitCoinData } = useCrypto();
  const [selectedDays, setSelectedDays] = useState("30");
  const [statisticsValue, setStatisticsValue] = useState(0);
  const [detailsValue, setDetailsValue] = useState(0);
  const [sortedData, setSortedData] = useState([]);
  const [sortType, setSortType] = useState(true);

  const sortBy = (event) => {
    const sortKey = event.target.value;
    const types = {
      rank: "market_cap_rank",
      one_hour: "price_change_percentage_1h_in_currency",
      one_day: "price_change_24h",
      current_price: "current_price",
      seven_day: "price_change_percentage_7d_in_currency",
      name: "name",
    };

    const sortValue = types[sortKey];

    const sortedArray = marketData.toSorted((a, b) => {
      if (sortValue === "name") {
        if (sortType) {
          return b[sortValue].localeCompare(a[sortValue]);
        } else {
          return a[sortValue].localeCompare(b[sortValue]);
        }
      } else {
        if (sortType) {
          return b[sortValue] - a[sortValue];
        } else {
          return a[sortValue] - b[sortValue];
        }
      }
    });

    setSortType(!sortType);
    setSortedData(sortedArray);
  };

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

  useEffect(() => {
    setSortedData(marketData);
  }, [marketData]);

  return (
    <main>
      <div className="bg-green p-5 text-sm">
        <div className="flex items-center flex-col">
          <div className="flex p-8 rounded-3xl w-full justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-16 mr-5 hover:bg-[#202049] rounded-full"
              onClick={() => updateStatisticsChart(-5)}
            >
              <path
                fillRule="evenodd"
                d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
            {marketData
              .filter(
                (_, index) =>
                  index >= statisticsValue && index <= statisticsValue + 4
              )
              .map((coin) => (
                <CoinStatistics
                  key={coin.id}
                  data={coin}
                />
              ))}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-16 ml-5 hover:bg-[#202049] rounded-full"
              onClick={() => updateStatisticsChart(5)}
            >
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex justify-around w-full">
            <LineChart
              chartData={bitCoinData.prices}
              numDays={selectedDays}
              title="Bitcoin"
            />

            <LineChart
              chartData={bitCoinData.prices}
              numDays={selectedDays}
              title="Bitcoin"
            />
          </div>
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
            className="size-14 hover:bg-[#202049] rounded-full"
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
            className="size-14 hover:bg-[#202049] rounded-full"
            onClick={() => updateDetailsChart(10)}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="flex justify-between text-white p-2 rounded-2xl  bg-[#181825] mt-5 h-[60px]">
          <div className="flex justify-between items-center w-1/5 text-center">
            <button onClick={sortBy} className="w-10" value="rank">
              #
            </button>
            <div className="w-full">
              <button
                onClick={sortBy}
                className="flex justify-center"
                value="name"
              >
                Currency
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center w-1/3 text-center">
            <button onClick={sortBy} className="w-1/4" value="current_price">
              Current Price
            </button>
            <button onClick={sortBy} className="w-1/4" value="one_hour">
              % Change (1H)
            </button>
            <button onClick={sortBy} className="w-1/4" value="one_day">
              % Change (1D)
            </button>
            <button onClick={sortBy} className="w-1/4" value="seven_day">
              % Change (7D)
            </button>
          </div>
          <div className="flex justify-between items-center w-[680px] text-center">
            <div className="w-1/3">Volume vs Market Cap</div>
            <div className="w-1/3">Circulating Supply vs Total Supply</div>
            <div className="w-1/3">Graph</div>
          </div>
        </div>
        <div className="mt-4 space-y-2 flex justify-center items-center flex-col w-full">
          {sortedData
            .filter(
              (_, index) => index >= detailsValue && index <= detailsValue + 9
            )
            .map((coin) => (
              <CoinDetails
                key={coin.id}
                data={coin}
                spot={coin.market_cap_rank}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
