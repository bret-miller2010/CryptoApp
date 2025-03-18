/** @format */

"use client";
import { addCommas, secondaryColor } from "../../utils/utility";
import PercentVolumeBar from "./PercentVolumeBar";

const CoinMarketInformation = ({ coin, coinData, currency, darkMode }) => {
    if (!coinData) {
        return null;
    }

    const { market_data: data } = coinData;
    const marketCap = addCommas(data.market_cap[currency], 0, true);
    const fullyDilutedValuation = addCommas(data.fully_diluted_valuation[currency], 0, true);
    const volume = addCommas(data.total_volume[currency], 0, true);
    const circulatingSupply = addCommas(data.circulating_supply, 0, true);
    const maxSupply = addCommas(data.total_supply, 0, true);
    const volumeThatDay = addCommas(data.market_cap_change_24h, 0, true);
    const percentVPM = (data.total_volume[currency] / data.market_cap[currency]) * 100;
    const symbol = coin.symbol.toUpperCase();

    return (
        <div className="text-white flex duration-300 rounded-lg flex-col text-[14px] w-full p-5 justify-center items-center">
            <div className="flex flex-col w-full">
                <div className={`flex justify-around ${secondaryColor(darkMode)} gap-10 p-5 rounded-xl w-full`}>
                    <div className="space-y-3">
                        <div>
                            <div>Market Cap</div>
                            <div>Fully Diluted Valuation</div>
                            <div>Volume 24h</div>
                            <div>Volume/Market</div>
                        </div>
                        <div>
                            <div>Total Volume</div>
                            <div>Circulating Supply</div>
                            <div>Max Supply</div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div>${marketCap}</div>
                            <div>${fullyDilutedValuation}</div>
                            <div>${volumeThatDay}</div>
                            <div>{percentVPM.toFixed(2)}%</div>
                        </div>
                        <div>
                            <div>
                                {volume} {symbol}
                            </div>
                            <div>
                                {circulatingSupply} {symbol}
                            </div>
                            <div>
                                {maxSupply} {symbol}
                            </div>
                        </div>
                    </div>
                </div>
                <PercentVolumeBar percentVPM={percentVPM} />
            </div>
        </div>
    );
};

export default CoinMarketInformation;
