/** @format */

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { secondaryColor, textColor } from "@/app/utils/utility";

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

export function CoinConvertorLineChart({ left, right, numDays, darkMode }) {
    if (!left || !right) {
        return <div className="h-[300px] w-screen min-[850px]:w-[800px] min-[1100px]:w-3/4 min-[1100px]:h-[400px] flex justify-center items-center p-5 rounded-3xl">Select data from above to view conversion rates for the two coins.</div>;
    }

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
        <div className={`h-[300px] w-full min-[850px]:w-[800px] min-[1100px]:w-3/4 min-[1100px]:h-[400px] flex justify-center ${secondaryColor(darkMode)} p-5 rounded-3xl`}>
            <Line
                data={graphObject}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Convertion Rate",
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

type MainPageLineChartProps = {
    data: any[];
    numDays: string;
    type: string;
    coin: string[];
    chartType: string;
    darkMode: boolean;
};

export function MainPageLineChart({ data, numDays, type, coin, chartType, darkMode }: MainPageLineChartProps) {
    const length = Number(numDays);
    if (data.length === 0) {
        return (
            <div className={`flex justify-center min-[1000px]:w-5/12 w-full text-[10px] items-center h-[400px] duration-300 rounded-3xl ${textColor(darkMode)} ${secondaryColor(darkMode)} p-5`}>
                Please select coin data from above.
            </div>
        );
    }

    function createGraphSets(data) {
        const newData = data.map((dataset, index) => {
            dataset = {
                label: coin,
                data: dataset[type].slice(data.length - length - 1),
                borderColor: index === 0 ? "black" : "red",
                pointRadius: 0,
            };
            return dataset;
        });
        return newData;
    }
    //Converts the information from data into datasets for the chart
    const chartData = createGraphSets(data);

    const graphObject = {
        labels: Array.from({ length }, (_, index) => index + 1),
        datasets: chartData,
    };

    return (
        <div className={`min-[1000px]:w-5/12 w-full h-[400px] duration-300 rounded-3xl ${secondaryColor(darkMode)} p-2`}>
            <Line
                data={graphObject}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: chartType,
                            padding: 0,
                        },
                        legend: {
                            position: "bottom",
                            labels: {
                                padding: 0,
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
