/** @format */

import Image from "next/image";
import { priceColor } from "@/app/utils/utility";
import { addCommas, secondaryColor, textColor } from "@/app/utils/utility";
import { GreenArrow, RedArrow } from "@/images/icons";

const TopCoinList = ({ data, handleClick, selected, darkMode }) => {
    const coinName = data.name;
    const symbol = data.symbol;
    const currentPrice = addCommas(data.current_price, 2, true);
    const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
    const coinImage = data.image;

    const colorSelector = () => {
        return selected.includes(data.id) ? `${darkMode ? "bg-[#32324d]" : "bg-[#8c8c8c]"}` : `${secondaryColor(darkMode)}`;
    };

    return (
        <button
            onClick={handleClick}
            id={data.id}
            className={`z-20 h-[80px] w-[150px] lg:w-full duration-300 hover:scale-105 flex justify-around items-center ${textColor(darkMode)} rounded-3xl px-2 ${colorSelector()}`}>
            <div className="flex justify-center w-6">
                <Image
                    src={coinImage}
                    width={40}
                    height={40}
                    alt="coin image"
                />
            </div>
            <div className="w-60 text-center text-[13px] flex flex-col space-y-1">
                <div>
                    {coinName} ({symbol.toUpperCase()})
                </div>
                <div>${currentPrice}</div>
            </div>
            <div className={`flex justify-between items-center text-center w-14 text-xs ${priceColor(oneDayChange)}`}>
                <div>
                    {Number(oneDayChange) > 0 ?
                        <GreenArrow />
                    :   <RedArrow />}
                </div>
                {oneDayChange}
            </div>
        </button>
    );
};

export default TopCoinList;
