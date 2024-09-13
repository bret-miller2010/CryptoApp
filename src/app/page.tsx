"use client";
import { useState, useEffect } from "react";
import { getInformation } from "./api";
import CoinDetails from "./components/CoinDetails/CoinDetails";
import { MainWrapper, CoinHeaderWrapper, CoinStatsWrapper } from "./styles";
import CoinStatistics from "./components/CoinStatistics/CoinStatistics";

export default function Home() {
  const [MarketData, setMarketData] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState("");

  const getCoinData = async () => {
    const coinKey =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";
    try {
      const coinData = await getInformation(coinKey);
      setErrorMessage("");
      setMarketData(coinData);
    } catch (e) {
      setErrorMessage("Could not load crypto currency data. Please try again.");
    }
  };

  useEffect(() => {
    getCoinData();
  }, []);

  return (
    <main>
      <div>
        <MainWrapper>
          <CoinHeaderWrapper>
            <CoinStatistics data={MarketData} />
          </CoinHeaderWrapper>
          <CoinStatsWrapper>
            {MarketData.map((coin, index) => (
              <CoinDetails key={coin["id"]} data={coin} spot={index} />
            ))}
            {ErrorMessage}
          </CoinStatsWrapper>
        </MainWrapper>
      </div>
    </main>
  );
}
