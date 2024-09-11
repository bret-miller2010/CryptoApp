import PropTypes from "prop-types";
import {
  MainWrapper,
  LeftSection,
  CenterSection,
  RightSection,
} from "./styles";

const CoinDetails = ({ data, spot }) => {

  const coinName = data.name;
  const currentPrice = Number(data.current_price).toFixed(2);
  const oneHourChange = Number(data.price_change_percentage_1h_in_currency).toFixed(2);
  const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
  const sevenDayChange = Number(data.price_change_percentage_7d_in_currency).toFixed(2);
  const coinImage = data.image;

  return (
    <MainWrapper>
      <LeftSection>
        <div>{spot + 1}</div>
          <img
            style={{
              width: "40px",
            }}
            className=""
            src={coinImage}
            alt=""
          />
        <div>{coinName}</div>
      </LeftSection>
      <CenterSection>
        <div>${currentPrice}</div>
        <div>{oneHourChange}%</div>
        <div>{oneDayChange}%</div>
        <div>{sevenDayChange}%</div>

      </CenterSection>
      <RightSection>
        <div>24h Volume</div>
        <div>Circulating/Total Supply</div>
        <div>Graph</div>
      </RightSection>
    </MainWrapper>
  );
};

CoinDetails.propTypes = {
  data: PropTypes.object,
  spot: PropTypes.number,
  index: PropTypes.number,
};

export default CoinDetails;
