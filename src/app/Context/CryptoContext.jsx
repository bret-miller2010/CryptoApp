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

   const loadUserList = () => {
      const users = JSON.parse(localStorage.getItem("users"));
      if (users) {
         setListOfUsers(users);
      } else {
         setListOfUsers([]);
      }
   };

   const saveDarkMode = (login) => {
      const loadedUser = listOfUsers.find((user) => user.id === login.id);
      const index = listOfUsers.findIndex((user) => user.id === login.id);
      loadedUser.dark_mode = login.dark_mode;
      listOfUsers[index] = loadedUser;
      saveUserList();
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
            saveDarkMode,
         }}>
         {children}
      </CryptoContext.Provider>
   );
};
