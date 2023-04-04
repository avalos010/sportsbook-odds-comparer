import React from "react";
import { getMoneyLineOdds } from "../../../lib/api";
import { notFound } from "next/navigation";
import OddsTable from "@/components/OddsTable";
import MoneyLine from "@/components/Moneyline";

async function Odds() {
  const odds = await getMoneyLineOdds();

  if (!odds) {
    notFound();
  }

  return (
    <main className="bg-slate-200">
      <h1 className="text-center text-4xl">Upcoming</h1>
      {odds.map((odd) => (
        <div key={odd.id}>
          <OddsTable
            key={odd.id}
            oddsItem={odd}
            away={<MoneyLine odds={odds} team={odd.away_team} />}
            home={<MoneyLine odds={odds} team={odd.home_team} />}
          />
        </div>
      ))}
    </main>
  );
}
export default Odds;
