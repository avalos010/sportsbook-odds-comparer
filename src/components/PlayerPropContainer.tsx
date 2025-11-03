"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import GameHeader from "./GameHeader";
import { StarFilledIcon } from "@radix-ui/react-icons";

function PlayerPropContainer({ getPlayerProps }: PlayerPropContainerProps) {
  const searchParams = useSearchParams();
  const sport = searchParams?.get("sport") as string;
  const eventId = searchParams?.get("event") as string;
  const markets = searchParams?.get("markets") as string;
  const [playerProps, setPlayerProps] = useState<ReformattedPlayerProps | null>(
    null
  );

  const [propMarket, setPropMarket] = useState<string | null>(null);
  const [gameInfo, setGameInfo] = useState<{
    homeTeam: string;
    awayTeam: string;
    commenceTime: string;
  } | null>(null);

  const updatePlayerProps = useCallback(async () => {
    const data = await getPlayerProps(sport, eventId, markets);
    if (data?.bookmakers) {
      setPropMarket(data.bookmakers[0]?.markets[0].key.replaceAll("_", " "));
      setGameInfo({
        homeTeam: data.home_team,
        awayTeam: data.away_team,
        commenceTime: data.commence_time,
      });
      const reformatted = reformatPlayerProps(data);
      setPlayerProps(reformatted);
    }
  }, [sport, eventId, markets, getPlayerProps]);

  useEffect(() => {
    updatePlayerProps();
  }, [sport, eventId, markets, updatePlayerProps]);

  if (!playerProps) {
    return <h3 className="text-2xl sm:text-3xl text-black dark:text-slate-100">Please select player props</h3>;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8" data-cy="playerprop-container">
      <h2 className="text-3xl sm:text-5xl capitalize text-center m-4 sm:m-7 text-black dark:text-slate-100">
        {propMarket}
      </h2>
      {gameInfo && (
        <GameHeader
          homeTeam={gameInfo.homeTeam}
          awayTeam={gameInfo.awayTeam}
          commenceTime={gameInfo.commenceTime}
        />
      )}
      {playerProps &&
        Object.entries(playerProps).map((details) => {
          const [player, odds] = details;
          
          // Find best odds and the first bookmaker offering them for each outcome type
          const bestOdds: { [key: string]: { price: number; book: string } } = {};
          odds.forEach((odd) => {
            if (!bestOdds[odd.name] || odd.price > bestOdds[odd.name].price) {
              bestOdds[odd.name] = { price: odd.price, book: odd.book };
            }
          });

          return (
            <div
              className="m-4 sm:m-5 flex flex-col card"
              key={player}
              data-cy="player-props-item"
            >
              <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-slate-100" data-cy="player-name">
                  {player}
                </h3>
              </div>
              <div className="flex flex-row justify-around p-3 sm:p-6 flex-wrap gap-2">
                  {odds.map((odd, idx) => {
                    const isBest = odd.price === bestOdds[odd.name].price && odd.book === bestOdds[odd.name].book;
                    
                    return (
                      <div
                        className="grid grid-flow-row p-3 relative text-center"
                        key={idx + odd.name}
                        data-cy="player-props-odds-item"
                      >
                        {isBest && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="text-cyan-800">
                              <StarFilledIcon className="w-5 h-5" />
                            </div>
                          </div>
                        )}
                        {odd.price > 0 ? (
                          <p
                            className="text-green-800 dark:text-green-400"
                            data-cy="odds-price"
                          >
                            +{odd.price}
                          </p>
                        ) : (
                          <p
                            className="text-red-800 dark:text-red-400"
                            data-cy="odds-price"
                          >
                            {odd.price}
                          </p>
                        )}
                        <p
                          className="text-cyan-800 dark:text-cyan-300"
                          data-cy="odds-point"
                        >
                          {odd.name} {odd?.point}
                        </p>
                        <p className="text-base sm:text-xl text-black dark:text-slate-100" data-cy="odds-book">
                          {odd.book}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default PlayerPropContainer;

export interface PlayerPropsData {
  away_team: string;
  bookmakers: Bookmaker[];
  commence_time: string;
  home_team: string;
  id: string;
  sport_key: string;
  sport_title: string;
}

export interface Bookmaker {
  key: string;
  markets: Market[];
  title: string;
}

export interface Market {
  key: string;
  last_update: string;
  outcomes: Outcome[];
}

interface Outcome {
  description: string;
  name: string;
  point: number;
  price: number;
}

interface PlayerPropContainerProps {
  getPlayerProps: (
    sport: string,
    eventId: string,
    markets: string
  ) => Promise<PlayerPropsData>;
}

interface ReformattedPlayerProps {
  [key: string]: {
    name: string;
    book: string;
    price: number;
    point?: number;
  }[];
}

function reformatPlayerProps(playerProps: PlayerPropsData) {
  //make data shape easier to work with and map through. I will thank myself later.
  const result: ReformattedPlayerProps = {};

  playerProps.bookmakers.forEach((bookmaker) => {
    bookmaker.markets.forEach((market) => {
      market.outcomes.forEach((outcome) => {
        const playerName = outcome.description;

        if (!result[playerName]) {
          result[playerName] = [];
        }

        result[playerName].push({
          name: outcome.name,
          book: bookmaker.title,
          price: outcome.price,
          point: outcome.point,
        });
      });
    });
  });

  return result;
}
