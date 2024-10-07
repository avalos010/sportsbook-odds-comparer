"use client";
import { ReactNode } from "react";
import { Odds } from "../../lib/api";
import Link from "next/link";

function OddsTable({ oddsItem, home, away, points, draw }: OddsTableProps) {
  const { away_team, bookmakers, home_team } = oddsItem;
  const startTime = new Date(oddsItem.commence_time).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (!points) {
    return (
      <div className="m-5 flex flex-col shadow-lg">
        <div className="flex flex-row flex-wrap justify-between p-2">
          <h2 className="text-3xl">
            {home_team} vs {away_team}
          </h2>
          <Link
            href={`/odds/playerProps/?sport=${oddsItem.sport_key}&event=${oddsItem.id}`}
            className="text-lg p-2 text-cyan-600 w-max"
          >
            Player Props
          </Link>
        </div>

        <p className="text-cyan-700 text-sm">{startTime}</p>
        <div className="p-3">
          <span>{home_team}</span>
          <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
            {home}
          </div>
        </div>
        {draw && (
          <div className="p-3">
            <span>Draw</span>
            <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
              {draw}
            </div>
          </div>
        )}
        <div className="p-3">
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
      <div className="p-3">
        <div className="flex flex-row justify-around p-6 bg-white flex-wrap">
          {points}
        </div>
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
