"use client";
import Image from "next/image";

const BasicCoinInformation = ({ coinData, currency }) => {
  const coinName = coinData.name;
  const currentPrice = coinData.market_data.current_price[currency];
  const changeIn24 =
    coinData.market_data.price_change_percentage_24h.toFixed(2);
  const allTimeHigh = coinData.market_data.ath[currency];
  const allTimeLow = coinData.market_data.atl[currency];
  const symbol = coinData.symbol.toUpperCase();
  const coinImage = coinData.image.small;
  const link = coinData.links.homepage[0];

  const pickColor = (value) => {
    if (value > 0) return "text-green-500";
    else return "text-red-500";
  };
  return (
    <div className="text-white flex space-x-4 justify-center">
      <div className="space-y-5">
        <div className="flex flex-col items-center justify-center w-[300px] h-[300px] bg-[#1e1932] space-y-5 rounded-lg">
          <div className="bg-[#2c2c4a] p-3 rounded-lg">
            <Image src={coinImage} width={40} height={40} alt="coin image" />
          </div>

          <div className="text-4xl">
            {coinName} ({symbol})
          </div>
        </div>
        <div className="flex justify-center items-center bg-[#1e1932] w-[300px] h-[50px] rounded-lg">
          {link}
        </div>
      </div>
      <div className="w-[300px] h-[370px] bg-[#1e1932] flex justify-center items-center flex-col rounded-lg">
        <div className="flex space-x-3">
          <div className={pickColor(changeIn24)}>${currentPrice}</div>
          <div className={pickColor(changeIn24)}>{changeIn24}%</div>
        </div>
        <div>Profit: Some Value</div>
        <div className="text-green-500">All Time High: ${allTimeHigh}</div>
        <div className="text-red-500">All Time Low: ${allTimeLow}</div>
      </div>
    </div>
  );
};

export default BasicCoinInformation;
