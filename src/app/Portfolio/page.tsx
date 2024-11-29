"use client";
import { useEffect } from "react";
import PortfolioCoin from "../components/PortfolioPageComponents/PortfolioCoin";
import { useRouter } from "next/navigation";
import { useCrypto } from "../Context/CryptoContext";
import { primaryColor, secondaryColor, textColor } from "../utils/utility.jsx";
import Link from "next/link";

export default function Portfolio() {
   const { login, setLogin, saveUserList, darkMode } = useCrypto();
   const Router = useRouter();

   const handleRemove = (event) => {
      const coinIDToRemove = event.target.value;
      const newPortfolio = { ...login };
      newPortfolio.portfolio = newPortfolio.portfolio.filter((coin) => coin.id !== coinIDToRemove);
      setLogin(newPortfolio);
      saveUserList();
   };

   useEffect(() => {
      if (!login) {
         Router.push("/login");
      }
   });

   return (
      <div className={`${textColor(darkMode)} w-[640px] md:w-screen duration-300 ${primaryColor(darkMode)} h-screen`}>
         <div className="flex flex-col">
            <div className="flex justify-between px-2.5 mt-10 ">
               <p className={`flex justify-center items-center h-[30px] ${secondaryColor(darkMode)} px-10 rounded-full`}>Your Portfolio</p>
               {login && (
                  <Link
                     className={`flex justify-center items-center h-[30px] ${secondaryColor(darkMode)} px-10 rounded-full`}
                     href="/Portfolio/EditAssets">
                     Edit Portfolio Data
                  </Link>
               )}
               <Link
                  className={`flex justify-center items-center h-[30px] ${secondaryColor(darkMode)} px-10 rounded-full`}
                  href="/Portfolio/AddAsset">
                  Add Asset
               </Link>
            </div>
            <div className={`flex items-center flex-col rounded-3xl ${secondaryColor(darkMode)} py-5 space-y-5 mt-5`}>
               {!login && <div>There is no current user data. Click the add asset button to add.</div>}
               {login &&
                  login.portfolio.map((coin) => {
                     return (
                        <PortfolioCoin
                           handleRemove={handleRemove}
                           key={coin.id}
                           data={coin}
                        />
                     );
                  })}
            </div>
         </div>
      </div>
   );
}
