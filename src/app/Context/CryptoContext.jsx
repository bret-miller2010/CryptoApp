"use client";
import PropTypes from "prop-types";
import { createContext, useState, useContext } from "react";

export const CryptoContext = createContext();

export function useCrypto() {
  const value = useContext(CryptoContext);
  return value;
}

export const CryptoProvider = ({ children }) => {
  const [marketData, setMarketData] = useState([]);
  const [bitCoinData, setBitCoinData] = useState([]);

  return (
    <CryptoContext.Provider
      value={{ marketData, setMarketData, bitCoinData, setBitCoinData }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

CryptoProvider.propTypes = {
  children: PropTypes.object,
};