import PropTypes from "prop-types";

const CoinDetails = ({data}) => {

  return <div>{data.id}</div>;
};

CoinDetails.propTypes = {
  data: PropTypes.object,
};

export default CoinDetails;
