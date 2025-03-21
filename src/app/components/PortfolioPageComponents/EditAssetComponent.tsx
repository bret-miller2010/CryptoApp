/** @format */

import { useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import { secondaryColor } from "@/app/utils/utility";
import { useRouter } from "next/navigation";

const EditAssetComponent = ({ data }) => {
    const { darkMode, userAssetData, saveUserData } = useCrypto();
    const [amountOfCoins, setAmountOfCoins] = useState(data.total_coins);
    const [valueOfCoins, setValueOfCoins] = useState(data.initial_value);
    const router = useRouter();

    const handleEdit = () => {
        const newPortfolio = [...userAssetData];
        const coinData = {
            name: data.name,
            total_coins: amountOfCoins,
            initial_value: valueOfCoins,
            id: data.id,
            coinID: data.coinID,
        };
        const spot = userAssetData.findIndex((coin) => coin.id === coinData.id);
        newPortfolio[spot] = coinData;
        saveUserData(newPortfolio);
        router.push("/Portfolio");
    };

    return (
        <div className={`flex flex-col ${secondaryColor(darkMode)} justify-center items-center h-[300px] w-[600px] rounded-3xl`}>
            <div>Use the fields below to edit your assets data.</div>
            <div className="flex w-3/4 justify-around mt-10">
                <div className="space-y-1">
                    <div>Coin Name:</div>
                    <div>Amount of Coins:</div>
                    <div>Initial Average Price:</div>
                </div>
                <div className="flex flex-col space-y-1 items-end">
                    <div>{data.name}</div>
                    <input
                        onChange={(e) => setAmountOfCoins(e.target.value)}
                        className="w-20 text-right text-black"
                        type="number"
                        value={amountOfCoins}
                    />
                    <input
                        onChange={(e) => setValueOfCoins(e.target.value)}
                        className="w-20 text-right text-black"
                        type="number"
                        value={valueOfCoins}
                    />
                </div>
            </div>
            <button
                onClick={handleEdit}
                className="flex justify-center items-center h-[30px] bg-[#181825] mt-5 px-10 rounded-md text-white">
                Submit
            </button>
        </div>
    );
};

export default EditAssetComponent;
