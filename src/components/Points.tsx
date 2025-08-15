"use client";
import { Bookmaker, Market, Odds, Outcome } from "../../lib/api";

const Points = ({ odd }: PointsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row gap-2">
      {odd.bookmakers.map((bookmaker: Bookmaker) => {
        const { title } = bookmaker;
        return bookmaker.markets.map((market: Market) => {
          return market.outcomes.map((outcome: Outcome, idx) => {
            return (
              <div
                key={`${outcome}${market}-${odd.id}-${idx}`}
                className="grid grid-flow-row p-2 sm:p-3 text-center"
                data-cy="odds-points-item"
              >
                {outcome.price > 0 ? (
                  <p className="text-green-800 dark:text-green-400">
                    +{outcome.price}
                  </p>
                ) : (
                  <p className="text-red-800 dark:text-red-400">
                    {outcome.price}
                  </p>
                )}
                <p className="text-cyan-800 dark:text-cyan-300">
                  {outcome.name} {outcome.point}
                </p>
                <p className="text-base sm:text-xl">{title}</p>
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
