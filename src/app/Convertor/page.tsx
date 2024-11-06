"use client";
import { useState, useEffect } from "react";
import { useCrypto } from "../Context/CryptoContext";
import Container from "../components/ConvertorPageComponents/ConvertorContainer";
import { primaryColor } from "../utils/utility";

export default function Convertor() {
  const [currentDate, setCurrentDate] = useState("");
  const { darkMode } = useCrypto();

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
    <div
      className={`text-white h-screen duration-300 ${primaryColor(darkMode)}`}
    >
      <div className="flex flex-col p-5">
        <div>Online currency convertor</div>
        <div>{currentDate}</div>
        <Container />
      </div>
    </div>
  );
}
