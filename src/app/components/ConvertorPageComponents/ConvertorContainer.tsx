"use client";
import { useState } from "react";
import ConvertorDisplay from "./ConvertorDisplay";
import ConvertorSelection from "./ConvertorSelection";
import { useCrypto } from "@/app/Context/CryptoContext";

const ConvertorContainer = () => {
  const [leftSelection, setLeftSelection] = useState(Object);
  const [rightSelection, setRightSelection] = useState(Object);
  const { marketData } = useCrypto();

  const setLeft = (value) => {
    const selectedCoin = value.target.value;
    const pickedCoin = marketData.find((coin) => coin.id === selectedCoin);
    setLeftSelection(pickedCoin);
  };

  const setRight = (value) => {
    const selectedCoin = value.target.value;
    const pickedCoin = marketData.find((coin) => coin.id === selectedCoin);
    setRightSelection(pickedCoin);
  };

  return (
    <div className="flex justify-center my-5 flex-col items-center">
      <div className="flex justify-around my-5 items-center h-[100px] rounded-3xl p-5 bg-[#181825] w-[500px]">
        <ConvertorSelection marketData={marketData} setSide={setLeft} />
        <ConvertorSelection marketData={marketData} setSide={setRight} />
      </div>
      <div className="flex justify-around my-5 w-[1000px]">
        <ConvertorDisplay
          symbol={leftSelection?.symbol}
          price={leftSelection?.current_price}
        />
        <ConvertorDisplay
          symbol={rightSelection?.symbol}
          price={rightSelection?.current_price}
        />
      </div>
    </div>
  );
};

export default ConvertorContainer;
