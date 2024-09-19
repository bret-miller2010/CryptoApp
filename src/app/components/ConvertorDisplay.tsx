import PropTypes from "prop-types";

const ConvertorDisplay = ({ symbol, price, sidePicked }) => {
  return (
    <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] flex justify-center items-center flex-col">
      <div>
        <div>
          {sidePicked && (
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
  sidePicked: PropTypes.node,
};

export default ConvertorDisplay;
