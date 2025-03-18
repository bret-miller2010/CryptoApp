/** @format */

"use client";
import PortfolioCoin from "../components/PortfolioPageComponents/PortfolioCoin";
import { useCrypto } from "../Context/CryptoContext";
import { usePortfolioStore } from "../Store/portfolio";
import { primaryColor, secondaryColor, textColor } from "../utils/utility.jsx";
import Link from "next/link";

export default function Portfolio() {
    const { darkMode, marketData } = useCrypto();
    const { portfolio, removeCoin } = usePortfolioStore((state) => state);

    const handleRemove = (event) => {
        const coinIDToRemove = event.target.value;
        removeCoin(coinIDToRemove);
    };

    const gatherMarketCoinData = (id) => {
        return marketData.find((coin) => coin.id === id);
    };

    return (
        <div className={`${textColor(darkMode)} w-screen duration-300 ${primaryColor(darkMode)} h-screen text-[10px]`}>
            <div className="flex flex-col pt-20">
                <div className="flex items-center flex-col px-2.5 space-y-2">
                    <p className={`flex justify-center items-center h-[30px] ${secondaryColor(darkMode)} rounded-full w-40`}>Your Portfolio</p>
                    <div className="flex justify-between w-screen">
                        {portfolio && (
                            <Link
                                className={`flex justify-center items-center h-[30px] ${secondaryColor(darkMode)} px-10 rounded-full`}
                                href="/Portfolio/EditAssets">
                                Edit Portfolio Data
                            </Link>
                        )}
                        <Link
                            className={`flex justify-center items-center h-[30px] ${secondaryColor(darkMode)} px-10 rounded-full`}
                            href="/Portfolio/AddAsset">
                            Add Asset
                        </Link>
                    </div>
                </div>
                <div className={`flex items-center flex-col rounded-3xl ${secondaryColor(darkMode)} py-5 space-y-5 mt-5 mx-12`}>
                    {portfolio.map((coin) => {
                        return (
                            <PortfolioCoin
                                handleRemove={handleRemove}
                                key={coin.id}
                                data={coin}
                                coinMarketData={gatherMarketCoinData(coin.coinID)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
