const ConvertorSelection = ({ marketData, setSide, mode }) => {
   return (
      <div className="flex flex-col justify-center items-center space-y-2">
         <div>Currency to {mode}</div>
         <select
            defaultValue="default"
            onChange={setSide}
            className="w-32 text-black"
         >
            <option
               key="default"
               value="default"
               disabled
            >
               Select a Coin
            </option>
            {marketData.map((coin) => (
               <option
                  key={coin.id}
                  className="text-black"
                  value={coin.id}
               >
                  {coin.name}
               </option>
            ))}
         </select>
      </div>
   );
};

export default ConvertorSelection;
