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

type DarkModeSelectorProps = {
    darkMode: boolean;
    updateDarkMode: () => void;
};

const DarkModeSelector = ({ darkMode, updateDarkMode }: DarkModeSelectorProps) => {
    return (
        <div className={`w-[40px] h-[20px] flex justify-center duration-300 items-center rounded-full ${darkMode ? "bg-white" : "bg-[#8c8c8c]"}`}>
            <button
                className={`w-[20px] h-[12px] rounded-full duration-300 ${darkMode ? "translate-x-1 bg-[#474792]" : "-translate-x-1 bg-[#ffffff]"}`}
                onClick={updateDarkMode}></button>
        </div>
    );
};

const NavBar = () => {
    const { marketData, setCurrency, setMarketData, saveUserData, globalData, currency, setGlobalData, loadUserList, darkMode, setDarkMode, login } = useCrypto();
    const router = useRouter();
    const [filteredValue, setFilteredValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showData, setShowData] = useState(false);

    type UpdateEvent = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>;

    const updateCurrency = async (event: UpdateEvent) => {
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

    const handleInputChange = (event: UpdateEvent) => {
        const value = event.target.value;
        if (value.length > 1) {
            setShowData(true);
        } else {
            setShowData(false);
        }
        setFilteredValue(value);
        const filteredMarketData = marketData.filter((coin: any) => coin.name.toLowerCase().includes(value.toLowerCase()));
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

    // w-[640px] md:w-screen max-w-[2000px]

    return (
        <main className="text-white text-sm flex flex-col items-center w-screen">
            {globalData && (
                <div className="h-10 bg-[#7474a5] flex items-center justify-center space-x-10 text-[10px] lg:text-base lg:space-x-28 w-full">
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

            <div className={`flex h-12 justify-center duration-300 ${secondaryColor(darkMode)} items-center text-[10px] lg:text-base w-screen`}>
                <div className="flex justify-center items-center w-full px-40 h-full space-x-80">
                        <div className="h-full flex">
                            <Logo darkMode={darkMode} />
                            <div className="flex items-center h-full">
                                <div className={`h-12 w-24 justify-center duration-300 ${textColor(darkMode)} flex items-center px-2`}>
                                    <Link href="/">Home</Link>
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
                                    onChange={(event) => updateCurrency(event)}
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

                    <div className="lg:space-x-10 flex space-x-2 h-full items-center border-2 border-blue-500">
                        <div className="invisible lg:visible flex flex-col space-y-10">
                            <div className="relative">
                                <SearchIcon />
                                <input
                                    onChange={(event) => handleInputChange(event)}
                                    className={`h-6 text-black rounded-lg w-24 lg:w-40 duration-300 ${darkMode ? "bg-white" : "bg-[#8c8c8c]"}`}
                                    type="text"
                                    value={filteredValue}
                                />
                            </div>

                            {showData && (
                                <ul className={`absolute h-[100px] overflow-scroll overflow-x-hidden w-40 text-center text-white ${darkMode ? "bg-[#32324d]" : "bg-[#8c8c8c]"}`}>
                                    {filteredData.map((coin: any) => (
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
                        <DarkModeSelector
                            darkMode={darkMode}
                            updateDarkMode={updateDarkModeSetting}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NavBar;
