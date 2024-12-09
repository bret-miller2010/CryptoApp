"use client";
import { useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import DisplayCoinInformation from "@/app/components/PortfolioPageComponents/DisplayCoinInformation";

const AddAsset = () => {
   const { marketData, darkMode } = useCrypto();
   const [pulledCoin, setPulledCoin] = useState();

   const setCoin = (event) => {
      const selectedCoin = event.target.value;
      const pickedCoin = marketData.find((coin) => coin.id === selectedCoin);
      setPulledCoin(pickedCoin);
   };

   return (
      <div className={`flex pt-40 h-screen items-center flex-col ${darkMode ? "duration-300 bg-[#13121a]" : "duration-300 bg-[#bfbfbf]"}`}>
         <div className="text-white mb-1">Use the drop down to select the coin you wish to add. You can enter more information once the coin is selected.</div>
         <div className="text-white mb-5">Once you are finished adding assets use return to go back to your main portfolio page.</div>
         <select
            defaultValue="default"
            onChange={setCoin}
            className="w-32 text-black text-center"
            name="Select2"
            id="Select3">
            <option
               key="default"
               value="default"
               disabled>
               Select a Coin
            </option>
            {marketData.map((coin) => (
               <option
                  key={coin.id}
                  className="text-black"
                  value={coin.id}>
                  {coin.name}
               </option>
            ))}
         </select>
         {pulledCoin && <DisplayCoinInformation data={pulledCoin} />}
      </div>
   );
};

export default AddAsset;
