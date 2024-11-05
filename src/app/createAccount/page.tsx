"use client";
import { useState } from "react";
import { uid } from "uid";
import { useCrypto } from "@/app/Context/CryptoContext";
import { primaryColor, secondaryColor } from "../utils/utility";

export default function AccountLogIn() {
   const { listOfUsers, setListOfUsers, saveUserList, darkMode } = useCrypto();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [sucess, setSucess] = useState(false);

   const createUser = (e) => {
      e.preventDefault();
      const user = {
         username: username,
         password: password,
         id: uid(),
         portfolio: [],
      };
      const newList = [...listOfUsers];
      newList.push(user);
      setListOfUsers(newList);
      setUsername("");
      setPassword("");
      setSucess(true);
      saveUserList();
   };

   return (
      <div className={`flex justify-center h-screen pt-20 duration-300 ${primaryColor(darkMode)}`}>
         <div
            className={`text-white duration-300 ${secondaryColor(darkMode)} h-[600px] w-[600px] rounded-3xl text-center flex justify-center items-center flex-col`}
         >
            <div>Create a free account to save your portfolio information and settings.</div>
            <form
               action=""
               className="mt-4"
               onSubmit={createUser}
            >
               <div>Username:</div>
               <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="mt-2 text-black"
                  type="text"
               />
               <div className="mt-4">Password:</div>
               <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="mt-2 text-black"
                  type="text"
               />
               <div>
                  <button
                     type="submit"
                     className="mt-5 h-10 rounded-3xl w-40 bg-[#1e1932]"
                  >
                     Create Account
                  </button>
                  {sucess && (
                     <div className="mt-4 text-green-400">
                        Account sucessfully created! <br /> Please use the menu at the top right to log in.
                     </div>
                  )}
               </div>
            </form>
         </div>
      </div>
   );
}
