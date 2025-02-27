/** @format */

import { useCrypto } from "@/app/Context/CryptoContext";
import { primaryColor } from "../../utils/utility";
import Image from "next/image";

const PortfolioCoin = ({ data, handleRemove, coinMarketData }) => {
    const { darkMode } = useCrypto();

    if (!coinMarketData) return null;

    const findBalance = () => {
        const totalPurchase = data.total_coins * data.initial_value;
        const currentValue = coinMarketData.current_price * data.total_coins;
        return currentValue - totalPurchase;
    };

    return (
        <div className={`flex text-base items-center w-[600px] ${primaryColor(darkMode)} h-[150px] rounded-3xl`}>
            <div className="w-1/5 flex flex-col justify-center items-center space-y-2">
                <Image
                    src={coinMarketData.image}
                    width={40}
                    height={40}
                    alt="coin image"
                />
                <div className="flex space-x-1 justify-center items-center">
                    <div>{coinMarketData.name}</div>
                    <div>({coinMarketData.symbol})</div>
                </div>
            </div>
            <div className="w-4/5 h-full flex justify-between flex-col py-2 px-16">
                <div className="flex flex-col justify-around h-1/2">
                    <div>Market Information</div>
                    <div className="flex justify-between text-xs">
                        <div className="flex justify-center items-center flex-col">
                            <div>Current Price</div>
                            <div>${coinMarketData.current_price}</div>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div>Price Change (24h)</div>
                            <div>{coinMarketData.price_change_percentage_24h?.toFixed(2)}%</div>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div>All Time High</div>
                            <div>${coinMarketData.ath}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-around h-1/2">
                    <div>Your Information</div>
                    <div className="flex justify-between text-xs">
                        <div className="flex justify-center items-center flex-col">
                            <div>Total Coins</div>
                            <div>{data.total_coins}</div>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div>Original Price</div>
                            <div>${data.initial_value}</div>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div>Current Valuation</div>
                            <div>${data.total_coins * coinMarketData.current_price}</div>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div>Gain/Loss</div>
                            <div>${findBalance()}</div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={handleRemove}
                value={data.id}
                className="mr-5">
                X
            </button>
        </div>
    );
};

export default PortfolioCoin;
