const ConvertorSelection = ({ marketData, setLeft, setRight }) => {
   return (
      <div className="flex space-x-10">
         <div className="flex flex-col justify-center items-center space-y-2">
            <div>Currency to Sell</div>
            <select
               defaultValue="default"
               onChange={setLeft}
               className="w-32 text-black">
               <option
                  key="default"
                  value="default"
                  disabled>
                  Select a Coin
               </option>
               {marketData.map((coin) => (
                  <option
                     key={coin.id}
                     className="text-black"
                     value={coin.id}>
                     {coin.name}
                  </option>
               ))}
            </select>
         </div>
         <div className="flex flex-col justify-center items-center space-y-2">
            <div>Currency to Buy</div>
            <select
               defaultValue="default"
               onChange={setRight}
               className="w-32 text-black">
               <option
                  key="default"
                  value="default"
                  disabled>
                  Select a Coin
               </option>
               {marketData.map((coin) => (
                  <option
                     key={coin.id}
                     className="text-black"
                     value={coin.id}>
                     {coin.name}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
};

export default ConvertorSelection;
