import { Line } from "react-chartjs-2";
import { MainWrapper } from "./styles";
import PropTypes from "prop-types";

function LineChart({ chartData }) {
  return (
    <MainWrapper className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </MainWrapper>
  );
}

LineChart.propTypes = {
  chartData: PropTypes.object,
};
export default LineChart;
