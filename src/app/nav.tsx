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
        <Link data-cy="upcoming-link" href="/">
          UPCOMING
        </Link>
        <Link data-cy="nba-link" href="/odds/basketball_nba/moneyline">
          NBA
        </Link>
        <Link data-cy="mlb-link" href="/odds/baseball_mlb/moneyline">
          MLB
        </Link>
        <Link data-cy="xfl-link" href="/odds/americanfootball_xfl/moneyline">
          XFL
        </Link>
        <Link data-cy="nhl-link" href="/odds/icehockey_nhl">
          NHL
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
