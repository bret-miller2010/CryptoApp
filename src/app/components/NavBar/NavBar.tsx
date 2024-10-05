"use client";
import Link from "next/link";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { marketData } = useCrypto();
  const router = useRouter();

  return (
    <main className="text-white">
      <div className="w-screen h-10 bg-[#474792] flex items-center justify-center space-x-28 ">
        <div>Coins</div>
        <div>Exchange</div>
        <div>Volume?</div>
        <div>Total Money</div>
        <div>1st coin</div>
        <div>2nd coin</div>
      </div>
      <div className="flex justify-between mt-3 p-5">
        <div>
          <div className="space-x-10">
            <Link href="/">Home</Link>
            <Link href="/Portfolio">Portfolio</Link>
            <Link href="/Convertor">Convertor</Link>
            <select
              defaultValue="default"
              className="w-32 text-black bg-[#13121a] text-white"
              onChange={(event) => {
                router.push(`/Currency/${event.target.value}`);
                event.target.selectedIndex = 0;
              }}
            >
              <option key="default" value="default" disabled>
                Select a Coin
              </option>
              {marketData.map((coin) => (
                <option key={coin.id} className="text-white" value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-10">
          <input type="text" />
          <div>Currency selection</div>
          <div>Dark mode/light mode</div>
          <div>Account Selection</div>
        </div>
      </div>
    </main>
  );
};

export default NavBar;
