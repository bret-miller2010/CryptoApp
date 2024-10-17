"use client";
import { useState } from "react";
import { useCrypto } from "@/app/Context/CryptoContext";

export default function LoginPage() {
  const { setLogin } = useCrypto();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);

  const loadUser = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    const loadedUser = users.find((user) => user.username === username);
    if (loadedUser) {
      setLogin(loadedUser);
    } else {
      setErrorLogin(true);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="text-white bg-[#3a3978] h-[600px] w-[600px] rounded-3xl text-center flex justify-center items-center flex-col">
        <div>Use the form below to login and view portfolio information.</div>
        <form action="" className="mt-4" onSubmit={loadUser}>
          <div>UserName:</div>
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
              Log In
            </button>
            {errorLogin && (
              <div className="mt-4 text-red-400">
                The username/password combination was did not match. <br />
                Please try again.
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
