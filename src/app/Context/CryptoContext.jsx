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
  const [login, setLogin] = useState();
  const [currency, setCurrency] = useState("usd");
  const [listOfUsers, setListOfUsers] = useState([]);
  const [globalData, setGlobalData] = useState();

  const saveUserList = () => {
    localStorage.setItem("users", JSON.stringify(listOfUsers));
  };

  const loadUserList = () => {
    if (users) {
      setListOfUsers(users);
    } else {
      setListOfUsers([]);
    }
  };

  const saveUserData = (login) => {
    const loadedUser = listOfUsers.find((user) => user.id === login.id);
    const index = listOfUsers.findIndex((user) => user.id === login.id);
    loadedUser.portfolio = login.portfolio;
    listOfUsers[index] = loadedUser;
    saveUserList();
  };

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
        setCurrency,
        listOfUsers,
        setListOfUsers,
        saveUserList,
        login,
        setLogin,
        loadUserList,
        saveUserData,
        globalData,
        setGlobalData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
