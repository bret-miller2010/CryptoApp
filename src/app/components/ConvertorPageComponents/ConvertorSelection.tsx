const ConvertorSelection = ({ marketData, setSide }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>Currency to Sell</div>
      <select
        defaultValue="default"
        onChange={setSide}
        className="w-32 text-black"
      >
        <option key="default" value="default" disabled>
          Select a Coin
        </option>
        {marketData.map((coin) => (
          <option key={coin.id} className="text-black" value={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConvertorSelection;
