/** @format */

"use client";
import Image from "next/image";
import { useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import { uid } from "uid";
import { useRouter } from "next/navigation";
import { addCommas, primaryColor, secondaryColor, textColor } from "@/app/utils/utility";

const DisplayCoinInformation = ({ data }) => {
    const [amount, setAmount] = useState(0);
    const [moneyValue, setMoneyValue] = useState(0);
    const { login, setLogin, saveUserData, darkMode } = useCrypto();
    const router = useRouter();
    const coinName = data.name;
    const coinImage = data.image;
    const currentPrice = addCommas(data.current_price, 2, true);
    const dailyPriceChange = data.price_change_percentage_24h.toFixed(2);
    const symbol = data.symbol;

    const changeAmountToAdd = (event) => {
        setAmount(event.target.value);
    };

    const changeMoneyValue = (event) => {
        setMoneyValue(event.target.value);
    };

    const addCoinData = () => {
        const coinData = {
            name: coinName,
            total_coins: amount,
            initial_value: moneyValue,
            id: uid(),
            coinID: data.id,
        };

        const currentUser = { ...login };
        currentUser.portfolio.push(coinData);
        setLogin(currentUser);
        saveUserData(currentUser);
    };

    return (
        <div className={`duration-300 h-screen w-screen ${primaryColor(darkMode)}`}>
            <div className="flex justify-center items-center flex-col">
                <div className={`${secondaryColor(darkMode)} ${textColor(darkMode)} w-[800px] h-[300px] flex items-center mt-5 rounded-lg`}>
                    <div className="w-1/4 flex justify-around border-r-4 h-full items-center">
                        {coinName}
                        <Image
                            src={coinImage}
                            width={40}
                            height={40}
                            alt="coin image"
                        />
                    </div>
                    <div className="w-3/4 flex justify-around flex-col h-full items-center px-24">
                        <div>Information related to {coinName}</div>
                        <div className="flex justify-between items-center w-full">
                            <div className="space-y-1">
                                <div>Current Price: </div>
                                <div>Price Change (24h): </div>
                                <div>Symbol: </div>
                            </div>
                            <div className="space-y-1 flex flex-col items-end">
                                <div>${currentPrice}</div>
                                <div>{dailyPriceChange}%</div>
                                <div>{symbol.toUpperCase()}</div>
                            </div>
                        </div>

                        <div className="w-full flex justify-between items-center w-full">
                            <div className="space-y-1">
                                <div>Enter number of coins you have: </div>
                                <div>Average cost per coin: </div>
                                <div>Initial Value :</div>
                            </div>
                            <div className="space-y-1 flex flex-col items-end">
                                <input
                                    className="w-[75px] text-black text-center"
                                    type="number"
                                    value={amount}
                                    onChange={changeAmountToAdd}
                                />
                                <input
                                    className="w-[75px] text-black text-center"
                                    type="number"
                                    value={moneyValue}
                                    onChange={changeMoneyValue}
                                />
                                <div>${amount * moneyValue}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-x-20">
                    <button
                        onClick={addCoinData}
                        className={`${secondaryColor(darkMode)} rounded-full h-10 w-40 mt-5`}>
                        Add Asset
                    </button>
                    <button
                        onClick={() => router.push("/Portfolio")}
                        className={`${secondaryColor(darkMode)} rounded-full h-10 w-40 mt-5`}>
                        Return
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisplayCoinInformation;
