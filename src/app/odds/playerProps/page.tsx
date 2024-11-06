import PlayerPropContainer from "@/components/PlayerPropContainer";
import markets from "../../../../lib/playerPropMarkets.json";
import ComboBoxClient from "./ComboBoxClient";
import { getPlayerProps } from "../../../../lib/api";

const playerProps = async ({ searchParams }: PlayerPropsParams) => {
  const sport = searchParams.sport;

  const league = sport?.split("_")[1];
  const supportedMarkets = markets[league as keyof typeof markets];

  if (supportedMarkets && sport) {
    const marketsList = Object.entries(supportedMarkets).map((market) => ({
      //TODO! Get rid of this and just use object btacket notation to do something simpler.
      label: market[1],
      value: market[0],
    }));

    //TODO!: Broken. will fix it soon. Hint use URL query parameters when selecting a player prop.
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4">Player Props </h2>
        <ComboBoxClient marketsList={marketsList} />;
        <PlayerPropContainer getPlayerProps={getPlayerProps} />
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
