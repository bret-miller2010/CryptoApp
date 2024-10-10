import Image from "next/image";

const CoinStatistics = ({ data }) => {
  const coinName = data.name;
  const symbol = data.symbol;
  const currentPrice = Number(data.current_price).toFixed(2);
  const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
  const coinImage = data.image;

  return (
    <div className="h-[100px] flex justify-between items-center text-white bg-black mr-2 rounded-3xl px-2">
      <div className="flex justify-center w-14">
        <Image src={coinImage} width={40} height={40} alt="coin image" />
      </div>
      <div className="w-28 text-center">
        <div>
          {coinName} ({symbol})
        </div>
        <div>{currentPrice}</div>
        <button value={data.id}>Click me</button>
      </div>
      <div className="text-center w-14">{oneDayChange}</div>
    </div>
  );
};

export default CoinStatistics;