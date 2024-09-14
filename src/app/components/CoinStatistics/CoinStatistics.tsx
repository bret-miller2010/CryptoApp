import PropTypes from "prop-types";
import Image from "next/image";
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
    <div className = "h-[100px] flex justify-between items-center text-white bg-black mr-2 rounded-3xl px-2">
      <div className = "flex justify-center w-14">
      <Image src={coinImage} width={40} height={40} alt="coin image" />
      </div>
      <div className = "w-28 text-center">
        <div>
          {coinName} ({symbol})
        </div>
        <div>{currentPrice}</div>
      </div>
      <div className = "text-center w-14">{oneDayChange}</div>
    </div>
  );
};

CoinBlock.propTypes = {
  data: PropTypes.object,
};

const CoinStatistics = ({ data }) => {
  return (
    <div className = "mx-3.5 flex items-center flex-col">
      <div className = "flex overflow-scroll w-1/2">
        {data.map((coin) => (
          <CoinBlock key={coin["id"]} data={coin} />
        ))}
      </div>
    </div>
  );
};

CoinStatistics.propTypes = {
  data: PropTypes.object,
};

export default CoinStatistics;
