import Image from "next/image";
import { CoinDetailsLineChart } from "../LineChart/LineChart";
import { addCommas } from "@/app/utils/utility";

const CoinDetails = ({ data, spot, darkMode }) => {
  const coinName = data.name;
  const currentPrice = addCommas(data.current_price, 2, true);
  const oneHourChange = Number(
    data.price_change_percentage_1h_in_currency,
  ).toFixed(2);
  const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
  const sevenDayChange = Number(
    data.price_change_percentage_7d_in_currency,
  ).toFixed(2);
  const coinImage = data.image;
  const marketCap = data.market_cap;
  const widthValue = (data.circulating_supply / data.total_supply) * 100;
  const volumeVsMarketcap = ((data.total_volume / marketCap) * 100).toFixed(2);

  return (
    <div
      className={` flex justify-between text-white p-2 rounded-2xl ${darkMode ? "duration-300 bg-[#181825]" : "duration-300 bg-[#3b82f6]"} w-full h-[70px]`}
    >
      <div className="flex justify-between items-center w-1/5 text-center">
        <div className="w-10">{spot}</div>
        <div className="w-40 flex justify-center">
          <Image src={coinImage} width={40} height={40} alt="coin image" />
        </div>

        <div className="w-80 flex justify-center text-sm">{coinName}</div>
      </div>
      <div className="flex justify-between items-center w-1/3 text-center">
        <div className="w-1/4">${currentPrice}</div>
        <div className="w-1/4">{oneHourChange}%</div>
        <div className="w-1/4">{oneDayChange}%</div>
        <div className="w-1/4">{sevenDayChange}%</div>
      </div>
      <div className="flex justify-around items-center w-[680px] text-center">
        <div className="w-1/3">{volumeVsMarketcap}%</div>
        <div className="w-1/3 h-[15px] bg-white">
          <div
            className={`h-[15px] ${darkMode ? "duration-300 bg-[#7474a5]" : "duration-300 bg-black"}`}
            style={{
              width: `${widthValue}%`,
            }}
          ></div>
        </div>
        <CoinDetailsLineChart chartData={data.sparkline_in_7d.price} />
      </div>
    </div>
  );
};

export default CoinDetails;
