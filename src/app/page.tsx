"use client";
import { useState, useEffect } from "react";
import CoinDetails from "./components/MainPageComponents/CoinDetails";
import CoinStatistics from "./components/MainPageComponents/CoinStatistics";
import { useCrypto } from "@/app/Context/CryptoContext";
import { MainPageLineChart } from "./components/LineChart/LineChart";
import { primaryColor, secondaryColor } from "./utils/utility";
import { getDailyPriceFor } from "./api";

export default function Home() {
   const { marketData, darkMode } = useCrypto();
   const [statisticsValue, setStatisticsValue] = useState(0);
   const [selectedDays, setSelectedDays] = useState("30");
   const [detailsValue, setDetailsValue] = useState(0);
   const [sortedData, setSortedData] = useState([]);
   const [sortType, setSortType] = useState(true);
   const [graphData, setGraphData] = useState();
   const [selectedChart, setSelectedChart] = useState();
   const [collapsed, setCollapsed] = useState(false);

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

   const isSelected = (num) => {
      return `${num == selectedDays ? "z-10" : "z-0"}`;
   };

   const setDays = (days) => {
      setSelectedDays(days.target.value);
      setCollapsed(!collapsed);
   };

   const addToGraph = async (event) => {
      const coinWanted = event.target.id;
      const coinToAdd = marketData.find((coin) => coin.id === coinWanted);
      const currentCoinData = await getDailyPriceFor(coinToAdd.id);
      setGraphData(currentCoinData);
      setSelectedChart(coinToAdd.name);
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
      <main className={`h-screen duration-300 ${primaryColor(darkMode)}`}>
         <div className="p-5 text-sm">
            <div className="flex items-center flex-col">
               <div className="flex p-8 rounded-3xl w-full justify-center items-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill={darkMode ? "white" : "black"}
                     className="duration-300 size-16 mr-5 hover:scale-125 rounded-full"
                     onClick={() => updateStatisticsChart(-5)}
                  >
                     <path
                        fillRule="evenodd"
                        d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                        clipRule="evenodd"
                     />
                  </svg>
                  {marketData
                     .filter((_, index) => index >= statisticsValue && index <= statisticsValue + 4)
                     .map((coin) => (
                        <CoinStatistics
                           key={coin.id}
                           data={coin}
                           selected={selectedChart}
                           handleClick={addToGraph}
                           darkMode={darkMode}
                        />
                     ))}
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill={darkMode ? "white" : "black"}
                     className="duration-300 size-16 mr-5 hover:scale-125 rounded-full"
                     onClick={() => updateStatisticsChart(5)}
                  >
                     <path
                        fillRule="evenodd"
                        d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                     />
                  </svg>
               </div>
               <div className="flex justify-around w-full mt-10">
                  {!graphData && <div className="text-white my-5 text-lg">Please select a coin from above to display price data.</div>}
                  {graphData && (
                     <div className="flex flex-col items-center space-y-12">
                        <div className="flex space-x-20">
                           <MainPageLineChart
                              data={graphData}
                              numDays={selectedDays}
                              type={"price"}
                              coin={selectedChart}
                              chartType="Price over time"
                              darkMode={darkMode}
                           />
                           <MainPageLineChart
                              data={graphData}
                              numDays={selectedDays}
                              type={"volume"}
                              coin={selectedChart}
                              chartType="Volume over time"
                              darkMode={darkMode}
                           />
                        </div>
                        <div className={"flex justify-center items-center text-white"}>
                           <button
                              onClick={setDays}
                              value={7}
                              className={`${secondaryColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(7)} ${collapsed ? "" : "-translate-x-32"}`}
                           >
                              7D
                           </button>
                           <button
                              onClick={setDays}
                              value={30}
                              className={`${secondaryColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(30)} ${collapsed ? "" : "-translate-x-10"}`}
                           >
                              30D
                           </button>
                           <button
                              onClick={setDays}
                              value={180}
                              className={`${secondaryColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(180)} ${collapsed ? "" : "translate-x-10"}`}
                           >
                              6M
                           </button>
                           <button
                              onClick={setDays}
                              value={365}
                              className={`${secondaryColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(365)} ${collapsed ? "" : "translate-x-32"}`}
                           >
                              1Y
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div className="flex justify-center items-center mt-20 space-x-20">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={darkMode ? "white" : "black"}
                  className="duration-300 size-14 hover:scale-125 rounded-full"
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
                  fill={darkMode ? "white" : "black"}
                  className="duration-300 size-14 hover:scale-125 rounded-full"
                  onClick={() => updateDetailsChart(10)}
               >
                  <path
                     fillRule="evenodd"
                     d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z"
                     clipRule="evenodd"
                  />
               </svg>
            </div>

            <div className={`flex justify-between text-white p-2 rounded-2xl duration-300 ${secondaryColor(darkMode)} mt-5 h-[60px]`}>
               <div className="flex justify-between items-center w-1/5 text-center">
                  <button
                     onClick={sortBy}
                     className="w-10"
                     value="rank"
                  >
                     #
                  </button>
                  <button
                     onClick={sortBy}
                     className="flex w-40 justify-center"
                     value="name"
                  >
                     Icon
                  </button>
                  <button
                     onClick={sortBy}
                     className="w-80 flex justify-center text-sm"
                     value="name"
                  >
                     Currency
                  </button>
               </div>
               <div className="flex justify-between items-center w-1/3 text-center">
                  <button
                     onClick={sortBy}
                     className="w-1/4"
                     value="current_price"
                  >
                     Current Price
                  </button>
                  <button
                     onClick={sortBy}
                     className="w-1/4"
                     value="one_hour"
                  >
                     % Change (1H)
                  </button>
                  <button
                     onClick={sortBy}
                     className="w-1/4"
                     value="one_day"
                  >
                     % Change (1D)
                  </button>
                  <button
                     onClick={sortBy}
                     className="w-1/4"
                     value="seven_day"
                  >
                     % Change (7D)
                  </button>
               </div>
               <div className="flex justify-between items-center w-[680px] text-center">
                  <div className="w-1/3">Volume vs Market Cap</div>
                  <div className="w-1/3">Circulating Supply vs Total Supply</div>
                  <div className="w-1/3">Last 7 Days</div>
               </div>
            </div>
            <div className="mt-4 space-y-2 flex justify-center items-center flex-col w-full">
               {sortedData
                  .filter((_, index) => index >= detailsValue && index <= detailsValue + 9)
                  .map((coin) => (
                     <CoinDetails
                        key={coin.id}
                        data={coin}
                        spot={coin.market_cap_rank}
                        darkMode={darkMode}
                     />
                  ))}
            </div>
         </div>
      </main>
   );
}
