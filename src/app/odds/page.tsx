import React from "react";
import { Bookmaker, Odds, getOdds } from "../../../lib/api";
import { notFound } from "next/navigation";

async function Odds() {
  const odds = await getOdds();
  if (!odds) {
    notFound();
  }

  return (
    <div>
      {!!odds &&
        odds.map((odd: Odds) => (
          <div className="mb-5" key={odd.id}>
            <h2>{odd.sport_title}</h2>
            <p>
              {odd.home_team} vs {odd.away_team}
            </p>
            <p>{odd.commence_time}</p>
            {odd.bookmakers.map(
              (bookmaker: Bookmaker) => bookmaker.title + " "
            )}
          </div>
        ))}
    </div>
  );
}
export default Odds;
