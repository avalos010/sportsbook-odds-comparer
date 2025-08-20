"use client";
import { Bookmaker, Market, Odds, Outcome } from "../../lib/api";
import { findBestOdds, isBestOverUnderOdds } from "../../lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";

const Points = ({ odd }: PointsProps) => {
  const bestOdds = findBestOdds(odd.bookmakers, "");

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row gap-2">
      {odd.bookmakers.map((bookmaker: Bookmaker) => {
        const { title } = bookmaker;
        return bookmaker.markets.map((market: Market) => {
          return market.outcomes.map((outcome: Outcome, idx) => {
            const isBest = isBestOverUnderOdds(
              outcome,
              title,
              bestOdds.over,
              bestOdds.under
            );

            return (
              <div
                key={`${outcome}${market}-${odd.id}-${idx}`}
                className="grid grid-flow-row p-3 relative text-center"
                data-cy="odds-points-item"
              >
                {isBest && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="text-cyan-800">
                      <StarFilledIcon className="w-5 h-5" />
                    </div>
                  </div>
                )}
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
