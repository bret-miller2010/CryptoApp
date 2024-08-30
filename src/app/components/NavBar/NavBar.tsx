import Link from "next/link";

const NavBar = () => {
  return (
    <main>
      <div className="w-screen h-10 bg-red-500 flex items-center justify-center space-x-28">
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
      <div className="flex justify-between mt-3">
        <div>
          <div className = "ml-10">This will be the logo and text</div>
        </div>
        <div className = "flex mr-10 space-x-10">
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
