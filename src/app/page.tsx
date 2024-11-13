"use client";
import { useState, useEffect } from "react";
import CoinDetails from "./components/MainPageComponents/CoinDetails";
import CoinStatistics from "./components/MainPageComponents/CoinStatistics";
import { useCrypto } from "@/app/Context/CryptoContext";
import { MainPageLineChart } from "./components/LineChart/LineChart";
import { primaryColor, secondaryColor, textColor } from "./utils/utility";
import { getDailyPriceFor } from "./api";
import { LeftArrow, RightArrow, UpArrow, DownArrow } from "@/images/icons";

export default function Home() {
   const { marketData, darkMode } = useCrypto();
   const [statisticsValue, setStatisticsValue] = useState(0);
   const [selectedDays, setSelectedDays] = useState("7");
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

   const setDays = (value) => {
      let amountOfDays = Number(value.target.value);
      if (amountOfDays === 1 || amountOfDays === 7) {
         amountOfDays = amountOfDays * 24;
      }
      setSelectedDays(String(amountOfDays));
      setCollapsed(!collapsed);
   };

   const addToGraph = async (event) => {
      const coinWanted = event.target.id;
      const coinToAdd = marketData.find((coin) => coin.id === coinWanted);
      const currentCoinData = await getDailyPriceFor(coinToAdd.id, selectedDays);
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
      <main className={`h-full duration-300 ${primaryColor(darkMode)}`}>
         <div className="p-5 text-sm">
            <div className="flex items-center flex-col">
               <div className="flex p-8 rounded-3xl w-full justify-center items-center mt-16">
                  <LeftArrow
                     handleClick={() => updateStatisticsChart(-5)}
                     darkMode={darkMode}
                  />
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
                  <RightArrow
                     handleClick={() => updateStatisticsChart(5)}
                     darkMode={darkMode}
                  />
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
                              value={1}
                              className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(24)} ${collapsed ? "" : "-translate-x-40"}`}>
                              24H
                           </button>
                           <button
                              onClick={setDays}
                              value={7}
                              className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(168)} ${collapsed ? "" : "-translate-x-20"}`}>
                              7D
                           </button>
                           <button
                              onClick={setDays}
                              value={30}
                              className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(30)} ${collapsed ? "" : "-translate-x-0"}`}>
                              30D
                           </button>
                           <button
                              onClick={setDays}
                              value={180}
                              className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(180)} ${collapsed ? "" : "translate-x-20"}`}>
                              6M
                           </button>
                           <button
                              onClick={setDays}
                              value={365}
                              className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(365)} ${collapsed ? "" : "translate-x-40"}`}>
                              1Y
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div className="flex justify-center items-center mt-20 space-x-20">
               <UpArrow
                  handleClick={() => updateDetailsChart(-10)}
                  darkMode={darkMode}
               />
               <DownArrow
                  handleClick={() => updateDetailsChart(10)}
                  darkMode={darkMode}
               />
            </div>

            <div className={`flex justify-between ${textColor(darkMode)} p-2 rounded-2xl duration-300 ${secondaryColor(darkMode)} mt-5 h-[60px]`}>
               <div className="flex justify-between items-center w-1/4 text-center">
                  <button
                     onClick={sortBy}
                     className="w-10"
                     value="rank">
                     #
                  </button>
                  <button
                     onClick={sortBy}
                     className="flex w-40 justify-center"
                     value="name">
                     Icon
                  </button>
                  <button
                     onClick={sortBy}
                     className="w-80 flex justify-center text-sm"
                     value="name">
                     Currency
                  </button>
               </div>
               <div className="flex justify-between items-center w-1/3 text-center">
                  <button
                     onClick={sortBy}
                     className="w-1/4"
                     value="current_price">
                     Current Price
                  </button>
                  <button
                     onClick={sortBy}
                     className="w-1/4"
                     value="one_hour">
                     % Change (1H)
                  </button>
                  <button
                     onClick={sortBy}
                     className="w-1/4"
                     value="one_day">
                     % Change (1D)
                  </button>
                  <button
                     onClick={sortBy}
                     className="w-1/4"
                     value="seven_day">
                     % Change (7D)
                  </button>
               </div>
               <div className="flex justify-between items-center w-1/3 text-center">
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
