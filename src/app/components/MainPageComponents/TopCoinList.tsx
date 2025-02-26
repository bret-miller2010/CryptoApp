/** @format */

import Image from "next/image";
import { priceColor } from "@/app/utils/utility";
import { addCommas, secondaryColor, textColor } from "@/app/utils/utility";
import { GreenArrow, RedArrow } from "@/images/icons";

type TopCoinListProps = {
    data: any;
    handleClick: (data: string) => void;
    selected: string[];
    darkMode: boolean;
};

const TopCoinList = ({ data, handleClick, selected, darkMode }: TopCoinListProps): JSX.Element => {
    const coinName = data.name;
    const symbol = data.symbol;
    const currentPrice = addCommas(data.current_price, 2, true);
    const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
    const coinImage = data.image;

    const colorSelector = (): string => {
        return selected.includes(data.id) ? `${darkMode ? "bg-[#32324d]" : "bg-[#8c8c8c]"}` : `${secondaryColor(darkMode)}`;
    };

    return (
        <button
            onClick={() => handleClick(data.id)}
            id={data.id}
            className={`h-[70px] w-[175px] min-[1500px]:w-[200px] min-[1750px]:w-[240px] text-[10px] duration-300 hover:scale-105 flex justify-around items-center ${textColor(darkMode)} rounded-3xl px-3 ${colorSelector()}`}>
            <div className="flex justify-center w-10">
                <Image
                    src={coinImage}
                    width={40}
                    height={40}
                    alt="coin image"
                />
            </div>
            <div className="w-60 text-center flex flex-col space-y-1">
                <div>
                    {coinName} ({symbol.toUpperCase()})
                </div>
                <div>${currentPrice}</div>
            </div>
            <div className={`flex justify-between items-center text-center w-16 ${priceColor(oneDayChange)}`}>
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
