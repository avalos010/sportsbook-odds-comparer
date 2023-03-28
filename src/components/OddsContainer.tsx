import { Odds } from "../../lib/api";
import OddsMenu from "./OddsMenu";
import OddsTable from "./OddsTable";
import { ReactNode } from "react";

function OddsContainer({ league, children }: OddsContainerProps) {
  return (
    <div className="bg-slate-200">
      <h2 className="text-4xl text-center">{league.toUpperCase()}</h2>
      <OddsMenu />
      {children}
    </div>
  );
}

export default OddsContainer;

interface OddsContainerProps {
  league: string;
  children: ReactNode | ReactNode[];
}
