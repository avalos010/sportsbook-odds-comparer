import PlayerProp from "@/components/PlayerProp";
import { getPlayerProps } from "../../../../lib/api";
import markets from "../../../../lib/playerPropMarkets.json";
import ComboBoxClient from "./ComboBoxClient";

import { v4 } from "uuid";

const playerProps = async ({ searchParams }: PlayerPropsParams) => {
  const { sport, event: eventId } = searchParams;

  const league = sport.split("_")[1];
  const supportedMarkets = markets[league as keyof typeof markets];

  if (supportedMarkets) {
    const markets = searchParams.markets;
    const props: PlayerPropsData = await getPlayerProps(
      sport,
      eventId,
      markets
    );
    const marketsList = Object.entries(supportedMarkets).map((market) => ({
      //TODO! Get rid of this and just use object btacket notation to do something simpler.
      label: market[1],
      value: market[0],
    }));

    //TODO!: Broken. will fix it soon. Hint use URL query parameters when selecting a player prop.
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4">Player Props </h2>
        <ComboBoxClient props={props} marketsList={marketsList} />;
        {props.bookmakers.map((bookmaker) => (
          <PlayerProp key={v4()} bookmaker={bookmaker} />
        ))}
      </div>
    );
  }

  return (
    <div className="">
      <p>Player props not supported</p>
    </div>
  );
};

export default playerProps;

interface PlayerPropsParams {
  searchParams: {
    sport: string;
    event: string;
    markets: string;
    marketLabel: string;
  };
}

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
