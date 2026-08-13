"use client";
import type { ReactNode } from "react";
import type { Odds } from "../../lib/api";
import { getBarLineGameUrl } from "../../lib/barLine";
import GameHeader from "./GameHeader";

function OddsTable({ oddsItem, home, away, points, draw }: OddsTableProps) {
  const { away_team, home_team, sport_key } = oddsItem;
  const playerPropsUrl = getBarLineGameUrl(
    sport_key,
    home_team,
    away_team
  );

  if (!points) {
    return (
      <section className="m-4 sm:m-5 flex flex-col card" data-cy="odds-table">
        <div className="p-3 sm:p-4">
          <GameHeader
            homeTeam={home_team}
            awayTeam={away_team}
            commenceTime={oddsItem.commence_time}
          />
          {playerPropsUrl && (
            <div className="flex justify-center mt-3">
              <a
                data-cy="player-props-link"
                href={playerPropsUrl}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-1.5 px-3 rounded-md shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm"
              >
                Player Props
              </a>
            </div>
          )}
        </div>
        <div className="px-3 sm:px-4 pb-2">
          <h3 className="text-base sm:text-lg font-medium text-black dark:text-slate-100">{home_team}</h3>
        </div>
        <div className="flex flex-row justify-around p-3 sm:p-6 flex-wrap gap-2">
          {home}
        </div>
        {draw && (
          <div className="px-3 sm:px-4 pb-2">
            <h3 className="text-base sm:text-lg font-medium text-black dark:text-slate-100">Draw</h3>
            <div className="flex flex-row justify-around p-3 sm:p-6 flex-wrap gap-2">
              {draw}
            </div>
          </div>
        )}
        <div className="px-3 sm:px-4 pb-2">
          <h3 className="text-base sm:text-lg font-medium text-black dark:text-slate-100">{away_team}</h3>
          <div className="flex flex-row justify-around p-3 sm:p-6 flex-wrap gap-2">
            {away}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="m-4 sm:m-5 flex flex-col card">
      <div className="px-3 sm:px-4 pt-3">
        <GameHeader
          homeTeam={home_team}
          awayTeam={away_team}
          commenceTime={oddsItem.commence_time}
        />
      </div>
      <div className="flex flex-row justify-around p-3 sm:p-6 flex-wrap gap-2">
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
