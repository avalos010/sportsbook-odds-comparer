import React from "react";
import { Bookmaker } from "./PlayerPropContainer";

function PlayerProp({ bookmaker }: PlayerPropProps) {
  console.log(bookmaker);
  return (
    <div>
      <h2>{bookmaker.title}</h2>
      {bookmaker.markets.map((market) => {
        return (
          <div>
            {market.outcomes.map((outcome) => (
              <div>
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
