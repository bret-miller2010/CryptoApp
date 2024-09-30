import PropTypes from "prop-types";

const PortfolioCoin = ({data}) => {
  return <div>{data.coin}</div>;
};

export default PortfolioCoin;

PortfolioCoin.propTypes = {
  data: PropTypes.node,
};
