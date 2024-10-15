"use client";
import Image from "next/image";
import { useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import { uid } from "uid";
import { useRouter } from "next/navigation";

const DisplayCoinInformation = ({ data }) => {
  const [amount, setAmount] = useState(0);
  const [moneyValue, setMoneyValue] = useState(0);
  const { userAssetData, setUserAssetData } = useCrypto();
  const router = useRouter();
  const coinName = data.name;
  const coinImage = data.image;
  const currentPrice = data.current_price;
  const dailyPriceChange = data.price_change_percentage_24h.toFixed(2);
  const symbol = data.symbol;

  const changeAmountToAdd = (event) => {
    setAmount(event.target.value);
  };

  const changeMoneyValue = (event) => {
    setMoneyValue(event.target.value);
  };

  const addCoinData = () => {
    const newData = userAssetData;
    const coinData = {
      coin: coinName,
      totalCoins: amount,
      totalValue: moneyValue,
      id: uid(),
      coinID: data.id,
    };
    newData.push(coinData);
    setUserAssetData(newData);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-white bg-[#181825] w-[800px] h-[300px] flex items-center mt-5 rounded-lg">
        <div className="w-1/4 flex justify-around border-r-4 h-full items-center">
          {coinName}
          <Image src={coinImage} width={40} height={40} alt="coin image" />
        </div>
        <div className="w-3/4 flex justify-around flex-col h-full items-center">
          <div>Information related to {coinName}</div>
          <div className="flex justify-around flex-col items-center w-full">
            <div>Current Price: {currentPrice}</div>
            <div>Price Change (24h): {dailyPriceChange}%</div>
            <div>Symbol: {symbol}</div>
          </div>

          <div className="w-full flex flex-col justify-center items-center space-y-4">
            <div className="flex space-x-10">
              <div>Enter number of coins you have: </div>
              <input
                className="w-[50px] text-black text-center"
                type="number"
                value={amount}
                onChange={changeAmountToAdd}
              />
            </div>
            <div className="flex space-x-10">
              <div>Enter average price per coin: </div>
              <input
                className="w-[100px] text-black text-center"
                type="number"
                value={moneyValue}
                onChange={changeMoneyValue}
              />
            </div>
            <div>Total Value : ${amount * moneyValue}</div>
          </div>
        </div>
      </div>
      <div className="space-x-20">
        <button
          onClick={addCoinData}
          className="bg-[#3a3978] rounded-md h-10 w-40 mt-5"
        >
          Add Asset
        </button>
        <button
          onClick={() => router.push("/Portfolio")}
          className="bg-[#3a3978] rounded-md h-10 w-40 mt-5"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default DisplayCoinInformation;