/** @format */

import { textColor } from "@/app/utils/utility";
import Link from "next/link";

const NavBarButtons = ({ darkMode }: { darkMode: boolean }) => {
    return (
        <div className="flex items-center space-x-10 h-full max-[700px]:hidden">
            <div className={`h-full w-16 justify-center duration-300 ${textColor(darkMode)} flex items-center px-2`}>
                <Link href="/">Home</Link>
            </div>
            <div className={`h-full w-16 justify-center duration-300 ${textColor(darkMode)} flex items-center px-2`}>
                <Link href="/Portfolio">Portfolio</Link>
            </div>
            <div className={`h-full w-16 justify-center duration-300 ${textColor(darkMode)} flex items-center px-2`}>
                <Link href="/Convertor">Convertor</Link>
            </div>
        </div>
    );
};

export default NavBarButtons;
