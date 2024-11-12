import Image from "next/image";
import { priceColor } from "@/app/utils/utility";
import { addCommas, secondaryColor, textColor } from "@/app/utils/utility";

const CoinStatistics = ({ data, handleClick, selected, darkMode }) => {
   const coinName = data.name;
   const symbol = data.symbol;
   const currentPrice = addCommas(data.current_price, 2, true);
   const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
   const coinImage = data.image;

   const colorSelector = () => {
      return selected === coinName ? `${darkMode ? "bg-[#32324d]" : "bg-[#8c8c8c]"}` : `${secondaryColor(darkMode)}`;
   };

   return (
      <div
         onClick={handleClick}
         id={data.id}
         className={`h-[110px] duration-300 flex justify-between items-center ${textColor(darkMode)} mr-2 rounded-3xl px-2 text-sm ${colorSelector()}`}
      >
         <div className="flex justify-center w-14">
            <Image
               src={coinImage}
               width={40}
               height={40}
               alt="coin image"
            />
         </div>
         <div className="w-52 text-center">
            <div>
               {coinName} ({symbol.toUpperCase()})
            </div>
            <div>${currentPrice}</div>
         </div>
         <div className={`text-center w-14 ${priceColor(oneDayChange)}`}>{oneDayChange}</div>
      </div>
   );
};

export default CoinStatistics;
