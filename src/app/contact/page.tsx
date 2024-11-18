"use client";
import { useCrypto } from "../Context/CryptoContext";
import { primaryColor, secondaryColor, textColor } from "../utils/utility";

export default function ContactPage() {
   const { darkMode } = useCrypto();

   return (
      <div className={`flex justify-center h-screen pt-[250px] duration-300 ${primaryColor(darkMode)}`}>
         <div
            className={`${textColor(darkMode)} ${secondaryColor(darkMode)} duration-300 w-[800px] h-[200px] rounded-3xl text-center flex justify-center items-center flex-col space-y-5`}>
            <div>
               Should you encounter any bugs, issues, or improvements with this application <br />
               please reach out to Bret Miller. Contact information is below.
            </div>
            <div>Emal: bret.miller2010@gmail.com</div>
         </div>
      </div>
   );
}
