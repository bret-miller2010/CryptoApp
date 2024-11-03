"use client";
import { useCrypto } from "../Context/CryptoContext";

export default function ContactPage() {
  const { darkMode } = useCrypto();

  return (
    <div
      className={`flex justify-center h-screen pt-[250px] ${darkMode ? "duration-300 bg-black" : "duration-300 bg-[#bfbfbf]"}`}
    >
      <div
        className={`text-white ${darkMode ? "duration-300 bg-[#3a3978]" : "duration-300 bg-[#3b82f6]"} w-[800px] h-[200px] rounded-3xl text-center flex justify-center items-center flex-col space-y-5`}
      >
        <div>
          Should you encounter any bugs, issues, or improvements with this
          application <br />
          please reach out to Bret Miller. Contact information is below.
        </div>
        <div>Emal: bret.miller2010@gmail.com</div>
      </div>
    </div>
  );
}
