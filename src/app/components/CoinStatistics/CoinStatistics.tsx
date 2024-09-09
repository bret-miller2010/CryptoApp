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

import { MainWrapper, CoinCarousel, MainGraphWrapper } from "./styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinStatistics = () => {
 
  return (
    <MainWrapper>
      <CoinCarousel>This is where the coin selection will go</CoinCarousel>
      <MainGraphWrapper>

      </MainGraphWrapper>
    </MainWrapper>
  );
};

CoinStatistics.propTypes = {
  data: PropTypes.object,
};

export default CoinStatistics;
