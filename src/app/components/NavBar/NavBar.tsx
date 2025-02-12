/** @format */

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useRouter } from "next/navigation";
import { getCoinInformation } from "@/app/api";
import AccountMenu from "../NavBarComponents/AccountMenu";
import { reduceNumber, secondaryColor, navBarColors, textColor } from "@/app/utils/utility";
import { getGlobalData } from "../../api";
import { SearchIcon, Logo } from "../../../images/icons";

const NavBar = () => {
    const { marketData, setCurrency, setMarketData, saveUserData, globalData, currency, setGlobalData, loadUserList, darkMode, setDarkMode, login } = useCrypto();
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

    const updateDarkModeSetting = () => {
        const updateUser = { ...login };
        const setting = !darkMode;
        updateUser.dark_mode = setting;
        saveUserData(updateUser);
        setDarkMode(setting);
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
        // setTimeout(collectData, 180000);
    };

    useEffect(() => {
        loadUserList();
        collectData();
    }, []);

    return (
        <main className="text-white text-sm w-[640px] md:w-screen max-w-[2000px] fixed">
            {globalData && (
                <div className="h-10 bg-[#7474a5] flex items-center justify-center space-x-10 text-[10px] w-[640px] md:w-screen max-w-[2000px] lg:text-base lg:space-x-28">
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

            <div className={`flex lg:px-40 h-12 justify-between duration-300 ${secondaryColor(darkMode)} items-center text-[10px] lg:text-base`}>
                <div className="flex space-x-10">
                    <Logo darkMode={darkMode} />
                    <div className="h-full">
                        <div className="flex items-center h-full">
                            <div className={`h-12 w-24 justify-center duration-300 ${textColor(darkMode)} flex items-center px-2`}>
                                <Link
                                    href="/">
                                    Home
                                </Link>
                            </div>
                            <div className={`h-12 w-24 justify-center duration-300 ${textColor(darkMode)} flex items-center px-2`}>
                                <Link href="/Portfolio">Portfolio</Link>
                            </div>
                            <div className={`h-12 w-24 justify-center duration-300 ${textColor(darkMode)} flex items-center px-2`}>
                                <Link href="/Convertor">Convertor</Link>
                            </div>
                            <select
                                className={`w-24 justify-center duration-300 ${navBarColors(darkMode)} h-12 text-center mr-2`}
                                defaultValue="usd"
                                onChange={updateCurrency}
                                name=""
                                id="">
                                <option value="usd">USD</option>
                                <option value="btc">BTC</option>
                                <option value="eth">ETH</option>
                                <option value="eur">EUR</option>
                                <option value="cad">CAD</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="lg:space-x-10 flex space-x-2 h-full items-center">
                    <div className="invisible lg:visible flex flex-col space-y-10">
                        <div className="relative">
                            <SearchIcon />
                            <input
                                onChange={handleInputChange}
                                className={`h-6 text-black rounded-lg w-24 lg:w-40 duration-300 ${darkMode ? "bg-white" : "bg-[#8c8c8c]"}`}
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
                                        key={coin.name}>
                                        {coin.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <AccountMenu darkMode={darkMode} />
                    <div className={`w-[45px] h-[20px] flex justify-center items-center rounded-full ${darkMode ? "bg-white" : "bg-[#8c8c8c]"}`}>
                        <button
                            className={`w-[25px] h-[15px] rounded-full duration-300 ${darkMode ? "translate-x-1 bg-[#474792]" : "-translate-x-1 bg-[#ffffff]"}`}
                            onClick={updateDarkModeSetting}></button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NavBar;
