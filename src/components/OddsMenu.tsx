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
    <div className="flex flex-row justify-center gap-5 text-lg">
      {routes.map(({ name, label }) => (
        <Link
          key={name}
          className={
            pathname?.includes(name)
              ? "text-cyan-900 font-bold underline underline-offset-1"
              : ""
          }
          href={`${url}/${name}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default OddsMenu;
