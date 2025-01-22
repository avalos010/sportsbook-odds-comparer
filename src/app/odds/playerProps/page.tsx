import PlayerPropContainer from "@/components/PlayerPropContainer";
import markets from "../../../../lib/playerPropMarkets.json";
import ComboBoxClient from "./ComboBoxClient";
import { getPlayerProps } from "../../../../lib/api";

const playerProps = async ({ searchParams }: PlayerPropsParams) => {
  const sport = searchParams.sport;

  const league = sport?.split("_")[1];
  const supportedMarkets = markets[league as keyof typeof markets];

  if (supportedMarkets && sport) {
    const marketsList = Object.entries(supportedMarkets).map(
      ([value, label]) => ({
        label,
        value,
      })
    );

    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4">Player Props </h2>
        <ComboBoxClient marketsList={marketsList} />
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
