"use client";
import { getInformation } from "./api";
import CoinStatistics from "./components/CoinStatistics/CoinStatistics";
import CoinDetails from "./components/CoinDetails/CoinDetails";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
import { MainWrapper, CoinHeaderWrapper, CoinStatsWrapper } from "./styles";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

export default function Home() {
  const bitCoinData = getInformation(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
  );

  // const cryptoCurrencyInfo = getData(
  //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
  // );

  return (
    <main>
      <div>
        <MainWrapper>
          <CoinHeaderWrapper>
            <CoinStatistics data={bitCoinData} />
          </CoinHeaderWrapper>
          <CoinStatsWrapper>
            <CoinDetails />
          </CoinStatsWrapper>
        </MainWrapper>
      </div>
    </main>
  );
}
