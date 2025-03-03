/** @format */

"use client";
import { useEffect, useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useRouter } from "next/navigation";
import { getCoinInformation } from "@/app/api";
import { reduceNumber, secondaryColor, navBarColors } from "@/app/utils/utility";
import { getGlobalData } from "../../api";
import { SearchIcon, Logo } from "../../../images/icons";
import { usePortfolioStore } from "@/app/Store/portfolio";
import MobileDropDown from "../NavBarComponents/MobileDropDown";
import NavBarButtons from "../NavBarComponents/NavBarButtons";

type DarkModeSelectorProps = {
    darkMode: boolean;
    updateDarkMode: () => void;
};

const DarkModeSelector = ({ darkMode, updateDarkMode }: DarkModeSelectorProps) => {
    return (
        <div className="w-1/4 flex justify-end">
            <div className={`w-[40px] h-[20px] flex justify-center duration-300 items-center rounded-full ${darkMode ? "bg-white" : "bg-[#8c8c8c]"}`}>
                <button
                    className={`w-[20px] h-[12px] rounded-full duration-300 ${darkMode ? "translate-x-1 bg-[#474792]" : "-translate-x-1 bg-[#ffffff]"}`}
                    onClick={updateDarkMode}></button>
            </div>
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

    const UpperGlobalData = () => {
        return (
            <div className="h-10 bg-[#7474a5] flex items-center justify-around text-[9px] w-full min-[400px]:text-[10px]">
                <div className="flex items-center w-3/4 justify-around">
                    <div className="hidden min-[500px]:inline">Coins: {globalData.active_cryptocurrencies}</div>
                    <div>
                        Total Market Cap: {reduceNumber(globalData.total_market_cap[currency])} {currency.toUpperCase()}
                    </div>
                    <div>
                        Total Volume: {reduceNumber(globalData.total_volume[currency])} {currency.toUpperCase()}
                    </div>
                    <div className="hidden min-[700px]:block">{globalData.market_cap_percentage.btc.toFixed(2)}% BTC</div>
                    <div className="hidden min-[700px]:block">{globalData.market_cap_percentage.eth.toFixed(2)}% ETH</div>
                </div>
            </div>
        );
    };

    return (
        <main className="text-white text-sm flex flex-col items-center">
            {globalData && <UpperGlobalData />}
            <div className={`flex h-12 justify-center duration-300 ${secondaryColor(darkMode)} items-center text-[8px] lg:text-base w-full px-2`}>
                <div className="flex justify-center items-center w-full h-full">
                    <div className="flex items-center h-full w-full justify-around">
                        <div className="h-full flex space-x-5">
                            <Logo darkMode={darkMode} />
                            <MobileDropDown darkMode={darkMode} />
                            <NavBarButtons darkMode={darkMode} />
                        </div>
                        <div className="flex justify-between items-center w-1/3">
                            <div className="lg:flex flex-col space-y-10">
                                <div className="relative hidden min-[700px]:inline">
                                    <SearchIcon />
                                    <input
                                        onChange={(event) => handleInputChange(event)}
                                        onFocus={() => setShowData(true)}
                                        className={`h-6 px-5 text-black rounded-lg w-24 lg:w-40 duration-300 ${darkMode ? "bg-white" : "bg-[#8c8c8c]"}`}
                                        type="text"
                                        value={filteredValue}
                                    />
                                </div>

                                {showData && (
                                    <ul className={`absolute h-[100px] overflow-scroll overflow-x-hidden z-10 w-40 rounded-md text-center text-white ${darkMode ? "bg-[#32324d]" : "bg-[#8c8c8c]"}`}>
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

                            <select
                                className={`w-16 justify-center duration-300 ${navBarColors(darkMode)} h-12 text-center`}
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
                            <DarkModeSelector
                                darkMode={darkMode}
                                updateDarkMode={updateDarkModeSetting}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NavBar;
