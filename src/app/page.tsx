/** @format */

"use client";
import { useState, useEffect } from "react";
import BottomCoinList from "./components/MainPageComponents/BottomCoinList";
import TopCoinlist from "./components/MainPageComponents/TopCoinList";
import BottomCoinListHeader from "./components/MainPageComponents/BottomCoinListHeader";
import MainGraphDaySelection from "./components/MainPageComponents/MainGraphDaySelection";
import { useCrypto } from "@/app/Context/CryptoContext";
import { MainPageLineChart } from "./components/LineChart/LineChart";
import { primaryColor } from "./utils/utility";
import { getDailyPriceFor } from "./api";
import { LeftArrow, RightArrow, UpArrow, DownArrow } from "@/images/icons";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
    const searchParams = useSearchParams();
    const { marketData, darkMode } = useCrypto();
    const [statisticsValue, setStatisticsValue] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedDays, setSelectedDays] = useState("24");
    const [detailsValue, setDetailsValue] = useState(0);
    const [sortedData, setSortedData] = useState([]);
    const [sortType, setSortType] = useState(searchParams.get("order") || true);
    const [graphData, setGraphData] = useState([]);
    const [selectedChart, setSelectedChart] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const [width, setWidth] = useState(0);
    const router = useRouter();

    //Function that loads the initial data based on the query parameters
    const initialLoad = () => {
        if (searchParams.get("sort")) {
            const sort = searchParams.get("sort");
            const order = searchParams.get("order");
            sortBy({ target: { value: sort } });
            setSortType(order);
        } else {
            setSortedData(marketData);
        }
    };

    //Function that changes the display based on what the user wants to sort by
    const sortBy = (key) => {
        const sortKey = key;
        const types = {
            rank: "market_cap_rank",
            one_hour: "price_change_percentage_1h_in_currency",
            one_day: "price_change_24h",
            current_price: "current_price",
            seven_day: "price_change_percentage_7d_in_currency",
            name: "name",
        };

        const sortValue = types[sortKey];
        const sortedArray = marketData.toSorted((a, b) => {
            if (sortValue === "name") {
                if (sortType) {
                    return b[sortValue].localeCompare(a[sortValue]);
                } else {
                    return a[sortValue].localeCompare(b[sortValue]);
                }
            } else {
                if (sortType) {
                    return b[sortValue] - a[sortValue];
                } else {
                    return a[sortValue] - b[sortValue];
                }
            }
        });

        setSortType(!sortType);
        setSortedData(sortedArray);
        router.push(`?sort=${sortKey}&order=${!sortType}`);
    };

    //Sets the number of days that the main page graphs show
    const setDays = (value) => {
        let amountOfDays = Number(value.target.value);
        if (amountOfDays === 1 || amountOfDays === 7) {
            amountOfDays = amountOfDays * 24;
        }
        setSelectedDays(String(amountOfDays));
        setCollapsed(!collapsed);
    };

    const addToGraph = async (id) => {
        setErrorMessage("");
        const coinWanted = id;
        //First check to verify that the coin is not already clicked. If it is then it will remove the coin.
        try {
            if (!selectedChart.includes(coinWanted)) {
                if (selectedChart.length === 2) {
                    //Only allow 2 coins to be selected for this application. Exits the function if trying to add more than 2
                    return;
                }
                const currentCoinData = await getDailyPriceFor(coinWanted, selectedDays);
                currentCoinData.id = coinWanted;
                const newArrayOfCoinData = [...graphData, currentCoinData];
                setGraphData(newArrayOfCoinData);
                const newArrayOfCoins = [...selectedChart, coinWanted];
                setSelectedChart(newArrayOfCoins);
            } else {
                removeFromSelection(coinWanted);
            }
        } catch {
            setErrorMessage("Could not load data for this coin. Please wait and try again later.");
        }
    };

    //Removes coin details from arrays for the main page graph
    const removeFromSelection = (coin) => {
        const newArrayOfCoins = selectedChart.filter((ele) => ele !== coin);
        const newGraphData = graphData.filter((ele) => ele.id !== coin);
        setSelectedChart(newArrayOfCoins);
        setGraphData(newGraphData);
    };
    //Function to catch out of bounds for api coin listing for the bottom list of coins
    const updateDetailsChart = (amount) => {
        if (detailsValue + amount < 0) {
            setDetailsValue(0);
        } else if (detailsValue + amount > 49) {
            setDetailsValue(40);
        } else {
            setDetailsValue(detailsValue + amount);
        }
    };
    //Function to catch out of bounds for api coin listing for the top list of coins
    const updateStatisticsChart = (amount) => {
        if (statisticsValue + amount < 0) {
            setStatisticsValue(0);
        } else if (statisticsValue + amount > 49) {
            setStatisticsValue(45);
        } else {
            setStatisticsValue(statisticsValue + amount);
        }
    };
    //Function to determine how many coins are shown in the top list of coins based on the page width
    const numOfCoinsShown = () => {
        if (width < 1024) {
            return 2;
        } else {
            return 4;
        }
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        initialLoad();
    }, [marketData]);

    useEffect(() => {
        const handleWidthResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWidthResize);
        return () => window.removeEventListener("resize", handleWidthResize);
    });

    return (
        <main className={`h-full w-[640px] lg:w-full duration-300 ${primaryColor(darkMode)}`}>
            <div className="px-40 text-sm">
                <div className="flex items-center flex-col">
                    <div className="relative flex py-8 rounded-3xl w-full items-center mt-52">
                        <div className="duration-300 hover:scale-125 absolute z-50 -left-14">
                            <LeftArrow
                                handleClick={() => updateStatisticsChart(width < 1024 ? -3 : -5)}
                                darkMode={darkMode}
                            />
                        </div>
                        <div className="flex justify-between w-full items-center space-x-5">
                            {marketData
                                .filter((_, index) => index >= statisticsValue && index <= statisticsValue + numOfCoinsShown())
                                .map((coin) => (
                                    <TopCoinlist
                                        key={coin.id}
                                        data={coin}
                                        selected={selectedChart}
                                        handleClick={addToGraph}
                                        darkMode={darkMode}
                                    />
                                ))}
                        </div>
                        <div className="duration-300 hover:scale-125 absolute z-500 -right-14">
                            <RightArrow
                                handleClick={() => updateStatisticsChart(width < 1024 ? 3 : 5)}
                                darkMode={darkMode}
                            />
                        </div>
                    </div>
                    <div className="flex justify-around w-full">
                        <div className="flex w-full flex-col items-center space-y-10">
                            <div className="text-white">{errorMessage}</div>
                            <div className="flex flex-col justify-around w-full 2xl:flex-row space-y-5 2xl:space-y-0 2xl:space-x-5 mt-20">
                                <MainPageLineChart
                                    data={graphData}
                                    numDays={selectedDays}
                                    type={"prices"}
                                    coin={selectedChart}
                                    chartType="Price over time"
                                    darkMode={darkMode}
                                />
                                <MainPageLineChart
                                    data={graphData}
                                    numDays={selectedDays}
                                    type={"total_volumes"}
                                    coin={selectedChart}
                                    chartType="Volume over time"
                                    darkMode={darkMode}
                                />
                            </div>
                            <div className="h-[150px] w-[500px]">
                                {!(selectedChart.length === 0) && (
                                    <MainGraphDaySelection
                                        setDays={setDays}
                                        collapsed={collapsed}
                                        darkMode={darkMode}
                                        selectedDays={selectedDays}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-10 space-x-10">
                    <div className="duration-300 hover:scale-125">
                        <UpArrow
                            handleClick={() => updateDetailsChart(-10)}
                            darkMode={darkMode}
                        />
                    </div>

                    <div className="duration-300 hover:scale-125">
                        <DownArrow
                            handleClick={() => updateDetailsChart(10)}
                            darkMode={darkMode}
                        />
                    </div>
                </div>
                <BottomCoinListHeader
                    darkMode={darkMode}
                    sortBy={sortBy}
                />
                <div className="mt-4 space-y-2 flex justify-center items-center flex-col w-full text-[8px] lg:text-base">
                    {sortedData
                        .filter((_, index) => index >= detailsValue && index <= detailsValue + 9)
                        .map((coin) => (
                            <BottomCoinList
                                key={coin.id}
                                data={coin}
                                spot={coin.market_cap_rank}
                                darkMode={darkMode}
                                width={width}
                            />
                        ))}
                </div>
            </div>
        </main>
    );
}
