import { Bookmaker, Market, Outcome } from "../lib/api";

interface BestOdds {
  moneyline: { price: number; bookmaker: string } | null;
  spread: { price: number; bookmaker: string } | null;
  over: { price: number; bookmaker: string } | null;
  under: { price: number; bookmaker: string } | null;
}

export function findBestOdds(bookmakers: Bookmaker[], team: string): BestOdds {
  const bestOdds: BestOdds = {
    moneyline: null,
    spread: null,
    over: null,
    under: null,
  };

  // Single pass through all bookmakers
  for (const bookmaker of bookmakers) {
    // Single pass through all markets
    for (const market of bookmaker.markets) {
      switch (market.key) {
        case "h2h":
          // Moneyline odds
          for (const outcome of market.outcomes) {
            if (outcome.name === team) {
              if (
                !bestOdds.moneyline ||
                outcome.price > bestOdds.moneyline.price
              ) {
                bestOdds.moneyline = {
                  price: outcome.price,
                  bookmaker: bookmaker.title,
                };
              }
            }
          }
          break;

        case "spreads":
          // Spread odds
          for (const outcome of market.outcomes) {
            if (outcome.name === team) {
              if (!bestOdds.spread || outcome.price > bestOdds.spread.price) {
                bestOdds.spread = {
                  price: outcome.price,
                  bookmaker: bookmaker.title,
                };
              }
            }
          }
          break;

        case "totals":
          // Over/Under odds
          for (const outcome of market.outcomes) {
            if (outcome.name === "Over") {
              if (!bestOdds.over || outcome.price > bestOdds.over.price) {
                bestOdds.over = {
                  price: outcome.price,
                  bookmaker: bookmaker.title,
                };
              }
            } else if (outcome.name === "Under") {
              if (!bestOdds.under || outcome.price > bestOdds.under.price) {
                bestOdds.under = {
                  price: outcome.price,
                  bookmaker: bookmaker.title,
                };
              }
            }
          }
          break;
      }
    }
  }

  return bestOdds;
}

// Individual helper functions for backward compatibility
export function findBestMoneylineOdds(bookmakers: Bookmaker[], team: string) {
  return findBestOdds(bookmakers, team).moneyline;
}

export function findBestSpreadOdds(bookmakers: Bookmaker[], team: string) {
  return findBestOdds(bookmakers, team).spread;
}

export function findBestOverUnderOdds(bookmakers: Bookmaker[]) {
  const bestOdds = findBestOdds(bookmakers, "");
  return { bestOver: bestOdds.over, bestUnder: bestOdds.under };
}

// Optimized comparison functions
export function isBestMoneylineOdds(
  outcome: Outcome,
  team: string,
  bookmakerTitle: string,
  bestMoneyline: { price: number; bookmaker: string } | null
): boolean {
  return (
    outcome.name === team &&
    bestMoneyline !== null &&
    outcome.price === bestMoneyline.price &&
    bookmakerTitle === bestMoneyline.bookmaker
  );
}

export function isBestSpreadOdds(
  outcome: Outcome,
  team: string,
  bookmakerTitle: string,
  bestSpread: { price: number; bookmaker: string } | null
): boolean {
  return (
    outcome.name === team &&
    bestSpread !== null &&
    outcome.price === bestSpread.price &&
    bookmakerTitle === bestSpread.bookmaker
  );
}

export function isBestOverUnderOdds(
  outcome: Outcome,
  bookmakerTitle: string,
  bestOver: { price: number; bookmaker: string } | null,
  bestUnder: { price: number; bookmaker: string } | null
): boolean {
  if (outcome.name === "Over" && bestOver) {
    return (
      outcome.price === bestOver.price && bookmakerTitle === bestOver.bookmaker
    );
  }
  if (outcome.name === "Under" && bestUnder) {
    return (
      outcome.price === bestUnder.price &&
      bookmakerTitle === bestUnder.bookmaker
    );
  }
  return false;
}
