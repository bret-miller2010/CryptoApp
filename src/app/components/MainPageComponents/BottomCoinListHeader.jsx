/** @format */

import { textColor, primaryColor } from "@/app/utils/utility";

const BottomCoinListHeader = ({ darkMode, sortBy }) => {
    const middleButtonList = [
        {
            button_name: "current_price",
            name: "Current Price",
        },
        {
            button_name: "one_hour",
            name: "% Change (1H)",
        },
        {
            button_name: "one_day",
            name: "% Change (1D)",
        },
        {
            button_name: "seven_day",
            name: "% Change (7D)",
        },
    ];

    const handleClick = (event) => {
        sortBy(event.target.value);
    };
    return (
        <div className={`flex justify-between ${textColor(darkMode)} p-2 rounded-2xl duration-300 ${primaryColor(darkMode)} mt-5 h-[70px] text-[9px]`}>
            <div className="flex justify-between items-center w-1/2 lg:w-1/4 text-center">
                <button
                    onClick={handleClick}
                    className="w-10"
                    value="rank">
                    #
                </button>
                <div
                    onClick={handleClick}
                    className="w-40"
                    value="name">
                    Logo
                </div>
                <button
                    onClick={handleClick}
                    className="w-80"
                    value="name">
                    Currency
                </button>
            </div>
            <div className="flex justify-between items-center w-1/2 lg:w-1/3 text-center">
                {middleButtonList.map((ele) => {
                    return (
                        <button
                            key={ele}
                            onClick={handleClick}
                            className="w-1/4"
                            value={ele.button_name}>
                            {ele.name}
                        </button>
                    );
                })}
            </div>
            <div className="flex justify-between items-center w-1/3 text-center absolute lg:static invisible lg:visible">
                <div className="w-1/3">Volume vs Market Cap</div>
                <div className="w-1/3">Circ Supply vs Total Supply</div>
                <div className="w-1/3">Last 7 Days</div>
            </div>
        </div>
    );
};

export default BottomCoinListHeader;
