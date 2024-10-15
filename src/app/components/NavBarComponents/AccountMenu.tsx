import { useState } from "react";
import Link from "next/link";

function BasicExample() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="text-center">
      <button onClick={() => setToggle(!toggle)}>Account Information</button>
      {toggle && (
        <div className="absolute">
          <ul className="flex flex-col">
            <Link onClick={() => setToggle(!toggle)} href="/login">
              Log In/Out
            </Link>
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
