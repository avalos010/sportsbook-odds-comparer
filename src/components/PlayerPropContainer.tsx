"use client";

import { v4 } from "uuid";
import PlayerProp from "./PlayerProp";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PlayerPropContainer({ getPlayerProps }: PlayerPropContainerProps) {
  const searchParams = useSearchParams();
  const sport = searchParams?.get("sport") as string;
  const eventId = searchParams?.get("event") as string;
  const markets = searchParams?.get("markets") as string;
  const [playerProps, setPlayerProps] = useState<PlayerPropsData | null>(null);

  useEffect(() => {
    updatePlayerProps();
  }, [sport, eventId, markets]);

  const updatePlayerProps = async () => {
    const data = await getPlayerProps(sport, eventId, markets);

    setPlayerProps(data);
  };

  console.log(playerProps);

  return (
    <div>
      {playerProps?.bookmakers?.map((bookmaker) => (
        <PlayerProp key={v4()} bookmaker={bookmaker} />
      ))}
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
