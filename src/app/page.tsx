"use client";
import { useState, useEffect } from "react";
import BottomCoinList from "./components/MainPageComponents/BottomCoinList";
import TopCoinlist from "./components/MainPageComponents/TopCoinList";
import BottomCoinListHeader from "./components/MainPageComponents/BottomCoinListHeader";
import MainGraphDaySelection from "./components/MainPageComponents/MainGraphDaySelection";
import { useCrypto } from "@/app/Context/CryptoContext";
import { MainPageLineChart } from "./components/LineChart/LineChart";
import { primaryColor } from "./utils/utility";
import { getDailyPriceFor } from "./api";
import { LeftArrow, RightArrow, UpArrow, DownArrow } from "@/images/icons";

export default function Home() {
   const { marketData, darkMode } = useCrypto();
   const [statisticsValue, setStatisticsValue] = useState(0);
   const [selectedDays, setSelectedDays] = useState("24");
   const [detailsValue, setDetailsValue] = useState(0);
   const [sortedData, setSortedData] = useState([]);
   const [sortType, setSortType] = useState(true);
   const [graphData, setGraphData] = useState([]);
   const [selectedChart, setSelectedChart] = useState([]);
   const [collapsed, setCollapsed] = useState(false);

   //Function that changes the display based on what the user wants to sort by
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

   //Sets the number of days that the main page graphs show
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
      //First check to verify that the coin is not already clicked. If it is then it will remove the coin.
      if (!selectedChart.includes(coinWanted)) {
         if (selectedChart.length === 2) {
            //Only allow 2 coins to be selected for this application. Exits the function if trying to add more than 2
            return;
         }
         const currentCoinData = await getDailyPriceFor(coinWanted, selectedDays);
         currentCoinData.id = coinWanted;
         const newArrayOfCoinData = [...graphData, currentCoinData];
         setGraphData(newArrayOfCoinData);
         const newArrayOfCoins = [...selectedChart, coinWanted];
         setSelectedChart(newArrayOfCoins);
      } else {
         removeFromSelection(coinWanted);
      }
   };

   //Currently where I left off. Can add and remove items from the selected values. Next need to pass the market data for those coins to LineGraph
   const removeFromSelection = (coin) => {
      const newArrayOfCoins = selectedChart.filter((ele) => ele !== coin);
      const newGraphData = graphData.filter((ele) => ele.id !== coin);
      setSelectedChart(newArrayOfCoins);
      setGraphData(newGraphData);
   };
   //Function to increment/decrement the bottom listing of coins.
   const updateDetailsChart = (amount) => {
      if (detailsValue + amount < 0) {
         setDetailsValue(0);
      } else if (detailsValue + amount > 49) {
         setDetailsValue(40);
      } else {
         setDetailsValue(detailsValue + amount);
      }
   };
   //Function to increment/decrement the top listing of coins.
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
                  <div className="duration-300 hover:scale-125">
                     <LeftArrow
                        handleClick={() => updateStatisticsChart(-5)}
                        darkMode={darkMode}
                     />
                  </div>
                  {marketData
                     .filter((_, index) => index >= statisticsValue && index <= statisticsValue + 4)
                     .map((coin) => (
                        <TopCoinlist
                           key={coin.id}
                           data={coin}
                           selected={selectedChart}
                           handleClick={addToGraph}
                           darkMode={darkMode}
                        />
                     ))}
                  <div className="duration-300 hover:scale-125">
                     <RightArrow
                        handleClick={() => updateStatisticsChart(5)}
                        darkMode={darkMode}
                     />
                  </div>
               </div>
               <div className="flex justify-around w-full">
                  <div className="flex flex-col items-center space-y-20">
                     <div className="flex space-x-20">
                        <MainPageLineChart
                           data={graphData}
                           numDays={selectedDays}
                           type={"prices"}
                           coin={selectedChart}
                           chartType="Price over time"
                           darkMode={darkMode}
                        />
                        <MainPageLineChart
                           data={graphData}
                           numDays={selectedDays}
                           type={"total_volumes"}
                           coin={selectedChart}
                           chartType="Volume over time"
                           darkMode={darkMode}
                        />
                     </div>

                     <MainGraphDaySelection
                        setDays={setDays}
                        collapsed={collapsed}
                        darkMode={darkMode}
                        selectedDays={selectedDays}
                     />
                  </div>
               </div>
            </div>
            <div className="flex justify-center items-center mt-20 space-x-20">
               <div className="duration-300 hover:scale-125">
                  <UpArrow
                     handleClick={() => updateDetailsChart(-10)}
                     darkMode={darkMode}
                  />
               </div>

               <div className="duration-300 hover:scale-125">
                  <DownArrow
                     handleClick={() => updateDetailsChart(10)}
                     darkMode={darkMode}
                  />
               </div>
            </div>
            <BottomCoinListHeader
               darkMode={darkMode}
               sortBy={sortBy}
            />
            <div className="mt-4 space-y-2 flex justify-center items-center flex-col w-full">
               {sortedData
                  .filter((_, index) => index >= detailsValue && index <= detailsValue + 9)
                  .map((coin) => (
                     <BottomCoinList
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
