"use client";
import { ReactNode, useEffect, useState } from "react";
import { Odds } from "../../lib/api";
import Link from "next/link";

function OddsTable({ oddsItem, home, away, points, draw }: OddsTableProps) {
  const { away_team, bookmakers, home_team, sport_key } = oddsItem;
  const startTime = new Date(oddsItem.commence_time).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const supportedPlayerPropsLeagues = ["nba", "nfl", "nhl", "mlb"];
  const [supportsPlayerProps, setSupportsPlayerProps] = useState(false);

  useEffect(() => {
    supportedPlayerPropsLeagues.forEach((league) => {
      if (sport_key.includes(league)) {
        setSupportsPlayerProps(true);
      }
    });
  }, []);

  //find out if player props are supported for this sport using oddsItem.sport_key and compare it to see if any substring from supportedPlayerPropsLeagues

  if (!points) {
    return (
      <section className="m-4 sm:m-5 flex flex-col shadow-lg rounded-md overflow-hidden bg-white" data-cy="odds-table">
        <div className="flex flex-row flex-wrap justify-between items-center p-3 sm:p-4 gap-2">
          <h2 className="text-2xl sm:text-3xl">
            {home_team} vs {away_team}
          </h2>
          {supportsPlayerProps && (
            <Link
              data-cy="player-props-link"
              href={`/odds/playerProps/?sport=${oddsItem.sport_key}&event=${oddsItem.id}`}
              className="text-base sm:text-lg p-2 text-cyan-600 w-max"
            >
              Player Props
            </Link>
          )}
        </div>

        <p className="text-cyan-700 text-xs sm:text-sm px-3 sm:px-4 pb-2">{startTime}</p>
        <div className="px-3 sm:px-4 pb-2">
          <h3 className="text-base sm:text-lg font-medium">{home_team}</h3>
        </div>
        <div className="flex flex-row justify-around p-3 sm:p-6 bg-white flex-wrap gap-2">
          {home}
        </div>
        {draw && (
          <div className="px-3 sm:px-4 pb-2">
            <h3 className="text-base sm:text-lg font-medium">Draw</h3>
            <div className="flex flex-row justify-around p-3 sm:p-6 bg-white flex-wrap gap-2">
              {draw}
            </div>
          </div>
        )}
        <div className="px-3 sm:px-4 pb-2">
          <h3 className="text-base sm:text-lg font-medium">{away_team}</h3>
          <div className="flex flex-row justify-around p-3 sm:p-6 bg-white flex-wrap gap-2">
            {away}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="m-4 sm:m-5 flex flex-col shadow-lg rounded-md overflow-hidden bg-white">
      <h2 className="text-2xl sm:text-4xl px-3 sm:px-4 pt-3">
        {home_team} vs {away_team}
      </h2>
      <p className="text-cyan-700 text-xs sm:text-base px-3 sm:px-4 pb-2">{startTime}</p>
      <div className="flex flex-row justify-around p-3 sm:p-6 bg-white flex-wrap gap-2">
        {points}
      </div>
    </section>
  );
}

export default OddsTable;

interface OddsTableProps {
  oddsItem: Odds;
  draw?: ReactNode; //for soccer specifically
  home?: ReactNode;
  away?: ReactNode;
  points?: ReactNode;
}
