"use client";
import { useCrypto } from "../Context/CryptoContext";
import { primaryColor, secondaryColor, textColor } from "../utils/utility";

export default function Settings() {
   const { darkMode, login, currency } = useCrypto();

   return (
      <div className={`flex justify-center h-screen pt-20 duration-300 ${primaryColor(darkMode)}`}>
         <div className={`${secondaryColor(darkMode)} ${textColor(darkMode)} duration-300 rounded-3xl text-center flex justify-center flex-col space-y-10 p-20 h-[500px]`}>
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
