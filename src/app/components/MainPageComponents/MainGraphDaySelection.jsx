import React from "react";
import { secondaryColor, textColor } from "@/app/utils/utility";

const MainGraphDaySelection = ({ setDays, darkMode, isSelected, collapsed }) => {
   return (
      <div className={"flex justify-center items-center text-white"}>
         <button
            onClick={setDays}
            value={1}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(24)} ${collapsed ? "" : "-translate-x-40"}`}>
            24H
         </button>
         <button
            onClick={setDays}
            value={7}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(168)} ${collapsed ? "" : "-translate-x-20"}`}>
            7D
         </button>
         <button
            onClick={setDays}
            value={30}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(30)} ${collapsed ? "" : "-translate-x-0"}`}>
            30D
         </button>
         <button
            onClick={setDays}
            value={180}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(180)} ${collapsed ? "" : "translate-x-20"}`}>
            6M
         </button>
         <button
            onClick={setDays}
            value={365}
            className={`${secondaryColor(darkMode)} ${textColor(darkMode)} rounded-full py-2 w-12 duration-300 absolute ${isSelected(365)} ${collapsed ? "" : "translate-x-40"}`}>
            1Y
         </button>
      </div>
   );
};

export default MainGraphDaySelection;
