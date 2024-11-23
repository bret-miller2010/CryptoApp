import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar/NavBar";
import "./globals.css";
import { CryptoProvider } from "./Context/CryptoContext";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <CryptoProvider>
            <body className={inter.className}>
               <Suspense>
                  <NavBar />
                  {children}
               </Suspense>
            </body>
         </CryptoProvider>
      </html>
   );
}
