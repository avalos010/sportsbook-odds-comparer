import React from "react";
import { Outcome, getMoneyLineOdds, getOdds } from "../../../lib/api";
import { notFound } from "next/navigation";
import OddsTable from "@/components/OddsTable";
import MoneyLine from "@/components/Moneyline";

async function Odds() {
  const data = await getMoneyLineOdds();

  if (!data?.odds) {
    notFound();
  }

  return (
    <div className="bg-slate-200">
      <h2 className="text-center text-4xl">Upcoming</h2>
      {data.odds.map((odd) => (
        <div key={odd.id}>
          <OddsTable
            key={odd.id}
            oddsItem={odd}
            away={<MoneyLine data={data.moneyline} team={odd.away_team} />}
            home={<MoneyLine data={data.moneyline} team={odd.home_team} />}
          />
        </div>
      ))}
    </div>
  );
}
export default Odds;
