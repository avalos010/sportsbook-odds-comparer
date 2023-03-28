"use client";
import { ReactNode } from "react";
import { Odds } from "../../lib/api";

function OddsTable({ oddsItem, home, away }: OddsTableProps) {
  const { away_team, bookmakers, home_team } = oddsItem;

  const Spread = ({ team }: { team: string }) => (
    <>
      {spread.map((line) => {
        return line.outcomes.map((outcome, id) => {
          if (outcome.name === team) {
            return (
              <div
                key={`${outcome}${id}`}
                className="flex flex-col items-center p-3"
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
    </>
  );

  const Points = ({ team }: { team: string }) => (
    <>
      {points.map((line) => {
        return line.outcomes.map((outcome, id) => {
          if (outcome.name === team) {
            return (
              <div
                key={`${outcome}${id}`}
                className="flex flex-col items-center p-3"
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
    </>
  );

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

  return (
    <div className="m-5 flex flex-col shadow-lg">
      <h3 className="text-3xl">
        {home_team} vs {away_team}
      </h3>
      <div className="p-3">
        <span>{home_team}</span>
        <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
          {home}
        </div>
      </div>
      <div className="p-3">
        <span>{away_team}</span>
        <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
          {away}
        </div>
      </div>
    </div>
  );
}

export default OddsTable;

interface OddsTableProps {
  oddsItem: Odds;
  home: ReactNode;
  away: ReactNode;
}
