"use client";
import { Bookmaker, Market, Odds, Outcome } from "../../lib/api";

const Spread = ({ team, odds, id }: SpreadProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row">
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
                        className="grid grid-flow-row p-3"
                        data-cy="odds-ml-item"
                      >
                        <span>
                          {outcome.price > 0
                            ? "+" + outcome.price
                            : outcome.price}
                        </span>
                        <span className="text-cyan-700">
                          {outcome.point && outcome.point > 0
                            ? `+${outcome.point}`
                            : outcome.point}
                        </span>
                        <span>{title}</span>
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
