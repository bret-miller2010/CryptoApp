"use client";
import { useState, useEffect } from "react";
import CoinDetails from "./components/CoinDetails/CoinDetails";
import CoinStatistics from "./components/CoinStatistics/CoinStatistics";
import { useCrypto } from "@/app/Context/CryptoContext";

export default function Home() {
  const marketURL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";
  const [ErrorMessage, setErrorMessage] = useState("");
  const { marketData, setMarketData } = useCrypto();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(marketURL)
      .then((data) => data.json())
      .then(setMarketData)
      .then(() => setLoading(false))
      .catch(setErrorMessage);
  }, []);

  return (
    <main>
      <div className="bg-green mx-3.5">
        <div className="mt-9">{marketData && <CoinStatistics />}</div>
        <div className="mt-9 h-[800px] overflow-scroll">
          {ErrorMessage && "Error"}
          {!loading &&
            marketData.map((coin, index) => (
              <CoinDetails key={coin.id} data={coin} spot={index} />
            ))}
        </div>
      </div>
      <div>{}</div>
    </main>
  );
}
