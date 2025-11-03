"use client";
import { Odds } from "../../lib/api";
import OddsMenu from "./OddsMenu";
import OddsTable from "./OddsTable";
import { ReactNode } from "react";

function OddsContainer({ league, children, hasOdds }: OddsContainerProps) {
  if (!hasOdds) {
    return (
      <h2 className="text-center text-4xl mt-3 text-black dark:text-slate-100">No odds available yet!</h2>
    );
  }

  return (
    <main id="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      <h1 className="text-4xl text-center text-black dark:text-slate-100">{league.toUpperCase()}</h1>
      <OddsMenu />
      {children}
    </main>
  );
}

export default OddsContainer;

interface OddsContainerProps {
  league: string;
  children: ReactNode | ReactNode[];
  hasOdds: boolean;
}
