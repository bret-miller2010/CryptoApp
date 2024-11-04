"use client";
import PortfolioCoin from "../components/PortfolioPageComponents/PortfolioCoin";
import { useCrypto } from "../Context/CryptoContext";
import Link from "next/link";

export default function Portfolio() {
  const { login, setLogin, saveUserList, darkMode } = useCrypto();

  const handleRemove = (event) => {
    const coinIDToRemove = event.target.value;
    const newPortfolio = { ...login };
    newPortfolio.portfolio = newPortfolio.portfolio.filter(
      (coin) => coin.id !== coinIDToRemove
    );
    setLogin(newPortfolio);
    saveUserList();
  };

  return (
    <div
      className={`text-white ${darkMode ? "duration-300 bg-black" : "duration-300 bg-[#bfbfbf]"} h-screen`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between px-2.5 mt-10 ">
          <p
            className={`flex justify-center items-center h-[30px] ${darkMode ? "duration-300 bg-[#474792]" : "duration-300 bg-[#5492f7]"} px-10 rounded-full`}
          >
            Your Portfolio
          </p>
          {login && (
            <Link
              className={`flex justify-center items-center h-[30px] ${darkMode ? "duration-300 bg-[#474792]" : "duration-300 bg-[#5492f7]"} px-10 rounded-full`}
              href="/Portfolio/EditAssets"
            >
              Edit Portfolio Data
            </Link>
          )}
          <Link
            className={`flex justify-center items-center h-[30px] ${darkMode ? "duration-300 bg-[#474792]" : "duration-300 bg-[#5492f7]"} px-10 rounded-full`}
            href="/Portfolio/AddAsset"
          >
            Add Asset
          </Link>
        </div>
        <div
          className={`flex items-center flex-col rounded-3xl ${darkMode ? "duration-300 bg-[#181825]" : "duration-300 bg-[#5492f7]"} py-5 space-y-5 mt-5`}
        >
          {!login && (
            <div>
              There is no current user data. Click the add asset button to add.
            </div>
          )}
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
