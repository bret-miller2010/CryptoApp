import { useState } from "react";

const ToggleDarkMode = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="w-[100px] h-[30px] flex justify-center items-center bg-white rounded-full">
      <button
        className={`w-[50px] h-[25px] rounded-full ${toggle ? "duration-300 translate-x-5 bg-[#474792]" : "duration-300 -translate-x-5 bg-blue-500"}`}
        onClick={() => setToggle(!toggle)}
      ></button>
    </div>
  );
};

export default ToggleDarkMode;
