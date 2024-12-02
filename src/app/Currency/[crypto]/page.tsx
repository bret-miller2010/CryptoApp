"use client";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useEffect, useState } from "react";
import { getSpecificCoinInfo } from "@/app/api";
import CoinDescription from "@/app/components/CoinPageComponents/CoinDescription";
import CoinMarketInformation from "@/app/components/CoinPageComponents/CoinMarketInformation";
import BasicCoinInformation from "@/app/components/CoinPageComponents/BasicCoinInformation";
import CoinLinks from "@/app/components/CoinPageComponents/CoinLinks";
import { primaryColor } from "@/app/utils/utility";

export default function CoinInformation({ params }: { params: { crypto: string } }) {
   const { marketData, currency, darkMode } = useCrypto();
   const [selectedCoin, setSelectedCoin] = useState(Object);
   const [coinData, setCoinData] = useState();

   const collectCoinInformation = async () => {
      const pickedCoin = marketData.find((coin) => coin.id === params.crypto);
      const data = await getSpecificCoinInfo(pickedCoin.id);
      setSelectedCoin(pickedCoin);
      setCoinData(data);
   };

   useEffect(() => {
      collectCoinInformation();
   }, []);

   return (
      <main className={`flex flex-col h-screen md:flex-row md:items-center md:space-x-10 md:w-screen md:justify-center ${primaryColor(darkMode)}`}>
         <div className="flex flex-col md:space-y-10 md:mt-0 mt-10 mb-10">
            {coinData && (
               <BasicCoinInformation
                  coinData={coinData}
                  currency={currency}
                  darkMode={darkMode}
               />
            )}
            {coinData && (
               <CoinDescription
                  coinData={coinData}
                  darkMode={darkMode}
               />
            )}
         </div>
         <div className="flex flex-col justify-between items-center space-y-10">
            {coinData && (
               <CoinMarketInformation
                  coinData={coinData}
                  coin={selectedCoin}
                  currency={currency}
                  darkMode={darkMode}
               />
            )}
            {coinData && (
               <CoinLinks
                  coinData={coinData}
                  darkMode={darkMode}
               />
            )}{" "}
         </div>
      </main>
   );
}
