/** @format */

"use client";
import { createContext, useState, useContext } from "react";

export const CryptoContext = createContext();

export function useCrypto() {
    const value = useContext(CryptoContext);
    return value;
}

export const CryptoProvider = ({ children }) => {
    const [marketData, setMarketData] = useState([]);
    const [userAssetData, setUserAssetData] = useState([]);
    const [login, setLogin] = useState();
    const [currency, setCurrency] = useState("usd");
    const [listOfUsers, setListOfUsers] = useState([]);
    const [globalData, setGlobalData] = useState();
    const [darkMode, setDarkMode] = useState(true);

    const saveUserList = () => {
        localStorage.setItem("users", JSON.stringify(listOfUsers));
    };

    const saveUserInformation = (portfolio) => {
        localStorage.setItem("userData", JSON.stringify(portfolio));
    };

    const loadUserList = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            setUserAssetData(userData);
        } else {
            setUserAssetData([]);
        }
    };

    const saveUserData = (portfolio) => {
        setUserAssetData(portfolio);
        saveUserInformation(portfolio);
    };

    return (
        <CryptoContext.Provider
            value={{
                marketData,
                setMarketData,
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
                darkMode,
                setDarkMode,
            }}>
            {children}
        </CryptoContext.Provider>
    );
};
