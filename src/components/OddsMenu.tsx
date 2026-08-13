"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function OddsMenu() {
  const pathname = usePathname();

  // Check if this is a fighting sport (Boxing or MMA)
  const isFightingSport =
    pathname?.includes("boxing") || pathname?.includes("mma");

  // All possible routes for URL cleaning
  const allRoutes = ["moneyline", "spread", "points"];

  // Get the base URL by removing the current route
  const url =
    allRoutes.reduce((acc, route) => {
      if (acc?.includes(`/${route}`)) {
        return acc.replace(`/${route}`, "");
      }
      return acc;
    }, pathname) || "";

  // Conditional routes for display
  const routes = [
    { name: "moneyline", label: "MoneyLine" },
    ...(isFightingSport ? [] : [{ name: "spread", label: "Spread" }]),
    { name: "points", label: isFightingSport ? "Rounds" : "Points" },
  ];

  return (
    <nav
      aria-label="Odds views"
      className="mb-4 flex justify-center"
    >
      <div className="flex gap-1 rounded-md border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950">
        {routes.map(({ name, label }) => {
          const isActive = pathname?.includes(name);
          return (
            <Link
              key={name}
              data-cy={`odds-${name}-link`}
              className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
              }`}
              href={`${url}/${name}`}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default OddsMenu;
