import Link from "next/link";

const NavBar = () => {
  return (
    <main className="text-white">
      <div className="w-screen h-10 bg-[#474792] flex items-center justify-center space-x-28 ">
        <div>Coins</div>
        <div>Exchange</div>
        <div>Volume?</div>
        <div>Total Money</div>
        <div>1st coin</div>
        <div>2nd coin</div>
        <div>
          <Link href="/Pages">Click here to go to Pages</Link>
        </div>
      </div>
      <div className="flex justify-between mt-3 p-5">
        <div>
          <div className="space-x-10">
            <Link href="/">Home</Link>
            <Link href="/Portfolio">Portfolio</Link>
            <Link href="/Convertor">Convertor</Link>
          </div>
        </div>
        <div className="flex space-x-10">
          <input type="text" />
          <div>Currency selection</div>
          <div>Dark mode/light mode</div>
          <div>Account Selection</div>
        </div>
      </div>
    </main>
  );
};

export default NavBar;
