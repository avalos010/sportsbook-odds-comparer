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
    <nav aria-label="Popular sports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center py-4 bg-white/70 backdrop-blur rounded-md border shadow-sm">
        <h2 className="text-base sm:text-lg font-medium">Popular</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          <li key="upcoming">
            <Link
              href="/"
              replace={true}
              className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-gray-700 hover:text-cyan-700 hover:border-cyan-300"
            >
              Upcoming
            </Link>
          </li>
          {sports.map((sport, index) => (
            <li key={index}>
              <Link
                href={sport.href}
                replace={true}
                className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-gray-700 hover:text-cyan-700 hover:border-cyan-300"
              >
                {sport.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default MiniNav;
