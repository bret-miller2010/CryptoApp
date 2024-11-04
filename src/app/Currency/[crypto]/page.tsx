"use client";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useEffect, useState } from "react";
import { getSpecificCoinInfo } from "@/app/api";
import CoinDescription from "@/app/components/CoinPageComponents/CoinDescription";
import CoinMarketInformation from "@/app/components/CoinPageComponents/CoinMarketInformation";
import BasicCoinInformation from "@/app/components/CoinPageComponents/BasicCoinInformation";
import CoinLinks from "@/app/components/CoinPageComponents/CoinLinks";

export default function CoinInformation({
  params,
}: {
  params: { crypto: string };
}) {
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
    <main
      className={`flex h-screen justify-center pt-20 ${darkMode ? "duration-300 bg-[#13121a]" : "duration-300 bg-[#bfbfbf]"}`}
    >
      <div className="flex flex-col h-[800px] w-[800px] justify-between">
        {coinData && (
          <BasicCoinInformation
            coinData={coinData}
            currency={currency}
            darkMode={darkMode}
          />
        )}
        {coinData && (
          <CoinDescription coinData={coinData} darkMode={darkMode} />
        )}
      </div>
      <div className="flex flex-col h-[800px] w-[800px] justify-between items-center">
        {coinData && (
          <CoinMarketInformation
            coinData={coinData}
            coin={selectedCoin}
            currency={currency}
            darkMode={darkMode}
          />
        )}
        {coinData && <CoinLinks coinData={coinData} darkMode={darkMode} />}{" "}
      </div>
    </main>
  );
}
