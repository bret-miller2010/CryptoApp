import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import Image from "next/image";
import LineChart from "../LineChart/LineChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinBlock = ({ data }) => {
  const coinName = data.name;
  const symbol = data.symbol;
  const currentPrice = Number(data.current_price).toFixed(2);
  const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
  const coinImage = data.image;

  return (
    <div className="h-[100px] flex justify-between items-center text-white bg-black mr-2 rounded-3xl px-2">
      <div className="flex justify-center w-14">
        <Image src={coinImage} width={40} height={40} alt="coin image" />
      </div>
      <div className="w-28 text-center">
        <div>
          {coinName} ({symbol})
        </div>
        <div>{currentPrice}</div>
        <button value={data.id}>Click me</button>
      </div>
      <div className="text-center w-14">{oneDayChange}</div>
    </div>
  );
};

CoinBlock.propTypes = {
  data: PropTypes.object,
};

const CoinStatistics = () => {
  const { marketData, bitCoinData, setBitCoinData } = useCrypto();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const dataKey =
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily";

  useEffect(() => {
    setLoading(true);
    fetch(dataKey)
      .then((data) => data.json())
      .then((data) => {
        setLoading(false);
        setBitCoinData(data);
      })
      .catch(setErrorMessage);
  }, []);

  return (
    <div className="mx-3.5 flex items-center flex-col">
      <div className="flex overflow-scroll w-1/2">
        {errorMessage}
        {marketData.map((coin) => (
          <CoinBlock key={coin.id} data={coin} />
        ))}
      </div>
      {!loading && <LineChart chartData={bitCoinData.prices} numDays={30} />}
    </div>
  );
};

CoinStatistics.propTypes = {
  data: PropTypes.object,
};

export default CoinStatistics;
