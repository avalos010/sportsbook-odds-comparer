"use client";
import { Bookmaker, Market, Odds, Outcome } from "../../lib/api";

const Points = ({ odd }: PointsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row">
      {odd.bookmakers.map((bookmaker: Bookmaker) => {
        const { title } = bookmaker;
        return bookmaker.markets.map((market: Market) => {
          return market.outcomes.map((outcome: Outcome, idx) => {
            return (
              <div
                key={`${outcome}${market}-${odd.id}-${idx}`}
                className="grid grid-flow-row p-3"
                data-cy="odds-points-item"
              >
                {outcome.price > 0 ? (
                  <p className="text-green-800">+{outcome.price}</p>
                ) : (
                  <p className="text-red-800">{outcome.price}</p>
                )}
                <p className="text-cyan-700">
                  {outcome.name} {outcome.point}
                </p>
                <p className="text-xl">{title}</p>
              </div>
            );
          });
        });
      })}
    </div>
  );
};

export default Points;

interface PointsProps {
  odd: Odds;
}
