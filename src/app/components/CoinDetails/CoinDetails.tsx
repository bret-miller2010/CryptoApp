import PropTypes from "prop-types";
import {
  MainWrapper,
  LeftSection,
  CenterSection,
  RightSection,
} from "./styles";

const CoinDetails = ({ data }) => {
  const coinName = data.name;
  const currentPrice = data.current_price;
  const oneHourChange = (data.price_change_percentage_1h_in_currency).toFixed(2);
  const oneDayChange = (data.price_change_percentage_24h).toFixed(2);
  const sevenDayChange = (data.price_change_percentage_7d_in_currency).toFixed(2);

  return (
    <MainWrapper>
      <LeftSection>
        <div>1</div>
          <img
            style={{
              width: "40px",
            }}
            className=""
            src={data.image}
            alt=""
          />
        <div>{coinName}</div>
      </LeftSection>
      <CenterSection>
        <div>${currentPrice}</div>
        <div>{oneHourChange}</div>
        <div>{oneDayChange}</div>
        <div>{sevenDayChange}</div>
        
      </CenterSection>
      <RightSection>WOOOOOOOOOOOOOOOOOOOOOOOOO</RightSection>
    </MainWrapper>
  );
};

CoinDetails.propTypes = {
  data: PropTypes.object,
};

export default CoinDetails;
