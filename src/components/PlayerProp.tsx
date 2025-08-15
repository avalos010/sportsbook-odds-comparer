import React from "react";
import { Bookmaker } from "./PlayerPropContainer";

function PlayerProp({ bookmaker }: PlayerPropProps) {
  return (
    <div>
      <h2>{bookmaker.title}</h2>
      {bookmaker.markets.map((market, marketIndex) => {
        return (
          <div key={`market-${marketIndex}`}>
            {market.outcomes.map((outcome, outcomeIndex) => (
              <div key={`outcome-${marketIndex}-${outcomeIndex}`}>
                <p>{outcome.name}</p>
                <p>{outcome.description}</p>
                <p>{outcome.point}</p>
                <p>{outcome.price}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default PlayerProp;

interface PlayerPropProps {
  bookmaker: Bookmaker;
}
