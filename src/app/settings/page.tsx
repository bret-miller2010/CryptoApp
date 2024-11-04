"use client";
import { useCrypto } from "../Context/CryptoContext";

export default function Settings() {
  const { darkMode, login, currency } = useCrypto();

  return (
    <div
      className={`flex justify-center h-screen pt-20 ${darkMode ? "duration-300 bg-black" : "duration-300 bg-[#bfbfbf]"}`}
    >
      <div className="text-white bg-[#3a3978] rounded-3xl text-center flex justify-center flex-col space-y-10 p-20 h-[500px]">
        <div>Username: {login?.username || "None"}</div>
        <div>Password: *********</div>
        <div>Account Number: {login?.id || "ERR"}</div>
        <div>Dark Mode: {darkMode ? "Enabled" : "Disabled"}</div>
        <div>Default Currency: {currency.toUpperCase()}</div>
        <div>Portfolio Value: $$$</div>
      </div>
    </div>
  );
}
