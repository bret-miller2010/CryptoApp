"use client";
import { addCommas } from "../../utils/utility";

const CoinMarketInformation = ({
  coin,
  coinData: { market_data: data },
  currency,
  darkMode
}) => {
  const marketCap = addCommas(data.market_cap[currency], 0, true);
  const fullyDilutedValuation = addCommas(
    data.fully_diluted_valuation[currency],
    0,
    true
  );
  const volume = addCommas(data.total_volume[currency], 0, true);
  const circulatingSupply = addCommas(data.circulating_supply, 0, true);
  const maxSupply = addCommas(data.total_supply, 0, true);
  const volumeThatDay = addCommas(data.market_cap_change_24h, 0, true);
  const percentVPM =
    (data.total_volume[currency] / data.market_cap[currency]) * 100;
  const symbol = coin.symbol.toUpperCase();

  return (
    <div className={`text-white flex w-[500px] ${darkMode ? "duration-300 bg-[#1e1932]" : "duration-300 bg-[#5492f7]"} rounded-lg flex-col h-[370px] justify-center items-center text-sm`}>
      <div className="flex w-[350px]">
        <div className="flex justify-between w-full">
          <div className="space-y-6">
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
        </div>
        <div className="flex justify-between w-full">
          <div className="space-y-6">
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
      </div>
      <div className="flex justify-center mt-12 flex-col">
        <div className="flex justify-between text-xs mb-1">
          <div>{percentVPM.toFixed(2)}%</div>
          <div>{(100 - percentVPM).toFixed(2)}%</div>
        </div>
        <div className="w-[350px] h-[15px] bg-[#f8d2a6]">
          <div
            className={"h-[15px] bg-red-500"}
            style={{
              width: `${percentVPM}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CoinMarketInformation;
