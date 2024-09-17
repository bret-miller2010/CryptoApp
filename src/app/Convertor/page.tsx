"use client";
import { getInformation } from "../api";
import { useState, useEffect } from "react";

export default function Compare() {
  const [currentDate, setCurrentDate] = useState("");
  const [MarketData, setMarketData] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState("");

  const CompareBox = () => {
    const [coinInfo, setCoinInfo] = useState("");

    const setDisplayInfo = (coin) => {
      setCoinInfo(coin.target.value);
    };

    return (
      <div>
        <select
          onChange={setDisplayInfo}
          className="w-24 text-black"
          name=""
          id=""
        >
          {MarketData.map((coin) => (
            <option key={coin["id"]} className="text-black" value={coin["id"]}>
              {coin["name"]}
            </option>
          ))}
        </select>
        <div>{coinInfo}</div>
      </div>
    );
  };

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

        <div className="flex justify-center my-5">
          <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] mr-5">
            <CompareBox />
          </div>
          <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] ml-5">
            <CompareBox />
          </div>
        </div>
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
