"use client";
import { Bookmaker, Market, Odds, Outcome } from "../../lib/api";
import { findBestOdds, isBestSpreadOdds } from "../../lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";

const Spread = ({ team, odds, id }: SpreadProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row gap-2">
      {odds.map((odd: Odds) => {
        //TODO! Pass in a single item instead of passing whole list to each child.
        if (odd.id === id) {
          const bestOdds = findBestOdds(odd.bookmakers, team);

          return odd.bookmakers.map((bookmaker: Bookmaker) => {
            const { title } = bookmaker;
            return bookmaker.markets.map((market: Market) => {
              return market.outcomes
                .filter((outcome: Outcome) => outcome.name === team)
                .map((outcome: Outcome) => {
                  if (outcome.name === team) {
                    const isBest = isBestSpreadOdds(
                      outcome,
                      team,
                      title,
                      bestOdds.spread
                    );

                    return (
                      <div
                        key={`${outcome}${market}`}
                        className="grid grid-flow-row p-3 relative text-center"
                        data-cy="odds-ml-item"
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
                          {outcome.point && outcome.point > 0
                            ? `+${outcome.point}`
                            : outcome.point}
                        </p>
                        <p className="text-base sm:text-xl text-black dark:text-slate-100">{title}</p>
                      </div>
                    );
                  }
                });
            });
          });
        }
      })}
    </div>
  );
};

export default Spread;

interface SpreadProps {
  team: string;
  odds: Odds[];
  id: string;
}
