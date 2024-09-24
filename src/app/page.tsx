"use client";
import { useState, useEffect } from "react";
import { getCoinInformation } from "./api";
import CoinDetails from "./components/CoinDetails/CoinDetails";
import CoinStatistics from "./components/CoinStatistics/CoinStatistics";
import { useCrypto } from "@/app/Context/CryptoContext";

export default function Home() {
  const [ErrorMessage, setErrorMessage] = useState("");
  const { marketData, setMarketData } = useCrypto();

  const getCoinData = async () => {
    try {
      const coinData = await getCoinInformation();
      setMarketData(coinData);
    } catch (e) {
      setErrorMessage("There is an error getting the information");
    }
  };

  useEffect(() => {
    getCoinData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main>
      <div>
        <div className="bg-green mx-3.5">
          <div className="mt-9">
            <CoinStatistics />
          </div>
          <div className="mt-9 h-[800px] overflow-scroll">
            {marketData.map((coin, index) => (
              <CoinDetails key={coin["id"]} data={coin} spot={index} />
            ))}
            {ErrorMessage}
          </div>
        </div>
      </div>
    </main>
  );
}
