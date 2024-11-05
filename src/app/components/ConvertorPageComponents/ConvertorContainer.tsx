"use client";
import { useState } from "react";
import ConvertorDisplay from "./ConvertorDisplay";
import ConvertorSelection from "./ConvertorSelection";
import { useCrypto } from "@/app/Context/CryptoContext";
import { secondaryColor } from "@/app/utils/utility";

const ConvertorContainer = () => {
   const [leftSelection, setLeftSelection] = useState();
   const [rightSelection, setRightSelection] = useState();
   const { marketData, darkMode } = useCrypto();

   const setLeft = (value) => {
      const selectedCoin = value.target.value;
      const pickedCoin = marketData.find((coin) => coin.id === selectedCoin);
      setLeftSelection(pickedCoin);
   };

   const setRight = (value) => {
      const selectedCoin = value.target.value;
      const pickedCoin = marketData.find((coin) => coin.id === selectedCoin);
      setRightSelection(pickedCoin);
   };

   return (
      <div className="flex justify-center my-5 flex-col items-center">
         <div className="text-center">
            Select a currency you wish to sell and what you would like to convert it to. <br />
            Note: This will not actually convert your currencies (if any are available)
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
         <div className="flex flex-col w-screen justify-center items-center">
            <div className={`flex justify-center h-[500px] w-3/4 items-center rounded-3xl duration-300 ${secondaryColor(darkMode)}`}>
               This is where the graph will go
            </div>
            <div className="flex space-x-1 justify-center items-center mt-5 rounded-3xl p-2 duration-300">
               <button className={`px-8 py-2 rounded-full ${secondaryColor(darkMode)}`}>1D</button>
               <button className={`px-8 py-2 rounded-full ${secondaryColor(darkMode)}`}>7D</button>
               <button className={`px-8 py-2 rounded-full ${secondaryColor(darkMode)}`}>14D</button>
               <button className={`px-8 py-2 rounded-full ${secondaryColor(darkMode)}`}>1M</button>
               <button className={`px-8 py-2 rounded-full ${secondaryColor(darkMode)}`}>1Y</button>
               <button className={`px-8 py-2 rounded-full ${secondaryColor(darkMode)}`}>5Y</button>
            </div>
         </div>
      </div>
   );
};

export default ConvertorContainer;
