"use client";
import { createContext, useState, useContext } from "react";

export const CryptoContext = createContext();

export function useCrypto() {
  const value = useContext(CryptoContext);
  return value;
}

export const CryptoProvider = ({ children }) => {
  const [marketData, setMarketData] = useState([]);
  const [bitCoinData, setBitCoinData] = useState([]);
  const [userAssetData, setUserAssetData] = useState([]);
  const [currency, setCurrency] = useState("usd");

  return (
    <CryptoContext.Provider
      value={{
        marketData,
        setMarketData,
        bitCoinData,
        setBitCoinData,
        userAssetData,
        setUserAssetData,
        currency,
        setCurrency
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
