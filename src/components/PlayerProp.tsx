import React from "react";
import { Bookmaker, PlayerPropsData } from "@/app/odds/playerProps/page";

function PlayerProp({ bookmaker }: PlayerPropProps) {
  console.log(bookmaker);
  return (
    <div>
      {bookmaker.markets[0].outcomes.map((outcome) => (
        <div>
          <p>{outcome.name}</p>
          <p>{outcome.description}</p>
          <p>{outcome.point}</p>
          <p>{outcome.price}</p>
        </div>
      ))}
    </div>
  );
}

export default PlayerProp;

interface PlayerPropProps {
  bookmaker: Bookmaker;
}
