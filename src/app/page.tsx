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
    const [graphData, setGraphData] = useState<any>([]);
    const [selectedChart, setSelectedChart] = useState<string[]>([]);
    const [collapsed, setCollapsed] = useState(true);
    const [width, setWidth] = useState(0);
    const router = useRouter();

    //Function that loads the initial data based on the query parameters
    const initialLoad = () => {
        if (searchParams.get("sort")) {
            const sort = searchParams.get("sort");
            const order = searchParams.get("order") ?? "asc";
            sortBy(sort as SortType);
            setSortType(order);
        } else {
            setSortedData(marketData);
        }
    };

    type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
    type SortType = "rank" | "one_hour" | "one_day" | "current_price" | "seven_day" | "name";
    //Function that changes the display based on what the user wants to sort by

    const sortBy = (key: SortType): void => {
        const sortKey: SortType = key;
        const types = {
            rank: "market_cap_rank",
            one_hour: "price_change_percentage_1h_in_currency",
            one_day: "price_change_24h",
            current_price: "current_price",
            seven_day: "price_change_percentage_7d_in_currency",
            name: "name",
        };

        const sortValue = types[sortKey];
        const sortedArray = marketData.toSorted((a: any, b: any) => {
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
    const setDays = (value: ButtonEvent): void => {
        if (value.target === null) return;
        let amountOfDays = Number(value.currentTarget.value);
        if (amountOfDays === 1 || amountOfDays === 7) {
            amountOfDays = amountOfDays * 24;
        }
        setSelectedDays(String(amountOfDays));
        setCollapsed(!collapsed);
    };

    const addToGraph = async (id: string) => {
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
    const removeFromSelection = (coin: string): void => {
        const newArrayOfCoins = selectedChart.filter((ele) => ele !== coin);
        const newGraphData = graphData.filter((ele: any) => ele.id !== coin);
        setSelectedChart(newArrayOfCoins);
        setGraphData(newGraphData);
    };
    //Function to catch out of bounds for api coin listing for the bottom list of coins
    const updateDetailsChart = (amount: number): void => {
        if (detailsValue + amount < 0) {
            setDetailsValue(0);
        } else if (detailsValue + amount > 49) {
            setDetailsValue(40);
        } else {
            setDetailsValue(detailsValue + amount);
        }
    };
    //Function to catch out of bounds for api coin listing for the top list of coins
    const updateStatisticsChart = (amount: number): void => {
        if (statisticsValue + amount < 0) {
            setStatisticsValue(0);
        } else if (statisticsValue + amount > 49) {
            setStatisticsValue(45);
        } else {
            setStatisticsValue(statisticsValue + amount);
        }
    };
    //Function to determine how many coins are shown in the top list of coins based on the page width
    const numOfCoinsShown = (): number => {
        if (width >= 1250) {
            return 4;
        } else if (width < 1250 && width >= 800) {
            return 3;
        } else if (width < 800 && width >= 650) {
            return 2;
        } else if (width < 650 && width >= 450) {
            return 1;
        } else {
            return 0;
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
        <main className={`h-full w-screen flex justify-center duration-300 ${primaryColor(darkMode)}`}>
            <div className="w-screen">
                <div className="flex items-center flex-col w-full">
                    <div className="relative flex py-8 rounded-3xl w-full items-center mt-12">
                        <div className="flex justify-around w-full items-center">
                            <LeftArrow
                                handleClick={() => updateStatisticsChart((numOfCoinsShown() + 1) * -1)}
                                darkMode={darkMode}
                            />

                            {marketData
                                .filter((_: any, index: number) => index >= statisticsValue && index <= statisticsValue + numOfCoinsShown())
                                .map((coin: any) => (
                                    <TopCoinlist
                                        key={coin.id}
                                        data={coin}
                                        selected={selectedChart}
                                        handleClick={addToGraph}
                                        darkMode={darkMode}
                                    />
                                ))}

                            <RightArrow
                                handleClick={() => updateStatisticsChart(numOfCoinsShown() + 1)}
                                darkMode={darkMode}
                            />
                        </div>
                    </div>
                    <div className="flex w-screen flex-col items-center mb-3">
                        <div className="text-white">{errorMessage}</div>
                        <div className="flex flex-col justify-around min-[1000px]:flex-row min-[1000px]:space-y-0 min-[1000px]:space-x-5 items-center w-screen space-y-5 mt-20 px-10">
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
                        <div className="h-[75px]">
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
                <div className="flex justify-center items-center space-x-10">
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

                <div className="space-y-2 flex flex-col w-full text-[7px] min-[800px]:items-center px-2 mb-[100px]">
                    <BottomCoinListHeader
                        darkMode={darkMode}
                        sortBy={sortBy}
                    />
                    {sortedData
                        .filter((_, index) => index >= detailsValue && index <= detailsValue + 9)
                        .map((coin: any) => (
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
