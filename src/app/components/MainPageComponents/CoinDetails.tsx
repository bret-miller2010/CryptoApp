import Image from "next/image";
import { CoinDetailsLineChart } from "../LineChart/LineChart";
import { addCommas, priceColor } from "@/app/utils/utility";
import { textColor, secondaryColor } from "@/app/utils/utility";

const CoinDetails = ({ data, spot, darkMode }) => {
   const coinName = data.name;
   const currentPrice = addCommas(data.current_price, 2, true);
   const oneHourChange = Number(data.price_change_percentage_1h_in_currency).toFixed(2);
   const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
   const sevenDayChange = Number(data.price_change_percentage_7d_in_currency).toFixed(2);
   const coinImage = data.image;
   const marketCap = data.market_cap;
   const widthValue = (data.circulating_supply / data.total_supply) * 100;
   const volumeVsMarketcap = ((data.total_volume / marketCap) * 100).toFixed(2);

   return (
      <div className={` flex justify-between duration-300 ${textColor(darkMode)} p-2 rounded-2xl ${secondaryColor(darkMode)} w-full h-[70px]`}>
         <div className="flex justify-between items-center w-1/4 text-center">
            <div className="w-10">{spot}</div>
            <div className="w-40 flex justify-center">
               <Image
                  src={coinImage}
                  width={40}
                  height={40}
                  alt="coin image"
               />
            </div>

            <div className="w-80 flex justify-center text-sm">{coinName}</div>
         </div>
         <div className="flex justify-between items-center w-1/3 text-center">
            <div className="w-1/4">${currentPrice}</div>
            <div className={`w-1/4 ${priceColor(oneHourChange)}`}>{oneHourChange}%</div>
            <div className={`w-1/4 ${priceColor(oneDayChange)}`}>{oneDayChange}%</div>
            <div className={`w-1/4 ${priceColor(sevenDayChange)}`}>{sevenDayChange}%</div>
         </div>
         <div className="flex justify-between items-center w-1/3 text-center">
            <div className="w-1/3">{volumeVsMarketcap}%</div>
            <div className="w-1/3 h-[15px] bg-[#fe8080]">
               <div
                  className={"h-[15px] bg-[#b20101]"}
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
