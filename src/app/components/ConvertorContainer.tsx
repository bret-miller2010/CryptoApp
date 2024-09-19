"use client";
import { getInformation } from "../api";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ConvertorDisplay from "./ConvertorDisplay";

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

      setLeftSelection(marketData[0]);
      setRightSelection(marketData[1]);
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
        <div className="flex flex-col justify-center items-center">
          <div>Currency to Sell</div>
          <select onChange={setLeft} className="w-32 text-black" name="" id="">
            <option key="default" value="default" selected disabled>
              Select Coin
            </option>
            {marketData.map((coin) => (
              <option key={coin.id} className="text-black" value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>Currency to Buy</div>
          <select onChange={setRight} className="w-32 text-black" name="" id="">
            <option key="default" value="default" selected disabled>
              Select Coin
            </option>
            {marketData.map((coin) => (
              <option key={coin.id} className="text-black" value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-around my-5 w-[1000px]">
        <ConvertorDisplay
          symbol={leftSelection?.symbol}
          price={leftSelection?.current_price}
          sidePicked={leftSelection}
        />

        <ConvertorDisplay
          symbol={rightSelection?.symbol}
          price={rightSelection?.current_price}
          sidePicked={rightSelection}
        />
      </div>
    </div>
  );
};

export default ConvertorContainer;

ConvertorContainer.propTypes = {
  marketData: PropTypes.node,
};
