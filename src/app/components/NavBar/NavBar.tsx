"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useRouter } from "next/navigation";
import { getCoinInformation } from "@/app/api";
import AccountMenu from "../NavBarComponents/AccountMenu";
import { reduceNumber } from "@/app/utils/utility";
import { getBitCoinData, getGlobalData } from "../../api";

const NavBar = () => {
  const {
    marketData,
    setCurrency,
    setMarketData,
    globalData,
    currency,
    setBitCoinData,
    setGlobalData,
    loadUserList,
  } = useCrypto();
  const router = useRouter();
  const [filteredValue, setFilteredValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showData, setShowData] = useState(false);

  const updateCurrency = async (event) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency);
    const data = await getCoinInformation(selectedCurrency);
    setMarketData(data);
  };

  const collectMarketData = async () => {
    const data = await getCoinInformation(currency);
    setMarketData(data);
  };

  const collectBitCoinData = async () => {
    const data = await getBitCoinData();
    setBitCoinData(data);
  };

  const collectGlobalData = async () => {
    const { data } = await getGlobalData();
    setGlobalData(data);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.length > 1) {
      setShowData(true);
    } else {
      setShowData(false);
    }
    setFilteredValue(value);
    const filteredMarketData = marketData.filter((coin) =>
      coin.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredMarketData);
  };

  const collectData = () => {
    collectMarketData();
    collectBitCoinData();
    collectGlobalData();
    setTimeout(collectData, 180000);
  };

  useEffect(() => {
    loadUserList();
    collectData();
  }, []);

  return (
    <main className="text-white mb-14 text-sm">
      {globalData && (
        <div className="w-screen h-10 bg-[#474792] flex items-center justify-center space-x-28 ">
          <div>Coins: {globalData.active_cryptocurrencies}</div>
          <div>
            {reduceNumber(globalData.total_market_cap[currency])}{" "}
            {currency.toUpperCase()}
          </div>
          <div>
            {reduceNumber(globalData.total_volume[currency])}{" "}
            {currency.toUpperCase()}
          </div>
          <div>{globalData.market_cap_percentage.btc.toFixed(2)}% BTC</div>
          <div>{globalData.market_cap_percentage.eth.toFixed(2)}% ETH</div>
        </div>
      )}

      <div className="flex justify-between h-12 px-10 bg-[#181825] items-center">
        <div className="w-[1000px] h-full">
          <div className="flex space-x-10 items-center h-full">
            <div className="h-full hover:bg-[#202049] flex items-center px-5">
              <Link href="/">Home</Link>
            </div>
            <div className="h-full hover:bg-[#202049] flex items-center px-5">
              <Link href="/Portfolio">Portfolio</Link>
            </div>
            <div className="h-full hover:bg-[#202049] flex items-center px-5">
              <Link href="/Convertor">Convertor</Link>
            </div>

            <select
              defaultValue="default"
              className="w-32 text-black bg-[#181825] text-white hover:bg-[#202049] h-12 text-center"
              onChange={(event) => {
                router.push(`/Currency/${event.target.value}`);
                event.target.selectedIndex = 0;
              }}
            >
              <option key="default" value="default" disabled>
                Select a Coin
              </option>
              {marketData.map((coin) => (
                <option key={coin.id} className="text-white" value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
            <select
              className="w-16 text-black hover:bg-[#202049] h-12 text-white bg-[#181825] text-center"
              defaultValue="usd"
              onChange={updateCurrency}
              name=""
              id=""
            >
              <option value="usd">USD</option>
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
              <option value="eur">EUR</option>
              <option value="cad">CAD</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-10 h-full items-center">
          <div className="flex flex-col space-y-10">
            <input
              onChange={handleInputChange}
              className="h-6 text-black"
              type="text"
              value={filteredValue}
            />
            {showData && (
              <ul className="absolute h-[100px] overflow-scroll overflow-x-hidden">
                {filteredData.map((coin, index) => (
                  <li
                    onClick={() => {
                      router.push(`/Currency/${coin.id}`);
                      setShowData(false);
                      setFilteredValue("");
                    }}
                    key={index}
                  >
                    {coin.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <AccountMenu />
        </div>
      </div>
    </main>
  );
};

export default NavBar;
