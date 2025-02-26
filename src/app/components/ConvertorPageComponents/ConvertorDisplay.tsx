/** @format */

import { secondaryColor, textColor } from "@/app/utils/utility";
import { useState } from "react";

type ConvertorDisplayProps = {
    darkMode: boolean;
    sellSide: any;
    buySide: any;
};

type UpdateEvent = React.ChangeEvent<HTMLInputElement>;

const ConvertorDisplay = ({ darkMode, sellSide, buySide }: ConvertorDisplayProps) => {
    const [sellAmount, setSellAmount] = useState(0);
    const [buyAmount, setBuyAmount] = useState(0);

    if (!sellSide || !buySide) {
        return (
            <div className={`${textColor(darkMode)} text-center mt-5`}>
                Select a currency you wish to sell and what you would like to convert it to. <br />
                Note: This will not actually convert your currencies
            </div>
        );
    }

    const handleUpdate = (event: UpdateEvent) => {
        const newValue = Number(event.target.value);
        const totalValue = sellSide.current_price * newValue;
        setSellAmount(newValue);
        setBuyAmount(totalValue / buySide.current_price);
    };

    return (
        <div className="flex flex-col gap-5 mt-5 min-[600px]:flex-row">
            <div className={`rounded-3xl w-52 p-5 min-[800px]:w-60 min-[1100px]:w-72 ${secondaryColor(darkMode)} ${textColor(darkMode)}`}>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div>
                            {sellSide.name.toUpperCase()} ({sellSide.symbol.toUpperCase()})
                        </div>
                        <input
                            onChange={handleUpdate}
                            className="w-24 text-black border-2 border-black text-right pr-1 rounded-md"
                            value={sellAmount}
                            type="text"
                        />
                    </div>
                    <div className="text-center">
                        1 {sellSide.symbol.toUpperCase()} = ${sellSide.current_price}
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className={`py-5 space-y-2 rounded-3xl w-52 p-5 min-[800px]:w-60 min-[1100px]:w-72 ${secondaryColor(darkMode)} ${textColor(darkMode)}`}>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <div>
                                {buySide.name.toUpperCase()} ({buySide.symbol.toUpperCase()})
                            </div>
                            <div>{buyAmount.toFixed(3)}</div>
                        </div>
                        <div className="text-center">
                            1 {buySide.symbol.toUpperCase()} = ${buySide.current_price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConvertorDisplay;
