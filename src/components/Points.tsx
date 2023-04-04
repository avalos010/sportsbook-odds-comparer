"use client";
import { Bookmaker, Market, Odds, Outcome } from "../../lib/api";

const Points = ({ odds }: PointsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row">
      {odds.map((odd: Odds) => {
        return odd.bookmakers.map((bookmaker: Bookmaker) => {
          const { title } = bookmaker;
          return bookmaker.markets.map((market: Market) => {
            return market.outcomes.map((outcome: Outcome, idx) => {
              return (
                <div
                  key={`${outcome}${market}-${odd.id}-${idx}`}
                  className="grid grid-flow-row p-3"
                  data-cy="odds-points-item"
                >
                  <span>
                    {outcome.price > 0 ? "+" + outcome.price : outcome.price}
                  </span>
                  <span className="text-cyan-700">
                    {outcome.name} {outcome.point}
                  </span>
                  <span>{title}</span>
                </div>
              );
            });
          });
        });
      })}
    </div>
  );
};

export default Points;

interface PointsProps {
  team: string;
  odds: Odds[];
}
