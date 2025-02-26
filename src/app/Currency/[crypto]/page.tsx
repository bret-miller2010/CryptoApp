/** @format */

"use client";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useEffect, useState } from "react";
import { getSpecificCoinInfo } from "@/app/api";
import CoinDescription from "@/app/components/CoinPageComponents/CoinDescription";
import CoinMarketInformation from "@/app/components/CoinPageComponents/CoinMarketInformation";
import BasicCoinInformation from "@/app/components/CoinPageComponents/BasicCoinInformation";
import CoinLinks from "@/app/components/CoinPageComponents/CoinLinks";
import { primaryColor } from "@/app/utils/utility";

export default function CoinInformation({ params }: { params: { crypto: string } }) {
    const { marketData, currency, darkMode } = useCrypto();
    const [selectedCoin, setSelectedCoin] = useState(Object);
    const [coinData, setCoinData] = useState();

    const collectCoinInformation = async () => {
        const pickedCoin = marketData.find((coin) => coin.id === params.crypto);
        const data = await getSpecificCoinInfo(pickedCoin.id);
        setSelectedCoin(pickedCoin);
        setCoinData(data);
    };

    useEffect(() => {
        collectCoinInformation();
    }, []);

    return (
        <main className={`flex flex-col h-screen ${primaryColor(darkMode)} items-center text-[9px] pt-24`}>
            <div className="flex flex-col w-[375px]">
                <BasicCoinInformation
                    coinData={coinData}
                    currency={currency}
                    darkMode={darkMode}
                />
            </div>
            <div className="flex flex-col w-[375px]">
                <CoinMarketInformation
                    coinData={coinData}
                    coin={selectedCoin}
                    currency={currency}
                    darkMode={darkMode}
                />

                <CoinLinks
                    coinData={coinData}
                    darkMode={darkMode}
                />
            </div>
            <CoinDescription
                coinData={coinData}
                darkMode={darkMode}
            />
        </main>
    );
}
