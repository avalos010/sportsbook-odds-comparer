import React from "react";
import { getMoneyLineOdds } from "../../../lib/api";
import OddsTable from "@/components/OddsTable";
import MoneyLine from "@/components/Moneyline";
import Snackbar from "@/components/Snackbar";

export const dynamic = 'force-dynamic';

async function Odds() {
  const odds = await getMoneyLineOdds();

  //https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/a512a48a58c4329048174217b2cc7ce0/odds?apiKey=YOUR_API_KEY&regions=us&markets=player_pass_tds&oddsFormat=american(opens new window)

  if (!odds || !odds.length) {
    return <Snackbar message="Oops! something went wrong!" type="error" />;
  }

  return (
    <main id="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl sm:text-4xl text-black dark:text-slate-100">Upcoming</h1>
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
