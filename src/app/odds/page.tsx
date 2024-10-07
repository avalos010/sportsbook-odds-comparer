import React from "react";
import { getMoneyLineOdds } from "../../../lib/api";
import { notFound } from "next/navigation";
import OddsTable from "@/components/OddsTable";
import MoneyLine from "@/components/Moneyline";

async function Odds() {
  const odds = await getMoneyLineOdds();

  //https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/a512a48a58c4329048174217b2cc7ce0/odds?apiKey=YOUR_API_KEY&regions=us&markets=player_pass_tds&oddsFormat=american(opens new window)

  if (!odds) {
    notFound();
  }

  return (
    <main className="bg-slate-200">
      <h1 className="text-center text-4xl">Upcoming</h1>
      {odds.map((odd) => {
        return (
          <div key={odd.id}>
            <OddsTable
              key={odd.id}
              oddsItem={odd}
              away={<MoneyLine id={odd.id} odds={odds} team={odd.away_team} />}
              home={<MoneyLine id={odd.id} odds={odds} team={odd.home_team} />}
            />
          </div>
        );
      })}
    </main>
  );
}
export default Odds;
