/** @format */

import { useState } from "react";
import Link from "next/link";
import { useCrypto } from "@/app/Context/CryptoContext";
import { navBarColors } from "@/app/utils/utility";

function AccountMenu({ darkMode }) {
    const [toggle, setToggle] = useState(false);
    const { login, setLogin } = useCrypto();

    const clearLogin = () => {
        setToggle(!toggle);
        setLogin();
    };

    return (
        <div className={`text-center duration-300 ${navBarColors(darkMode)} h-full px-5`}>
            <button
                className="h-full"
                onClick={() => setToggle(!toggle)}>
                Account Information
            </button>
            {toggle && (
                <div className="absolute">
                    <ul className="flex flex-col space-y-2 mt-2">
                        <Link
                            onClick={() => setToggle(!toggle)}
                            href="/createAccount">
                            Account Creation
                        </Link>
                        {!login && (
                            <Link
                                onClick={() => setToggle(!toggle)}
                                href="/login">
                                Log In
                            </Link>
                        )}
                        {login && (
                            <Link
                                onClick={clearLogin}
                                href="/login">
                                Log Out
                            </Link>
                        )}
                        <Link
                            onClick={() => setToggle(!toggle)}
                            href="/settings">
                            Account Settings
                        </Link>
                        <Link
                            onClick={() => setToggle(!toggle)}
                            href="/contact">
                            Contact Us
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AccountMenu;
