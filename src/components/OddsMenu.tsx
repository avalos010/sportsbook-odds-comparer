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
      className="flex flex-row justify-center gap-3 sm:gap-5 text-base sm:text-lg"
    >
      {routes.map(({ name, label }) => {
        const isActive = pathname?.includes(name);
        return (
          <Link
            key={name}
            data-cy={`odds-${name}-link`}
            className={`${
              isActive
                ? "text-cyan-900 font-bold underline underline-offset-1"
                : "text-cyan-700"
            } px-3 py-1 rounded-md`}
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
