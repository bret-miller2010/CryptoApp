/** @format */

"use client";
import PortfolioCoin from "../components/PortfolioPageComponents/PortfolioCoin";
import { useCrypto } from "../Context/CryptoContext";
import { primaryColor, secondaryColor, textColor } from "../utils/utility.jsx";
import Link from "next/link";

export default function Portfolio() {
    const { saveUserData, darkMode, userAssetData, marketData } = useCrypto();

    const handleRemove = (event) => {
        const coinIDToRemove = event.target.value;
        const newPortfolio = userAssetData.filter((coin) => coin.id !== coinIDToRemove);
        saveUserData(newPortfolio);
    };

    const gatherMarketCoinData = (id) => {
        return marketData.find((coin) => coin.id === id);
    };

    return (
        <div className={`${textColor(darkMode)} w-[640px] md:w-screen duration-300 ${primaryColor(darkMode)} h-screen`}>
            <div className="flex flex-col">
                <div className="flex justify-between px-2.5 mt-40 ">
                    <p className={`flex justify-center items-center h-[30px] ${secondaryColor(darkMode)} px-10 rounded-full`}>Your Portfolio</p>
                    {userAssetData && (
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
                <div className={`flex items-center flex-col rounded-3xl ${secondaryColor(darkMode)} py-5 space-y-5 mt-5`}>
                    {userAssetData &&
                        userAssetData.map((coin) => {
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
