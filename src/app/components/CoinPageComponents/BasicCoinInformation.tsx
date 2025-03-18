/** @format */

"use client";
import Image from "next/image";
import { secondaryColor, textColor } from "../../utils/utility";

const BasicCoinInformation = ({ coinData, currency, darkMode }) => {
    if (!coinData) {
        return null;
    }
    const coinName = coinData.name;
    const currentPrice = coinData.market_data.current_price[currency];
    const changeIn24 = coinData.market_data.price_change_percentage_24h.toFixed(2);
    const allTimeHigh = coinData.market_data.ath[currency];
    const allTimeLow = coinData.market_data.atl[currency];
    const symbol = coinData.symbol.toUpperCase();
    const coinImage = coinData.image.small;
    const link = coinData.links.homepage[0];

    const pickColor = (value) => {
        if (value > 0) return "text-green-500";
        else return "text-red-500";
    };
    return (
        <div className="text-white space-y-5 w-full">
            <div className="flex w-full p-5 justify-between h-full">
                <div className="flex flex-col w-1/2 justify-between">
                    <div className={`flex flex-col items-center justify-center duration-300 ${textColor(darkMode)} ${secondaryColor(darkMode)} space-y-2 rounded-lg p-4`}>
                        <div className="bg-[#2c2c4a] p-2 rounded-lg">
                        <Image
                                src={coinImage}
                                width={20}
                                height={20}
                                alt="coin image"
                            />
                        </div>

                        <div>
                            {coinName} ({symbol})
                        </div>
                    </div>
                    <div className={`flex justify-center items-center duration-300 ${textColor(darkMode)} ${secondaryColor(darkMode)} rounded-lg p-4`}>{link}</div>
                </div>
                <div className={`duration-300 ${secondaryColor(darkMode)} flex justify-center items-center flex-col p-10 h-full rounded-lg space-y-5`}>
                    <div className="flex space-x-3">
                        <div className={pickColor(changeIn24)}>${currentPrice}</div>
                        <div className={pickColor(changeIn24)}>{changeIn24}%</div>
                    </div>
                    {/* <div>Profit: Some Value</div> */}
                    <div className="text-green-500">All Time High: ${allTimeHigh}</div>
                    <div className="text-red-500">All Time Low: ${allTimeLow}</div>
                </div>
            </div>
        </div>
    );
};

export default BasicCoinInformation;
