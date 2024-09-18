"use client";
import { getInformation } from "../api";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Container = ({ marketData }) => {
  const [leftSelection, setLeftSelection] = useState(marketData[0]);
  const [rightSelection, setRightSelection] = useState(marketData[1]);
  const [sellAmount, setSellAmount] = useState(1);
  const [buyAmount, setBuyAmount] = useState(1);

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

  return (
    <div className="flex justify-center my-5">
      <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] mr-5">
        <div>You sell</div>
        <div className="flex justify-between">
          <select onChange={setLeft} className="w-24 text-black" name="" id="">
            {marketData.map((coin) => (
              <option
                key={coin["id"]}
                className="text-black"
                value={coin["id"]}
              >
                {coin["name"]}
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
                    key={coin["id"]}
                    className="text-black"
                    value={coin["id"]}
                    selected
                  >
                    {coin["name"]}
                  </option>
                );
              } else {
                return (
                  <option
                    key={coin["id"]}
                    className="text-black"
                    value={coin["id"]}
                  >
                    {coin["name"]}
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

Container.propTypes = {
  marketData: PropTypes.node,
};

export default function Compare() {
  const [currentDate, setCurrentDate] = useState("");
  const [MarketData, setMarketData] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState("");

  const getCoinData = async () => {
    const coinKey =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";
    try {
      const coinData = await getInformation(coinKey);
      setErrorMessage("");
      setMarketData(coinData);
    } catch (e) {
      setErrorMessage("Could not load crypto currency data. Please try again.");
    }
  };

  useEffect(() => {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth();
    const day = current.getDate();
    const hours = current.getHours();
    const minutes = current.getMinutes();
    setCurrentDate(`${month + 1}/${day}/${year} | ${hours}:${minutes}`);
    getCoinData();
  }, []);

  return (
    <div className="text-white mx-[15px]">
      <div className="flex flex-col mt-5">
        <div>{ErrorMessage}</div>
        <div>Online currency convertor</div>
        <div>{currentDate}</div>

        <Container marketData={MarketData} />

        <div className="flex justify-center items-center h-[500px] rounded-3xl bg-[#181825]">
          Graph for value
        </div>
        <div className="flex w-[400px] space-x-10 justify-center items-center mt-5 rounded-3xl p-2 bg-[#181825]">
          <button>1D</button>
          <button>7D</button>
          <button>14D</button>
          <button>1M</button>
          <button>1Y</button>
          <button>5Y</button>
        </div>
      </div>
    </div>
  );
}
