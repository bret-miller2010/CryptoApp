"use client";
import { useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";
import { primaryColor, secondaryColor, textColor } from "../utils/utility";

export default function LoginPage() {
   const { setLogin, listOfUsers, darkMode, setDarkMode } = useCrypto();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [errorLogin, setErrorLogin] = useState(false);
   const [sucess, setSucess] = useState(false);

   const loadUser = (e) => {
      e.preventDefault();
      const loadedUser = listOfUsers.find((user) => user.username === username);
      if (loadedUser) {
         if (loadedUser.password === password) {
            setLogin(loadedUser);
            setErrorLogin(false);
            setSucess(true);
            setDarkMode(loadedUser.dark_mode);
         } else {
            setErrorLogin(true);
            setSucess(false);
         }
      } else {
         setErrorLogin(true);
         setSucess(false);
      }
   };

   return (
      <div className={`flex justify-center pt-20 h-screen duration-300 ${primaryColor(darkMode)}`}>
         <div className={`${textColor(darkMode)} ${secondaryColor(darkMode)} text-center h-[600px] px-20 rounded-3xl flex justify-center items-center flex-col`}>
            <div>Use the form below to login and view portfolio information.</div>
            <form
               action=""
               className="mt-4"
               onSubmit={loadUser}>
               <div>Username:</div>
               <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="mt-2 text-black border-2 border-black pl-1"
                  type="text"
               />
               <div className="mt-4">Password:</div>
               <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="mt-2 text-black border-2 border-black pl-1"
                  type="password"
               />
               <div>
                  <button
                     type="submit"
                     className={`mt-5 h-10 rounded-3xl w-40 ${primaryColor(darkMode)}`}>
                     Log In
                  </button>
                  {errorLogin && (
                     <div className="mt-4 text-red-400">
                        The username/password combination did not match. <br />
                        Please try again.
                     </div>
                  )}
                  {sucess && <div className="mt-4 text-green-400">You have successfully logged in.</div>}
               </div>
            </form>
         </div>
      </div>
   );
}
