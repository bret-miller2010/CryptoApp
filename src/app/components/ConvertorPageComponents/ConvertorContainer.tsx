"use client";
import { useState } from "react";
import ConvertorDisplay from "./ConvertorDisplay";
import ConvertorSelection from "./ConvertorSelection";
import { useCrypto } from "@/app/Context/CryptoContext";
import { secondaryColor, textColor } from "@/app/utils/utility";
import { CoinConvertorLineChart } from "../LineChart/LineChart";

const ConvertorContainer = () => {
   const [leftSelection, setLeftSelection] = useState();
   const [rightSelection, setRightSelection] = useState();
   const [numberOfDays, setNumberOfDays] = useState("30");
   const { marketData, darkMode } = useCrypto();
   const buttonArray = [
      { text: "7D", value: 7 },
      { text: "14D", value: 14 },
      { text: "1M", value: 30 },
      { text: "3M", value: 90 },
   ];

   //sets the left side of the conversion
   const setLeft = (value) => {
      const selectedCoin = value.target.value;
      const pickedCoin = marketData.find((coin) => coin.id === selectedCoin);
      setLeftSelection(pickedCoin);
   };

   //Sets the right side of the conversion
   const setRight = (value) => {
      const selectedCoin = value.target.value;
      const pickedCoin = marketData.find((coin) => coin.id === selectedCoin);
      setRightSelection(pickedCoin);
   };

   //Change the number of days to display on the chart
   const handleDaySelect = (event) => {
      setNumberOfDays(event.target.value);
   };

   return (
      <div className="flex justify-center my-5 flex-col items-center">
         <div className={`duration-300 ${textColor(darkMode)} text-center`}>
            Select a currency you wish to sell and what you would like to convert it to. <br />
            Note: This will not actually convert your currencies
         </div>
         <div className={`flex justify-around items-center my-5 py-10 rounded-3xl px-24 duration-300 ${secondaryColor(darkMode)}`}>
            <ConvertorSelection
               marketData={marketData}
               setLeft={setLeft}
               setRight={setRight}
            />
         </div>
         <div className="flex justify-around my-5 w-[1000px]">
            <ConvertorDisplay
               darkMode={darkMode}
               sellSide={leftSelection}
               buySide={rightSelection}
            />
         </div>
         {leftSelection && rightSelection && (
            <div className="flex flex-col w-screen justify-center items-center">
               <CoinConvertorLineChart
                  left={leftSelection}
                  right={rightSelection}
                  numDays={numberOfDays}
               />

               <div className="flex space-x-10 justify-center items-center mt-5 rounded-3xl p-2 duration-300">
                  {buttonArray.map((ele) => {
                     return (
                        <button
                           onClick={handleDaySelect}
                           value={ele.value}
                           key={ele.text}
                           className={`px-8 py-2 rounded-full ${secondaryColor(darkMode)}`}>
                           {ele.text}
                        </button>
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
};

export default ConvertorContainer;
