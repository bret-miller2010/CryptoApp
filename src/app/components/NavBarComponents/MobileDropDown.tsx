/** @format */
"use client";
import { useRouter } from "next/navigation";
import { textColor, secondaryColor } from "@/app/utils/utility";

const MobileDropDown = ({ darkMode }: { darkMode: boolean }) => {
    const router = useRouter();

    const navigatePage = (e: any) => {
        router.push(e.target.value);
    };

    return (
        <select
            className={`w-20 h-full duration-300 text-center ${secondaryColor(darkMode)} ${textColor(darkMode)}`}
            defaultValue="/"
            onChange={(e) => navigatePage(e)}
            id="">
            <option value="/">Home</option>
            <option value="/Portfolio">Portfolio</option>
            <option value="/Convertor">Convertor</option>
        </select>
    );
};

export default MobileDropDown;
