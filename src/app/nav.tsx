"use client";
import Link from "next/link";
import Logo from "../../public/next.svg";
import Image from "next/image";

function Nav() {
  return (
    <nav className=" bg-cyan-600 w-full border-b-2 p-4">
      <div className="flex justify-center items-center">
        <Image
          className="image w-32"
          src={Logo}
          alt="Logo for sportsbook odds comparer tool"
          priority={true}
        />
      </div>
      <div className="flex gap-4 justify-center p-3">
        <Link href="/">UPCOMING</Link>

        <Link href="/odds/basketball_nba">NBA</Link>
        <Link href="/odds/baseball_mlb">MLB</Link>
        <Link href="/odds/americanfootball_xfl">XFL</Link>
        <Link href="/odds/icehockey_nhl">NHL</Link>
      </div>
    </nav>
  );
}

export default Nav;
