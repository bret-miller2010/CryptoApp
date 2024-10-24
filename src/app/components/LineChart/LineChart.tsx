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

export default function CoinDetailsLineChart({ chartData }) {
  if (!chartData) {
    return <div className="text-red-500">No Data.</div>;
  }

  const length = 7;
  const dataForChart = chartData.slice(chartData.length - length);
  const graphObject = {
    labels: Array.from({ length }, (_, index) => index + 1),
    datasets: [
      {
        data: dataForChart.map((data) => data),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-[70px] flex justify-center w-1/3">
      <Line
        data={graphObject}
        options={{
          scales: {
            y: {
              display: false,
            },
            x: {
              display: false,
            },
          },
          responsive: true,
          plugins: {
            title: {
              display: false,
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
