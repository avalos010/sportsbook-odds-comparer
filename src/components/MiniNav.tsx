"use client";

import Link from "next/link";

const sports = [
  {
    name: "MMA",
    href: "/odds/mma_mixed_martial_arts/moneyline",
  },
  {
    name: "Boxing",
    href: "/odds/boxing_boxing/moneyline",
  },
  {
    name: "NBA",
    href: "/odds/basketball_nba/moneyline",
  },
  {
    name: "MLB",
    href: "/odds/baseball_mlb/moneyline",
  },
  {
    name: "NHL",
    href: "/odds/icehockey_nhl/moneyline",
  },
];
const MiniNav = () => {
  return (
    <nav aria-label="Popular sports" className="flex flex-col items-center py-4 bg-white rounded-md shadow-md max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <h2 className="text-lg md:text-2xl">Popular</h2>
      <ul className="flex flex-wrap gap-2 md:flex-row md:space-x-4">
        <li
          key="upcoming"
          className="text-lg text-gray-500 flex flex-row items-center mb-2 md:mb-0"
        >
          <Link
            href="/"
            replace={true}
            className="text-lg text-gray-500 hover:text-cyan-500 transition duration-200 ease-in-out"
          >
            Upcoming
          </Link>
        </li>
        {sports.map((sport, index) => (
          <li
            key={index}
            className="text-lg text-gray-500 flex flex-row items-center mb-2 md:mb-0"
          >
            <Link
              href={sport.href}
              replace={true}
              className="text-lg text-gray-500 hover:text-cyan-500 transition duration-200 ease-in-out"
            >
              {sport.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default MiniNav;
