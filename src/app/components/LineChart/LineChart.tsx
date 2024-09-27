import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

function LineChart({ chartData, numDays }) {
  const length = numDays;
  const dataForChart = chartData.slice(151, 180);
  const graphObject = {
    labels: Array.from({ length }, (_, index) => index + 1),
    datasets: [
      {
        label: "Bitcoin Price",
        data: dataForChart.map((price) => price[1]),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={graphObject}
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
    </div>
  );
}

LineChart.propTypes = {
  chartData: PropTypes.node,
  numDays: PropTypes.number,
};
export default LineChart;
