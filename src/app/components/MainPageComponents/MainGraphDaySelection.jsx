/** @format */

"use client";
import { secondaryColor, textColor } from "@/app/utils/utility";

const MainGraphDaySelection = ({ setDays, darkMode, collapsed, selectedDays }) => {
    //When a day is selected for the chart it forces that button to appear ahead of the rest once it collapses.
    const isSelected = (value) => {
        return `${value == selectedDays ? "z-10" : "z-0"}`;
    };
    //Array of buttons that will get mapped through.
    const dayButtonArray = [
        { text: "24H", value: 1, selection: isSelected(24), translate: "-translate-x-40" },
        { text: "7D", value: 7, selection: isSelected(168), translate: "-translate-x-20" },
        { text: "30D", value: 30, selection: isSelected(30), translate: "translate-x-0" },
        { text: "6M", value: 180, selection: isSelected(180), translate: "translate-x-20" },
        { text: "1Y", value: 365, selection: isSelected(365), translate: "translate-x-40" },
    ];

    return (
        <div className="flex justify-center items-center w-[500px] h-[100px]">
            {dayButtonArray.map((ele) => {
                return (
                    <button
                        key={ele.text}
                        onClick={setDays}
                        value={ele.value}
                        className={`${secondaryColor(darkMode)} ${textColor(darkMode)} ${ele.selection} rounded-full py-2 w-12 duration-300 absolute  ${collapsed ? "" : ele.translate}`}>
                        {ele.text}
                    </button>
                );
            })}
        </div>
    );
};

export default MainGraphDaySelection;
