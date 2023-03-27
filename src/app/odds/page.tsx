import React from "react";
import { Bookmaker, getOdds } from "../../../lib/api";
import { notFound } from "next/navigation";
import OddsTable from "@/components/OddsTable";

async function Odds() {
  const odds = await getOdds();
  if (!odds) {
    notFound();
  }

  return (
    <div>
      {odds.map((odd) => (
        <OddsTable key={odd.id} oddsItem={odd} />
      ))}
    </div>
  );
}
export default Odds;
