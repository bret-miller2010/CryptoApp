import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getBitCoinData } from "@/app/api";
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
  const { marketData } = useCrypto();
  const [graphData, setGraphData] = useState(Object);
  const [errorMessage, setErrorMessage] = useState("");

  function test(info, first, end) {
    const arrayOfInfo = [];
    for (let i = first; i < end; i++) {
      arrayOfInfo.push(info[i]);
    }

    const graphObject = {
      labels: arrayOfInfo.map((_, index) => index),
      datasets: [
        {
          label: "Data stuff",
          data: arrayOfInfo.map((data) => data[1]),
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
    setGraphData(graphObject);
  }

  const getGraphData = async () => {
    try {
      const bitCoinData = await getBitCoinData();
      test(bitCoinData.prices, 150, 180);
    } catch (e) {
      setErrorMessage("There is an error getting the information");
    }
  };

  useEffect(() => {
    getGraphData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-3.5 flex items-center flex-col">
      <div className="flex overflow-scroll w-1/2">
        {marketData.map((coin) => (
          <CoinBlock key={coin.id} data={coin} />
        ))}
      </div>
      <LineChart chartData = {graphData}/>
      {errorMessage}
    </div>
  );
};

CoinStatistics.propTypes = {
  data: PropTypes.object,
};

export default CoinStatistics;
