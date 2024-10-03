"use client";
import { useCrypto } from "@/app/Context/CryptoContext";
import { useEffect, useState } from "react";

export default function CoinInformation({
  params,
}: {
  params: { crypto: string };
}) {
  const { marketData } = useCrypto();
  const [selectedCoin, setSelectedCoin] = useState(Object);

  const collectCoinInformation = () => {
    const pickedCoin = marketData.find((coin) => coin.id === params.crypto);
    setSelectedCoin(pickedCoin);
  };

  useEffect(() => {
    collectCoinInformation();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-white">{selectedCoin?.id}</div>
    </main>
  );
}
