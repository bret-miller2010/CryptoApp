import PropTypes from "prop-types";

const DisplayCoinInformation = ({data}) => {
  return <div className ="text-white">{data.id}</div>;
};

export default DisplayCoinInformation;

DisplayCoinInformation.propTypes = {
    data: PropTypes.node,
  };
