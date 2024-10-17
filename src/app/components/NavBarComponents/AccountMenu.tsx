import { useState } from "react";
import Link from "next/link";
import { useCrypto } from "@/app/Context/CryptoContext";

function BasicExample() {
  const [toggle, setToggle] = useState(false);
  const { login, setLogin } = useCrypto();

  const clearLogin = () => {
    setToggle(!toggle);
    setLogin();
  };

  return (
    <div className="text-center">
      <button onClick={() => setToggle(!toggle)}>Account Information</button>
      {toggle && (
        <div className="absolute">
          <ul className="flex flex-col">
            <Link onClick={() => setToggle(!toggle)} href="/createAccount">
              Account Creation
            </Link>
            {!login && (
              <Link onClick={() => setToggle(!toggle)} href="/login">
                Log In
              </Link>
            )}
            {login && (
              <Link onClick={clearLogin} href="/login">
                Log Out
              </Link>
            )}
            <Link onClick={() => setToggle(!toggle)} href="/settings">
              Account Settings
            </Link>
            <Link onClick={() => setToggle(!toggle)} href="/contact">
              Contact Us
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default BasicExample;
