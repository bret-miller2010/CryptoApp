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
         <div className={`flex justify-around my-5 items-center h-[100px] rounded-3xl p-5 duration-300 ${secondaryColor(darkMode)} w-[500px]`}>
            <ConvertorSelection
               marketData={marketData}
               mode={"Sell"}
               setSide={setLeft}
            />
            <ConvertorSelection
               marketData={marketData}
               mode={"Buy"}
               setSide={setRight}
            />
         </div>
         <div className="flex justify-around my-5 w-[1000px]">
            <ConvertorDisplay
               darkMode={darkMode}
               left={leftSelection}
               right={rightSelection}
            />
         </div>
      </div>
   );
};

export default ConvertorContainer;
