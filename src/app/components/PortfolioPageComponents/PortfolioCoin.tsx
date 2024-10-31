import { useState, useEffect } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import Image from "next/image";

const PortfolioCoin = ({ data, handleRemove }) => {
  const { marketData } = useCrypto();
  const [coin, setCoin] = useState(Object);
  const coinImage = coin.image;

  const collectCoinData = (id) => {
    const pickedCoin = marketData.find((coin) => coin.id === id);
    setCoin(pickedCoin);
  };

  const findBalance = () => {
    const totalPurchase = data.total_coins * data.initial_value;
    const currentValue = coin.current_price * data.total_coins;
    return (currentValue - totalPurchase);
  };

  useEffect(() => {
    collectCoinData(data.coinID);
  }, []);

  return (
    <div className="flex items-center w-[700px] bg-[#3a3978] h-[200px] rounded-full">
      <div className="w-1/5 flex flex-col justify-center items-center space-y-2">
        <Image src={coinImage} width={40} height={40} alt="coin image" />
        <div className="flex space-x-1 justify-center items-center">
          <div>{coin.name}</div>
          <div>({coin.symbol})</div>
        </div>
      </div>
      <div className="w-4/5 h-full flex justify-between flex-col py-2 px-16">
        <div className="flex flex-col justify-around h-1/2">
          <div>Market Information</div>
          <div className="flex justify-between text-xs">
            <div className="flex justify-center items-center flex-col">
              <div>Current Price</div>
              <div>${coin.current_price}</div>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div>Price Change (24h)</div>
              <div>{coin.price_change_percentage_24h?.toFixed(2)}%</div>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div>All Time High</div>
              <div>${coin.ath}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around h-1/2">
          <div>Your Information</div>
          <div className="flex justify-between text-xs">
            <div className="flex justify-center items-center flex-col">
              <div>Total Coins</div>
              <div>{data.total_coins}</div>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div>Original Price</div>
              <div>${data.initial_value}</div>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div>Current Valuation</div>
              <div>
                ${data.total_coins * coin.current_price}
              </div>
            </div>
            <div className="flex justify-center items-center flex-col">
              <div>Gain/Loss</div>
              <div>${findBalance()}</div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleRemove} value={data.id} className="mr-5">
        X
      </button>
    </div>
  );
};

export default PortfolioCoin;
