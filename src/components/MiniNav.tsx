"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sports = [
  { name: "Upcoming", href: "/" },
  { name: "MMA", href: "/odds/mma_mixed_martial_arts/moneyline" },
  { name: "Boxing", href: "/odds/boxing_boxing/moneyline" },
  { name: "NBA", href: "/odds/basketball_nba/moneyline" },
  { name: "MLB", href: "/odds/baseball_mlb/moneyline" },
  { name: "NHL", href: "/odds/icehockey_nhl/moneyline" },
];

const MiniNav = () => {
  const pathname = usePathname();
  return (
    <nav aria-label="Popular sports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between py-3">
        <h2 className="text-sm text-muted-foreground">Quick access</h2>
      </div>
      <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
        {sports.map(({ name, href }) => {
          const isActive = pathname === href || (name === "Upcoming" && pathname === "/");
          return (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                replace={true}
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                  isActive
                    ? "bg-cyan-800 text-white border-cyan-800 dark:bg-cyan-700 dark:border-cyan-700"
                    : "text-gray-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-300 dark:hover:border-cyan-600"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default MiniNav;
