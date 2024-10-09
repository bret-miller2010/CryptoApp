const CoinMarketInformation = ({ coin }) => {
  const marketCap = addCommas(coin.market_cap, 0, true);
  const fullyDilutedValuation = addCommas(
    coin.fully_diluted_valuation,
    0,
    true
  );
  const volume = addCommas(coin.total_volume, 0, true);
  const circulatingSupply = addCommas(coin.circulating_supply, 0, true);
  const maxSupply = addCommas(coin.total_supply, 0, true);
  const volumeThatDay = addCommas(coin.market_cap_change_24h, 0, true);
  const volumePerMarket = (coin.total_volume / coin.market_cap).toFixed(5);
  const percentVPM = (coin.total_volume / coin.market_cap) * 100;
  const symbol = coin.symbol.toUpperCase();

  function addCommas(number, num_decimals, include_comma) {
    return number.toLocaleString("en-US", {
      useGrouping: include_comma,
      minimumFractionDigits: num_decimals,
      maximumFractionDigits: num_decimals,
    });
  }

  return (
    <div className="text-white flex w-[500px] bg-[#1e1932] rounded-lg flex-col h-[370px] justify-center items-center text-sm">
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
              <div>{volumePerMarket}</div>
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
            className="h-[15px] bg-white"
            style={{
              width: `${percentVPM}px`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CoinMarketInformation;
