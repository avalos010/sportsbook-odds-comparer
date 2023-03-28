import { Odds } from "../../lib/api";
import Selector from "./Selector";
import OddsTable from "./OddsTable";
import { ReactNode } from "react";

function OddsContainer({ league, selectedOdds, children }: OddsContainerProps) {
  return (
    <div className="bg-slate-200">
      <h2 className="text-4xl text-center">{league.toUpperCase()}</h2>
      <Selector selectedValue={selectedOdds} />
      {children}
    </div>
  );
}

export default OddsContainer;

interface OddsContainerProps {
  league: string;
  children: ReactNode | ReactNode[];
  selectedOdds: "Moneyline" | "Spread" | "Points";
}
