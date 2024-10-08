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
  const { marketData } = useCrypto();
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
    <main className="flex items-center justify-center mt-20">
      <div className="flex flex-col h-[800px] w-[800px] justify-between">
        {coinData && (
          <BasicCoinInformation coin={selectedCoin} coinData={coinData} />
        )}
        {coinData && <CoinDescription coinData={coinData} />}
      </div>
      <div className="flex flex-col h-[800px] w-[800px] justify-between items-center">
        {coinData && <CoinMarketInformation coin={selectedCoin} />}
        {coinData && <CoinLinks coinData={coinData} />}{" "}
      </div>
    </main>
  );
}
