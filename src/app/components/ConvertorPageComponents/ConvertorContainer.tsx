"use client";
import { getInformation } from "../../api";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ConvertorDisplay from "./ConvertorDisplay";
import ConvertorSelection from "./ConvertorSelection";

const ConvertorContainer = () => {
  const [leftSelection, setLeftSelection] = useState(Object);
  const [rightSelection, setRightSelection] = useState(Object);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const getCoinData = async () => {
    const coinKey =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";
    try {
      const coinData = await getInformation(coinKey);
      setMarketData(coinData);
    } catch (e) {
      setErrorMessage(true);
    }
  };

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

  useEffect(() => {
    getCoinData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center my-5 flex-col items-center">
      <div className="flex justify-around my-5 items-center h-[100px] rounded-3xl p-5 bg-[#181825] w-[500px]">
        {errorMessage}
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

ConvertorContainer.propTypes = {
  marketData: PropTypes.node,
};
