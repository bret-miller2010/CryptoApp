/** @format */

import { secondaryColor } from "@/app/utils/utility";

const ConvertorSelection = ({ marketData, setLeft, setRight, darkMode }) => {
    return (
        <div className={`flex mt-10 space-x-10 p-5 min-[800px]:p-10 min-[1100px]:px-20 ${secondaryColor(darkMode)} text-[10px] rounded-3xl`}>
            <div className="flex flex-col justify-center items-center space-y-2">
                <div>Currency to Sell</div>
                <select
                    defaultValue="default"
                    onChange={setLeft}
                    className="w-24 text-black">
                    <option
                        key="default"
                        value="default"
                        disabled>
                        Select a Coin
                    </option>
                    {marketData.map((coin) => (
                        <option
                            key={coin.id}
                            className="text-black"
                            value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
                <div>Currency to Buy</div>
                <select
                    defaultValue="default"
                    onChange={setRight}
                    className="w-24 text-black">
                    <option
                        key="default"
                        value="default"
                        disabled>
                        Select a Coin
                    </option>
                    {marketData.map((coin) => (
                        <option
                            key={coin.id}
                            className="text-black"
                            value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ConvertorSelection;
