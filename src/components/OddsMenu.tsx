"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function OddsMenu() {
  const pathname = usePathname();

  const routes = [
    { name: "moneyline", label: "MoneyLine" },
    { name: "spread", label: "Spread" },
    { name: "points", label: "Points" },
  ];

  const url = routes.reduce((acc, cur) => acc!.replace(cur.name, ""), pathname);

  return (
    <nav aria-label="Odds views" className="flex flex-row justify-center gap-3 sm:gap-5 text-base sm:text-lg">
      {routes.map(({ name, label }) => {
        const isActive = pathname?.includes(name);
        return (
          <Link
            key={name}
            data-cy={`odds-${name}-link`}
            className={`${isActive ? "text-cyan-900 font-bold underline underline-offset-1" : "text-cyan-700"} px-3 py-1 rounded-md`}
            href={`${url}/${name}`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default OddsMenu;
