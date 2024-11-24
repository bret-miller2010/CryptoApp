import Image from "next/image";
import { CoinDetailsLineChart } from "../LineChart/LineChart";
import { addCommas, priceColor } from "@/app/utils/utility";
import { textColor, secondaryColor } from "@/app/utils/utility";
import { GreenArrow, RedArrow } from "@/images/icons";

const BottomCoinList = ({ data, spot, darkMode }) => {
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
      <div className={`flex justify-between duration-300 ${textColor(darkMode)} p-2 rounded-2xl ${secondaryColor(darkMode)} w-full h-[70px]`}>
         <div className="flex justify-between items-center w-1/2 lg:w-1/4 text-center">
            <div className="w-10">{spot}</div>
            <div className="w-40 flex justify-center">
               <Image
                  src={coinImage}
                  width={40}
                  height={40}
                  alt="coin image"
               />
            </div>

            <div className="w-80 flex justify-center">{coinName}</div>
         </div>
         <div className="flex justify-between items-center w-1/2 lg:w-1/3 text-center">
            <div className="w-1/4">${currentPrice}</div>
            <div className={`flex justify-center space-x-1 w-1/4 ${priceColor(oneHourChange)}`}>
               <div>{Number(oneHourChange) > 0 ? <GreenArrow /> : <RedArrow />}</div>
               <div>{oneHourChange}%</div>
            </div>
            <div className={`flex justify-center space-x-1 w-1/4 ${priceColor(oneDayChange)}`}>
               <div>{Number(oneDayChange) > 0 ? <GreenArrow /> : <RedArrow />}</div>
               <div>{oneDayChange}%</div>
            </div>
            <div className={`flex justify-center space-x-1 w-1/4 ${priceColor(sevenDayChange)}`}>
               <div>{Number(sevenDayChange) > 0 ? <GreenArrow /> : <RedArrow />}</div>
               <div>{sevenDayChange}%</div>
            </div>
         </div>
         <div className="flex justify-between items-center w-1/3 text-center absolute lg:static invisible lg:visible">
            <div className="w-1/3">{volumeVsMarketcap}%</div>
            <div className="w-1/3 h-[10px] bg-[#fe8080]">
               <div
                  className={"h-[10px] bg-[#b20101]"}
                  style={{
                     width: `${widthValue}%`,
                  }}></div>
            </div>
            <CoinDetailsLineChart chartData={data.sparkline_in_7d.price} />
         </div>
      </div>
   );
};

export default BottomCoinList;
