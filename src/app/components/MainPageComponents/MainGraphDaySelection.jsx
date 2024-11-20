"use client";
import { secondaryColor, textColor } from "@/app/utils/utility";

const MainGraphDaySelection = ({ setDays, darkMode, collapsed, selectedDays }) => {
   //When a day is selected for the chart it forces that button to appear ahead of the rest once it collapses.
   const isSelected = (value) => {
      return `${value == selectedDays ? "z-10" : "z-0"}`;
   };
   return (
      <div className="flex justify-center items-center w-[500px] h-[100px]">
         <button
            onClick={setDays}
            value={1}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} ${isSelected(24)} rounded-full py-2 w-12 duration-300 absolute  ${collapsed ? "" : "-translate-x-40"}`}>
            24H
         </button>
         <button
            onClick={setDays}
            value={7}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} ${isSelected(168)} rounded-full py-2 w-12 duration-300 absolute  ${collapsed ? "" : "-translate-x-20"}`}>
            7D
         </button>
         <button
            onClick={setDays}
            value={30}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} ${isSelected(30)} rounded-full py-2 w-12 duration-300 absolute  ${collapsed ? "" : "-translate-x-0"}`}>
            30D
         </button>
         <button
            onClick={setDays}
            value={180}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} ${isSelected(180)} rounded-full py-2 w-12 duration-300 absolute  ${collapsed ? "" : "translate-x-20"}`}>
            6M
         </button>
         <button
            onClick={setDays}
            value={365}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} ${isSelected(365)} rounded-full py-2 w-12 duration-300 absolute  ${collapsed ? "" : "translate-x-40"}`}>
            1Y
         </button>
      </div>
   );
};

export default MainGraphDaySelection;
