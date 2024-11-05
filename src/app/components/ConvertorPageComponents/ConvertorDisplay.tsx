import { secondaryColor } from "@/app/utils/utility";
import { useState } from "react";

const ConvertorDisplay = ({ darkMode, left, right }) => {
   const [sellAmount, setSellAmount] = useState(0);
   const [buyAmount, setBuyAmount] = useState(0);

   const handleUpdate = (event) => {
      const newValue = event.target.value;
      const totalValue = left.current_price * newValue;
      setSellAmount(event.target.value);
      setBuyAmount(totalValue / right.current_price);
   };

   return (
      <div className="flex space-x-10">
         <div className={`w-[500px] h-[150px] rounded-3xl p-5 ${secondaryColor(darkMode)} duration-300 space-y-6`}>
            <div>You Sell</div>
            {left && (
               <div>
                  <div className="flex justify-between">
                     <div>
                        {left.name.toUpperCase()} ({left.symbol.toUpperCase()})
                     </div>
                     <input
                        onChange={handleUpdate}
                        className="w-24 text-black"
                        value={sellAmount}
                        type="number"
                     />
                  </div>
                  <div>
                     1 {left.symbol.toUpperCase()} = ${left.current_price}
                  </div>
               </div>
            )}
         </div>
         <div className="flex space-x-10">
            <div className={`w-[500px] h-[150px] rounded-3xl p-5 ${secondaryColor(darkMode)} duration-300 space-y-6`}>
               <div>You Buy</div>
               {right && (
                  <div>
                     <div className="flex justify-between">
                        <div>
                           {right.name.toUpperCase()} ({right.symbol.toUpperCase()})
                        </div>
                        <div>{buyAmount.toFixed(3)}</div>
                     </div>
                     <div>
                        1 {right.symbol.toUpperCase()} = ${right.current_price}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ConvertorDisplay;
