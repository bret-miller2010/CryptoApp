import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  MainWrapper,
  CoinCarousel,
  MainGraphWrapper,
  CoinWrapper,
  LeftSection,
  MiddleSection,
  RightSection,
} from "./styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinBlock = ({ data }) => {
  const coinName = data.name;
  const currentPrice = Number(data.current_price).toFixed(2);
  const oneDayChange = Number(data.price_change_percentage_24h).toFixed(2);
  const coinImage = data.image;

  return (
    <CoinWrapper>
      <LeftSection>
        <img className="h-10" src={coinImage} alt="" />
      </LeftSection>
      <MiddleSection>
        <div>{coinName}</div>
        <div>{currentPrice}</div>
      </MiddleSection>
      <RightSection>{oneDayChange}</RightSection>
    </CoinWrapper>
  );
};

CoinBlock.propTypes = {
  data: PropTypes.object,
};

const CoinStatistics = ({ data }) => {
  return (
    <MainWrapper>
      <CoinCarousel>
        <CoinBlock data={data} />
      </CoinCarousel>
      <MainGraphWrapper></MainGraphWrapper>
    </MainWrapper>
  );
};

CoinStatistics.propTypes = {
  data: PropTypes.object,
};

export default CoinStatistics;
