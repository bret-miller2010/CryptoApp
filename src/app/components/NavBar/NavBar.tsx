"use client";
import Link from "next/link";
import { useEffect } from "react";
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

  const collectData = () => {
    collectMarketData();
    collectBitCoinData();
    collectGlobalData();
    setTimeout(collectData, 60000);
  };

  useEffect(() => {
    loadUserList();
    collectData();
  }, []);

  return (
    <main className="text-white mb-14">
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

      <div className="flex justify-between mt-3 p-5">
        <div>
          <div className="space-x-10">
            <Link href="/">Home</Link>
            <Link href="/Portfolio">Portfolio</Link>
            <Link href="/Convertor">Convertor</Link>
            <select
              defaultValue="default"
              className="w-32 text-black bg-[#13121a] text-white"
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
              className="w-16 text-black bg-[#13121a] text-white"
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
        <div className="flex space-x-10">
          <input type="text" />
          <AccountMenu />
        </div>
      </div>
    </main>
  );
};

export default NavBar;
