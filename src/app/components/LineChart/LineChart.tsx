import { Line } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { secondaryColor } from "@/app/utils/utility";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function CoinDetailsLineChart({ chartData }) {
   if (!chartData) {
      return <div className="text-red-500">No Data.</div>;
   }

   const length = 168;
   const dataForChart = chartData.slice(chartData.length - length);
   const data = {
      labels: Array.from({ length }, (_, index) => index + 1),
      datasets: [
         {
            data: dataForChart.map((data) => data),
            pointRadius: 0,
            borderColor: "#b20101",
         },
      ],
   };

   const options = {
      maintainAspectRatio: false,
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
   };

   return (
      <div className="h-[50px] flex justify-center w-1/3 px-6 py-1">
         <Line
            data={data}
            options={options}
         />
      </div>
   );
}

export function CoinConvertorLineChart({ left, right, numDays }) {
   const leftData = left.sparkline_in_7d.price.slice(-numDays);
   const rightData = right.sparkline_in_7d.price.slice(-numDays);
   const length = numDays;

   const graphObject = {
      labels: Array.from({ length }, (_, index) => index + 1),
      datasets: [
         {
            data: leftData.map((data, index) => data / rightData[index]),
            borderColor: "black",
            borderWidth: 1,
         },
      ],
   };

   return (
      <div className="h-[500px] w-full flex justify-center">
         <Line
            data={graphObject}
            options={{
               plugins: {
                  title: {
                     display: true,
                     text: "Convertion Rate",
                  },
                  legend: {
                     position: "bottom",
                  },
               },
            }}
         />
      </div>
   );
}

export function MainPageLineChart({ data, numDays, type, coin, chartType, darkMode }) {
   const chartData = type === "price" ? data.prices : data.total_volumes;
   const length = numDays;
   const dataForChart = chartData.slice(chartData.length - length);
   const graphObject = {
      labels: Array.from({ length }, (_, index) => index + 1),
      datasets: [
         {
            label: coin,
            data: dataForChart.map((data) => data),
            borderColor: "black",
            borderWidth: 1,
         },
      ],
   };

   return (
      <div className={`h-[500px] w-[1000px] duration-300 rounded-3xl ${secondaryColor(darkMode)} p-5`}>
         <Line
            data={graphObject}
            options={{
               plugins: {
                  title: {
                     display: true,
                     text: chartType,
                  },
                  legend: {
                     position: "bottom",
                  },
               },
            }}
         />
      </div>
   );
}
