"use client";
import { Bookmaker, Market, Odds, Outcome } from "../../lib/api";

const Spread = ({ team, odds, id }: SpreadProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row gap-2">
      {odds.map((odd: Odds) => {
        //TODO! Pass in a single item instead of passing whole list to each child.
        if (odd.id === id) {
          return odd.bookmakers.map((bookmaker: Bookmaker) => {
            const { title } = bookmaker;
            return bookmaker.markets.map((market: Market) => {
              return market.outcomes
                .filter((outcome: Outcome) => outcome.name === team)
                .map((outcome: Outcome) => {
                  if (outcome.name === team) {
                    return (
                      <div
                        key={`${outcome}${market}`}
                        className="grid grid-flow-row p-2 sm:p-3 rounded border"
                        data-cy="odds-ml-item"
                      >
                        {outcome.price > 0 ? (
                          <p className="text-green-800">+{outcome.price}</p>
                        ) : (
                          <p className="text-red-800">{outcome.price}</p>
                        )}
                        <p className="text-cyan-700">
                          {outcome.point && outcome.point > 0
                            ? `+${outcome.point}`
                            : outcome.point}
                        </p>
                        <p className="text-base sm:text-xl">{title}</p>
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
