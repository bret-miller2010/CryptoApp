/** @format */

"use client";
import { useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import EditAssetComponent from "@/app/components/PortfolioPageComponents/EditAssetComponent";
import { primaryColor, textColor } from "@/app/utils/utility";

const EditAssets = () => {
    const { darkMode, userAssetData } = useCrypto();
    const [pulledCoin, setPulledCoin] = useState();

    const handleSelect = (event) => {
        const selectedID = event.target.value;
        const pickedCoin = userAssetData.find((coin) => coin.id === selectedID);
        setPulledCoin(pickedCoin);
    };

    return (
        <div className={`flex ${primaryColor(darkMode)} ${textColor(darkMode)} items-center flex-col w-full h-screen pt-40`}>
            <div className="mb-3">Use the drop down to select the asset you wish to edit. Changes will only be reflected once saved.</div>
            <select
                defaultValue="default"
                className="w-36 text-black text-center mb-5"
                onChange={handleSelect}
                name="Select2"
                id="Select3">
                <option
                    key="default"
                    value="default"
                    disabled>
                    Select an asset
                </option>
                {userAssetData &&
                    userAssetData.map((coin) => (
                        <option
                            key={coin.id}
                            className="text-black"
                            value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
            </select>

            {pulledCoin && <EditAssetComponent data={pulledCoin} />}
        </div>
    );
};

export default EditAssets;
