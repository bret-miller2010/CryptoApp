"use client";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useEffect, useState } from "react";
import { getSpecificCoinInfo } from "@/app/api";
import CoinDescription from "@/app/components/CoinPageComponents/CoinDescription";
import CoinMarketInformation from "@/app/components/CoinPageComponents/CoinMarketInformation";

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
    <main className="flex items-center justify-center flex-col">
      <div className="flex w-[800px] justify-center items-center">
        {coinData && <CoinMarketInformation coin={selectedCoin} />}
      </div>
      <div>
        <div className="flex">
          {coinData && <CoinDescription coinData={coinData} />}
          <div>Middle Right</div>
        </div>
        <div>Bottom</div>
      </div>
    </main>
  );
}
