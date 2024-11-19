import React from "react";

import { textColor, secondaryColor } from "@/app/utils/utility";

const BottomCoinListHeader = ({ darkMode, sortBy }) => {
   return (
      <div className={`flex justify-between ${textColor(darkMode)} p-2 rounded-2xl duration-300 ${secondaryColor(darkMode)} mt-5 h-[60px]`}>
         <div className="flex justify-between items-center w-1/4 text-center">
            <button
               onClick={sortBy}
               className="w-10"
               value="rank">
               #
            </button>
            <button
               onClick={sortBy}
               className="flex w-40 justify-center"
               value="name">
               Icon
            </button>
            <button
               onClick={sortBy}
               className="w-80 flex justify-center text-sm"
               value="name">
               Currency
            </button>
         </div>
         <div className="flex justify-between items-center w-1/3 text-center">
            <button
               onClick={sortBy}
               className="w-1/4"
               value="current_price">
               Current Price
            </button>
            <button
               onClick={sortBy}
               className="w-1/4"
               value="one_hour">
               % Change (1H)
            </button>
            <button
               onClick={sortBy}
               className="w-1/4"
               value="one_day">
               % Change (1D)
            </button>
            <button
               onClick={sortBy}
               className="w-1/4"
               value="seven_day">
               % Change (7D)
            </button>
         </div>
         <div className="flex justify-between items-center w-1/3 text-center">
            <div className="w-1/3">Volume vs Market Cap</div>
            <div className="w-1/3">Circulating Supply vs Total Supply</div>
            <div className="w-1/3">Last 7 Days</div>
         </div>
      </div>
   );
};

export default BottomCoinListHeader;
