"use client";
import { getInformation } from "../api";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Container = () => {
  const [leftSelection, setLeftSelection] = useState(Object);
  const [rightSelection, setRightSelection] = useState(Object);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [sellAmount, setSellAmount] = useState(1);
  const [buyAmount, setBuyAmount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const getCoinData = async () => {
    const coinKey =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";
    try {
      const coinData = await getInformation(coinKey);
      setMarketData(coinData);
      setLeftSelection(marketData[0]);
      setRightSelection(marketData[1]);
    } catch (e) {
      setErrorMessage("Could not load crypto currency data. Please try again.");
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

  const numberToSell = (value) => {
    const coinToSell = value.target.value;
    const leftCoinPrice = leftSelection?.current_price;
    const rightCoinPrice = rightSelection?.current_price;

    setSellAmount(coinToSell);
    setBuyAmount((leftCoinPrice / rightCoinPrice) * sellAmount);
  };

  const numberToBuy = (value) => {
    const coinToBuy = value.target.value;
    const leftCoinPrice = leftSelection?.current_price;
    const rightCoinPrice = rightSelection?.current_price;

    setBuyAmount(coinToBuy);
    setSellAmount((rightCoinPrice / leftCoinPrice) * buyAmount);
  };

  useEffect(() => {
    getCoinData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center my-5">
      <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] mr-5">
        {errorMessage}
        <div>You sell</div>
        <div className="flex justify-between">
          <select onChange={setLeft} className="w-24 text-black" name="" id="">
            {marketData.map((coin) => (
              <option key={coin.id} className="text-black" value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>
          <input
            onChange={numberToSell}
            className="text-black"
            type="number"
            value={sellAmount}
          />
        </div>

        <div>
          <div>
            1 {leftSelection?.symbol} = ${leftSelection?.current_price}
          </div>
          <div>
            {sellAmount} {leftSelection?.symbol} = $
            {leftSelection?.current_price * sellAmount}
          </div>
        </div>
      </div>
      <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] mr-5">
        <div>You buy</div>
        <div className="flex justify-between">
          <select onChange={setRight} className="w-24 text-black" name="" id="">
            {marketData.map((coin) => {
              if (coin.id === "ethereum") {
                return (
                  <option
                    key={coin.id}
                    className="text-black"
                    value={coin.id}
                    selected
                  >
                    {coin.name}
                  </option>
                );
              } else {
                return (
                  <option
                    key={coin.name}
                    className="text-black"
                    value={coin.id}
                  >
                    {coin.name}
                  </option>
                );
              }
            })}
          </select>
          <input
            onChange={numberToBuy}
            className="text-black"
            type="number"
            value={buyAmount}
          />
        </div>
        <div>
          1 {rightSelection?.symbol} = ${rightSelection?.current_price}
        </div>
      </div>
    </div>
  );
};

export default Container;

Container.propTypes = {
  marketData: PropTypes.node,
};
