"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useRouter } from "next/navigation";
import { getCoinInformation } from "@/app/api";
import AccountMenu from "../NavBarComponents/AccountMenu";
import { reduceNumber, secondaryColor } from "@/app/utils/utility";
import { getGlobalData } from "../../api";
import { SearchIcon } from "../../../images/icons";

const NavBar = () => {
   const { marketData, setCurrency, setMarketData, globalData, currency, setGlobalData, loadUserList, darkMode, setDarkMode } = useCrypto();
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
      const filteredMarketData = marketData.filter((coin) => coin.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(filteredMarketData);
   };

   const collectData = () => {
      collectMarketData();
      collectGlobalData();
      setTimeout(collectData, 180000);
   };

   function navBarColors(darkMode) {
      return darkMode ? "bg-[#181825] hover:bg-[#38386e]" : "text-black bg-[#ffffff] hover:bg-[#8c8c8c]";
   }

   useEffect(() => {
      loadUserList();
      collectData();
   }, []);

   return (
      <main className="text-white text-sm">
         {globalData && (
            <div className="w-screen h-10 bg-[#7474a5] flex items-center justify-center space-x-28">
               <div>Coins: {globalData.active_cryptocurrencies}</div>
               <div>
                  Total Market Cap: {reduceNumber(globalData.total_market_cap[currency])} {currency.toUpperCase()}
               </div>
               <div>
                  Total Volume: {reduceNumber(globalData.total_volume[currency])} {currency.toUpperCase()}
               </div>
               <div>{globalData.market_cap_percentage.btc.toFixed(2)}% BTC</div>
               <div>{globalData.market_cap_percentage.eth.toFixed(2)}% ETH</div>
            </div>
         )}

         <div className={`flex justify-between h-12 px-10 duration-300 ${secondaryColor(darkMode)} items-center`}>
            <div className="w-[1000px] h-full">
               <div className="flex space-x-10 items-center h-full">
                  <div className={`h-full duration-300 ${navBarColors(darkMode)} flex items-center px-5`}>
                     <Link href="/">Home</Link>
                  </div>
                  <div className={`h-full duration-300 ${navBarColors(darkMode)} flex items-center px-5`}>
                     <Link href="/Portfolio">Portfolio</Link>
                  </div>
                  <div className={`h-full duration-300 ${navBarColors(darkMode)} flex items-center px-5`}>
                     <Link href="/Convertor">Convertor</Link>
                  </div>

                  <select
                     defaultValue="default"
                     className={`w-32 duration-300 ${navBarColors(darkMode)} h-12 text-center`}
                     onChange={(event) => {
                        router.push(`/Currency/${event.target.value}`);
                        event.target.selectedIndex = 0;
                     }}
                  >
                     <option
                        key="default"
                        value="default"
                        disabled
                     >
                        Select a Coin
                     </option>
                     {marketData.map((coin) => (
                        <option
                           key={coin.id}
                           className="text-white"
                           value={coin.id}
                        >
                           {coin.name}
                        </option>
                     ))}
                  </select>
                  <select
                     className={`w-16 duration-300 ${navBarColors(darkMode)} h-12  text-center`}
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
                  <div className="w-40 relative">
                     <SearchIcon />
                     <input
                        onChange={handleInputChange}
                        className={`h-6 text-black rounded-lg w-40 pl-8 ${darkMode ? "bg-white" : "bg-[#8c8c8c]"}`}
                        type="text"
                        value={filteredValue}
                     />
                  </div>

                  {showData && (
                     <ul className={`absolute h-[100px] overflow-scroll overflow-x-hidden w-40 text-center text-white ${darkMode ? "bg-[#32324d]" : "bg-[#8c8c8c]"}`}>
                        {filteredData.map((coin) => (
                           <li
                              onClick={() => {
                                 router.push(`/Currency/${coin.id}`);
                                 setShowData(false);
                                 setFilteredValue("");
                              }}
                              key={coin.name}
                           >
                              {coin.name}
                           </li>
                        ))}
                     </ul>
                  )}
               </div>

               <AccountMenu darkMode={darkMode} />
               <div className={`w-[100px] h-[30px] flex justify-center items-center rounded-full ${darkMode ? "bg-white" : "bg-[#8c8c8c]"}`}>
                  <button
                     className={`w-[50px] h-[22px] rounded-full duration-300 ${darkMode ? "translate-x-5 bg-[#474792]" : "-translate-x-5 bg-[#ffffff]"}`}
                     onClick={() => setDarkMode(!darkMode)}
                  ></button>
               </div>
            </div>
         </div>
      </main>
   );
};

export default NavBar;
