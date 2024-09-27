import PropTypes from "prop-types";

const ConvertorDisplay = ({ symbol, price }) => {
  return (
    <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] flex justify-center items-center flex-col">
      <div>
        <div>
          {symbol && (
            <div>
              {" "}
              1 {symbol} = ${price}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ConvertorDisplay.propTypes = {
  symbol: PropTypes.node,
  price: PropTypes.node,
};

export default ConvertorDisplay;