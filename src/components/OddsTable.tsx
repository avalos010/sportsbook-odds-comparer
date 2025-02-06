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
      <div className="m-5 flex flex-col shadow-lg" data-cy="odds-table">
        <div className="flex flex-row flex-wrap justify-between p-2">
          <h2 className="text-3xl">
            {home_team} vs {away_team}
          </h2>
          {supportsPlayerProps && (
            <Link
              data-cy="player-props-link"
              href={`/odds/playerProps/?sport=${oddsItem.sport_key}&event=${oddsItem.id}`}
              className="text-lg p-2 text-cyan-600 w-max"
            >
              Player Props
            </Link>
          )}
        </div>

        <p className="text-cyan-700 text-sm">{startTime}</p>
        <span>{home_team}</span>
        <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
          {home}
        </div>
        {draw && (
          <div>
            <span>Draw</span>
            <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
              {draw}
            </div>
          </div>
        )}
        <div>
          <span>{away_team}</span>
          <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
            {away}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="m-5 flex flex-col shadow-lg">
      <h2 className="text-4xl">
        {home_team} vs {away_team}
      </h2>
      <p className="text-cyan-700 text-base">{startTime}</p>
      <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
        {points}
      </div>
    </div>
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
