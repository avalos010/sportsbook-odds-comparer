"use client";
import { Bookmaker, Market, Odds, Outcome } from "../../lib/api";
import { findBestOdds, isBestMoneylineOdds } from "../../lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";

const Moneyline = ({ team, odds, id }: MoneylineProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row gap-2">
      {odds.map((odd) => {
        //TODO! Pass in a single item instead of passing whole list to each child.
        if (odd.id === id) {
          const bestOdds = findBestOdds(odd.bookmakers, team);

          return odd.bookmakers.map((bookmaker: Bookmaker) => {
            const { title } = bookmaker;
            return bookmaker.markets.map((market: Market) => {
              return market.outcomes
                .filter((outcome: Outcome) => outcome.name === team)
                .map((outcome: Outcome) => {
                  const isBest = isBestMoneylineOdds(
                    outcome,
                    team,
                    title,
                    bestOdds.moneyline
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
                        <span className="text-green-800 dark:text-green-400">
                          +{outcome.price} ML
                        </span>
                      ) : (
                        <span className="text-red-800 dark:text-red-400">
                          {outcome.price} ML
                        </span>
                      )}
                      <span className="text-base sm:text-xl">{title}</span>
                    </div>
                  );
                });
            });
          });
        }
      })}
    </div>
  );
};

export default Moneyline;

interface MoneylineProps {
  team: string;
  odds: Odds[];
  id: string;
}
