"use client";
import { useState, useEffect } from "react";

export default function Compare() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth();
    const day = current.getDate();
    const hours = current.getHours();
    const minutes = current.getMinutes();
    setCurrentDate(`${month + 1}/${day}/${year} | ${hours}:${minutes}`);
  }, []);

  return (
    <div className="text-white mx-[15px]">
      <div className="flex flex-col mt-5">
        <div>Online currency convertor</div>
        <div>{currentDate}</div>

        <div className="flex justify-center my-5">
          <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] mr-5">You sell</div>
          <div className="w-5/12 h-[150px] rounded-3xl p-5 bg-[#181825] ml-5">You Buy</div>
        </div>
        <div className="flex justify-center items-center h-[500px] rounded-3xl bg-[#181825]">
          Graph for value
        </div>
        <div className="flex w-[400px] space-x-10 justify-center items-center mt-5 rounded-3xl p-2 bg-[#181825]">
          <button>1D</button>
          <button>7D</button>
          <button>14D</button>
          <button>1M</button>
          <button>1Y</button>
          <button>5Y</button>
        </div>
      </div>
    </div>
  );
}
