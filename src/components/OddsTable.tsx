"use client";

import { Odds } from "../../lib/api";

function OddsTable({ oddsItem }: OddsTableProps) {
  const { away_team, bookmakers, home_team } = oddsItem;

  const moneyLine: {
    title: string;
    outcomes: { name: string; price: number }[];
  }[] = [];

  const spread: {
    title: string;
    outcomes: { name: string; price: number }[];
  }[] = [];

  const points: {
    title: string;
    outcomes: { name: string; price: number }[];
  }[] = [];

  bookmakers.map((bookmaker) => {
    const { title } = bookmaker;

    bookmaker.markets.map((market) => {
      switch (market.key) {
        case "h2h":
          moneyLine.push({ title, outcomes: market.outcomes });
          break;
        case "spreads":
          spread.push({ title, outcomes: market.outcomes });
          break;
        case "totals":
          points.push({ title, outcomes: market.outcomes });
          break;
      }
    });
  });

  const OddsComponent = ({ team }: { team: string }) => {
    return (
      <div className="flex flex-row justify-around">
        {moneyLine.map((line) => {
          return line.outcomes.map((outcome, id) => {
            if (outcome.name === team) {
              return (
                <div
                  key={`${outcome}${id}`}
                  className="flex flex-col items-center"
                >
                  <span>
                    {outcome.price > 0 ? "+" + outcome.price : outcome.price}
                  </span>
                  <span>{line.title}</span>
                </div>
              );
            }
          });
        })}
      </div>
    );
  };

  return (
    <div className="m-5 flex flex-col shadow-lg">
      <div className="p-3">
        <span>{home_team}</span>
        <OddsComponent team={home_team} />
      </div>
      <div className="p-3">
        <span>{away_team}</span>
        <OddsComponent team={away_team} />
      </div>
    </div>
  );
}

export default OddsTable;

interface OddsTableProps {
  oddsItem: Odds;
}
