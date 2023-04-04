"use client";
import { Bookmaker, Market, Odds, Outcome } from "../../lib/api";

const Moneyline = ({ team, odds }: MoneylineProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row">
      {odds.map((odd) => {
        return odd.bookmakers.map((bookmaker: Bookmaker) => {
          const { title } = bookmaker;
          return bookmaker.markets.map((market: Market) => {
            return market.outcomes
              .filter((outcome: Outcome) => outcome.name === team)
              .map((outcome: Outcome) => {
                return (
                  <div
                    key={`${outcome}${market}`}
                    className="grid grid-flow-row p-3"
                    data-cy="odds-ml-item"
                  >
                    <span>
                      {outcome.price > 0 ? "+" + outcome.price : outcome.price}
                    </span>
                    <span className="text-cyan-700">Moneyline</span>
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

export default Moneyline;

interface MoneylineProps {
  team: string;
  odds: Odds[];
}
