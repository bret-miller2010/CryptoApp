import { MainWrapper, GraphWrapper, CoinCarousel, MainGraphWrapper } from "./styles";

const CoinStatistics = () => {
  return (
    <MainWrapper>
      <CoinCarousel>This is where the coin selection will go</CoinCarousel>
      <MainGraphWrapper>
        <GraphWrapper>Graph 1</GraphWrapper>
        <GraphWrapper>Graph 2</GraphWrapper>
      </MainGraphWrapper>
    </MainWrapper>
  );
};

export default CoinStatistics;
