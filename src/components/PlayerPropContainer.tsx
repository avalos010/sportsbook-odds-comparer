"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PlayerPropContainer({ getPlayerProps }: PlayerPropContainerProps) {
  const searchParams = useSearchParams();
  const sport = searchParams?.get("sport") as string;
  const eventId = searchParams?.get("event") as string;
  const markets = searchParams?.get("markets") as string;
  const [playerProps, setPlayerProps] = useState<ReformattedPlayerProps | null>(
    null
  );

  const [propMarket, setPropMarket] = useState<string | null>(null);

  useEffect(() => {
    updatePlayerProps();
  }, [sport, eventId, markets]);

  const updatePlayerProps = async () => {
    const data = await getPlayerProps(sport, eventId, markets);
    setPropMarket(data.bookmakers[0].markets[0].key.replaceAll("_", " "));
    setPlayerProps(reformatPlayerProps(data));
  };

  return (
    <div>
      <h2 className="text-4xl mb-7">{propMarket}</h2>
      {playerProps &&
        Object.entries(playerProps).map((details) => {
          const [player, odds] = details;
          return (
            <div className="mb-5">
              <h2 className="text-2xl">{player}</h2>
              <div className="flex flex-col gap-2">
                {odds.map((odd) => (
                  <div className="flex flex-col">
                    <p>{odd.book}</p>
                    <p>
                      {odd.name} {odd?.point}
                    </p>
                    <p>{odd.price}</p>
                  </div>
                ))}
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
