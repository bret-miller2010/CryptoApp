"use client";
import PortfolioCoin from "../components/PortfolioPageComponents/PortfolioCoin";
import { useCrypto } from "../Context/CryptoContext";
import Link from "next/link";

export default function Portfolio() {
  const { login } = useCrypto();

  return (
    <div className="text-white mx-[15px]">
      <div className="flex flex-col mt-5">
        <div className="flex justify-between px-2.5 mt-10">
          <p>Your Statistics</p>
          <Link
            className="flex justify-center items-center h-[30px] bg-[#3a3978] px-10 rounded-md"
            href="/Portfolio/AddAsset"
          >
            Add Asset
          </Link>
        </div>
        <div className="flex items-center flex-col rounded-3xl bg-[#181825] py-5 space-y-5 mt-5">
          {!login && (
            <div>
              There is no current user data. Click the add asset button to add.
            </div>
          )}
          {login &&
            login.portfolio.map((coin) => {
              return <PortfolioCoin key={coin.id} data={coin} />;
            })}
        </div>
      </div>
    </div>
  );
}
