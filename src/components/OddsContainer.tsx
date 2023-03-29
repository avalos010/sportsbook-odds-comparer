import { Odds } from "../../lib/api";
import OddsMenu from "./OddsMenu";
import OddsTable from "./OddsTable";
import { ReactNode } from "react";

function OddsContainer({ league, children }: OddsContainerProps) {
  return (
    <main className="bg-slate-200">
      <h1 className="text-4xl text-center">{league.toUpperCase()}</h1>
      <OddsMenu />
      {children}
    </main>
  );
}

export default OddsContainer;

interface OddsContainerProps {
  league: string;
  children: ReactNode | ReactNode[];
}
