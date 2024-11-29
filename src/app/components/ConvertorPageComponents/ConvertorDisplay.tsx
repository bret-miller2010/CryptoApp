import { secondaryColor, textColor } from "@/app/utils/utility";
import { useState } from "react";

const ConvertorDisplay = ({ darkMode, sellSide, buySide }) => {
   const [sellAmount, setSellAmount] = useState(0);
   const [buyAmount, setBuyAmount] = useState(0);

   const handleUpdate = (event) => {
      const newValue = event.target.value;
      const totalValue = sellSide.current_price * newValue;
      setSellAmount(event.target.value);
      setBuyAmount(totalValue / buySide.current_price);
   };

   return (
      <div className="flex space-x-10">
         <div className={`h-[150px] px-20 md:px-32 rounded-3xl p-5 ${secondaryColor(darkMode)} ${textColor(darkMode)} space-y-6`}>
            <div>You Sell</div>
            {sellSide && buySide && (
               <div>
                  <div className="flex justify-between">
                     <div>
                        {sellSide.name.toUpperCase()} ({sellSide.symbol.toUpperCase()})
                     </div>
                     <input
                        onChange={handleUpdate}
                        className="w-24 text-black pl-1 border-2 border-black"
                        value={sellAmount}
                        type="number"
                     />
                  </div>
                  <div>
                     1 {sellSide.symbol.toUpperCase()} = ${sellSide.current_price}
                  </div>
               </div>
            )}
         </div>
         <div className="flex space-x-10">
            <div className={`h-[150px] px-20 md:px-32 rounded-3xl p-5 ${secondaryColor(darkMode)} ${textColor(darkMode)} space-y-6`}>
               <div>You Buy</div>
               {sellSide && buySide && (
                  <div>
                     <div className="flex justify-between">
                        <div>
                           {buySide.name.toUpperCase()} ({buySide.symbol.toUpperCase()})
                        </div>
                        <div>{buyAmount.toFixed(3)}</div>
                     </div>
                     <div>
                        1 {buySide.symbol.toUpperCase()} = ${buySide.current_price}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ConvertorDisplay;
