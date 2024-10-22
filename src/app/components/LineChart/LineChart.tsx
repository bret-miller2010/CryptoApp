import { Line } from "react-chartjs-2";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ chartData, numDays, title = "" }) {
  if (!chartData) {
    return <div className="text-red-500">No data available.</div>;
  }

  const length = numDays;
  const dataForChart = chartData.slice(chartData.length - numDays);
  const graphObject = {
    labels: Array.from({ length }, (_, index) => index + 1),
    datasets: [
      {
        label: `${title} price over ${numDays} day(s)`,
        data: dataForChart.map((price) => price[1]),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line
        data={graphObject}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Bitcoin price over ${length} days`,
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

export default LineChart;
