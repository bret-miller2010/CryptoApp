import PropTypes from "prop-types";

const ConvertorSelection = ({ marketData, setSide }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>Currency to Sell</div>
      <select onChange={setSide} className="w-32 text-black" name="" id="">
        <option key="default" value="default" disabled selected>
          Select Coin
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

ConvertorSelection.propTypes = {
  marketData: PropTypes.node,
  setSide: PropTypes.func,
};

export default ConvertorSelection;
