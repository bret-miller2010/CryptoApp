/** @format */

import { useCrypto } from "@/app/Context/CryptoContext";
import { primaryColor } from "../../utils/utility";
import Image from "next/image";
import MarketInformation from "./MarketInformation";
import UserInformation from "./UserInformation";

const PortfolioCoin = ({ data, handleRemove, coinMarketData }) => {
    const { darkMode } = useCrypto();
    if (!coinMarketData) return null;

    return (
        <div className={`flex items-center ${primaryColor(darkMode)} h-[150px] rounded-3xl`}>
            <div className="flex flex-col justify-center items-center space-y-1 px-4">
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
            <div className="w-4/5 h-full flex justify-between flex-col py-2 px-8">
                <MarketInformation coinMarketData={coinMarketData} />
                <UserInformation
                    coinMarketData={coinMarketData}
                    data={data}
                />
            </div>
            <button
                onClick={handleRemove}
                value={data.id}
                className="">
                X
            </button>
        </div>
    );
};

export default PortfolioCoin;
